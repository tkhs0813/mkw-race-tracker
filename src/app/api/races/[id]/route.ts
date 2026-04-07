import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { raceResults } from "@/db/schema";
import { getSession } from "@/lib/auth-helper";

interface Props {
  params: Promise<{ id: string }>;
}

export async function DELETE(_request: NextRequest, { params }: Props) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const existing = await db
      .select()
      .from(raceResults)
      .where(
        and(
          eq(raceResults.id, id),
          eq(raceResults.userId, session.user.id)
        )
      );

    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: "Race result not found" },
        { status: 404 }
      );
    }

    await db
      .delete(raceResults)
      .where(
        and(
          eq(raceResults.id, id),
          eq(raceResults.userId, session.user.id)
        )
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete race result" },
      { status: 500 }
    );
  }
}
