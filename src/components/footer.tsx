import Image from 'next/image';
import Link from 'next/link';

const footerLinks = {
  company: [
    { label: 'About', href: `${process.env.NEXT_PUBLIC_APP_URL}/about-us` },
    { label: 'Resources', href: `${process.env.NEXT_PUBLIC_APP_URL}/resources` },
    { label: 'Blog', href: `${process.env.NEXT_PUBLIC_APP_URL}/blog` },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <Link href={process.env.NEXT_PUBLIC_APP_URL || '/'} className="inline-block">
              <Image
                src="/silverspring_logo.png"
                alt="Silver Spring"
                width={40}
                height={40}
                className="rounded-sm object-cover"
              />
            </Link>
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              Understand your retirement readiness beyond finances with our research-backed
              psychometric assessment.
            </p>
            <p className="text-xs text-muted-foreground">
              Your data is encrypted and never shared with third parties.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Silver Spring Retirement Readiness Index. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
