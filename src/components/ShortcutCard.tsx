import type { Shortcut } from "@/types";
import { YouTubeEmbed } from "./YouTubeEmbed";
import { ItemBadge } from "./ItemBadge";

interface Props {
  shortcut: Shortcut;
  index: number;
}

export function ShortcutCard({ shortcut, index }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-lg font-semibold text-gray-700">
          ショートカット {index + 1}
        </span>
        <div className="flex gap-2">
          {shortcut.requiredItems.map((req) => (
            <ItemBadge key={`${req.item}-${req.count}`} requirement={req} />
          ))}
        </div>
      </div>
      <YouTubeEmbed url={shortcut.youtubeUrl} />
    </div>
  );
}
