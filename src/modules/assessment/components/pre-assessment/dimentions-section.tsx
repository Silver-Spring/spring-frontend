import { Card, CardContent } from '@/components/ui/card';
import { Activity, Brain, HeartPulse, Leaf, LucideIcon, Users } from 'lucide-react';

interface Dimension {
  icon: LucideIcon;
  name: string;
  description: string;
  color: string;
}

const dimensions: Dimension[] = [
  {
    icon: Brain,
    name: 'Psychological Readiness',
    description:
      'Your mental preparedness, identity shift, and sense of purpose for the next chapter.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Users,
    name: 'Social Support',
    description:
      'The strength of your social network, community ties, and meaningful relationships.',
    color: 'bg-chart-2/15 text-chart-2',
  },
  {
    icon: HeartPulse,
    name: 'Mental Wellness',
    description:
      'Your emotional resilience, stress management, and overall psychological well-being.',
    color: 'bg-chart-3/15 text-chart-3',
  },
  {
    icon: Activity,
    name: 'Physical Health',
    description: 'Your health habits, energy levels, and proactive approach to physical wellness.',
    color: 'bg-chart-4/15 text-chart-4',
  },
  {
    icon: Leaf,
    name: 'Lifestyle Factors',
    description:
      'Your daily routines, hobbies, interests, and readiness to design a fulfilling lifestyle.',
    color: 'bg-chart-5/15 text-chart-5',
  },
];

export function DimensionsSection() {
  return (
    <section className="flex flex-col gap-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-balance text-2xl font-bold tracking-tight lg:text-3xl">
          The 5 Dimensions We Measure
        </h2>
        <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
          Retirement readiness is about much more than financial readiness. The SSRI evaluates you
          across five research-backed dimensions of well-being
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {dimensions.map((dim, index) => (
          <Card
            key={dim.name}
            className="bg-primary/5 border-primary/10 text-center transition-shadow hover:shadow-md"
          >
            <CardContent className="flex flex-col items-center gap-4">
              <div className="flex flex-col items-center gap-3">
                <span className="text-xs font-semibold text-green-700 dark:text-green-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <dim.icon className="size-6" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-semibold">{dim.name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{dim.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
