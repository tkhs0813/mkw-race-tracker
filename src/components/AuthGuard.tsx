"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const PUBLIC_PATHS = ["/login"];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isPublic = PUBLIC_PATHS.includes(pathname);

  useEffect(() => {
    if (isPending) return;

    if (!session && !isPublic) {
      router.replace("/login");
    }

    if (session && isPublic) {
      router.replace("/");
    }
  }, [session, isPending, isPublic, router]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }

  if (!session && !isPublic) {
    return null;
  }

  return <>{children}</>;
}
