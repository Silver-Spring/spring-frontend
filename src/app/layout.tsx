import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Providers } from '@/components/providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://silverspring.com'),
  title: {
    default: 'Silver Spring - Retirement Transition Coaching',
    template: '%s | Silver Spring',
  },
  description:
    "India's first dedicated retirement transition coaching practice, helping you navigate life beyond finances.",
  keywords: [
    'retirement coaching',
    'retirement transition',
    'life after retirement',
    'retirement planning',
    'assessment platform',
    'Silver Spring',
  ],
  authors: [{ name: 'Silver Spring' }],
  creator: 'Silver Spring',
  publisher: 'Silver Spring',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'Silver Spring',
    title: 'Silver Spring - Retirement Transition Coaching',
    description:
      "India's first dedicated retirement transition coaching practice, helping you navigate life beyond finances.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Silver Spring - Retirement Transition Coaching',
    description:
      "India's first dedicated retirement transition coaching practice, helping you navigate life beyond finances.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>

        {/* Razorpay Checkout Script - Loaded with Next.js Script component for optimal performance */}
        <Script
          id="razorpay-checkout"
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
