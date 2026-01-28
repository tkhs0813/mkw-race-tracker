import type { Shortcut } from "@/types";
import { ShortcutCard } from "./ShortcutCard";

interface Props {
  shortcuts: Shortcut[];
  emptyMessage?: string;
}

export function ShortcutList({
  shortcuts,
  emptyMessage = "ショートカットはまだありません",
}: Props) {
  if (shortcuts.length === 0) {
    return <p className="text-gray-500">{emptyMessage}</p>;
  }

  return (
    <div className="space-y-6">
      {shortcuts.map((shortcut, index) => (
        <ShortcutCard key={shortcut.id} shortcut={shortcut} index={index} />
      ))}
    </div>
  );
}
