import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SSGPT6",
  description: "Intelligent Digital Access Platform",
  metadataBase: new URL("https://ssgpt6.com"),
  alternates: {
    canonical: "https://ssgpt6.com",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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