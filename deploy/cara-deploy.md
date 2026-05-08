# Cara Deploy Next.js (Portfolio Slot #1)

Dokumen ini khusus untuk repo ini (`revindennis.cloud`) dengan skema:
- Next.js jalan sebagai Node process di host (PM2), bukan Docker.
- Nginx host sebagai reverse proxy + TLS termination.
- Slot tetap: `revindennis.cloud` -> `127.0.0.1:3000` (`next-revindennis`).

## 1) Prasyarat server Ubuntu

Install Node.js LTS dan tool dasar:

```bash
sudo apt update
sudo apt install -y curl git nginx ufw
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

Verifikasi:

```bash
node -v
npm -v
pm2 -v
```

## 2) Firewall minimum

Buka hanya port yang dibutuhkan:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status
```

## 3) Ambil source code

Contoh lokasi kerja:

```bash
sudo mkdir -p /var/www
sudo chown -R $USER:$USER /var/www
cd /var/www
git clone <URL_REPO_INI> portfolio-new
cd /var/www/portfolio-new
```

Jika sudah ada repo:

```bash
cd /var/www/portfolio-new
git pull origin main
```

## 4) Set environment production

File contoh env ada di:
- `deploy/.env.production.example`

Buat env real untuk app Next:

```bash
cd /var/www/portfolio-new/next
cp ../deploy/.env.production.example .env.production
nano .env.production
```

Isi kredensial sebenarnya di server (jangan commit). Minimal:
- `NODE_ENV=production`
- `PORT=3000`
- `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL` (dipakai route `/api/contact`).

## 5) Install dependency dan build

```bash
cd /var/www/portfolio-new/next
npm ci
npm run build
```

## 6) Jalankan dengan PM2 (wajib via ecosystem file)

`ecosystem.config.cjs` berada di root repo.

Start pertama kali:

```bash
cd /var/www/portfolio-new
pm2 start ecosystem.config.cjs --env production
pm2 save
pm2 startup
```

Deploy update berikutnya:

```bash
cd /var/www/portfolio-new/next
npm ci
npm run build
cd /var/www/portfolio-new
pm2 reload ecosystem.config.cjs --env production
pm2 save
```

Cek status:

```bash
pm2 ls
pm2 logs next-revindennis --lines 100
```

## 7) Nginx reverse proxy

Gunakan snippet:
- `deploy/nginx.snippet.conf.example`

Atau copy blok `server` terkait dari repo koordinasi portfolio (file gabungan Nginx).

Contoh aktivasi:

```bash
sudo cp /var/www/portfolio-new/deploy/nginx.snippet.conf.example /etc/nginx/sites-available/revindennis.cloud
sudo ln -s /etc/nginx/sites-available/revindennis.cloud /etc/nginx/sites-enabled/revindennis.cloud
sudo nginx -t
sudo systemctl reload nginx
```

## 8) Aktifkan HTTPS (Certbot)

Setelah DNS `A/AAAA` mengarah ke VPS:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d revindennis.cloud -d www.revindennis.cloud
```

Pastikan URL publik memakai HTTPS.

## 9) Tabel sinkronisasi DNS/port

Untuk menghindari bentrok multi-Next di VPS:

| App | Domain | Port internal |
|---|---|---|
| Next #1 (repo ini) | `revindennis.cloud` | `3000` |
| Next #2 (repo lain) | `undangan.revindennis.cloud` | `3001` |

Jangan assign `3000` ke kedua app.

## 10) Catatan koordinasi API portfolio

Jika frontend ini nanti call API dari browser, gunakan `NEXT_PUBLIC_*` dengan URL HTTPS:
- `https://pos-api.revindennis.cloud`
- `https://futsal-api.revindennis.cloud`
- `https://sim-api.revindennis.cloud`

Jika call hanya server-side, pakai env server biasa (tanpa `NEXT_PUBLIC_`).
