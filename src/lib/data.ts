import type { Course, Route, Shortcut } from "@/types";
import { courses, routes, shortcuts } from "@/data";

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

export function getShortcutsForCourse(courseId: string): Shortcut[] {
  return shortcuts.filter((s) => "courseId" in s && s.courseId === courseId);
}

export function getShortcutsForRoute(routeId: string): Shortcut[] {
  return shortcuts.filter((s) => "routeId" in s && s.routeId === routeId);
}
