import { NextResponse } from "next/server";
import { courses, routes } from "@/data";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    data: {
      courses: courses.length,
      routes: routes.length,
    },
  });
}
