'use client';

const domains = [
  {
    emoji: '🎯',
    name: 'Goal Alignment & Future Vision',
    description: 'How well both partners share a coordinated vision for retirement life.',
    color: '#6366f1',
  },
  {
    emoji: '🏠',
    name: 'Role Renegotiation & Labour Division',
    description: 'How household responsibilities and personal space are managed as routines shift.',
    color: '#f59e0b',
  },
  {
    emoji: '💬',
    name: 'Disclosure Quality vs. Rumination',
    description: 'Whether conversations about aging feel constructive or repetitive.',
    color: '#06b6d4',
  },
  {
    emoji: '🤝',
    name: 'Perceived Partner Responsiveness',
    description: 'How understood, respected, and emotionally supported each partner feels.',
    color: '#10b981',
  },
  {
    emoji: '🌿',
    name: 'Personal Autonomy & Spatial Freedom',
    description: 'Independent interests and mutual support for each other\'s independence.',
    color: '#84cc16',
  },
  {
    emoji: '✨',
    name: 'Identity Continuity & Self-Esteem',
    description: 'Sense of purpose and self-worth beyond career identity.',
    color: '#ec4899',
  },
  {
    emoji: '💙',
    name: 'Health Expectations & Caregiving',
    description: 'Open discussion about health changes and potential caregiving duties.',
    color: '#ef4444',
  },
  {
    emoji: '🌐',
    name: 'Social Networks & Community',
    description: 'Individual and shared social connections outside the relationship.',
    color: '#8b5cf6',
  },
  {
    emoji: '⚖️',
    name: 'Decision-Making & Control Balance',
    description: 'Whether major decisions and goal-setting feel genuinely shared.',
    color: '#14b8a6',
  },
];

export function CoriDomains() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          Nine <span className="text-primary">relationship domains</span>
        </h2>
        <p className="mx-auto max-w-xl text-pretty text-muted-foreground">
          CORI evaluates both the strength of each domain and the alignment between partners — because
          a high average can hide significant hidden tension.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {domains.map((domain) => (
          <div
            key={domain.name}
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div
              className="flex size-11 shrink-0 items-center justify-center rounded-xl text-xl"
              style={{ backgroundColor: `${domain.color}18` }}
            >
              {domain.emoji}
            </div>
            <div>
              <h3 className="mb-1 text-sm font-semibold leading-tight">{domain.name}</h3>
              <p className="text-xs text-muted-foreground">{domain.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
