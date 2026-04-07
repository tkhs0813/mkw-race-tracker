interface Props {
  placement: number;
}

function getBadgeStyle(placement: number): string {
  switch (placement) {
    case 1:
      return "bg-yellow-400 text-yellow-900";
    case 2:
      return "bg-gray-300 text-gray-800";
    case 3:
      return "bg-amber-600 text-white";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

export function PlacementBadge({ placement }: Props) {
  return (
    <span
      className={`inline-flex items-center justify-center min-w-[2.5rem] px-2 py-1 rounded-full text-sm font-bold ${getBadgeStyle(placement)}`}
    >
      {placement}位
    </span>
  );
}
