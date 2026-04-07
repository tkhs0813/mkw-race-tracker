import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { RaceResultList } from "./RaceResultList";
import type { RaceResult } from "@/lib/race-result-schema";

const mockResults: RaceResult[] = [
  {
    id: "1",
    trackType: "course",
    trackId: "Mario_Circuit",
    placement: 3,
    game: "12p",
    raceDate: "2026-04-05",
    createdAt: "2026-04-05T12:00:00.000Z",
    memo: null,
  },
  {
    id: "2",
    trackType: "route",
    trackId: "Whistlestop_Summit-to-DK_Spaceport",
    placement: 1,
    game: "24p",
    raceDate: "2026-04-07",
    createdAt: "2026-04-07T12:00:00.000Z",
    memo: null,
  },
];

describe("RaceResultList", () => {
  test("shows empty message when no results", () => {
    render(<RaceResultList results={[]} />);
    expect(screen.getByText("レース結果がありません")).toBeDefined();
  });

  test("renders all results", () => {
    render(<RaceResultList results={mockResults} />);
    expect(screen.getByText("3位")).toBeDefined();
    expect(screen.getByText("1位")).toBeDefined();
  });

  test("renders results in reverse date order (newest first)", () => {
    const { container } = render(<RaceResultList results={mockResults} />);
    const cards = container.querySelectorAll("[class*='bg-white']");
    expect(cards.length).toBe(2);
  });

  test("shows track names when getTrackName is provided", () => {
    const getTrackName = (trackType: string, trackId: string) =>
      trackId === "Mario_Circuit" ? "マリオサーキット" : "テストルート";
    render(<RaceResultList results={mockResults} getTrackName={getTrackName} />);
    expect(screen.getByText("マリオサーキット")).toBeDefined();
    expect(screen.getByText("テストルート")).toBeDefined();
  });
});
