import type { ItemRequirement } from "@/types";

interface Props {
  requirement: ItemRequirement;
}

const itemLabels: Record<string, string> = {
  mushroom: "キノコ",
  star: "スター",
  bullet: "キラー",
  none: "アイテム不要",
};

export function ItemBadge({ requirement }: Props) {
  if (requirement.item === "none") {
    return (
      <span className="inline-block px-2 py-1 text-sm bg-green-100 text-green-700 rounded">
        アイテム不要
      </span>
    );
  }

  const label = itemLabels[requirement.item] || requirement.item;

  return (
    <span className="inline-block px-2 py-1 text-sm bg-yellow-100 text-yellow-700 rounded">
      {label} ×{requirement.count}
    </span>
  );
}
