'use client';

import { CreditCard, Share2, ClipboardCheck } from 'lucide-react';

const steps = [
  {
    icon: CreditCard,
    title: 'Partner A begins',
    description:
      'The first partner completes the short payment and starts the assessment. They receive a unique invite code to share.',
    step: '01',
  },
  {
    icon: Share2,
    title: 'Share the invite code',
    description:
      'Partner A shares their 8-character invite code with their partner. Each partner completes the assessment independently and privately.',
    step: '02',
  },
  {
    icon: ClipboardCheck,
    title: 'Both complete independently',
    description:
      'Each partner answers 23 questions separately. Honest, individual responses are what make the dyadic analysis meaningful.',
    step: '03',
  },
];

export function CoriHowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          How it <span className="text-primary">works</span>
        </h2>
        <p className="mx-auto max-w-xl text-pretty text-muted-foreground">
          One payment covers both partners. The process is designed for honest, independent
          reflection.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.step}
              className="relative rounded-2xl border border-border bg-card p-8 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="size-6 text-primary" />
                </div>
                <span className="text-4xl font-bold text-primary/20">{step.step}</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
