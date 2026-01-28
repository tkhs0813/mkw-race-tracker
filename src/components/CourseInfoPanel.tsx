import Image from "next/image";
import type { Course } from "@/types";

interface Props {
  course: Course;
}

export function CourseInfoPanel({ course }: Props) {
  return (
    <div className="space-y-4">
      <div className="aspect-[3/4] bg-gray-700 rounded-lg overflow-hidden relative">
        {course.imageUrl ? (
          <Image
            src={course.imageUrl}
            alt={course.name}
            fill
            className="object-contain p-1"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>
      {course.memo && (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-gray-700 whitespace-pre-wrap">{course.memo}</p>
        </div>
      )}
    </div>
  );
}
