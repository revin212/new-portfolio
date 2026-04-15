import cors from "cors";
import "dotenv/config";
import express from "express";
import nodemailer from "nodemailer";
import { z } from "zod";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  })
);
app.use(express.json({ limit: "64kb" }));

const ContactPayloadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(1).max(4000),
});

function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

app.post("/api/contact", async (req, res) => {
  const parsed = ContactPayloadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: "Invalid payload",
      details: parsed.error.flatten(),
    });
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

    const { name, email, message } = parsed.data;

    const subject = `Portfolio contact from ${name}`;
    const text = [
      `Name: ${name}`,
      `Reply to: ${email}`,
      "",
      "Message:",
      message,
    ].join("\n");

    await transporter.sendMail({
      from: contactFromEmail,
      to: contactToEmail,
      subject,
      text,
      replyTo: email,
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: "Failed to send email" });
  }
});

const port = Number(process.env.API_PORT ?? "8787");
app.listen(port, () => {
  console.log(`[api] listening on http://localhost:${port}`);
});

