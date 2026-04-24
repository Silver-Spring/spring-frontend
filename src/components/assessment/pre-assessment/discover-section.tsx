import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, FileText, Lightbulb, LucideIcon, Target, TrendingUp, Users } from 'lucide-react';

interface DiscoverItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const discoverItems: DiscoverItem[] = [
  {
    icon: TrendingUp,
    title: 'Your Readiness Score',
    description: 'A comprehensive score reflecting your overall retirement readiness.',
  },
  {
    icon: BarChart3,
    title: '5-Dimension Breakdown',
    description: 'See exactly where you stand across the five key areas that matter most.',
  },
  {
    icon: Lightbulb,
    title: 'Personalized Insights',
    description: 'Actionable recommendations tailored to your unique profile and circumstances.',
  },
  {
    icon: Users,
    title: 'Peer Comparison',
    description: 'Understand how your readiness compares with others with the same demographics.',
  },
  {
    icon: FileText,
    title: 'Downloadable PDF Report',
    description: 'A detailed report you can share with your advisor or revisit anytime.',
  },
  {
    icon: Target,
    title: 'Action Plan',
    description: 'Clear next steps to improve in areas where you can make the biggest impact.',
  },
];

export function DiscoverSection() {
  return (
    <section className="flex flex-col gap-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-balance text-2xl font-bold tracking-tight lg:text-3xl">
          {"What You'll Discover"}
        </h2>
        <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
          Your assessment unlocks a comprehensive view of your retirement readiness on the
          non-financial aspects of retirement
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {discoverItems.map((item) => (
          <Card
            key={item.title}
            className="bg-primary/5 border-primary/10 transition-shadow hover:shadow-md"
          >
            <CardContent className="flex gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <item.icon className="size-5" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
