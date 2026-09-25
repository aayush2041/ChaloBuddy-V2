# ChaloBuddy V12

Production-oriented full-stack travel prototype built with Next.js, TypeScript, Prisma and PostgreSQL.

## Install

```bash
npm install
cp .env.example .env
```

Set `DATABASE_URL` and a long random `SESSION_SECRET` in `.env`.

## Prisma

```bash
npx prisma format
npx prisma validate
npx prisma generate
npx prisma db push
npm run db:seed
```

## Run

```bash
npm run dev
```

Open `http://localhost:3000`.

Demo account: `demo@chalobuddy.app` / `Demo@12345`

## Quality checks

```bash
npm run lint
npm run build
```

## External APIs

- `/api/locations` uses OpenStreetMap Nominatim with a demo-location fallback.
- `/api/weather` uses Open-Meteo with graceful unavailability handling.
- No private API keys are required for these integrations.

## Deployment

Configure `DATABASE_URL`, `SESSION_SECRET`, and `NEXT_PUBLIC_APP_URL` in Vercel. Use a hosted PostgreSQL database and run Prisma generation as part of the build/deploy workflow.
