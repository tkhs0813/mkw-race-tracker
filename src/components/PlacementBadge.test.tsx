import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { PlacementBadge } from "./PlacementBadge";

describe("PlacementBadge", () => {
  test("renders placement text", () => {
    render(<PlacementBadge placement={1} />);
    expect(screen.getByText("1位")).toBeDefined();
  });

  test("applies gold style for 1st place", () => {
    const { container } = render(<PlacementBadge placement={1} />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("bg-yellow-400");
  });

  test("applies silver style for 2nd place", () => {
    const { container } = render(<PlacementBadge placement={2} />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("bg-gray-300");
  });

  test("applies bronze style for 3rd place", () => {
    const { container } = render(<PlacementBadge placement={3} />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("bg-amber-600");
  });

  test("applies default style for 4th and below", () => {
    const { container } = render(<PlacementBadge placement={7} />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("bg-gray-100");
  });
});
