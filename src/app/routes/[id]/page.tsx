import Link from "next/link";
import { notFound } from "next/navigation";
import { ShortcutCard } from "@/components";
import {
  getCourse,
  getRoute,
  getRoutes,
  getShortcutsForRoute,
} from "@/lib/data";

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getRoutes().map((route) => ({ id: route.id }));
}

export default async function RoutePage({ params }: Props) {
  const { id } = await params;
  const route = getRoute(id);

  if (!route) {
    notFound();
  }

  const fromCourse = getCourse(route.fromCourseId);
  const toCourse = getCourse(route.toCourseId);
  const shortcuts = getShortcutsForRoute(route.id);

  return (
    <div>
      <Link
        href={toCourse ? `/courses/${toCourse.id}` : "/"}
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← {toCourse?.name || "コース一覧"}に戻る
      </Link>

      <h1 className="text-3xl font-bold mb-2">
        {fromCourse?.name || route.fromCourseId} → {toCourse?.name || route.toCourseId}
      </h1>
      <p className="text-gray-600 mb-8">Route ショートカット</p>

      <section>
        <h2 className="text-2xl font-bold mb-4">ショートカット</h2>
        {shortcuts.length > 0 ? (
          <div className="space-y-6">
            {shortcuts.map((shortcut, index) => (
              <ShortcutCard key={shortcut.id} shortcut={shortcut} index={index} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">ショートカットはまだありません</p>
        )}
      </section>
    </div>
  );
}
