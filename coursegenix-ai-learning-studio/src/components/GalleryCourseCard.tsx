import { Chapter, Course, Unit } from "@/generated/prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BookOpen, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
};

const GalleryCourseCard = async ({ course }: Props) => {
  const totalChapters = course.units.reduce((acc, unit) => acc + unit.chapters.length, 0);

  return (
    <div className="group relative flex flex-col w-full h-[400px] overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/20">
      {/* Image Section - Fixed height */}
      <Link
        href={`/course/${course.id}/0/0`}
        className="relative w-full h-[200px] overflow-hidden rounded-t-lg"
      >
        <Image
          src={course.image || ""}
          className="object-cover transition-all duration-500 group-hover:scale-105"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority
          alt={`${course.name} course thumbnail`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-background/10 to-transparent" />
        
        {/* Course Stats */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-end text-white">
          <div className="flex items-center gap-1.5 text-xs backdrop-blur-sm bg-black/20 px-2.5 py-1 rounded-full">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>{totalChapters} Lessons</span>
          </div>
        </div>
      </Link>

      {/* Content Section - Fixed layout */}
      <div className="flex flex-col flex-1 p-4">
        {/* Title and Units Count - Fixed height */}
        <div className="h-[72px]">
          <h3 className="line-clamp-2 text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">
            {course.name}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
            <BookOpen className="h-3.5 w-3.5" />
            <span>{course.units.length} Units</span>
          </div>
        </div>

        {/* Units List - Fixed height */}
        <div className="flex-1 overflow-hidden">
          <div className="space-y-1">
            {course.units.slice(0, 3).map((unit, i) => (
              <Link
                href={`/course/${course.id}/${i}/0`}
                key={unit.id}
                className="group/unit block"
              >
                <div className="flex items-center gap-2 rounded py-1 text-sm text-muted-foreground transition-all hover:bg-muted/50 group-hover/unit:text-foreground">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-muted text-xs font-medium group-hover/unit:bg-primary/10 group-hover/unit:text-primary transition-colors">
                    {i + 1}
                  </span>
                  <span className="line-clamp-1 text-xs flex-1">{unit.name}</span>
                </div>
              </Link>
            ))}
            {course.units.length > 3 && (
              <div className="text-xs text-muted-foreground hover:text-muted-foreground/70 transition-colors pt-0.5">
                +{course.units.length - 3} more units
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Link
          href={`/course/${course.id}/0/0`}
          className={cn(
            "block w-full rounded-md bg-primary/90 px-4 py-2 text-center text-sm font-medium text-primary-foreground",
            "transition-all duration-300",
            "hover:bg-primary hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5",
            "active:translate-y-0"
          )}
        >
          Start Learning
        </Link>
      </div>
    </div>
  );
};

export default GalleryCourseCard;
