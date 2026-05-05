import nodemailer from "nodemailer";
import { z } from "zod";
import { NextResponse } from "next/server";

const ContactPayloadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(1).max(4000),
  whatsapp: z.string().trim().max(40).optional().default(""),
  // honeypot: if filled, treat as spam
  website: z.string().trim().max(500).optional().default(""),
});

function getRequiredEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

// Very small in-memory rate limiter (best-effort in serverless)
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimitKey(req: Request) {
  // Vercel sets x-forwarded-for; use first IP
  const xff = req.headers.get("x-forwarded-for") ?? "";
  const ip = xff.split(",")[0]?.trim();
  return ip || "unknown";
}

function checkRateLimit(key: string) {
  const now = Date.now();
  const existing = hits.get(key);
  if (!existing || existing.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true as const };
  }
  if (existing.count >= MAX_PER_WINDOW) return { ok: false as const };
  existing.count += 1;
  return { ok: true as const };
}

export async function POST(req: Request) {
  const key = rateLimitKey(req);
  const rl = checkRateLimit(key);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again later." },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = ContactPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid payload" },
      { status: 400 }
    );
  }

  const { name, email, message, whatsapp, website } = parsed.data;
  if (website) {
    // Honeypot hit; pretend success to avoid giving bots feedback.
    return NextResponse.json({ ok: true });
  }

  try {
    const smtpHost = process.env.SMTP_HOST ?? "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT ?? "587");
    const smtpUser = getRequiredEnv("SMTP_USER");
    const smtpPass = getRequiredEnv("SMTP_PASS");
    const contactToEmail = getRequiredEnv("CONTACT_TO_EMAIL");
    const contactFromEmail = process.env.CONTACT_FROM_EMAIL ?? smtpUser;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    const subject = `Portfolio contact from ${name}`;
    const lines = [
      `Name: ${name}`,
      `Reply to: ${email}`,
      whatsapp ? `WhatsApp: ${whatsapp}` : null,
      "",
      "Message:",
      message,
    ].filter((line) => line !== null);
    const text = lines.join("\n");

    await transporter.sendMail({
      from: contactFromEmail,
      to: contactToEmail,
      subject,
      text,
      replyTo: email,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}

