import { describe, expect, test } from "vitest";
import {
  RaceResultSchema,
  CreateRaceResultSchema,
} from "./race-result-schema";

describe("RaceResultSchema", () => {
  test("validates a valid 12p course race result", () => {
    const result = RaceResultSchema.safeParse({
      id: "abc-123",
      trackType: "course",
      trackId: "Mario_Circuit",
      placement: 1,
      game: "12p",
      raceDate: "2026-04-07",
      createdAt: "2026-04-07T12:00:00.000Z",
      memo: "Good race",
    });
    expect(result.success).toBe(true);
  });

  test("validates a valid 24p route race result", () => {
    const result = RaceResultSchema.safeParse({
      id: "abc-456",
      trackType: "route",
      trackId: "Whistlestop_Summit-to-DK_Spaceport",
      placement: 20,
      game: "24p",
      raceDate: "2026-04-07",
      createdAt: "2026-04-07T12:00:00.000Z",
    });
    expect(result.success).toBe(true);
  });

  test("allows memo to be null", () => {
    const result = RaceResultSchema.safeParse({
      id: "abc-789",
      trackType: "course",
      trackId: "Mario_Circuit",
      placement: 5,
      game: "12p",
      raceDate: "2026-04-07",
      createdAt: "2026-04-07T12:00:00.000Z",
      memo: null,
    });
    expect(result.success).toBe(true);
  });

  test("rejects placement 0", () => {
    const result = RaceResultSchema.safeParse({
      id: "abc-123",
      trackType: "course",
      trackId: "Mario_Circuit",
      placement: 0,
      game: "12p",
      raceDate: "2026-04-07",
      createdAt: "2026-04-07T12:00:00.000Z",
    });
    expect(result.success).toBe(false);
  });

  test("rejects negative placement", () => {
    const result = RaceResultSchema.safeParse({
      id: "abc-123",
      trackType: "course",
      trackId: "Mario_Circuit",
      placement: -1,
      game: "12p",
      raceDate: "2026-04-07",
      createdAt: "2026-04-07T12:00:00.000Z",
    });
    expect(result.success).toBe(false);
  });

  test("rejects placement over 24", () => {
    const result = RaceResultSchema.safeParse({
      id: "abc-123",
      trackType: "course",
      trackId: "Mario_Circuit",
      placement: 25,
      game: "24p",
      raceDate: "2026-04-07",
      createdAt: "2026-04-07T12:00:00.000Z",
    });
    expect(result.success).toBe(false);
  });

  test("rejects invalid trackType", () => {
    const result = RaceResultSchema.safeParse({
      id: "abc-123",
      trackType: "invalid",
      trackId: "Mario_Circuit",
      placement: 1,
      game: "12p",
      raceDate: "2026-04-07",
      createdAt: "2026-04-07T12:00:00.000Z",
    });
    expect(result.success).toBe(false);
  });

  test("rejects invalid game mode", () => {
    const result = RaceResultSchema.safeParse({
      id: "abc-123",
      trackType: "course",
      trackId: "Mario_Circuit",
      placement: 1,
      game: "6p",
      raceDate: "2026-04-07",
      createdAt: "2026-04-07T12:00:00.000Z",
    });
    expect(result.success).toBe(false);
  });

  test("rejects invalid date format", () => {
    const result = RaceResultSchema.safeParse({
      id: "abc-123",
      trackType: "course",
      trackId: "Mario_Circuit",
      placement: 1,
      game: "12p",
      raceDate: "04/07/2026",
      createdAt: "2026-04-07T12:00:00.000Z",
    });
    expect(result.success).toBe(false);
  });
});

describe("CreateRaceResultSchema", () => {
  test("validates without id and createdAt", () => {
    const result = CreateRaceResultSchema.safeParse({
      trackType: "course",
      trackId: "Mario_Circuit",
      placement: 3,
      game: "12p",
      raceDate: "2026-04-07",
      memo: "Close finish",
    });
    expect(result.success).toBe(true);
  });

  test("rejects if id is provided", () => {
    const result = CreateRaceResultSchema.safeParse({
      id: "should-not-be-here",
      trackType: "course",
      trackId: "Mario_Circuit",
      placement: 3,
      game: "12p",
      raceDate: "2026-04-07",
    });
    expect(result.success).toBe(false);
  });
});
