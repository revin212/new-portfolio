# Deploy Guide (Next #1)

Project ini memakai deploy non-Docker: Next.js dijalankan via PM2, diproxy oleh Nginx host.

| Repo | Hostname publik | Loopback target | PM2 name |
|---|---|---|---|
| portfolio-new (repo ini) | `revindennis.cloud` | `127.0.0.1:3000` | `next-revindennis` |

Panduan langkah lengkap ada di `deploy/cara-deploy.md`.

Ringkas command PM2:
- `pm2 start ecosystem.config.cjs --env production`
- `pm2 reload ecosystem.config.cjs --env production`

Koordinasi portfolio (Nginx gabungan multi-site) mengikuti repo pusat tim.
