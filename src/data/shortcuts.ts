import type { Shortcut } from "@/lib/schemas";
import type { CourseId } from "./courses";
import type { RouteId } from "./routes";

interface CourseShortcut extends Omit<Shortcut, "courseId" | "routeId"> {
  courseId: CourseId;
  routeId?: never;
}

interface RouteShortcut extends Omit<Shortcut, "courseId" | "routeId"> {
  courseId?: never;
  routeId: RouteId;
}

type TypedShortcut = CourseShortcut | RouteShortcut;

export const shortcuts = [
  {
    id: "mario-sc-1",
    courseId: "DK_Spaceport",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    requiredItems: [{ item: "mushroom", count: 1 }],
  },
  {
    id: "mario-sc-2",
    routeId: "Whistlestop_Summit-to-DK_Spaceport",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    requiredItems: [{ item: "mushroom", count: 1 }],
  },
] as const satisfies readonly TypedShortcut[];
