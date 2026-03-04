import './globals.css';

+import Script from 'next/script';

import { FirebaseClientProvider } from '@/firebas

import Header from '@/components/layout/Header';

import Footer from '@/components/layout/Footer';

import { Toaster } from '@/components/ui/toaster'

import { SessionValidator } from '@/firebase/auth

export const metadata = {

title: 'SS GPT6 Trade Hub',

}; description: 'Trading dashboard, AI signals, an

export default function RootLayout({

children,

}: {

children: React. ReactNode;

}) {

return (

<html lang="en" className="dark">

<body>

<FirebaseClientProvider>

<SessionValidator />

<div className="flex flex-col min-h-scr

<Header />

<main className="flex-grow">{children

<Footer />

</div>

<Toaster />

</FirebaseClientProvider>

<Script

src="https://www.googletagmanager.com/g

strategy="afterInteractive"

/>