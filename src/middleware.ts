import { NextRequest, NextResponse } from "next/server";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMITS: Record<string, { windowMs: number; max: number }> = {
  "/api/auth": { windowMs: 60_000, max: 10 },
  "/api/races": { windowMs: 60_000, max: 30 },
};

function getRateLimit(pathname: string) {
  for (const [prefix, config] of Object.entries(RATE_LIMITS)) {
    if (pathname.startsWith(prefix)) {
      return config;
    }
  }
  return null;
}

function checkRateLimit(key: string, windowMs: number, max: number): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= max) {
    return false;
  }

  rateLimitMap.set(key, { count: entry.count + 1, resetAt: entry.resetAt });
  return true;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const limit = getRateLimit(pathname);
  if (limit) {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const prefix = Object.keys(RATE_LIMITS).find((p) => pathname.startsWith(p)) ?? pathname;
    const key = `${ip}:${prefix}`;

    if (!checkRateLimit(key, limit.windowMs, limit.max)) {
      return NextResponse.json(
        { success: false, error: "Too many requests" },
        { status: 429 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
