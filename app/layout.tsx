import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SSGPT6",
  description: "Intelligent Digital Access Platform",
  manifest: "/manifest.webmanifest",
  icons: {
    apple: "/apple-touch-icon.png",
    icon: [
      { url: "/tradehub-icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/tradehub-icon-512.png", sizes: "512x512", type: "image/png" }
    ]
  },
  themeColor: "#0a0f2c"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}