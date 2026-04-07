import type { Metadata } from "next";
import Link from "next/link";
import { UserMenu } from "@/components/UserMenu";
import { AuthGuard } from "@/components/AuthGuard";
import "./globals.css";

export const metadata: Metadata = {
  title: "MKW Race Tracker - マリオカートワールド レース記録",
  description: "マリオカートワールドのレース結果を記録・分析",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gray-50">
        <header className="bg-blue-700 text-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold hover:opacity-90">
                MKW Race Tracker
              </Link>
              <UserMenu />
            </div>
            <nav className="mt-2 flex gap-4 text-sm">
              <Link href="/" className="text-blue-100 hover:text-white transition-colors">
                ダッシュボード
              </Link>
              <Link href="/races/new" className="text-blue-100 hover:text-white transition-colors">
                レース登録
              </Link>
              <Link href="/races" className="text-blue-100 hover:text-white transition-colors">
                レース履歴
              </Link>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-8">
          <AuthGuard>{children}</AuthGuard>
        </main>
        <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
          <div className="max-w-6xl mx-auto px-4 text-center text-sm">
            <p>MKW Race Tracker</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
