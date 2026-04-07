import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourse, getRoute, getRoutes } from "@/lib/data";
import { TrackDetail } from "@/components/TrackDetail";

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
  const routeName = `${fromCourse?.name ?? route.fromCourseId} → ${toCourse?.name ?? route.toCourseId}`;

  return (
    <div>
      <Link
        href="/"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← ダッシュボードに戻る
      </Link>
      <h1 className="text-3xl font-bold mb-8">{routeName}</h1>
      <TrackDetail trackType="route" trackId={route.id} trackName={routeName} />
    </div>
  );
}
