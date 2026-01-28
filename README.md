# MKW Shortcuts

マリオカートワールドのショートカット動画集サイト

## Features

- 全コース(30)のショートカット動画
- 全Route(202)のショートカット動画
- YouTube動画埋め込み
- 必要アイテム表示

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zod (validation)
- Vitest (testing)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

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
├── app/           # Next.js App Router pages
├── components/    # React components
├── data/          # Course, Route, Shortcut data
├── lib/           # Utilities and schemas
└── types/         # TypeScript type definitions
```

## Adding Content

### Add a new course

Edit `src/data/courses.ts`:

```typescript
export const courses = [
  { id: "new-course", name: "New Course Name" },
  // ...
] as const satisfies readonly Course[];
```

### Add a shortcut

Edit `src/data/shortcuts.ts`:

```typescript
export const shortcuts = [
  {
    id: "new-sc-1",
    courseId: "mario-circuit",  // Must match a CourseId
    youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID",
    requiredItems: [{ item: "mushroom", count: 1 }],
  },
  // ...
] as const satisfies readonly TypedShortcut[];
```

## Deployment

Deploy to Vercel:

```bash
npm run build
vercel --prod
```

## License

MIT
