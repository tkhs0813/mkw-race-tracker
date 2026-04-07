"use client";

import type { TrackStats } from "@/lib/analysis";

interface Props {
  stats: TrackStats;
}

function getTrendLabel(trend: TrackStats["recentTrend"]): string {
  switch (trend) {
    case "improving":
      return "↑ 上昇中";
    case "declining":
      return "↓ 下降中";
    case "stable":
      return "→ 安定";
  }
}

function getTrendColor(trend: TrackStats["recentTrend"]): string {
  switch (trend) {
    case "improving":
      return "text-green-600";
    case "declining":
      return "text-red-600";
    case "stable":
      return "text-gray-600";
  }
}

export function CourseAnalysis({ stats }: Props) {
  if (stats.totalRaces === 0) {
    return <p className="text-gray-500">まだレース記録がありません</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg p-4 shadow border border-gray-200">
        <p className="text-sm text-gray-500">レース数</p>
        <p className="text-2xl font-bold">{stats.totalRaces}</p>
      </div>
      <div className="bg-white rounded-lg p-4 shadow border border-gray-200">
        <p className="text-sm text-gray-500">平均順位</p>
        <p className="text-2xl font-bold">{stats.averagePlacement}位</p>
      </div>
      <div className="bg-white rounded-lg p-4 shadow border border-gray-200">
        <p className="text-sm text-gray-500">最高順位</p>
        <p className="text-2xl font-bold">{stats.bestPlacement}位</p>
      </div>
      <div className="bg-white rounded-lg p-4 shadow border border-gray-200">
        <p className="text-sm text-gray-500">勝率</p>
        <p className="text-2xl font-bold">{Math.round(stats.winRate * 100)}%</p>
      </div>
      <div className="bg-white rounded-lg p-4 shadow border border-gray-200">
        <p className="text-sm text-gray-500">表彰台率</p>
        <p className="text-2xl font-bold">{Math.round(stats.podiumRate * 100)}%</p>
      </div>
      <div className="bg-white rounded-lg p-4 shadow border border-gray-200">
        <p className="text-sm text-gray-500">トレンド</p>
        <p className={`text-2xl font-bold ${getTrendColor(stats.recentTrend)}`}>
          {getTrendLabel(stats.recentTrend)}
        </p>
      </div>
    </div>
  );
}
