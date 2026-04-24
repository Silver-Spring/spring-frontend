import type { Metadata } from 'next';
import { DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { NavbarWrapper } from '@/components/navbar-wrapper';
import { FooterWrapper } from '@/components/footer-wrapper';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' });
const dmMono = DM_Mono({ weight: ['400'], subsets: ['latin'], variable: '--font-dm-mono' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://assessment.silverspring.in'),
  title: {
    default: 'Silver Spring - A Retirement Readiness Assessment',
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
    title: 'Silver Spring - A Retirement Readiness Assessment',
    description:
      "India's first dedicated retirement transition coaching practice, helping you navigate life beyond finances.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Silver Spring - A Retirement Readiness Assessment',
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
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable}`}>
      <body className="antialiased">
        <Providers>
          <NavbarWrapper />
          <main className="min-h-screen">{children}</main>
          <FooterWrapper />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
