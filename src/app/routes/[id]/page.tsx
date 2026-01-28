import Link from "next/link";
import { notFound } from "next/navigation";
import {
  DetailPageLayout,
  RouteInfoPanel,
  ShortcutList,
} from "@/components";
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

  const routeName = `${fromCourse?.name ?? route.fromCourseId} → ${toCourse?.name ?? route.toCourseId}`;

  const leftColumn = <RouteInfoPanel route={route} routeName={routeName} />;

  const rightColumn = (
    <section>
      <h2 className="text-2xl font-bold mb-4">ショートカット</h2>
      <ShortcutList shortcuts={shortcuts} />
    </section>
  );

  return (
    <div>
      <Link
        href={toCourse ? `/courses/${toCourse.id}` : "/"}
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← {toCourse?.name ?? "コース一覧"}に戻る
      </Link>

      <h1 className="text-3xl font-bold mb-2">{routeName}</h1>
      <p className="text-gray-600 mb-8">Route ショートカット</p>

      <DetailPageLayout leftColumn={leftColumn} rightColumn={rightColumn} />
    </div>
  );
}
