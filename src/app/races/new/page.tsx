"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { RaceResultForm } from "@/components";
import { courses, routes } from "@/data";
import type { CreateRaceResult } from "@/lib/race-result-schema";

function NewRaceForm() {
  const searchParams = useSearchParams();
  const defaultTrackType = searchParams.get("trackType") as "course" | "route" | null;
  const defaultTrackId = searchParams.get("trackId");

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(data: CreateRaceResult) {
    setMessage(null);
    try {
      const res = await fetch("/api/races", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setMessage({ type: "success", text: "登録しました" });
      } else {
        setMessage({ type: "error", text: json.error ?? "登録に失敗しました" });
      }
    } catch {
      setMessage({ type: "error", text: "通信エラーが発生しました" });
    }
  }

  return (
    <>
      {message && (
        <div
          className={`p-3 rounded-lg text-sm mb-4 ${
            message.type === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <RaceResultForm
        courses={courses}
        routes={routes}
        defaultTrackType={defaultTrackType ?? undefined}
        defaultTrackId={defaultTrackId ?? undefined}
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default function NewRacePage() {
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6">レース結果を登録</h1>
      <Suspense fallback={<p className="text-gray-500">読み込み中...</p>}>
        <NewRaceForm />
      </Suspense>
    </div>
  );
}
