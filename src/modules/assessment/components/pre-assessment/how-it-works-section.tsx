import { ClipboardList, FileBarChart, Rocket } from 'lucide-react';

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: <ClipboardList className="size-5" />,
    title: 'Answer 50 Questions',
    description: 'Reflective questions using a simple sliding scale. Be honest with yourself.',
  },
  {
    icon: <FileBarChart className="size-5" />,
    title: 'Receive Your Report',
    description:
      'Get a personalized readiness score, dimension breakdown, and downloadable PDF report.',
  },
  {
    icon: <Rocket className="size-5" />,
    title: 'Take Action',
    description:
      'Use your insights to strengthen weak areas and build a more confident retirement plan.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-balance text-2xl font-bold tracking-tight lg:text-3xl">How It Works</h2>
        <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
          A simple three-step process from start to actionable results.
        </p>
      </div>

      <div className="relative mx-auto grid w-full max-w-4xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div
          className="absolute top-8 right-[calc(16.67%+16px)] left-[calc(16.67%+16px)] hidden h-px bg-green-200 dark:bg-green-800 lg:block"
          aria-hidden="true"
        />

        {steps.map((step, index) => (
          <div key={step.title} className="relative flex flex-col items-center gap-4 text-center">
            <div className="relative z-10 flex size-16 items-center justify-center rounded-2xl bg-green-600 dark:bg-green-700 text-white shadow-sm">
              {step.icon}
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Step {index + 1}
            </span>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
