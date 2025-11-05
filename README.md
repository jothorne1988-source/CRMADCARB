# SolarCRM — Solar Sales CRM Starter

A practical, batteries‑included starter for a solar sales CRM with AI hooks, Google Maps design canvas, and WhatsApp integration.

## Quick start (GitHub Codespaces)
1. Create a new repo and upload this project.
2. Click **Code → Create codespace on main**.
3. When it boots, run:
   ```bash
   pnpm i
   pnpm prisma:setup
   pnpm dev
   ```
4. Open the forwarded port for `localhost:3000`.
5. Sign in with **Email** (magic link). The first user becomes **Admin**.

## Quick start (Docker)
```bash
cp .env.example .env
docker compose up --build
```
Now visit http://localhost:3000

## Environment variables
Copy `.env.example` to `.env` and fill in as needed.

- DATABASE_URL: set by Docker or your own Postgres
- NEXTAUTH_SECRET: `openssl rand -base64 32`
- NEXTAUTH_URL: e.g. `http://localhost:3000`
- EMAIL_SERVER_HOST/PORT/USER/PASSWORD (optional for magic links in production)
- OPENAI_API_KEY (optional to enable real AI scoring/text)
- GOOGLE_MAPS_API_KEY (enable map + drawing)
- TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN / TWILIO_WHATSAPP_FROM (for WhatsApp)

## Scripts
- `pnpm dev` — start Next & Tailwind
- `pnpm prisma:setup` — generate client + migrate + seed
- `pnpm db:studio` — open Prisma Studio

## Tech
Next.js 14, TypeScript, Tailwind, shadcn/ui, Prisma, Postgres.

## Notes
- AI endpoints are stubbed; if OPENAI_API_KEY is present, they'll call real models (you can swap providers).
- WhatsApp routes are provided via Twilio template; wire the webhook URL in Twilio Console.
- Maps page supports drawing polygons, estimating area and kWp via configurable panel W & packing factor.
