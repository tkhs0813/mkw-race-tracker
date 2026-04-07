import type { Course, Route } from "@/types";

export function getTrackName(
  trackType: string,
  trackId: string,
  courses: readonly Course[],
  routes: readonly Route[]
): string {
  if (trackType === "course") {
    const course = courses.find((c) => c.id === trackId);
    return course?.name ?? trackId;
  }
  const route = routes.find((r) => r.id === trackId);
  if (!route) return trackId;
  const from = courses.find((c) => c.id === route.fromCourseId)?.name ?? route.fromCourseId;
  const to = courses.find((c) => c.id === route.toCourseId)?.name ?? route.toCourseId;
  return `${from} → ${to}`;
}

export function getAllTracks(
  courses: readonly Course[],
  routes: readonly Route[]
): { id: string; name: string; type: "course" | "route" }[] {
  const courseTracks = courses.map((c) => ({
    id: c.id,
    name: c.name,
    type: "course" as const,
  }));
  const routeTracks = routes.map((r) => {
    const from = courses.find((c) => c.id === r.fromCourseId)?.name ?? r.fromCourseId;
    const to = courses.find((c) => c.id === r.toCourseId)?.name ?? r.toCourseId;
    return {
      id: r.id,
      name: `${from} → ${to}`,
      type: "route" as const,
    };
  });
  return [...courseTracks, ...routeTracks];
}
