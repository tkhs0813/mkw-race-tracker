import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-gray-600 mb-8">ページが見つかりません</p>
      <Link href="/" className="text-blue-600 hover:underline">
        コース一覧に戻る
      </Link>
    </div>
  );
}
