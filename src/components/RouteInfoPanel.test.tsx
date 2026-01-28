import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RouteInfoPanel } from "./RouteInfoPanel";
import type { Route } from "@/types";

describe("RouteInfoPanel", () => {
  const baseRoute: Route = {
    id: "test-route",
    fromCourseId: "course-a",
    toCourseId: "course-b",
  };

  const routeName = "Course A → Course B";

  it("renders placeholder when no image is provided", () => {
    render(<RouteInfoPanel route={baseRoute} routeName={routeName} />);

    expect(screen.getByText("No Image")).toBeInTheDocument();
  });

  it("renders image when imageUrl is provided", () => {
    const routeWithImage: Route = {
      ...baseRoute,
      imageUrl: "/images/route-test.jpg",
    };

    render(<RouteInfoPanel route={routeWithImage} routeName={routeName} />);

    const image = screen.getByRole("img", { name: routeName });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("alt", routeName);
  });

  it("does not render memo section when memo is not provided", () => {
    render(<RouteInfoPanel route={baseRoute} routeName={routeName} />);

    const memoContainer = document.querySelector(".bg-gray-50");
    expect(memoContainer).not.toBeInTheDocument();
  });

  it("renders memo when provided", () => {
    const routeWithMemo: Route = {
      ...baseRoute,
      memo: "This is a route memo",
    };

    render(<RouteInfoPanel route={routeWithMemo} routeName={routeName} />);

    expect(screen.getByText("This is a route memo")).toBeInTheDocument();
  });

  it("renders both image and memo when both are provided", () => {
    const routeWithBoth: Route = {
      ...baseRoute,
      imageUrl: "/images/route-test.jpg",
      memo: "Route memo content",
    };

    render(<RouteInfoPanel route={routeWithBoth} routeName={routeName} />);

    const images = screen.getAllByRole("img", { name: routeName });
    expect(images.length).toBeGreaterThan(0);
    expect(screen.getByText("Route memo content")).toBeInTheDocument();
  });

  it("preserves whitespace in memo", () => {
    const routeWithMultilineMemo: Route = {
      ...baseRoute,
      memo: "Step 1\nStep 2\nStep 3",
    };

    render(<RouteInfoPanel route={routeWithMultilineMemo} routeName={routeName} />);

    const memoElement = screen.getByText(/Step 1/);
    expect(memoElement).toHaveClass("whitespace-pre-wrap");
  });
});
