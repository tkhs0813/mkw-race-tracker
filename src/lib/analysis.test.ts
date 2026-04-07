import { describe, expect, test } from "vitest";
import {
  calculateTrackStats,
  calculateAllTrackStats,
  getStrongestTracks,
  getWeakestTracks,
  determineTrend,
} from "./analysis";
import type { RaceResult } from "./race-result-schema";

function makeResult(
  overrides: Partial<RaceResult> & { placement: number }
): RaceResult {
  return {
    id: crypto.randomUUID(),
    trackType: "course",
    trackId: "Mario_Circuit",
    game: "12p",
    raceDate: "2026-04-07",
    createdAt: "2026-04-07T12:00:00.000Z",
    memo: null,
    ...overrides,
  };
}

describe("calculateTrackStats", () => {
  test("returns default stats for empty results", () => {
    const stats = calculateTrackStats("Mario_Circuit", "マリオサーキット", []);
    expect(stats.totalRaces).toBe(0);
    expect(stats.averagePlacement).toBe(0);
    expect(stats.bestPlacement).toBe(0);
    expect(stats.worstPlacement).toBe(0);
    expect(stats.winCount).toBe(0);
    expect(stats.winRate).toBe(0);
    expect(stats.podiumCount).toBe(0);
    expect(stats.podiumRate).toBe(0);
  });

  test("calculates stats for single race", () => {
    const results = [makeResult({ placement: 1 })];
    const stats = calculateTrackStats("Mario_Circuit", "マリオサーキット", results);
    expect(stats.totalRaces).toBe(1);
    expect(stats.averagePlacement).toBe(1);
    expect(stats.bestPlacement).toBe(1);
    expect(stats.worstPlacement).toBe(1);
    expect(stats.winCount).toBe(1);
    expect(stats.winRate).toBe(1);
    expect(stats.podiumCount).toBe(1);
    expect(stats.podiumRate).toBe(1);
  });

  test("calculates average placement correctly", () => {
    const results = [
      makeResult({ placement: 1 }),
      makeResult({ placement: 3 }),
      makeResult({ placement: 5 }),
    ];
    const stats = calculateTrackStats("Mario_Circuit", "マリオサーキット", results);
    expect(stats.averagePlacement).toBe(3);
    expect(stats.bestPlacement).toBe(1);
    expect(stats.worstPlacement).toBe(5);
  });

  test("calculates win rate and podium rate", () => {
    const results = [
      makeResult({ placement: 1 }),
      makeResult({ placement: 2 }),
      makeResult({ placement: 4 }),
      makeResult({ placement: 6 }),
    ];
    const stats = calculateTrackStats("Mario_Circuit", "マリオサーキット", results);
    expect(stats.winCount).toBe(1);
    expect(stats.winRate).toBe(0.25);
    expect(stats.podiumCount).toBe(2);
    expect(stats.podiumRate).toBe(0.5);
  });

  test("rounds average placement to 1 decimal", () => {
    const results = [
      makeResult({ placement: 1 }),
      makeResult({ placement: 2 }),
      makeResult({ placement: 3 }),
    ];
    const stats = calculateTrackStats("Mario_Circuit", "マリオサーキット", results);
    expect(stats.averagePlacement).toBe(2);
  });
});

describe("determineTrend", () => {
  test("returns stable for fewer than 4 results", () => {
    const results = [
      makeResult({ placement: 1 }),
      makeResult({ placement: 2 }),
    ];
    expect(determineTrend(results)).toBe("stable");
  });

  test("returns improving when recent placements are lower", () => {
    const results = [
      makeResult({ placement: 10, raceDate: "2026-04-01" }),
      makeResult({ placement: 8, raceDate: "2026-04-02" }),
      makeResult({ placement: 5, raceDate: "2026-04-03" }),
      makeResult({ placement: 2, raceDate: "2026-04-04" }),
    ];
    expect(determineTrend(results)).toBe("improving");
  });

  test("returns declining when recent placements are higher", () => {
    const results = [
      makeResult({ placement: 1, raceDate: "2026-04-01" }),
      makeResult({ placement: 3, raceDate: "2026-04-02" }),
      makeResult({ placement: 7, raceDate: "2026-04-03" }),
      makeResult({ placement: 10, raceDate: "2026-04-04" }),
    ];
    expect(determineTrend(results)).toBe("declining");
  });

  test("returns stable when placements are consistent", () => {
    const results = [
      makeResult({ placement: 5, raceDate: "2026-04-01" }),
      makeResult({ placement: 5, raceDate: "2026-04-02" }),
      makeResult({ placement: 5, raceDate: "2026-04-03" }),
      makeResult({ placement: 5, raceDate: "2026-04-04" }),
    ];
    expect(determineTrend(results)).toBe("stable");
  });
});

