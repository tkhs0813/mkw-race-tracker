import { describe, expect, test } from "vitest";
import {
  CourseSchema,
  RouteSchema,
  ShortcutSchema,
  ItemRequirementSchema,
} from "./schemas";

describe("CourseSchema", () => {
  test("validates valid course", () => {
    const validCourse = { id: "test-course", name: "テストコース" };
    const result = CourseSchema.safeParse(validCourse);
    expect(result.success).toBe(true);
  });

  test("validates course with optional imageUrl", () => {
    const courseWithImage = {
      id: "test-course",
      name: "テストコース",
      imageUrl: "https://example.com/image.png",
    };
    const result = CourseSchema.safeParse(courseWithImage);
    expect(result.success).toBe(true);
  });

  test("rejects course without id", () => {
    const invalidCourse = { name: "テストコース" };
    const result = CourseSchema.safeParse(invalidCourse);
    expect(result.success).toBe(false);
  });

  test("rejects course without name", () => {
    const invalidCourse = { id: "test-course" };
    const result = CourseSchema.safeParse(invalidCourse);
    expect(result.success).toBe(false);
  });
});

describe("RouteSchema", () => {
  test("validates valid route", () => {
    const validRoute = {
      id: "test-route",
      fromCourseId: "course-a",
      toCourseId: "course-b",
    };
    const result = RouteSchema.safeParse(validRoute);
    expect(result.success).toBe(true);
  });

  test("rejects route without fromCourseId", () => {
    const invalidRoute = { id: "test-route", toCourseId: "course-b" };
    const result = RouteSchema.safeParse(invalidRoute);
    expect(result.success).toBe(false);
  });
});

describe("ItemRequirementSchema", () => {
  test("validates mushroom item", () => {
    const item = { item: "mushroom", count: 2 };
    const result = ItemRequirementSchema.safeParse(item);
    expect(result.success).toBe(true);
  });

  test("validates none item", () => {
    const item = { item: "none", count: 0 };
    const result = ItemRequirementSchema.safeParse(item);
    expect(result.success).toBe(true);
  });

  test("rejects invalid item type", () => {
    const item = { item: "invalid-item", count: 1 };
    const result = ItemRequirementSchema.safeParse(item);
    expect(result.success).toBe(false);
  });

  test("rejects negative count", () => {
    const item = { item: "mushroom", count: -1 };
    const result = ItemRequirementSchema.safeParse(item);
    expect(result.success).toBe(false);
  });
});

describe("ShortcutSchema", () => {
  test("validates shortcut with courseId", () => {
    const shortcut = {
      id: "test-sc",
      courseId: "mario-circuit",
      youtubeUrl: "https://www.youtube.com/watch?v=abc123",
      requiredItems: [{ item: "mushroom", count: 1 }],
    };
    const result = ShortcutSchema.safeParse(shortcut);
    expect(result.success).toBe(true);
  });

  test("validates shortcut with routeId", () => {
    const shortcut = {
      id: "test-sc",
      routeId: "mario-to-toad",
      youtubeUrl: "https://www.youtube.com/watch?v=abc123",
      requiredItems: [],
    };
    const result = ShortcutSchema.safeParse(shortcut);
    expect(result.success).toBe(true);
  });

  test("rejects shortcut with invalid youtubeUrl", () => {
    const shortcut = {
      id: "test-sc",
      courseId: "mario-circuit",
      youtubeUrl: "not-a-url",
      requiredItems: [],
    };
    const result = ShortcutSchema.safeParse(shortcut);
    expect(result.success).toBe(false);
  });
});
