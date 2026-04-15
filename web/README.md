# New Portfolio

Vite + React + TypeScript portfolio with TailwindCSS, URL-based profiles, and JSON-driven sections/projects/tech stacks.

## How to run (local development)

### 1) Prerequisites

- Node.js (this repo currently works with Node 16+, but newer is recommended)
- npm

### 2) Install dependencies

```bash
cd web
npm install
```

### 3) Configure environment variables (for the contact API)

Copy the example env file and fill in your values:

```bash
cd web
copy .env.example .env.local
```

Required variables for Gmail SMTP sending:

- `SMTP_USER` (your Gmail / Google Workspace address)
- `SMTP_PASS` (Google App Password)
- `CONTACT_TO_EMAIL` (an email inbox you own that will receive messages)

### 4) Run the API server (email sender)

In terminal 1:

```bash
cd web
npm run dev:api
```

API listens on `http://localhost:8787` by default.

### 5) Run the frontend (Vite)

In terminal 2:

```bash
cd web
npm run dev
```

Open:

- `http://localhost:5173/java-portfolio`
- `http://localhost:5173/dotnet-portfolio`

## Notes

- The contact form posts to `POST /api/contact` and is proxied to `http://localhost:8787` in `vite.config.ts` during development.
- Do **not** put real secrets in git. Use `.env.local` (not committed) and keep `.env.example` updated.
