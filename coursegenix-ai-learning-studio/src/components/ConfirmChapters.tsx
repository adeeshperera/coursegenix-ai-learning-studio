"use client";
import React from "react";
import ChapterCard, { ChapterCardHandler } from "./ChapterCard";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Chapter, Course, Unit } from "@/generated/prisma/client";
import { Progress } from "./ui/progress";
import { motion } from "framer-motion";

type Props = {
	course: Course & {
		units: (Unit & {
			chapters: Chapter[];
		})[];
	};
};

const ConfirmChapters = ({ course }: Props) => {
	const [loading, setLoading] = React.useState(false);
	const chapterRefs: Record<string, React.RefObject<ChapterCardHandler | null>> = {};
	
	course.units.forEach((unit) => {
		unit.chapters.forEach((chapter) => {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			chapterRefs[chapter.id] = React.useRef<ChapterCardHandler | null>(null);
		});
	});

	const [completedChapters, setCompletedChapters] = React.useState<Set<string>>(new Set());

	const totalChaptersCount = React.useMemo(() => {
		return course.units.reduce((acc, unit) => acc + unit.chapters.length, 0);
	}, [course.units]);

	const progress = React.useMemo(() => {
		return (completedChapters.size / totalChaptersCount) * 100;
	}, [completedChapters.size, totalChaptersCount]);

	return (
		<div className="w-full mt-4">
			<div className="sticky top-4 z-10 bg-background/95 backdrop-blur-sm rounded-lg p-4 border border-secondary-foreground/10 mb-8">
				<div className="flex items-center justify-between mb-2">
					<div className="flex items-center gap-2">
						<BookOpen className="w-5 h-5 text-muted-foreground" />
						<h4 className="font-medium">Course Progress</h4>
					</div>
					<span className="text-sm text-muted-foreground">
						{completedChapters.size} of {totalChaptersCount} chapters
					</span>
				</div>
				<Progress value={progress} className="h-2" />
			</div>

			<div className="space-y-8">
				{course.units.map((unit, unitIndex) => {
					const unitProgress = (unit.chapters.filter(chapter => 
						completedChapters.has(chapter.id)).length / unit.chapters.length) * 100;
					
					return (
						<motion.div 
							key={unit.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: unitIndex * 0.1 }}
							className="relative"
						>
							<div className="flex items-center justify-between mb-4">
								<div>
									<h2 className="text-sm uppercase text-secondary-foreground/60">
										Unit {unitIndex + 1}
									</h2>
									<h3 className="text-2xl font-bold">{unit.name}</h3>
								</div>
								<div className="text-sm text-muted-foreground">
									{unit.chapters.filter(chapter => completedChapters.has(chapter.id)).length} of {unit.chapters.length} chapters
								</div>
							</div>

							<Progress value={unitProgress} className="h-1 mb-4" />

							<div className="space-y-2">
								{unit.chapters.map((chapter, chapterIndex) => (
									<ChapterCard
										ref={chapterRefs[chapter.id]}
										key={chapter.id}
										chapter={chapter}
										chapterIndex={chapterIndex}
										setCompletedChapters={setCompletedChapters}
									/>
								))}
							</div>
						</motion.div>
					);
				})}
			</div>

			<div className="sticky bottom-4 flex items-center justify-center mt-8 bg-background/95 backdrop-blur-sm rounded-lg p-4 border border-secondary-foreground/10">
				<Separator className="flex-[1]" />
				<div className="flex items-center gap-4 mx-4">
					<Link
						href="/create"
						className={buttonVariants({
							variant: "outline",
							size: "lg",
						})}
					>
						<ChevronLeft className="w-4 h-4 mr-2" />
						Back
					</Link>

					{totalChaptersCount === completedChapters.size ? (
						<Link
							className={buttonVariants({
								className: "bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-medium",
								size: "lg",
							})}
							href={`/course/${course.id}/0/0`}
						>
							Start Learning
							<ChevronRight className="w-4 h-4 ml-2" />
						</Link>
					) : (
						<Button
							type="button"
							size="lg"
							className="font-medium bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white"
							disabled={loading}
							onClick={() => {
								setLoading(true);
								Object.values(chapterRefs).forEach((ref) => {
									ref.current?.triggerLoad();
								});
							}}
						>
							{loading ? (
								<>Generating Chapters...</>
							) : (
								<>
									Generate All
									<ChevronRight className="w-4 h-4 ml-2" />
								</>
							)}
						</Button>
					)}
				</div>
				<Separator className="flex-[1]" />
			</div>
		</div>
	);
};

export default ConfirmChapters;
