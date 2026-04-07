"use client";

import { authClient } from "@/lib/auth-client";

export function UserMenu() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return null;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-blue-100">{session.user.name}</span>
      <button
        type="button"
        onClick={async () => {
          await authClient.signOut();
          window.location.href = "/login";
        }}
        className="text-blue-200 hover:text-white transition-colors"
      >
        ログアウト
      </button>
    </div>
  );
}
