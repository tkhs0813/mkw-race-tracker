import Link from "next/link";
import { notFound } from "next/navigation";
import { ShortcutCard } from "@/components";
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

  return (
    <div>
      <Link
        href="/"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← コース一覧に戻る
      </Link>

      <h1 className="text-3xl font-bold mb-8">{course.name}</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">このコースに行くRoute</h2>
        {routes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {routes.map((route) => (
              <Link
                key={route.id}
                href={`/routes/${route.id}`}
                className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
              >
                <span className="text-gray-600">
                  {getCourse(route.fromCourseId)?.name ?? route.fromCourseId} →{" "}
                  {getCourse(route.toCourseId)?.name ?? route.toCourseId}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Routeはありません</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">ショートカット</h2>
        {shortcuts.length > 0 ? (
          <div className="space-y-6">
            {shortcuts.map((shortcut, index) => (
              <ShortcutCard
                key={shortcut.id}
                shortcut={shortcut}
                index={index}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">ショートカットはまだありません</p>
        )}
      </section>
    </div>
  );
}