describe("calculateAllTrackStats", () => {
  test("returns empty array for no tracks", () => {
    const stats = calculateAllTrackStats([], []);
    expect(stats).toEqual([]);
  });

  test("returns stats for each track", () => {
    const tracks = [
      { id: "Mario_Circuit", name: "マリオサーキット" },
      { id: "Rainbow_Road", name: "レインボーロード" },
    ];
    const results = [
      makeResult({ trackId: "Mario_Circuit", placement: 1 }),
      makeResult({ trackId: "Rainbow_Road", placement: 5 }),
    ];
    const stats = calculateAllTrackStats(tracks, results);
    expect(stats).toHaveLength(2);
    expect(stats[0].trackId).toBe("Mario_Circuit");
    expect(stats[1].trackId).toBe("Rainbow_Road");
  });
});

describe("getStrongestTracks / getWeakestTracks", () => {
  test("returns top N strongest tracks by average placement", () => {
    const stats = [
      { trackId: "a", trackName: "A", totalRaces: 5, averagePlacement: 2, bestPlacement: 1, worstPlacement: 3, winCount: 2, winRate: 0.4, podiumCount: 5, podiumRate: 1, recentTrend: "stable" as const },
      { trackId: "b", trackName: "B", totalRaces: 5, averagePlacement: 8, bestPlacement: 5, worstPlacement: 12, winCount: 0, winRate: 0, podiumCount: 0, podiumRate: 0, recentTrend: "stable" as const },
      { trackId: "c", trackName: "C", totalRaces: 5, averagePlacement: 5, bestPlacement: 3, worstPlacement: 7, winCount: 0, winRate: 0, podiumCount: 2, podiumRate: 0.4, recentTrend: "stable" as const },
    ];
    const strongest = getStrongestTracks(stats, 2);
    expect(strongest).toHaveLength(2);
    expect(strongest[0].trackId).toBe("a");
    expect(strongest[1].trackId).toBe("c");
  });

  test("returns top N weakest tracks by average placement", () => {
    const stats = [
      { trackId: "a", trackName: "A", totalRaces: 5, averagePlacement: 2, bestPlacement: 1, worstPlacement: 3, winCount: 2, winRate: 0.4, podiumCount: 5, podiumRate: 1, recentTrend: "stable" as const },
      { trackId: "b", trackName: "B", totalRaces: 5, averagePlacement: 8, bestPlacement: 5, worstPlacement: 12, winCount: 0, winRate: 0, podiumCount: 0, podiumRate: 0, recentTrend: "stable" as const },
      { trackId: "c", trackName: "C", totalRaces: 5, averagePlacement: 5, bestPlacement: 3, worstPlacement: 7, winCount: 0, winRate: 0, podiumCount: 2, podiumRate: 0.4, recentTrend: "stable" as const },
    ];
    const weakest = getWeakestTracks(stats, 2);
    expect(weakest).toHaveLength(2);
    expect(weakest[0].trackId).toBe("b");
    expect(weakest[1].trackId).toBe("c");
  });

  test("excludes tracks with 0 races", () => {
    const stats = [
      { trackId: "a", trackName: "A", totalRaces: 0, averagePlacement: 0, bestPlacement: 0, worstPlacement: 0, winCount: 0, winRate: 0, podiumCount: 0, podiumRate: 0, recentTrend: "stable" as const },
      { trackId: "b", trackName: "B", totalRaces: 5, averagePlacement: 3, bestPlacement: 1, worstPlacement: 5, winCount: 1, winRate: 0.2, podiumCount: 3, podiumRate: 0.6, recentTrend: "stable" as const },
    ];
    const strongest = getStrongestTracks(stats, 3);
    expect(strongest).toHaveLength(1);
    expect(strongest[0].trackId).toBe("b");
  });
});
