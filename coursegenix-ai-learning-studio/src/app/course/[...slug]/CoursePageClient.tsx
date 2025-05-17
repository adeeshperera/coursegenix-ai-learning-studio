"use client";

import { Chapter, Course, Unit } from "@/generated/prisma/client";
import React from "react";
import CourseSideBar from "@/components/CourseSideBar";
import MainVideoSummary from "@/components/MainVideoSummary";
import QuizCards from "@/components/QuizCards";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type ChapterWithQuestions = Chapter & {
  questions: {
    id: string;
    question: string;
    chapterId: string;
    answer: string;
    options: string;
  }[];
};

interface Props {
  course: Course & {
    units: (Unit & {
      chapters: ChapterWithQuestions[];
    })[];
  };
  chapter: ChapterWithQuestions;
  unit: Unit;
  unitIndex: number;
  chapterIndex: number;
  nextChapter: ChapterWithQuestions | null;
  prevChapter: ChapterWithQuestions | null;
}

const CoursePageClient = ({
  course,
  chapter,
  unitIndex,
  chapterIndex,
  nextChapter,
  prevChapter,
}: Props) => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-none">
        <CourseSideBar 
          course={course} 
          currentChapterId={chapter.id}
        />
      </div>

      <div className="flex-1 p-8 pl-[450px]">
        <div className="flex gap-8">
          <MainVideoSummary
            chapter={chapter}
            chapterIndex={chapterIndex}
            unitIndex={unitIndex}
          />
          <QuizCards 
            chapter={chapter}
          />
        </div>

        <div className="mt-8 flex items-center justify-between">
          {prevChapter && (
            <Link
              href={`/course/${course.id}/${unitIndex}/${chapterIndex - 1}`}
              className="flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              <div>
                <div className="text-xs">Previous</div>
                <div className="font-medium">{prevChapter.name}</div>
              </div>
            </Link>
          )}

          {nextChapter && (
            <Link
              href={`/course/${course.id}/${unitIndex}/${chapterIndex + 1}`}
              className="flex items-center text-sm text-muted-foreground hover:text-foreground ml-auto"
            >
              <div className="text-right">
                <div className="text-xs">Next</div>
                <div className="font-medium">{nextChapter.name}</div>
              </div>
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePageClient;