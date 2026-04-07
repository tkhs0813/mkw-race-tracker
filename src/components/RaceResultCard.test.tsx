import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RaceResultCard } from "./RaceResultCard";
import type { RaceResult } from "@/lib/race-result-schema";

const mockResult: RaceResult = {
  id: "test-1",
  trackType: "course",
  trackId: "Mario_Circuit",
  placement: 1,
  game: "12p",
  raceDate: "2026-04-07",
  createdAt: "2026-04-07T12:00:00.000Z",
  memo: "Good race",
};

describe("RaceResultCard", () => {
  test("renders placement", () => {
    render(<RaceResultCard result={mockResult} />);
    expect(screen.getByText("1位")).toBeDefined();
  });

  test("renders race date", () => {
    render(<RaceResultCard result={mockResult} />);
    expect(screen.getByText("2026-04-07")).toBeDefined();
  });

  test("renders game mode", () => {
    render(<RaceResultCard result={mockResult} />);
    expect(screen.getByText("12p")).toBeDefined();
  });

  test("renders track name when provided", () => {
    render(<RaceResultCard result={mockResult} trackName="マリオサーキット" />);
    expect(screen.getByText("マリオサーキット")).toBeDefined();
  });

  test("renders memo when present", () => {
    render(<RaceResultCard result={mockResult} />);
    expect(screen.getByText("Good race")).toBeDefined();
  });

  test("does not render memo when absent", () => {
    const noMemo = { ...mockResult, memo: null };
    render(<RaceResultCard result={noMemo} />);
    expect(screen.queryByText("Good race")).toBeNull();
  });

  test("calls onDelete with result id when delete clicked", () => {
    const onDelete = vi.fn();
    render(<RaceResultCard result={mockResult} onDelete={onDelete} />);
    fireEvent.click(screen.getByText("削除"));
    expect(onDelete).toHaveBeenCalledWith("test-1");
  });

  test("does not show delete button when onDelete is not provided", () => {
    render(<RaceResultCard result={mockResult} />);
    expect(screen.queryByText("削除")).toBeNull();
  });
});
