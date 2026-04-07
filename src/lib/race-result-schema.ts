import { z } from "zod";

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const RaceResultSchema = z.object({
  id: z.string(),
  trackType: z.enum(["course", "route"]),
  trackId: z.string().min(1).max(100),
  placement: z.number().int().min(1).max(24),
  game: z.enum(["12p", "24p"]),
  raceDate: z.string().regex(dateRegex),
  createdAt: z.string(),
  memo: z.string().max(500).nullable().optional(),
});

export const CreateRaceResultSchema = RaceResultSchema.omit({
  id: true,
  createdAt: true,
}).strict();

export type RaceResult = z.infer<typeof RaceResultSchema>;
export type CreateRaceResult = z.infer<typeof CreateRaceResultSchema>;
