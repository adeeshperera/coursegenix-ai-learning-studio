import ConfirmChapters from "@/components/ConfirmChapters";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { BookTextIcon, Info, Layers, Sparkles } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
	params: Promise<{
		courseId: string;
	}>;
};

const CreateChapters = async (props: Props) => {
	// Await params before accessing its properties
	const { courseId } = await props.params;
	
	const session = await getAuthSession();
	if (!session?.user) {
		return redirect("/gallery");
	}
	const course = await prisma.course.findUnique({
		where: {
			id: courseId,
		},
		include: {
			units: {
				include: {
					chapters: true,
				},
			},
		},
	});
	if (!course) {
		return redirect("/create");
	}

	const totalChapters = course.units.reduce((acc, unit) => acc + unit.chapters.length, 0);

	return (
		<div className="flex flex-col items-start max-w-3xl mx-auto my-16 px-4 sm:px-8">
			{/* Title Card */}
			<div className="w-full p-8 rounded-2xl bg-gradient-to-b from-secondary/80 to-background/80 border border-secondary-foreground/10 backdrop-blur-xl shadow-lg">
				<div className="flex flex-col gap-6">
					<div className="space-y-2">
						<p className="text-sm font-medium text-blue-500 dark:text-blue-400">
							Generated Course
						</p>
						<h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
							{course.name}
						</h1>
					</div>

					<div className="flex flex-wrap items-center gap-3">
						<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/70 border border-secondary-foreground/10 hover:bg-secondary/90 transition-colors">
								<BookTextIcon className="w-4 h-4 text-blue-500 dark:text-blue-400" />
							<span className="text-sm text-foreground/80">{course.units.length} Units</span>
						</div>
						<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/70 border border-secondary-foreground/10 hover:bg-secondary/90 transition-colors">
							<Layers className="w-4 h-4 text-blue-500 dark:text-blue-400" />
							<span className="text-sm text-foreground/80">{totalChapters} Chapters</span>
						</div>
						<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/70 border border-secondary-foreground/10 hover:bg-secondary/90 transition-colors">
							<Sparkles className="w-4 h-4 text-blue-500 dark:text-blue-400" />
							<span className="text-sm text-foreground/80">AI-Generated Content</span>
						</div>
					</div>

					<div className="flex items-start gap-3 p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
						<Info className="w-5 h-5 mt-0.5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
						<div className="text-sm text-foreground/70">
							<p className="font-medium text-foreground mb-1">Ready to Generate Content</p>
							<p>
								We&apos;ve generated {totalChapters} chapters across {course.units.length} units 
								for your course. Review the content below and click &quot;Generate All&quot; to create 
								detailed lessons for each chapter. You can then start learning once everything is ready.
							</p>
						</div>
					</div>
				</div>
			</div>

			<ConfirmChapters course={course} />
		</div>
	);
};

export default CreateChapters;
