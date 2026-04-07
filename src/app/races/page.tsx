"use client";

import { useEffect, useState } from "react";
import { RaceResultList } from "@/components";
import { courses, routes } from "@/data";
import type { RaceResult } from "@/lib/race-result-schema";
import { getTrackName } from "@/lib/track";

export default function RacesPage() {
  const [results, setResults] = useState<RaceResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterTrackType, setFilterTrackType] = useState<"all" | "course" | "route">("all");

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

  async function handleDelete(id: string) {
    if (!window.confirm("この記録を削除しますか？")) return;

    try {
      const res = await fetch(`/api/races/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setResults((prev) => prev.filter((r) => r.id !== id));
      }
    } catch {
      // Silently fail - the record will remain in the list
    }
  }

  const filtered = filterTrackType === "all"
    ? results
    : results.filter((r) => r.trackType === filterTrackType);

  if (isLoading) {
    return <p className="text-gray-500">読み込み中...</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">レース履歴</h1>

      <div className="flex gap-2">
        {(["all", "course", "route"] as const).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setFilterTrackType(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterTrackType === type
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {type === "all" ? "すべて" : type === "course" ? "コース" : "ルート"}
          </button>
        ))}
      </div>

      <RaceResultList
        results={filtered}
        getTrackName={(trackType, trackId) =>
          getTrackName(trackType, trackId, courses, routes)
        }
        onDelete={handleDelete}
      />
    </div>
  );
}
