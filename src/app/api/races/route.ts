import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { raceResults } from "@/db/schema";
import { CreateRaceResultSchema } from "@/lib/race-result-schema";
import { getSession } from "@/lib/auth-helper";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const trackId = searchParams.get("trackId");
    const trackType = searchParams.get("trackType");

    const userFilter = eq(raceResults.userId, session.user.id);

    let results;
    if (trackId) {
      results = await db
        .select()
        .from(raceResults)
        .where(and(userFilter, eq(raceResults.trackId, trackId)));
    } else if (trackType === "course" || trackType === "route") {
      results = await db
        .select()
        .from(raceResults)
        .where(and(userFilter, eq(raceResults.trackType, trackType)));
    } else {
      results = await db
        .select()
        .from(raceResults)
        .where(userFilter);
    }

    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch race results" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const parsed = CreateRaceResultSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid input" },
        { status: 400 }
      );
    }

    const { game, placement } = parsed.data;
    const maxPlacement = game === "12p" ? 12 : 24;
    if (placement > maxPlacement) {
      return NextResponse.json(
        {
          success: false,
          error: `Placement must be between 1 and ${maxPlacement} for ${game}`,
        },
        { status: 400 }
      );
    }

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const newResult = {
      id,
      userId: session.user.id,
      ...parsed.data,
      memo: parsed.data.memo ?? null,
      createdAt,
    };

    await db.insert(raceResults).values(newResult);

    return NextResponse.json({ success: true, data: newResult }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create race result" },
      { status: 500 }
    );
  }
}
