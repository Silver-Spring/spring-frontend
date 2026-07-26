import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CreditCard,
  FileText,
  Mail,
  Tag,
  Users,
} from 'lucide-react';
import Link from 'next/link';

type QuickAction = {
  href: string;
  title: string;
  description: string;
  icon: typeof Users;
  iconClassName: string;
};

type DashboardQuickActionsProps = {
  totalUsers: number;
  liveTypeCount: number;
  draftTypeCount: number;
  workbookPurchases: number;
};

const DashboardQuickActions = ({
  totalUsers,
  liveTypeCount,
  draftTypeCount,
  workbookPurchases,
}: DashboardQuickActionsProps) => {
  const actions: QuickAction[] = [
    {
      href: '/admin/assessment?view=catalog',
      title: 'All types',
      description:
        draftTypeCount > 0
          ? `${liveTypeCount} live · ${draftTypeCount} draft`
          : `${liveTypeCount} live type${liveTypeCount === 1 ? '' : 's'}`,
      icon: FileText,
      iconClassName: 'bg-primary/10 text-primary',
    },
    {
      href: '/admin/assessment?view=users',
      title: 'User sessions',
      description: 'By user & status',
      icon: Users,
      iconClassName: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    },
    {
      href: '/admin/users',
      title: 'Users',
      description: `${totalUsers} account${totalUsers === 1 ? '' : 's'} · roles & access`,
      icon: Users,
      iconClassName: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    },
    {
      href: '/admin/analytics',
      title: 'Analytics',
      description: 'Trends and completion rates',
      icon: BarChart3,
      iconClassName: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    },
    {
      href: '/admin/payments',
      title: 'Payments',
      description: 'Transactions and settlements',
      icon: CreditCard,
      iconClassName: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400',
    },
    {
      href: '/admin/workbooks',
      title: 'Workbooks',
      description: `${workbookPurchases} ${workbookPurchases === 1 ? 'copy' : 'copies'} sold · buyer details`,
      icon: BookOpen,
      iconClassName: 'bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400',
    },
    {
      href: '/admin/coupons',
      title: 'Coupons',
      description: 'Discount codes',
      icon: Tag,
      iconClassName: 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
    },
    {
      href: '/admin/reminders',
      title: 'Reminders',
      description: 'Nudge incomplete users',
      icon: Mail,
      iconClassName: 'bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400',
    },
  ];

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">Quick links</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {actions.map((action) => (
          <Link key={action.href} href={action.href} className="group block h-full">
            <Card className="h-full transition-all hover:shadow-md hover:border-primary/40">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`flex size-10 items-center justify-center rounded-lg ${action.iconClassName}`}
                  >
                    <action.icon className="size-5" aria-hidden="true" />
                  </div>
                  <ArrowRight
                    className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </div>
                <CardTitle className="text-base">{action.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export { DashboardQuickActions };
