import './globals.css'

export const metadata = {
  title: 'SSGPT6 Core',
  description: 'AI Core System'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}