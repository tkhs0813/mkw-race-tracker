import { CourseCard } from "@/components";
import { getCourses } from "@/lib/data";

export default function Home() {
  const courses = getCourses();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">コース一覧</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
