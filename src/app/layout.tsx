import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "MKW Shortcuts - マリオカートワールド ショートカット集",
  description: "マリオカートワールドの全コース・Routeのショートカット動画集",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gray-50">
        <header className="bg-red-600 text-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <Link href="/" className="text-2xl font-bold hover:opacity-90">
              MKW Shortcuts
            </Link>
            <p className="text-sm text-red-100">マリオカートワールド ショートカット集</p>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
          <div className="max-w-6xl mx-auto px-4 text-center text-sm">
            <p>MKW Shortcuts - マリオカートワールド ショートカット集</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
