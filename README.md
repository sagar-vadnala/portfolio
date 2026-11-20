# Sagar Vadnala — Portfolio

Personal engineering portfolio built with Next.js (App Router), TypeScript, Tailwind CSS,
Framer Motion, and an optional Prisma/PostgreSQL (Supabase) backend that powers an admin
dashboard, contact-form leads, and privacy-conscious first-party analytics.

## Getting started

```bash
npm install     # also runs `prisma generate` (postinstall)
npm run dev
```

Open http://localhost:3000. That's it — no database required.

## Two ways to run it

**Static mode (default).** With no `DATABASE_URL`, every page reads the content in
`content/*.ts`. Edit those files to change the site:

| File | What it controls |
| --- | --- |
| `content/profile.ts` | Name, headline, summary, hero focus chips (`proofLine`), email |
| `content/links.ts` | GitHub / LinkedIn / email links |
| `content/experience.ts` | Experience entries (short summary + full details) |
| `content/projects.ts` | Case studies, including the "How it works" steps |
| `content/achievements.ts` | The "By the numbers" strip under the hero |
| `content/skills.ts` | The Stack section |
| `content/education.ts` | Education and certifications |
| `content/snapshot.ts` | The hero's "Recruiter view" card |
| `public/resume.pdf` | The resume served by every resume button |

The contact form needs a database to store messages, so in static mode the contact
section switches to email-first (mailto + copy-to-clipboard). Analytics is a no-op.

**Database mode.** Set `DATABASE_URL` and the database becomes the source of truth,
managed entirely from `/admin` — no code changes needed:

```bash
cp .env.example .env    # fill in DATABASE_URL, DIRECT_URL, ADMIN_PASSWORD, ADMIN_SESSION_SECRET
npx prisma migrate deploy
npx tsx prisma/seed.ts  # copies content/*.ts into the database (skips if already seeded)
npm run dev
```

## Deploy to GitHub Pages (static mode)

`.github/workflows/deploy-pages.yml` builds the static-mode site as a static export
(`NEXT_PUBLIC_STATIC_EXPORT=true`) and publishes it on every push to `main`. The admin
dashboard, API routes, and `proxy.ts` need a server, so the workflow drops them from its
CI checkout only. They stay in the repo for a server deploy (e.g. Vercel) later.

1. One-time: repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
   (Pages on a private repo needs a paid GitHub plan; on a free plan the repo must be public.)
2. Push to `main`. The site goes live at `https://<user>.github.io/<repo>/`. The workflow sets
   the base path and site URL automatically, including for a custom domain.

To update the site, edit `content/*.ts` or `public/resume.pdf` and push.

## Before you deploy (database mode)

1. **Set environment variables** (see `.env.example`):
   - `ADMIN_PASSWORD` — password for `/admin`.
   - `ADMIN_SESSION_SECRET` — random 32-byte base64 string signing the admin session cookie.
   - `DATABASE_URL` — PostgreSQL connection string used at runtime (e.g. Supabase's
     transaction pooler, for serverless/Vercel-friendly connection reuse).
   - `DIRECT_URL` — direct (non-pooled) PostgreSQL connection used by the Prisma CLI
     for migrations — required whenever `DATABASE_URL` points at a connection pooler.
   - `NEXT_PUBLIC_SITE_URL` — your production URL, used in metadata/OG/sitemap.
   - `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` — server-side uploads to Supabase Storage.
2. **Uploaded media & resumes**:
   - File uploads (resumes, certificates, photos, article covers) are stored in Supabase Storage in the `portfolio-files` bucket.
   - In local development without Supabase environment variables configured, uploads fall back to local disk (`public/uploads/`).

## Content management (database mode)

Every content type follows **Draft → Published → Archived**: new/edited content starts as a
draft and is invisible to visitors until you click **Publish**. Use **Preview site** in the
admin sidebar to see draft content rendered with the real public design before publishing.

- `lib/content-queries.ts` — public reads (published-only), with the static fallback.
- `components/sections/HomeSections.tsx` — the home page, shared by the site and the admin preview.
- `lib/admin/queries.ts` + `lib/admin/actions/*.ts` — admin reads/writes (Server Actions).
- `lib/media.ts` — file upload validation + storage for certificates, photos, resumes, etc.
- `lib/supabase.ts` — server-side Supabase client and storage helper for `portfolio-files` bucket.
- `prisma/seed.ts` — one-time script that copies `content/*.ts` into the database; safe to
  re-run (it skips if already seeded).

`content/press.ts` is always static: press coverage shown inside a case study when that
project has `pressCoverage` enabled.

## Analytics

Anonymous, first-party analytics events are defined in `lib/analytics-events.ts` and tracked via
`lib/analytics.ts` (client) → `POST /api/analytics/event` → Prisma (`Visitor`, `Session`, `Event`
models). No fingerprinting, no third-party trackers. Contact form submissions are stored in
`ContactLead` only when a visitor voluntarily submits the form.

## Admin dashboard

`/admin` is protected by `proxy.ts` (Next.js 16's middleware) checking a signed session cookie.
Log in at `/admin/login` with `ADMIN_PASSWORD`. Pages: Overview, Analytics, Project Analytics,
Contact Leads — all backed by `lib/analytics-queries.ts`.
