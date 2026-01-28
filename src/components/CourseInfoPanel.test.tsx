import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CourseInfoPanel } from "./CourseInfoPanel";
import type { Course } from "@/types";

describe("CourseInfoPanel", () => {
  const baseCourse: Course = {
    id: "test-course",
    name: "Test Course",
  };

  it("renders placeholder when no image is provided", () => {
    render(<CourseInfoPanel course={baseCourse} />);

    expect(screen.getByText("No Image")).toBeInTheDocument();
  });

  it("renders image when imageUrl is provided", () => {
    const courseWithImage: Course = {
      ...baseCourse,
      imageUrl: "/images/test.jpg",
    };

    render(<CourseInfoPanel course={courseWithImage} />);

    const image = screen.getByRole("img", { name: "Test Course" });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("alt", "Test Course");
  });

  it("does not render memo section when memo is not provided", () => {
    render(<CourseInfoPanel course={baseCourse} />);

    const memoContainer = document.querySelector(".bg-gray-50");
    expect(memoContainer).not.toBeInTheDocument();
  });

  it("renders memo when provided", () => {
    const courseWithMemo: Course = {
      ...baseCourse,
      memo: "This is a test memo",
    };

    render(<CourseInfoPanel course={courseWithMemo} />);

    expect(screen.getByText("This is a test memo")).toBeInTheDocument();
  });

  it("renders both image and memo when both are provided", () => {
    const courseWithBoth: Course = {
      ...baseCourse,
      imageUrl: "/images/test.jpg",
      memo: "Test memo content",
    };

    render(<CourseInfoPanel course={courseWithBoth} />);

    const images = screen.getAllByRole("img", { name: "Test Course" });
    expect(images.length).toBeGreaterThan(0);
    expect(screen.getByText("Test memo content")).toBeInTheDocument();
  });

  it("preserves whitespace in memo", () => {
    const courseWithMultilineMemo: Course = {
      ...baseCourse,
      memo: "Line 1\nLine 2\nLine 3",
    };

    render(<CourseInfoPanel course={courseWithMultilineMemo} />);

    const memoElement = screen.getByText(/Line 1/);
    expect(memoElement).toHaveClass("whitespace-pre-wrap");
  });
});
