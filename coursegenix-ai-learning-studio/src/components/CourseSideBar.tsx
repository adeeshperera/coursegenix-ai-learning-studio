import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Chapter, Course, Unit } from "@/generated/prisma/client";

type Props = {
	course: Course & {
		units: (Unit & {
			chapters: Chapter[];
		})[];
	};
	currentChapterId: string;
};

const CourseSideBar = async ({ course, currentChapterId }: Props) => {
	return (
		<div className="w-[400px] h-[80vh] absolute top-1/2 -translate-y-1/2 p-6 rounded-r-3xl bg-secondary dark:bg-neutral-900 border border-secondary dark:border-neutral-700 overflow-hidden text-secondary-foreground dark:text-neutral-100 transition duration-600 hover:shadow-[0_6px_11px_rgba(0,0,0,0.25)]">
			{/* Top fade effect */}
			<div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-secondary dark:from-neutral-900 to-transparent z-10 pointer-events-none" />
			
			<div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-secondary-foreground/20 hover:scrollbar-thumb-secondary-foreground/40 transition-colors pr-2">
				<div className="flex flex-col gap-2 mb-6">
					<h1 className="text-2xl font-bold tracking-tight">{course.name}</h1>
					<div className="flex items-center gap-2 text-sm text-secondary-foreground/60">
						<span>{course.units.length} Units</span>
						<span className="w-1 h-1 rounded-full bg-secondary-foreground/30" />
						<span>{course.units.reduce((acc, unit) => acc + unit.chapters.length, 0)} Lessons</span>
					</div>
				</div>

				<div className="space-y-6">
					{course.units.map((unit, unitIndex) => (
						<div key={unit.id} className="border-l-2 border-secondary-foreground/10 pl-4">
							<div className="mb-2">
								<span className="text-xs font-medium uppercase tracking-wider text-secondary-foreground/40">
									Unit {unitIndex + 1}
								</span>
								<h2 className="text-base font-semibold mt-1">{unit.name}</h2>
							</div>

							<div className="space-y-1 mt-2">
								{unit.chapters.map((chapter) => (
									<Link
										key={chapter.id}
										href={`/course/${course.id}/${unitIndex}/${unit.chapters.indexOf(chapter)}`}
										className={cn(
											"block py-2 px-4 -ml-4 rounded-lg transition-all duration-200",
											{
												"bg-primary/15 text-primary hover:bg-primary/20 border border-primary/20 shadow-[0_2px_4px_rgba(0,0,0,0.05)]": chapter.id === currentChapterId,
												"text-secondary-foreground/60 hover:text-secondary-foreground hover:bg-secondary-foreground/5": chapter.id !== currentChapterId,
											}
										)}
									>
										<div className="flex items-center gap-2">
											<div 
												className={cn(
													"w-2 h-2 rounded-full transition-all duration-200",
													chapter.id === currentChapterId 
														? "bg-primary scale-110" 
														: "bg-secondary-foreground/30"
												)}
											/>
											<span className="text-sm font-medium leading-tight">
												{chapter.name}
											</span>
										</div>
									</Link>
								))}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Bottom fade effect */}
			<div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-secondary dark:from-neutral-900 to-transparent z-10 pointer-events-none" />
		</div>
	);
};

export default CourseSideBar;
