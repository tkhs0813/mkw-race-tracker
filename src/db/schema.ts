import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { user } from "./auth-schema";

export { user, session, account, verification } from "./auth-schema";

export const raceResults = sqliteTable(
  "race_results",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => user.id),
    trackType: text("track_type", { enum: ["course", "route"] }).notNull(),
    trackId: text("track_id").notNull(),
    placement: integer("placement").notNull(),
    game: text("game", { enum: ["12p", "24p"] }).notNull(),
    raceDate: text("race_date").notNull(),
    createdAt: text("created_at").notNull(),
    memo: text("memo"),
  },
  (table) => [
    index("idx_race_results_user_id").on(table.userId),
    index("idx_race_results_track_id").on(table.trackId),
  ]
);
