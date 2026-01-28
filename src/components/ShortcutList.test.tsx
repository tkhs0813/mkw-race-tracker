import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ShortcutList } from "./ShortcutList";
import type { Shortcut } from "@/types";

vi.mock("./ShortcutCard", () => ({
  ShortcutCard: ({ shortcut, index }: { shortcut: Shortcut; index: number }) => (
    <div data-testid={`shortcut-card-${index}`}>
      Shortcut {index + 1}: {shortcut.id}
    </div>
  ),
}));

describe("ShortcutList", () => {
  const mockShortcuts: Shortcut[] = [
    {
      id: "shortcut-1",
      courseId: "course-1",
      youtubeUrl: "https://www.youtube.com/watch?v=abc123",
      requiredItems: [{ item: "mushroom", count: 1 }],
    },
    {
      id: "shortcut-2",
      courseId: "course-1",
      youtubeUrl: "https://www.youtube.com/watch?v=def456",
      requiredItems: [{ item: "none", count: 0 }],
    },
  ];

  it("renders empty message when no shortcuts provided", () => {
    render(<ShortcutList shortcuts={[]} />);

    expect(screen.getByText("ショートカットはまだありません")).toBeInTheDocument();
  });

  it("renders custom empty message when provided", () => {
    render(
      <ShortcutList shortcuts={[]} emptyMessage="No shortcuts available" />
    );

    expect(screen.getByText("No shortcuts available")).toBeInTheDocument();
  });

  it("renders all shortcut cards when shortcuts are provided", () => {
    render(<ShortcutList shortcuts={mockShortcuts} />);

    expect(screen.getByTestId("shortcut-card-0")).toBeInTheDocument();
    expect(screen.getByTestId("shortcut-card-1")).toBeInTheDocument();
    expect(screen.getByText(/Shortcut 1: shortcut-1/)).toBeInTheDocument();
    expect(screen.getByText(/Shortcut 2: shortcut-2/)).toBeInTheDocument();
  });

  it("passes correct index to each ShortcutCard", () => {
    render(<ShortcutList shortcuts={mockShortcuts} />);

    expect(screen.getAllByText(/Shortcut 1:/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Shortcut 2:/).length).toBeGreaterThan(0);
  });

  it("renders with correct spacing class", () => {
    const { container } = render(<ShortcutList shortcuts={mockShortcuts} />);

    const listContainer = container.firstChild as HTMLElement;
    expect(listContainer).toHaveClass("space-y-6");
  });

  it("does not render container when shortcuts array is empty", () => {
    const { container } = render(<ShortcutList shortcuts={[]} />);

    expect(container.querySelector(".space-y-6")).not.toBeInTheDocument();
  });
});
