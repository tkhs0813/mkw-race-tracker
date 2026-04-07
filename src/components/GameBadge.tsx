interface Props {
  game: "12p" | "24p";
}

export function GameBadge({ game }: Props) {
  const style =
    game === "24p"
      ? "bg-purple-100 text-purple-700"
      : "bg-blue-100 text-blue-700";

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${style}`}>
      {game}
    </span>
  );
}
