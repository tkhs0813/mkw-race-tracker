import Link from "next/link";
import type { Course } from "@/types";

interface Props {
  course: Course;
}

export function CourseCard({ course }: Props) {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
    >
      <h2 className="text-lg font-semibold text-gray-800">{course.name}</h2>
    </Link>
  );
}
