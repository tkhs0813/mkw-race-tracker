"use client";

import { useState } from "react";
import type { Course, Route } from "@/types";
import type { CreateRaceResult } from "@/lib/race-result-schema";
import { getCourse } from "@/lib/data";

interface Props {
  courses: readonly Course[];
  routes: readonly Route[];
  defaultTrackType?: "course" | "route";
  defaultTrackId?: string;
  onSubmit: (data: CreateRaceResult) => void;
}

function getRouteName(route: Route, getCourseById: (id: string) => Course | undefined): string {
  const from = getCourseById(route.fromCourseId)?.name ?? route.fromCourseId;
  const to = getCourseById(route.toCourseId)?.name ?? route.toCourseId;
  return `${from} → ${to}`;
}

export function RaceResultForm({
  courses,
  routes,
  defaultTrackType = "course",
  defaultTrackId,
  onSubmit,
}: Props) {
  const [trackType, setTrackType] = useState<"course" | "route">(defaultTrackType);
  const [trackId, setTrackId] = useState(defaultTrackId ?? (courses[0]?.id ?? ""));
  const [placement, setPlacement] = useState(1);
  const [game, setGame] = useState<"12p" | "24p">("12p");
  const [raceDate, setRaceDate] = useState(new Date().toISOString().split("T")[0]);
  const [memo, setMemo] = useState("");
  const [error, setError] = useState<string | null>(null);

  const maxPlacement = game === "12p" ? 12 : 24;

  function handleTrackTypeChange(newType: "course" | "route") {
    setTrackType(newType);
    if (newType === "course") {
      setTrackId(courses[0]?.id ?? "");
    } else {
      setTrackId(routes[0]?.id ?? "");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!trackId) {
      setError("トラックを選択してください");
      return;
    }

    if (placement > maxPlacement) {
      setError(`${game}の順位は1〜${maxPlacement}位です`);
      return;
    }

    onSubmit({
      trackType,
      trackId,
      placement,
      game,
      raceDate,
      memo: memo || undefined,
    });

    setPlacement(1);
    setMemo("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          タイプ
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleTrackTypeChange("course")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              trackType === "course"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            コース
          </button>
          <button
            type="button"
            onClick={() => handleTrackTypeChange("route")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              trackType === "route"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            ルート
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="trackId" className="block text-sm font-medium text-gray-700 mb-1">
          {trackType === "course" ? "コース" : "ルート"}
        </label>
        <select
          id="trackId"
          value={trackId}
          onChange={(e) => setTrackId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {trackType === "course"
            ? courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))
            : routes.map((r) => (
                <option key={r.id} value={r.id}>
                  {getRouteName(r, (id) => courses.find((c) => c.id === id))}
                </option>
              ))}
        </select>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="game" className="block text-sm font-medium text-gray-700 mb-1">
            モード
          </label>
          <select
            id="game"
            value={game}
            onChange={(e) => {
              const newGame = e.target.value as "12p" | "24p";
              setGame(newGame);
              const newMax = newGame === "12p" ? 12 : 24;
              if (placement > newMax) {
                setPlacement(newMax);
              }
            }}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="12p">12p</option>
            <option value="24p">24p</option>
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="placement" className="block text-sm font-medium text-gray-700 mb-1">
            順位
          </label>
          <select
            id="placement"
            value={placement}
            onChange={(e) => setPlacement(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {Array.from({ length: maxPlacement }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}位
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="raceDate" className="block text-sm font-medium text-gray-700 mb-1">
          日付
        </label>
        <input
          type="date"
          id="raceDate"
          value={raceDate}
          onChange={(e) => setRaceDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="memo" className="block text-sm font-medium text-gray-700 mb-1">
          メモ（任意）
        </label>
        <textarea
          id="memo"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          rows={2}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="メモがあれば..."
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        登録
      </button>
    </form>
  );
}
