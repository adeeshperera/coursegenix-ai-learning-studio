"use client";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { toast } from "sonner";
import { Loader2, CheckCircle2, XCircle, PlayCircle } from "lucide-react";
import { Chapter } from "@/generated/prisma/client";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

type Props = {
	chapter: Chapter;
	chapterIndex: number;
	setCompletedChapters: React.Dispatch<React.SetStateAction<Set<string>>>;
};

export type ChapterCardHandler = {
	triggerLoad: () => void;
};

const ChapterCard = React.forwardRef<ChapterCardHandler, Props>(
	({ chapter, chapterIndex, setCompletedChapters }, ref) => {
		const [success, setSuccess] = React.useState<boolean | null>(null);
		const [error, setError] = React.useState<string | null>(null);
		const { mutate: getChapterInfo, isPending } = useMutation({
			mutationFn: async () => {
				const response = await axios.post("/api/chapter/getInfo", {
					chapterId: chapter.id,
				});
				return response.data;
			},
		});

		const addChapterIdToSet = React.useCallback(() => {
			setCompletedChapters((prev) => {
				const newSet = new Set(prev);
				newSet.add(chapter.id);
				return newSet;
			});
		}, [chapter.id, setCompletedChapters]);

		React.useEffect(() => {
			if (chapter.videoId) {
				setSuccess(true);
				addChapterIdToSet();
			}
		}, [chapter, addChapterIdToSet]);

		React.useImperativeHandle(ref, () => ({
			async triggerLoad() {
				if (chapter.videoId) {
					addChapterIdToSet();
					return;
				}
				getChapterInfo(undefined, {
					onSuccess: () => {
						setSuccess(true);
						setError(null);
						addChapterIdToSet();
					},
					onError: (err) => {
						console.error(err);
						setSuccess(false);
						setError("Failed to load chapter content");
						toast.error("There was an error loading your chapter");
						addChapterIdToSet();
					},
				});
			},
		}));

		return (
			<div
				key={chapter.id}
				className={cn(
					"group px-4 py-3 mt-2 rounded-lg flex items-center justify-between transition-all duration-200",
					{
						"bg-secondary/50 hover:bg-secondary/80": success === null,
						"bg-red-500/10 hover:bg-red-500/20 border border-red-500/20": success === false,
						"bg-green-500/10 hover:bg-green-500/20 border border-green-500/20": success === true,
					}
				)}
			>
				<div className="flex items-center gap-3">
					<div className="flex-shrink-0">
						{isPending ? (
							<Loader2 className="w-5 h-5 animate-spin text-blue-500" />
						) : success === true ? (
							<CheckCircle2 className="w-5 h-5 text-green-500" />
						) : success === false ? (
							<XCircle className="w-5 h-5 text-red-500" />
						) : (
							<PlayCircle className="w-5 h-5 text-muted-foreground" />
						)}
					</div>
					
					<div>
						<h5 className="font-medium text-base">Chapter {chapterIndex + 1}: {chapter.name}</h5>
						{error && <p className="text-sm text-red-500 mt-0.5">{error}</p>}
					</div>
				</div>

				{success === true && (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<div className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-500 font-medium">
									Ready
									</div>
							</TooltipTrigger>
							<TooltipContent>
								<p>Chapter content generated successfully</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
			</div>
		);
	}
);

ChapterCard.displayName = "ChapterCard";

export default ChapterCard;
