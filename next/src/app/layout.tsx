import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { LocaleProvider } from "@/lib/i18n";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

/**
 * Favicon: file-based `src/app/icon.png` + `apple-icon.png`, plus explicit metadata so the tab icon
 * survives dev rebuilds. `/favicon.ico` is rewritten to `/images/revin-logo.png` in next.config.js.
 */
export const metadata: Metadata = {
  title: "Revin Dennis Ramadhan | Software Developer",
  description: "Portfolio",
  icons: {
    icon: [
      { url: "/images/revin-logo.png", type: "image/png", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "any" },
    ],
    shortcut: "/images/revin-logo.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable}`}>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
