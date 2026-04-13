"use client";

import { useEffect, useState } from "react";
import { TrackStatsCard } from "@/components";
import { courses, routes } from "@/data";
import { calculateAllTrackStats, getStrongestTracks, getWeakestTracks } from "@/lib/analysis";
import type { RaceResult } from "@/lib/race-result-schema";
import { getAllTracks } from "@/lib/track";

export default function Home() {
  const [results, setResults] = useState<RaceResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/races")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setResults(data.data);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const allTracks = getAllTracks(courses, routes);
  const allStats = calculateAllTrackStats(allTracks, results);

  const totalRaces = results.length;
  const overallAvg = totalRaces > 0
    ? Math.round((results.reduce((sum, r) => sum + r.placement, 0) / totalRaces) * 10) / 10
    : 0;
  const strongest = getStrongestTracks(allStats, 3);
  const weakest = getWeakestTracks(allStats, 3);

  if (isLoading) {
    return <p className="text-gray-500">読み込み中...</p>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">ダッシュボード</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4 shadow border border-gray-200 text-center">
          <p className="text-sm text-gray-500">総レース数</p>
          <p className="text-3xl font-bold">{totalRaces}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow border border-gray-200 text-center">
          <p className="text-sm text-gray-500">平均順位</p>
          <p className="text-3xl font-bold">{overallAvg > 0 ? `${overallAvg}位` : "-"}</p>
        </div>
      </div>

      {strongest.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-3">得意トラック Top3</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {strongest.map((s) => {
              const track = allTracks.find((t) => t.id === s.trackId);
              return (
                <TrackStatsCard
                  key={s.trackId}
                  stats={s}
                  trackType={track?.type ?? "course"}
                />
              );
            })}
          </div>
        </section>
      )}

      {weakest.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-3">苦手トラック Top3</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {weakest.map((s) => {
              const track = allTracks.find((t) => t.id === s.trackId);
              return (
                <TrackStatsCard
                  key={s.trackId}
                  stats={s}
                  trackType={track?.type ?? "course"}
                />
              );
            })}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xl font-bold mb-3">コース一覧</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {allStats
            .filter((s) => allTracks.find((t) => t.id === s.trackId)?.type === "course")
            .map((s) => (
              <TrackStatsCard key={s.trackId} stats={s} trackType="course" />
            ))}
        </div>
      </section>
    </div>
  );
}
