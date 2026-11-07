'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { useFragment as unmaskFragment } from '@/gql';
import type { AdminWorkshopEventFieldsFragment } from '@/gql/graphql';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  useCreateWorkshop,
  useSetWorkshopStatus,
  useUpdateWorkshop,
} from '../hooks/use-admin-workshops';
import {
  isoToIstInput,
  istInputToIso,
  slugify,
  workshopAdminSchema,
  type WorkshopAdminValues,
} from '../lib/workshop-admin-schema';
import { AdminWorkshopEventFragment } from '../graphql/admin-workshop-fields.graphql';
import { WorkshopField } from './workshop-field';

type WorkshopFormProps = { workshop?: AdminWorkshopEventFieldsFragment };

const toDefaults = (workshop?: AdminWorkshopEventFieldsFragment): WorkshopAdminValues => {
  if (!workshop) {
    return {
      title: '',
      subtitle: '',
      speakerName: '',
      speakerRole: '',
      startsAt: '',
      endsAt: '',
      status: 'draft',
      capacity: '',
      slug: '',
      joiningUrl: '',
      formatLabel: 'Online',
      feedbackFormUrl: '',
      resourcesNote: '',
    };
  }
  const { event } = workshop;
  const speaker = event.speakers[0];
  return {
    title: event.title,
    subtitle: event.subtitle ?? '',
    speakerName: speaker?.name ?? '',
    speakerRole: speaker?.role ?? '',
    startsAt: isoToIstInput(event.startsAt),
    endsAt: isoToIstInput(event.endsAt),
    status: event.status as WorkshopAdminValues['status'],
    capacity: event.capacity ? String(event.capacity) : '',
    slug: event.slug,
    joiningUrl: workshop.joiningUrl ?? '',
    formatLabel: event.formatLabel,
    feedbackFormUrl: workshop.feedbackFormUrl ?? '',
    resourcesNote: workshop.resourcesNote ?? '',
  };
};

