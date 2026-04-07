import { z } from "zod";

export const CourseSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.string().optional(),
  memo: z.string().optional(),
});

export const RouteSchema = z.object({
  id: z.string(),
  fromCourseId: z.string(),
  toCourseId: z.string(),
  imageUrl: z.string().optional(),
  memo: z.string().optional(),
});

export const CoursesSchema = z.array(CourseSchema);
export const RoutesSchema = z.array(RouteSchema);

export type Course = z.infer<typeof CourseSchema>;
export type Route = z.infer<typeof RouteSchema>;
