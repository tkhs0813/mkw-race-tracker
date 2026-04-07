## Project Overview

マリオカートワールドのレース結果を記録・分析するアプリ。全コース(30)とRoute(202)でのレース結果を登録し、得意/苦手コースの分析ができる。

### Tech Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Turso (libSQL) + Drizzle ORM
- Better Auth (email/password authentication)
- Zod (validation)
- Vitest (testing)
- Vercel (hosting)

## Critical Rules

### 1. Code Organization

- Many small files over few large files
- High cohesion, low coupling
- 200-400 lines typical, 800 max per file
- Organize by feature/domain, not by type

### 2. Code Style

- No emojis in code, comments, or documentation
- Immutability always - never mutate objects or arrays
- No console.log in production code
- Proper error handling with try/catch
- Input validation with Zod

### 3. Testing

- TDD: Write tests first
- 80% minimum coverage
- Unit tests for utilities
- Integration tests for APIs
- E2E tests for critical flows

### 4. Security

- No hardcoded secrets
- Environment variables for sensitive data
- Validate all user inputs
- CSRF protection enabled

## File Structure

```
src/
|-- app/              # Next.js app router
|   |-- api/auth/     # Better Auth API handler
|   |-- api/races/    # Race CRUD API (GET/POST/DELETE)
|   |-- courses/[id]/ # Course detail (stats + history)
|   |-- login/        # Login / signup page
|   |-- races/        # Race history & registration
|   |-- routes/[id]/  # Route detail (stats + history)
|-- components/       # Reusable UI components
|-- data/             # Static course & route data
|-- db/               # Drizzle schema & Turso connection
|-- lib/              # Auth, analysis, schemas, utilities
|-- types/            # TypeScript definitions
```

## Data Model

```typescript
// race_results table
{
  id: string;          // UUID
  userId: string;      // FK to user table
  trackType: "course" | "route";
  trackId: string;     // courseId or routeId
  placement: number;   // 1-12 (12p) or 1-24 (24p)
  game: "12p" | "24p";
  raceDate: string;    // "YYYY-MM-DD"
  createdAt: string;   // ISO 8601
  memo: string | null;
}
```

## Key Patterns

### API Response Format

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

### Error Handling

```typescript
try {
  const result = await operation();
  return { success: true, data: result };
} catch (error) {
  console.error("Operation failed:", error);
  return { success: false, error: "User-friendly message" };
}
```

## Environment Variables

```bash
# Required
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
```

## Available Commands

- `/tdd` - Test-driven development workflow
- `/plan` - Create implementation plan
- `/code-review` - Review code quality
- `/build-fix` - Fix build errors

## Git Workflow

- Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`
- Never commit to main directly
- PRs require review
- All tests must pass before merge