export const WorkshopForm = ({ workshop }: WorkshopFormProps) => {
  const router = useRouter();
  const [createWorkshop] = useCreateWorkshop();
  const [updateWorkshop] = useUpdateWorkshop();
  const [setStatus] = useSetWorkshopStatus();
  const form = useForm<WorkshopAdminValues>({
    resolver: zodResolver(workshopAdminSchema),
    defaultValues: toDefaults(workshop),
  });
  const { isSubmitting } = form.formState;
  const isEdit = Boolean(workshop);

  const handleSubmit = async (values: WorkshopAdminValues) => {
    const existing = workshop?.event;
    // Fields this design doesn't show are kept as they are on edit, so nothing is lost.
    const input = {
      slug: values.slug,
      title: values.title,
      subtitle: values.subtitle || null,
      description: existing?.description ?? (values.subtitle || values.title),
      programme: existing?.programme ?? [],
      takeaways: existing?.takeaways ?? [],
      speakers: [
        {
          name: values.speakerName,
          role: values.speakerRole,
          photoUrl: existing?.speakers[0]?.photoUrl ?? null,
        },
        ...(existing?.speakers.slice(1) ?? []).map((s) => ({
          name: s.name,
          role: s.role,
          photoUrl: s.photoUrl ?? null,
        })),
      ],
      bannerImageUrl: existing?.bannerImageUrl ?? null,
      startsAt: istInputToIso(values.startsAt),
      endsAt: istInputToIso(values.endsAt),
      formatLabel: values.formatLabel || 'Online',
      capacity: values.capacity ? Number(values.capacity) : null,
      joiningUrl: values.joiningUrl || null,
      feedbackFormUrl: values.feedbackFormUrl || null,
      resourcesNote: values.resourcesNote || null,
    };

    try {
      const result = workshop
        ? (await updateWorkshop({ variables: { id: workshop.event.id, input } })).data
            ?.adminUpdateWorkshopEvent
        : (await createWorkshop({ variables: { input } })).data?.adminCreateWorkshopEvent;
      if (!result) throw new Error('Could not save the workshop');
      const saved = unmaskFragment(AdminWorkshopEventFragment, result);

      if (saved.event.status !== values.status) {
        await setStatus({ variables: { id: saved.event.id, status: values.status } });
      }
      toast.success(isEdit ? 'Workshop saved' : 'Workshop created');
      router.push('/admin/workshops');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not save the workshop');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} noValidate className="flex flex-col gap-6">
        <Card>
          <CardContent className="px-6 py-0 md:px-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <WorkshopField
                  label="Title"
                  where="On page"
                  required
                  hint="The big headline. Text after the first colon turns green on its own line. With no colon, the whole title stays dark."
                >
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Second Innings: By Design"
                      onChange={(e) => {
                        field.onChange(e);
                        if (!isEdit && !form.formState.dirtyFields.slug) {
                          form.setValue('slug', slugify(e.target.value));
                        }
                      }}
                    />
                  </FormControl>
                </WorkshopField>
              )}
            />
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <WorkshopField
                  label="Topic line"
                  where="On page"
                  hint="Fills the sentence “A workshop hosted by Silver Spring on …”. Write it in lower case with no full stop. Leave empty to skip the topic."
                >
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={2}
                      placeholder="designing a meaningful next chapter beyond your professional life"
                    />
                  </FormControl>
                </WorkshopField>
              )}
            />
            <WorkshopField
              label="Lead speaker"
              where="On page"
              required
              hint="Named in “led by Founder …”. Role first, then name on the page. Other speakers saved earlier are kept but not shown in this design."
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="speakerRole"
                  render={({ field }) => (
                    <FormControl>
                      <Input {...field} placeholder="Role, e.g. Founder" />
                    </FormControl>
                  )}
                />
                <FormField
                  control={form.control}
                  name="speakerName"
                  render={({ field }) => (
                    <FormControl>
                      <Input {...field} placeholder="Name, e.g. Mr. Rajat Mathur" />
                    </FormControl>
                  )}
                />
              </div>
            </WorkshopField>
            <FormField
              control={form.control}
              name="startsAt"
              render={({ field }) => (
                <WorkshopField
                  label="Date and start time"
                  where="On page"
                  required
                  hint="Shows as the big date block, and the weekday is worked out for you. Times are in IST. The time itself goes in the emails and calendar invite, not on the page."
                >
                  <FormControl>
                    <Input {...field} type="datetime-local" className="sm:max-w-64" />
                  </FormControl>
                </WorkshopField>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <WorkshopField
                  label="Status"
                  where="Controls the page"
                  hint="Draft: hidden from the public. Published: page is live and the form is open. Closed: page stays live, the form is replaced by “Registration is closed”."
                >
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="sm:max-w-64">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </WorkshopField>
              )}
            />
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <WorkshopField
                  label="Capacity"
                  where="Controls the page"
                  hint="Number of places. When all are taken, the form shows “This workshop is full”. Leave empty for no limit."
                >
                  <FormControl>
                    <Input {...field} inputMode="numeric" placeholder="100" className="sm:max-w-40" />
                  </FormControl>
                </WorkshopField>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <WorkshopField
                  label="Page address"
                  where="On page"
                  required
                  hint="Goes after /workshops/. Lowercase, hyphens, must be unique. Avoid changing it once the link is shared."
                >
                  <FormControl>
                    <Input {...field} placeholder="second-innings-by-design" className="font-mono" />
                  </FormControl>
                </WorkshopField>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="px-6 py-0 md:px-8">
            <FormField
              control={form.control}
              name="joiningUrl"
              render={({ field }) => (
                <WorkshopField
                  label="Joining link"
                  where="Emails only"
                  hint="Private. Never shown on the page. Sent only in the day-before and hour-before reminder emails."
                >
                  <FormControl>
                    <Input {...field} placeholder="https://meet.google.com/…" />
                  </FormControl>
                </WorkshopField>
              )}
            />
            <FormField
              control={form.control}
              name="endsAt"
              render={({ field }) => (
                <WorkshopField
                  label="End time"
                  where="Emails only"
                  required
                  hint="Used in the calendar invite and emails. Must be after the start time."
                >
                  <FormControl>
                    <Input {...field} type="datetime-local" className="sm:max-w-64" />
                  </FormControl>
                </WorkshopField>
              )}
            />
            <FormField
              control={form.control}
              name="formatLabel"
              render={({ field }) => (
                <WorkshopField
                  label="Format"
                  where="Emails only"
                  hint="Wording used in emails, for example Online or In person. Empty means Online."
                >
                  <FormControl>
                    <Input {...field} placeholder="Online" className="sm:max-w-64" />
                  </FormControl>
                </WorkshopField>
              )}
            />
            <FormField
              control={form.control}
              name="feedbackFormUrl"
              render={({ field }) => (
                <WorkshopField
                  label="Feedback form link"
                  where="Emails only"
                  hint="Sent in the thank-you email after the session. Leave empty to skip it."
                >
                  <FormControl>
                    <Input {...field} placeholder="https://forms.gle/…" />
                  </FormControl>
                </WorkshopField>
              )}
            />
            <FormField
              control={form.control}
              name="resourcesNote"
              render={({ field }) => (
                <WorkshopField
                  label="Resources note"
                  where="Emails only"
                  hint="A short note shown with the resources in the thank-you email. Optional."
                >
                  <FormControl>
                    <Textarea {...field} rows={3} />
                  </FormControl>
                </WorkshopField>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => router.push('/admin/workshops')}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Spinner className="size-4" />}
            {isEdit ? 'Save changes' : 'Create workshop'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
