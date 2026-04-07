"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CourseAnalysis } from "./CourseAnalysis";
import { RaceResultList } from "./RaceResultList";
import { courses, routes } from "@/data";
import { calculateTrackStats } from "@/lib/analysis";
import type { RaceResult } from "@/lib/race-result-schema";
import { getTrackName } from "@/lib/track";

interface Props {
  trackType: "course" | "route";
  trackId: string;
  trackName: string;
}

export function TrackDetail({ trackType, trackId, trackName }: Props) {
  const [results, setResults] = useState<RaceResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/races?trackId=${encodeURIComponent(trackId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setResults(data.data);
        }
      })
      .finally(() => setIsLoading(false));
  }, [trackId]);

  async function handleDelete(id: string) {
    if (!window.confirm("この記録を削除しますか？")) return;

    try {
      const res = await fetch(`/api/races/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setResults((prev) => prev.filter((r) => r.id !== id));
      }
    } catch {
      // Silently fail
    }
  }

  const stats = calculateTrackStats(trackId, trackName, results);

  if (isLoading) {
    return <p className="text-gray-500">読み込み中...</p>;
  }

  return (
    <div className="space-y-8">
      <CourseAnalysis stats={stats} />

      <div>
        <Link
          href={`/races/new?trackType=${trackType}&trackId=${encodeURIComponent(trackId)}`}
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          このトラックでレース結果を登録
        </Link>
      </div>

      <section>
        <h2 className="text-xl font-bold mb-4">レース履歴</h2>
        <RaceResultList
          results={results}
          getTrackName={(type, id) => getTrackName(type, id, courses, routes)}
          onDelete={handleDelete}
        />
      </section>
    </div>
  );
}
