import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourse, getCourses } from "@/lib/data";
import { TrackDetail } from "@/components/TrackDetail";

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

  return (
    <div>
      <Link
        href="/"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← ダッシュボードに戻る
      </Link>
      <h1 className="text-3xl font-bold mb-8">{course.name}</h1>
      <TrackDetail trackType="course" trackId={course.id} trackName={course.name} />
    </div>
  );
}
