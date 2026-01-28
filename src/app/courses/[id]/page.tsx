import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CourseInfoPanel,
  DetailPageLayout,
  ShortcutList,
} from "@/components";
import {
  getCourse,
  getCourses,
  getRoutesToCourse,
  getShortcutsForCourse,
} from "@/lib/data";

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getCourses().map((course) => ({ id: course.id }));
}

export default async function CoursePage({ params }: Props) {
  const { id } = await params;
  const course = getCourse(id);

  if (!course) {
    notFound();
  }

  const shortcuts = getShortcutsForCourse(course.id);
  const routes = getRoutesToCourse(course.id);

  const leftColumn = (
    <div className="space-y-8">
      <CourseInfoPanel course={course} />

      <section>
        <h2 className="text-xl font-bold mb-4">このコースに行くRoute</h2>
        {routes.length > 0 ? (
          <div className="space-y-2">
            {routes.map((route) => (
              <Link
                key={route.id}
                href={`/routes/${route.id}`}
                className="block p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 text-sm"
              >
                <span className="text-gray-600">
                  {getCourse(route.fromCourseId)?.name ?? route.fromCourseId} →{" "}
                  {getCourse(route.toCourseId)?.name ?? route.toCourseId}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">Routeはありません</p>
        )}
      </section>
    </div>
  );

  const rightColumn = (
    <section>
      <h2 className="text-2xl font-bold mb-4">ショートカット</h2>
      <ShortcutList shortcuts={shortcuts} />
    </section>
  );

  return (
    <div>
      <Link
        href="/"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← コース一覧に戻る
      </Link>

      <h1 className="text-3xl font-bold mb-8">{course.name}</h1>

      <DetailPageLayout leftColumn={leftColumn} rightColumn={rightColumn} />
    </div>
  );
}
