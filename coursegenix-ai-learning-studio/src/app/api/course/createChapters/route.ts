// /api/course/createChapters

import { NextResponse } from "next/server";
import { createChaptersSchema } from "@/validators/course";
import { ZodError } from "zod";
import { strict_output } from "@/lib/gpt";
import { getUnsplashImage } from "@/lib/unsplash";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { checkSubscription } from "@/lib/subscription";

export async function POST(req: Request) {
	try {
		const session = await getAuthSession();
		if (!session?.user) {
			return new NextResponse("unauthorised", { status: 401 });
		}
		const isPro = await checkSubscription();
		if (session.user.credits <= 0 && !isPro) {
			return new NextResponse("no credits", { status: 402 });
		}
		const body = await req.json();
		const { title, units } = createChaptersSchema.parse(body);

		// Define unit range and randomly select how many units to generate
		const MIN_UNITS = 3;
		const MAX_UNITS = 10;
		const targetUnitCount = Math.floor(Math.random() * (MAX_UNITS - MIN_UNITS + 1)) + MIN_UNITS;
		console.log("Target unit count:", targetUnitCount);
		let expanded_units = [...units];
		
		if (units.length < targetUnitCount) {
			// Generate additional units to reach the target count
			const additional_units_data = await strict_output(
				"You are an expert course designer who can expand a course outline.",
				`The user wants to create a course about '${title}' and has provided these initial units: ${units.join(", ")}. 
				Please generate ${targetUnitCount - units.length} additional relevant units that would complement these and create a comprehensive course.
				The units should follow a logical progression from foundational to advanced concepts.
				Make sure these additional units don't overlap with the ones already provided.
				Only output the names of the new units, nothing else.`,
				{
					additional_units: `an array of ${targetUnitCount - units.length} strings, each representing a new unit name`,
				}
			);
			
			// Handle the type correctly by checking if additional_units exists and is an array
			const additional_units = typeof additional_units_data === 'object' && 
				additional_units_data !== null && 
				'additional_units' in additional_units_data &&
				Array.isArray(additional_units_data.additional_units)
					? additional_units_data.additional_units as string[]
					: [];
					
			expanded_units = [...units, ...additional_units];
		}

		type outputUnits = {
			title: string;
			description: string;
			chapters: {
				youtube_search_query: string;
				chapter_title: string;
			}[];
		}[];

		// First determine a random number of chapters for each unit
		const MIN_CHAPTERS = 3;
		const MAX_CHAPTERS = 5;
		const chapterCountPerUnit = expanded_units.map(() => 
			Math.floor(Math.random() * (MAX_CHAPTERS - MIN_CHAPTERS + 1)) + MIN_CHAPTERS
		);

		const outputUnitsResponse = await strict_output(
			"You are an expert course designer. The user can create a course about ANY subject. You must generate detailed content for each unit provided. Order the units from easiest/foundational to most advanced/complex, so the course progresses logically. For each unit/subtopic below, do ALL of the following: 1) Write a 1-2 sentence description that summarizes the unit and makes it clear how it is different from other units. 2) Generate the specified number of chapters that are strictly about the subtopic (do NOT include generic or unrelated content, and do NOT assume the topic is IT or programming unless the user's input is IT/CS). 3) At least one chapter must be a real-world project or application, using terminology and examples natural for the subject. 4) Do NOT overlap content between units. 5) Use the main topic and subtopic as the ONLY context for all chapters in that unit. Output JSON with: title, description, chapters (each with chapter_title and youtube_search_query).",
			expanded_units.map(
				(unit, idx) =>
					`Main course topic: ${title}\nUnit: ${unit}\nOther units: ${expanded_units.filter((_, i) => i !== idx).join(", ")}\nNumber of chapters to generate: ${chapterCountPerUnit[idx]}\nInstructions: Generate EXACTLY ${chapterCountPerUnit[idx]} chapters that are strictly about this unit. Do NOT include generic or IT/programming content unless the user's input is IT/CS. Use terminology, examples, and projects that are natural for the subject. At least one chapter must be a real-world project. Do NOT repeat chapters from other units. Start with a 1-2 sentence description of the unit.`
			),
			{
				title: "title of the unit (should match the subtopic exactly)",
				description: "1-2 sentence summary of the unit, focused on the subtopic and how it is unique",
				chapters:
					"an array of EXACTLY the specified number of chapters, each chapter should have a youtube_search_query and a chapter_title key in the JSON object",
			}
		);
		
		// Safely cast the response to our expected type
		const output_units: outputUnits = Array.isArray(outputUnitsResponse) 
			? outputUnitsResponse.map(unit => ({
				title: String(unit.title || ''),
				description: String(unit.description || ''),
				chapters: Array.isArray(unit.chapters) 
					? unit.chapters.map(chapter => ({
						youtube_search_query: String(chapter.youtube_search_query || ''),
						chapter_title: String(chapter.chapter_title || '')
					})) 
					: []
			}))
			: [];

		const imageSearchTermResponse = await strict_output(
			"you are an AI capable of finding the most relevant image for a course releted to User defiend topics and subtopics",
			`think deep, analysis and please provide a good image search term for the title of a course about ${title}. This search term will be fed into the unsplash API, so make sure it is a good search term that will return good results`,
			{
				image_search_term: "a good search term for the title of the course",
			}
		);
		
		// Safely extract the image search term
		const imageSearchTerm = typeof imageSearchTermResponse === 'object' && 
			imageSearchTermResponse !== null &&
			'image_search_term' in imageSearchTermResponse
				? String(imageSearchTermResponse.image_search_term)
				: title; // Fall back to title if not found

		const course_image = await getUnsplashImage(imageSearchTerm);

		const course = await prisma.course.create({
			data: {
				name: title,
				image: course_image,
			},
		});

		for (const unit of output_units) {
			const title = unit.title;
			const prismaUnit = await prisma.unit.create({
				data: {
					name: title,
					courseId: course.id,
				},
			});
			await prisma.chapter.createMany({
				data: unit.chapters.map((chapter) => {
					return {
						name: chapter.chapter_title,
						youtubeSearchQuery: chapter.youtube_search_query,
						unitId: prismaUnit.id,
					};
				}),
			});
		}
		await prisma.user.update({
			where: {
				id: session.user.id,
			},
			data: {
				credits: {
					decrement: 1,
				},
			},
		});

		return NextResponse.json({ course_id: course.id });
	} catch (error) {
		if (error instanceof ZodError) {
			return new NextResponse("invalid body", { status: 400 });
		}
		console.error(error);
	}
}