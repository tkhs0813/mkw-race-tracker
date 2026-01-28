import { describe, expect, test } from "vitest";
import {
  getCourses,
  getCourse,
  getRoutes,
  getRoute,
  getRoutesToCourse,
  getShortcutsForCourse,
  getShortcutsForRoute,
} from "./data";

describe("getCourses", () => {
  test("returns an array of courses", () => {
    const courses = getCourses();
    expect(Array.isArray(courses)).toBe(true);
    expect(courses.length).toBeGreaterThan(0);
  });

  test("each course has required properties", () => {
    const courses = getCourses();
    for (const course of courses) {
      expect(course).toHaveProperty("id");
      expect(course).toHaveProperty("name");
      expect(typeof course.id).toBe("string");
      expect(typeof course.name).toBe("string");
    }
  });
});

describe("getCourse", () => {
  test("returns a course for valid id", () => {
    const course = getCourse("Mario_Circuit");
    expect(course).toBeDefined();
    expect(course?.name).toBe("マリオサーキット");
  });

  test("returns undefined for invalid id", () => {
    const course = getCourse("non-existent-course");
    expect(course).toBeUndefined();
  });
});

describe("getRoutes", () => {
  test("returns an array of routes", () => {
    const routes = getRoutes();
    expect(Array.isArray(routes)).toBe(true);
  });

  test("each route has required properties", () => {
    const routes = getRoutes();
    for (const route of routes) {
      expect(route).toHaveProperty("id");
      expect(route).toHaveProperty("fromCourseId");
      expect(route).toHaveProperty("toCourseId");
    }
  });
});

describe("getRoute", () => {
  test("returns a route for valid id", () => {
    const route = getRoute("Whistlestop_Summit-to-DK_Spaceport");
    expect(route).toBeDefined();
    expect(route?.fromCourseId).toBe("Whistlestop_Summit");
    expect(route?.toCourseId).toBe("DK_Spaceport");
  });

  test("returns undefined for invalid id", () => {
    const route = getRoute("non-existent-route");
    expect(route).toBeUndefined();
  });
});

describe("getRoutesToCourse", () => {
  test("returns routes that end at the specified course", () => {
    const routes = getRoutesToCourse("DK_Spaceport");
    expect(Array.isArray(routes)).toBe(true);
    expect(routes.length).toBeGreaterThan(0);
    for (const route of routes) {
      expect(route.toCourseId).toBe("DK_Spaceport");
    }
  });

  test("returns empty array for course with no incoming routes", () => {
    const routes = getRoutesToCourse("non-existent-course");
    expect(routes).toEqual([]);
  });
});

describe("getShortcutsForCourse", () => {
  test("returns shortcuts for the specified course", () => {
    const shortcuts = getShortcutsForCourse("DK_Spaceport");
    expect(Array.isArray(shortcuts)).toBe(true);
    for (const shortcut of shortcuts) {
      expect(shortcut.courseId).toBe("DK_Spaceport");
    }
  });

  test("each shortcut has required properties", () => {
    const shortcuts = getShortcutsForCourse("DK_Spaceport");
    for (const shortcut of shortcuts) {
      expect(shortcut).toHaveProperty("id");
      expect(shortcut).toHaveProperty("youtubeUrl");
      expect(shortcut).toHaveProperty("requiredItems");
    }
  });

  test("returns empty array for course with no shortcuts", () => {
    const shortcuts = getShortcutsForCourse("non-existent-course");
    expect(shortcuts).toEqual([]);
  });
});

describe("getShortcutsForRoute", () => {
  test("returns shortcuts for the specified route", () => {
    const shortcuts = getShortcutsForRoute("Whistlestop_Summit-to-DK_Spaceport");
    expect(Array.isArray(shortcuts)).toBe(true);
    for (const shortcut of shortcuts) {
      expect(shortcut.routeId).toBe("Whistlestop_Summit-to-DK_Spaceport");
    }
  });

  test("returns empty array for route with no shortcuts", () => {
    const shortcuts = getShortcutsForRoute("non-existent-route");
    expect(shortcuts).toEqual([]);
  });
});
