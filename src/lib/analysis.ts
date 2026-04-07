import type { RaceResult } from "./race-result-schema";

export interface TrackStats {
  trackId: string;
  trackName: string;
  totalRaces: number;
  averagePlacement: number;
  bestPlacement: number;
  worstPlacement: number;
  winCount: number;
  winRate: number;
  podiumCount: number;
  podiumRate: number;
  recentTrend: "improving" | "declining" | "stable";
}

export function calculateTrackStats(
  trackId: string,
  trackName: string,
  results: readonly RaceResult[]
): TrackStats {
  if (results.length === 0) {
    return {
      trackId,
      trackName,
      totalRaces: 0,
      averagePlacement: 0,
      bestPlacement: 0,
      worstPlacement: 0,
      winCount: 0,
      winRate: 0,
      podiumCount: 0,
      podiumRate: 0,
      recentTrend: "stable",
    };
  }

  const placements = results.map((r) => r.placement);
  const total = results.length;
  const sum = placements.reduce((acc, p) => acc + p, 0);
  const winCount = placements.filter((p) => p === 1).length;
  const podiumCount = placements.filter((p) => p <= 3).length;

  return {
    trackId,
    trackName,
    totalRaces: total,
    averagePlacement: Math.round((sum / total) * 10) / 10,
    bestPlacement: Math.min(...placements),
    worstPlacement: Math.max(...placements),
    winCount,
    winRate: Math.round((winCount / total) * 100) / 100,
    podiumCount,
    podiumRate: Math.round((podiumCount / total) * 100) / 100,
    recentTrend: determineTrend([...results]),
  };
}

export function determineTrend(
  results: readonly RaceResult[]
): "improving" | "declining" | "stable" {
  if (results.length < 4) {
    return "stable";
  }

  const sorted = [...results].sort(
    (a, b) => a.raceDate.localeCompare(b.raceDate) || a.createdAt.localeCompare(b.createdAt)
  );

  const mid = Math.floor(sorted.length / 2);
  const firstHalf = sorted.slice(0, mid);
  const secondHalf = sorted.slice(mid);

  const firstAvg =
    firstHalf.reduce((sum, r) => sum + r.placement, 0) / firstHalf.length;
  const secondAvg =
    secondHalf.reduce((sum, r) => sum + r.placement, 0) / secondHalf.length;

  const diff = firstAvg - secondAvg;

  if (diff >= 1) return "improving";
  if (diff <= -1) return "declining";
  return "stable";
}

export function calculateAllTrackStats(
  tracks: readonly { id: string; name: string }[],
  results: readonly RaceResult[]
): TrackStats[] {
  return tracks.map((track) => {
    const trackResults = results.filter((r) => r.trackId === track.id);
    return calculateTrackStats(track.id, track.name, trackResults);
  });
}

export function getStrongestTracks(
  stats: readonly TrackStats[],
  limit: number
): TrackStats[] {
  return [...stats]
    .filter((s) => s.totalRaces > 0)
    .sort((a, b) => a.averagePlacement - b.averagePlacement)
    .slice(0, limit);
}

export function getWeakestTracks(
  stats: readonly TrackStats[],
  limit: number
): TrackStats[] {
  return [...stats]
    .filter((s) => s.totalRaces > 0)
    .sort((a, b) => b.averagePlacement - a.averagePlacement)
    .slice(0, limit);
}
