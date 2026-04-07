# MKW Race Tracker

マリオカートワールドのレース結果を記録・分析するアプリ

## Features

- メール/パスワードによるユーザー認証
- レース結果の登録（コース / ルート、12p / 24p対応）
- レース履歴の閲覧・フィルタ・削除
- コース別・ルート別の分析（平均順位、勝率、表彰台率、トレンド）
- 得意 / 苦手トラックのランキング
- 全30コース + 202ルート対応

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Turso (libSQL) + Drizzle ORM
- Better Auth (authentication)
- Zod (validation)
- Vitest (testing)
- Vercel (hosting)

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Turso credentials and auth secret

# Push database schema
npx drizzle-kit push

# Start development server
npm run dev

# Open http://localhost:3000
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `TURSO_DATABASE_URL` | Turso database URL |
| `TURSO_AUTH_TOKEN` | Turso auth token |
| `BETTER_AUTH_SECRET` | Auth secret (min 32 chars). Generate: `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | App URL (`http://localhost:3000` for dev) |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |
| `npm run lint` | Lint code |

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── api/auth/     # Better Auth API handler
│   ├── api/races/    # Race CRUD API
│   ├── courses/      # Course detail pages
│   ├── login/        # Login / signup page
│   ├── races/        # Race registration & history
│   └── routes/       # Route detail pages
├── components/       # React components
├── data/             # Course & Route static data
├── db/               # Drizzle schema & Turso connection
├── lib/              # Auth, analysis, schemas, utilities
└── types/            # TypeScript type definitions
```

## Deployment

```bash
# Deploy to Vercel
vercel --prod

# Set environment variables on Vercel
vercel env add TURSO_DATABASE_URL
vercel env add TURSO_AUTH_TOKEN
vercel env add BETTER_AUTH_SECRET
vercel env add BETTER_AUTH_URL
```
