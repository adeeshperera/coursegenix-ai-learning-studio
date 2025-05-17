import GalleryCourseCard from "@/components/GalleryCourseCard";
import { SearchInput } from "@/components/SearchInput";
import { prisma } from "@/lib/db";
import { BookOpen } from "lucide-react";
import React from "react";

type Props = {
  searchParams: Promise<{ query?: string }>;
};

const GalleryPage = async (props: Props) => {
  // Await searchParams before accessing its properties
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  const courses = await prisma.course.findMany({
    where: {
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
    include: {
      units: {
        include: { chapters: true },
      },
    },
  });

  return (
    <div className="min-h-screen py-8 mx-auto max-w-7xl px-4">
      {/* Header Section */}
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Browse Courses</h1>
        <p className="text-muted-foreground">
          Explore {courses.length} courses to enhance your knowledge
        </p>
      </div>

      {/* Search Section */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <SearchInput />
      </div>

      {/* Course Grid */}
      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No courses found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search to find what you&apos;re looking for.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-start">
          {courses.map((course) => (
            <GalleryCourseCard course={course} key={course.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
