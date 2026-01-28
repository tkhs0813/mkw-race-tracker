interface Props {
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
}

export function DetailPageLayout({ leftColumn, rightColumn }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <aside className="lg:col-span-1">{leftColumn}</aside>
      <main className="lg:col-span-2">{rightColumn}</main>
    </div>
  );
}
