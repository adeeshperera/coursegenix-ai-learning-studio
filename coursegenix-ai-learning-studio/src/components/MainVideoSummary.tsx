import { Chapter } from "@/generated/prisma/client";
import React from "react";

type Props = {
	chapter: Chapter;
	unitIndex: number;
	chapterIndex: number;
};

const MainVideoSummary = ({
	unitIndex,
	chapter,
	chapterIndex,
}: Props) => {
	return (
		<div className="flex-[2] mt-16">
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2 text-sm">
					<span className="bg-primary/10 text-primary rounded-full px-3 py-1 font-medium">
						Unit {unitIndex + 1}
					</span>
					<span className="text-muted-foreground">&bull;</span>
					<span className="text-muted-foreground">Chapter {chapterIndex + 1}</span>
				</div>
				<h1 className="text-4xl font-bold tracking-tight">{chapter.name}</h1>
			</div>

			<div className="relative w-full mt-6 rounded-xl overflow-hidden border shadow-sm">
				<div className="relative pb-[56.25%]">
					<iframe
						title={`${chapter.name} - Video`}
						className="absolute inset-0 w-full h-full bg-black"
						src={`https://www.youtube.com/embed/${chapter.videoId}`}
						allowFullScreen
					/>
				</div>
			</div>

			<div className="mt-8">
				<h3 className="text-2xl font-semibold tracking-tight mb-4">Summary</h3>
				{chapter.summary ? (
					<p className="text-base text-muted-foreground leading-relaxed">
						{chapter.summary}
					</p>
				) : (
					<p className="text-base text-muted-foreground italic">
						No summary available for this chapter.
					</p>
				)}
			</div>
		</div>
	);
};

export default MainVideoSummary;
