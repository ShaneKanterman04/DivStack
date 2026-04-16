# DivStack

Milestone 0 foundation for the DivStack build plan.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- Redis
- Vitest

## Local setup

1. Copy `.env.example` to `.env` and adjust values if needed.
2. Install dependencies with `npm install`.
3. Start local services with `docker compose up db redis -d`.
4. Run migrations with `npm run db:migrate`.
5. Seed the owner account with `npm run db:seed`.
6. Start the app with `npm run dev`.

## Docker setup

Run `docker compose up --build`.

## Milestone 0 routes

- `/` public landing page
- `/demo` public demo surface
- `/login` owner login
- `/dashboard` protected owner route
