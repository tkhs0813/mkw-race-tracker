import Link from "next/link";
import type { TrackStats } from "@/lib/analysis";

interface Props {
  stats: TrackStats;
  trackType: "course" | "route";
}

function getTrendIndicator(trend: TrackStats["recentTrend"]): string {
  switch (trend) {
    case "improving":
      return "↑";
    case "declining":
      return "↓";
    case "stable":
      return "→";
  }
}

function getTrendColor(trend: TrackStats["recentTrend"]): string {
  switch (trend) {
    case "improving":
      return "text-green-600";
    case "declining":
      return "text-red-600";
    case "stable":
      return "text-gray-500";
  }
}

export function TrackStatsCard({ stats, trackType }: Props) {
  const href = trackType === "course"
    ? `/courses/${stats.trackId}`
    : `/routes/${stats.trackId}`;

  return (
    <Link
      href={href}
      className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
    >
      <h3 className="font-semibold text-gray-800 truncate">{stats.trackName}</h3>
      {stats.totalRaces > 0 ? (
        <div className="mt-2 flex items-center gap-3 text-sm">
          <span className="text-gray-600">
            平均 <span className="font-bold text-gray-900">{stats.averagePlacement}</span>位
          </span>
          <span className="text-gray-600">
            {stats.totalRaces}戦
          </span>
          <span className={`font-bold ${getTrendColor(stats.recentTrend)}`}>
            {getTrendIndicator(stats.recentTrend)}
          </span>
        </div>
      ) : (
        <p className="mt-2 text-sm text-gray-400">未プレイ</p>
      )}
    </Link>
  );
}
