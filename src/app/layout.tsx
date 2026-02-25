import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { NavbarWrapper } from '@/components/navbar-wrapper';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://assessment.silverspring.in'),
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
    <html lang="en" className={inter.className}>
      <body className="antialiased">
        <Providers>
          <NavbarWrapper />
          {children}
        </Providers>
      </body>
    </html>
  );
}
