'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { Spinner } from '@/components/ui/spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Lock, Users } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRegisterForWorkshop } from '../hooks/use-register-for-workshop';
import { workshopRegisterSchema, type WorkshopRegisterValues } from '../lib/workshop-register-schema';

const SUPPORT_EMAIL = 'support@silverspring.in';

const SupportLine = ({ prefix }: { prefix: string }) => (
  <p className="text-sm text-muted-foreground">
    {prefix}{' '}
    <a className="text-primary underline underline-offset-4" href={`mailto:${SUPPORT_EMAIL}`}>
      {SUPPORT_EMAIL}
    </a>
    .
  </p>
);

const Shell = ({ children }: { children: React.ReactNode }) => (
  <aside
    id="register"
    className="relative z-10 flex flex-col gap-6 rounded-2xl border bg-background p-6 shadow-xl shadow-primary/10 sm:p-9"
  >
    {children}
  </aside>
);

const Notice = ({
  icon,
  title,
  text,
  prefix,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  prefix: string;
}) => (
  <Shell>
    <span className="flex size-13 items-center justify-center rounded-full bg-muted text-muted-foreground">
      {icon}
    </span>
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <p className="text-base leading-relaxed">{text}</p>
    </div>
    <Button asChild variant="outline" size="lg">
      <Link href="/auth/register">Take the readiness assessment</Link>
    </Button>
    <SupportLine prefix={prefix} />
  </Shell>
);

type WorkshopRegisterCardProps = {
  slug: string;
  status: string;
  registrationOpen: boolean;
  capacity?: number | null;
};

export const WorkshopRegisterCard = ({ slug, status, registrationOpen }: WorkshopRegisterCardProps) => {
  const { register, loading } = useRegisterForWorkshop();
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);
  const form = useForm<WorkshopRegisterValues>({
    resolver: zodResolver(workshopRegisterSchema),
    defaultValues: { fullName: '', phone: '', email: '' },
  });

  const handleSubmit = async (values: WorkshopRegisterValues) => {
    try {
      const result = await register(slug, values);
      if (result?.success) setRegisteredEmail(values.email.trim().toLowerCase());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not register. Please try again.');
    }
  };

  if (registeredEmail) {
    return (
      <Shell>
        <div role="status" className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-2">
          <span className="flex size-13 items-center justify-center rounded-full bg-accent text-primary">
            <CheckCircle2 className="size-7" />
          </span>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold tracking-tight">You&apos;re registered</h2>
            <p className="text-base leading-relaxed">
              We&apos;ve sent a confirmation to{' '}
              <strong className="break-all font-semibold">{registeredEmail}</strong>. The joining
              link will reach you 24 hours before the session.
            </p>
          </div>
          <SupportLine prefix="No email in a few minutes? Check your spam folder, or write to" />
        </div>
      </Shell>
    );
  }

  if (status === 'closed') {
    return (
      <Notice
        icon={<Lock className="size-6" />}
        title="Registration is closed"
        text="This webinar is no longer taking registrations. If you registered, look out for the joining link and, after the session, resources and a feedback form by email."
        prefix="Questions? Write to"
      />
    );
  }

  if (status === 'draft') {
    return (
      <Notice
        icon={<Lock className="size-6" />}
        title="This webinar isn't open yet"
        text="This page is a draft preview, visible only to admins. Set the status to Published to open registration."
        prefix="Questions? Write to"
      />
    );
  }

  if (!registrationOpen) {
    return (
      <Notice
        icon={<Users className="size-6" />}
        title="This webinar is full"
        text="All places have been taken. If you already registered, your place is safe and the joining link will reach you by email."
        prefix="Want to hear about the next webinar? Write to"
      />
    );
  }

  return (
    <Shell>
      <h2 className="text-3xl font-bold tracking-tight">Register for the webinar</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} noValidate className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="name" placeholder="Your full name" className="h-13" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact number</FormLabel>
                <FormControl>
                  <PhoneInput {...field} placeholder="9876543210" groupClassName="h-13" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email ID</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="h-13"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-sm leading-relaxed text-muted-foreground">
            By registering, you agree to receive emails about this webinar: your confirmation, the
            joining link and reminders.
          </p>
          <Button type="submit" size="lg" disabled={loading} className="h-13 rounded-full text-base">
            {loading ? (
              <>
                <Spinner className="size-4" /> Registering…
              </>
            ) : (
              'Register'
            )}
          </Button>
        </form>
      </Form>
    </Shell>
  );
};
