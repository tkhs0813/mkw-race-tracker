import type { Course, Route } from "@/types";
import { courses, routes } from "@/data";

export function getCourses(): readonly Course[] {
  return courses;
}

export function getCourse(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getRoutes(): readonly Route[] {
  return routes;
}

export function getRoute(id: string): Route | undefined {
  return routes.find((r) => r.id === id);
}

export function getRoutesToCourse(courseId: string): Route[] {
  return routes.filter((r) => r.toCourseId === courseId);
}
