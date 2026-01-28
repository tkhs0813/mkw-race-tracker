import Image from "next/image";
import type { Route } from "@/types";

interface Props {
  route: Route;
  routeName: string;
}

export function RouteInfoPanel({ route, routeName }: Props) {
  return (
    <div className="space-y-4">
      <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative">
        {route.imageUrl ? (
          <Image
            src={route.imageUrl}
            alt={routeName}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>
      {route.memo && (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-gray-700 whitespace-pre-wrap">{route.memo}</p>
        </div>
      )}
    </div>
  );
}
