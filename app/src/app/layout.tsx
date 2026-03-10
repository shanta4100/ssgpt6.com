import './globals.css';
import Script from 'next/script';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SSGPT6',
  description: 'SSGPT6 Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script id="ssgpt6-script" strategy="afterInteractive">
          {``}
        </Script>
      </body>
    </html>
  );
}