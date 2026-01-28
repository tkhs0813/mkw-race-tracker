import { z } from "zod";

export const CourseSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.string().optional(),
});

export const RouteSchema = z.object({
  id: z.string(),
  fromCourseId: z.string(),
  toCourseId: z.string(),
});

export const ItemRequirementSchema = z.object({
  item: z.enum(["mushroom", "star", "bullet", "none"]),
  count: z.number().int().min(0),
});

export const ShortcutSchema = z.object({
  id: z.string(),
  courseId: z.string().optional(),
  routeId: z.string().optional(),
  youtubeUrl: z.string().url(),
  requiredItems: z.array(ItemRequirementSchema),
});

export const CoursesSchema = z.array(CourseSchema);
export const RoutesSchema = z.array(RouteSchema);
export const ShortcutsSchema = z.array(ShortcutSchema);

export type Course = z.infer<typeof CourseSchema>;
export type Route = z.infer<typeof RouteSchema>;
export type ItemRequirement = z.infer<typeof ItemRequirementSchema>;
export type Shortcut = z.infer<typeof ShortcutSchema>;
export type ItemType = ItemRequirement["item"];
