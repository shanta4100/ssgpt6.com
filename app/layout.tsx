import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SSGPT6 Trade Hub",
  description: "SSGPT6 Trade Hub — a stable system for AI tools, media, and governance.",
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/tradehub-icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/tradehub-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}