# New Portfolio (Next.js)

Next.js (App Router) portfolio with TailwindCSS, URL-based profiles, and JSON-driven sections/projects/tech stacks.

## Getting Started

### 1) Install

```bash
npm install
```

### 2) Run locally

```bash
npm run dev
```

Open:

- `http://localhost:3000/java-portfolio`
- `http://localhost:3000/dotnet-portfolio`

Root `/` redirects to the default profile from `src/data/profiles.json`.

## Language / Bahasa (URL query)

Default UI language is **Indonesian (`id`)** when there is no saved preference in `localStorage` and no valid language in the URL.

You can override the language with a query parameter on **any** route:

| Parameter | Value | Result |
|-----------|--------|--------|
| `lang` | `id` | Bahasa Indonesia |
| `lang` | `en` | English |

**Format (query string)**

```http
?lang=<id|en>
```

**Examples (local dev)**

- Indonesian (explicit): `http://localhost:3000/portfolio-freelance?lang=id`
- English: `http://localhost:3000/portfolio-freelance?lang=en`
- Default (no `lang`): same as `?lang=id` for first-time visitors (no `portfolio-locale` in `localStorage` yet)

**Precedence:** `lang` in the URL → then `localStorage` (`portfolio-locale`) → then default `id`.

The in-page **ID / EN** switch still updates `localStorage` and the active locale; opening a link with `?lang=` sets (and stores) that locale for the session.

## Contact form (Gmail SMTP on serverless)

The contact form calls `POST /api/contact` implemented in:

- `src/app/api/contact/route.ts`

SMTP credentials are **server-side only** and must be configured as environment variables (local `.env.local`, and in Vercel):

- `SMTP_USER`
- `SMTP_PASS` (Google App Password)
- `CONTACT_TO_EMAIL`

See `.env.example` for the full list.

## Data files

- `src/data/profiles.json` (profile slug → visible sections/projects/tech)
- `src/data/projects.json`
- `src/data/tech-stacks.json`
- `src/data/sections.json`

## Deploy (Vercel)

Deploy the `next/` folder to Vercel. Set env vars (Production + Preview) in the Vercel dashboard for the contact route.

