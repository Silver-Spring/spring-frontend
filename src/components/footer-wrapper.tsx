'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './footer';

export function FooterWrapper() {
  const pathname = usePathname();

  const shouldHideFooter =
    pathname?.startsWith('/admin') ||
    (pathname?.startsWith('/assessment/') && pathname !== '/assessment');

  if (shouldHideFooter) {
    return null;
  }

  return <Footer />;
}
