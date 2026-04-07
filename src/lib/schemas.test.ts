import { describe, expect, test } from "vitest";
import { CourseSchema, RouteSchema } from "./schemas";

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
