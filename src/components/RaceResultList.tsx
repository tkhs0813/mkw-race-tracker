import type { RaceResult } from "@/lib/race-result-schema";
import { RaceResultCard } from "./RaceResultCard";

interface Props {
  results: readonly RaceResult[];
  getTrackName?: (trackType: string, trackId: string) => string;
  onDelete?: (id: string) => void;
}

export function RaceResultList({ results, getTrackName, onDelete }: Props) {
  if (results.length === 0) {
    return <p className="text-gray-500 text-sm">レース結果がありません</p>;
  }

  const sorted = [...results].sort(
    (a, b) => b.raceDate.localeCompare(a.raceDate) || b.createdAt.localeCompare(a.createdAt)
  );

  return (
    <div className="space-y-3">
      {sorted.map((result) => (
        <RaceResultCard
          key={result.id}
          result={result}
          trackName={getTrackName?.(result.trackType, result.trackId)}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
