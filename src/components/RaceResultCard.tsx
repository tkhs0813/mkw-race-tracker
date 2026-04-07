import type { RaceResult } from "@/lib/race-result-schema";
import { PlacementBadge } from "./PlacementBadge";
import { GameBadge } from "./GameBadge";

interface Props {
  result: RaceResult;
  trackName?: string;
  onDelete?: (id: string) => void;
}

export function RaceResultCard({ result, trackName, onDelete }: Props) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow border border-gray-200">
      <PlacementBadge placement={result.placement} />
      <div className="flex-1 min-w-0">
        {trackName && (
          <p className="font-semibold text-gray-800 truncate">{trackName}</p>
        )}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>{result.raceDate}</span>
          <GameBadge game={result.game} />
        </div>
        {result.memo && (
          <p className="text-sm text-gray-600 mt-1">{result.memo}</p>
        )}
      </div>
      {onDelete && (
        <button
          type="button"
          onClick={() => onDelete(result.id)}
          className="text-gray-400 hover:text-red-500 transition-colors text-sm"
          aria-label="削除"
        >
          削除
        </button>
      )}
    </div>
  );
}
