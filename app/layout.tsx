import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SS GPT6 Trade Hub",
  description: "Official SS GPT6 Trade Hub platform",
  manifest: "/manifest.webmanifest",
  icons: {
    apple: "/apple-touch-icon.png",
    icon: [
      { url: "/tradehub-icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/tradehub-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
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