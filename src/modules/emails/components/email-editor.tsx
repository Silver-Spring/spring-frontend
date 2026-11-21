'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import type { AdminCampaignQuery } from '@/gql/graphql';
import { useAdminAssessmentTypes } from '@/modules/admin/hooks/use-admin-assessment-types';
import { useAdminWorkshopEvents } from '@/modules/workshop/hooks/use-admin-workshops';
import { CalendarClock, Copy, Megaphone, Save, Send, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type RefObject } from 'react';
import { toast } from 'sonner';
import {
  useAudiencePreview,
  useCampaign,
  useCampaignConditions,
  useCampaigns,
  useCancelCampaign,
  useDuplicateCampaign,
  useSaveCampaign,
  useScheduleCampaign,
} from '../hooks/use-campaigns';
import {
  audienceFromJson,
  audienceProblem,
  audienceToJson,
  classifyAudience,
  defaultAudience,
  type AudienceState,
} from '../lib/audience';
import { errorMessage, formatIst } from '../lib/format';
import { insertAt } from '../lib/markdown';
import { availableVariables } from '../lib/variables';
import { AudienceBuilder } from './audience-builder';
import { EmailPreview } from './email-preview';
import { MarkdownTextarea } from './markdown-textarea';
import { ScheduleDialog } from './schedule-dialog';
import { VariableChips } from './variable-chips';

type Campaign = NonNullable<AdminCampaignQuery['adminCampaign']>;

export type EmailEditorProps = {
  /** Edit this email; leave out to write a new one. */
  campaignId?: string;
  /** For a new email: link this webinar and start with its registrants as the audience. */
  defaultEventId?: string;
  /** Called with the id after a new email is first saved, scheduled or sent. Default: open its page. */
  onSaved?: (id: string) => void;
};

const NONE = '__none__';

const KIND_BANNER = {
  webinar_update: "Webinar update — sent to this webinar's registrants, no unsubscribe link",
  promotional: 'Promotional — includes an unsubscribe link',
} as const;

type FieldKey = 'subject' | 'preheader' | 'body' | 'buttonLabel' | 'buttonUrl';
type TextElement = HTMLInputElement | HTMLTextAreaElement;

/** Same webinar moved: rules that pointed at the old one now point at the new one (or any, if unlinked). */
const relinkAudience = (state: AudienceState, from: string | null, to: string | null): AudienceState => {
  if (!from) return state;
  return {
    ...state,
    groups: state.groups.map((g) => ({
      ...g,
      rules: g.rules.map((r) => {
        if (r.condition !== 'registered_webinar' || r.params.eventId !== from) return r;
        const params = { ...r.params };
        if (to) params.eventId = to;
        else delete params.eventId;
        return { ...r, params };
      }),
    })),
  };
};

type EditorFormProps = {
  campaign: Campaign | null;
  defaultEventId?: string;
  onSaved?: (id: string) => void;
  onChanged: () => void;
};

const EmailEditorForm = ({ campaign, defaultEventId, onSaved, onChanged }: EditorFormProps) => {
  const router = useRouter();
  const isStarter = campaign?.isStarter ?? false;
  const status = campaign?.status ?? 'draft';
  const editable = status === 'draft' || status === 'scheduled';

  const [savedId, setSavedId] = useState<string | null>(campaign?.id ?? null);
  const [name, setName] = useState(campaign?.name ?? '');
  const [eventId, setEventId] = useState<string | null>(campaign ? campaign.eventId : defaultEventId ?? null);
  const [audience, setAudience] = useState<AudienceState>(() =>
    campaign ? audienceFromJson(campaign.audience) : defaultAudience(defaultEventId),
  );
  const [subject, setSubject] = useState(campaign?.subject ?? '');
  const [preheader, setPreheader] = useState(campaign?.preheader ?? '');
  const [body, setBody] = useState(campaign?.bodyMarkdown ?? '');
  const [buttonLabel, setButtonLabel] = useState(campaign?.buttonLabel ?? '');
  const [buttonUrl, setButtonUrl] = useState(campaign?.buttonUrl ?? '');
  const [sendMode, setSendMode] = useState<'now' | 'schedule' | null>(null);
  const [starterOpen, setStarterOpen] = useState(false);
  const [starterEventId, setStarterEventId] = useState(NONE);
  const [busy, setBusy] = useState(false);

  const subjectRef = useRef<HTMLInputElement>(null);
  const preheaderRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const buttonLabelRef = useRef<HTMLInputElement>(null);
  const buttonUrlRef = useRef<HTMLInputElement>(null);
  const [activeField, setActiveField] = useState<FieldKey>('body');

  const { conditions } = useCampaignConditions();
  const { workshops } = useAdminWorkshopEvents();
  const { campaigns: allCampaigns } = useCampaigns();
  const { assessmentTypes } = useAdminAssessmentTypes();
  const [saveCampaign] = useSaveCampaign();
  const [scheduleCampaign] = useScheduleCampaign();
  const [cancelCampaign] = useCancelCampaign();
  const [duplicateCampaign] = useDuplicateCampaign();

  const webinars = workshops.map(({ event }) => ({
    id: event.id,
    label: `${event.title} · ${formatIst(event.startsAt)}`,
  }));
  const sentCampaigns = allCampaigns
    .filter((c) => c.id !== savedId && ['sending', 'sent', 'failed'].includes(c.status))
    .map((c) => ({ id: c.id, label: c.name }));
  const assessmentOptions = assessmentTypes.map((t) => ({ id: t.id, label: t.name }));

  // Audience count: asked for 400 ms after the last change.
  const audienceJson = audienceToJson(audience, conditions);
  const problem = conditions.length ? audienceProblem(audience, conditions) : 'Loading conditions…';
  const audienceKey = JSON.stringify({ audience: problem ? null : audienceJson, eventId });
  const [debouncedKey, setDebouncedKey] = useState(audienceKey);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedKey(audienceKey), 400);
    return () => clearTimeout(timer);
  }, [audienceKey]);
  const debounced = JSON.parse(debouncedKey) as { audience: typeof audienceJson | null; eventId: string | null };
  const { preview, loading: counting, error: countError } = useAudiencePreview(
    debounced.audience,
    debounced.eventId,
  );
  const settled = debouncedKey === audienceKey;
  const countProblem = problem ?? (countError && settled ? countError.message : null);
  const count = !problem && preview && !countError ? preview.count : null;

  const kind = classifyAudience(audienceJson, eventId);
  // Starters are templates for webinar emails, so they get every webinar variable.
  const variables = availableVariables({
    hasWebinar: isStarter || Boolean(eventId),
    webinarUpdate: isStarter || kind === 'webinar_update',
  });

  const handleInsertVariable = (token: string) => {
    const fields: Record<FieldKey, { ref: RefObject<TextElement | null>; value: string; set: (v: string) => void }> = {
      subject: { ref: subjectRef, value: subject, set: setSubject },
      preheader: { ref: preheaderRef, value: preheader, set: setPreheader },
      body: { ref: bodyRef, value: body, set: setBody },
      buttonLabel: { ref: buttonLabelRef, value: buttonLabel, set: setButtonLabel },
      buttonUrl: { ref: buttonUrlRef, value: buttonUrl, set: setButtonUrl },
    };
    const field = fields[activeField];
    const element = field.ref.current;
    if (!element) return;
    const start = element.selectionStart ?? field.value.length;
    const end = element.selectionEnd ?? start;
    const { nextValue, selectionStart } = insertAt(field.value, start, end, token);
    field.set(nextValue);
    requestAnimationFrame(() => {
      element.focus();
      element.setSelectionRange(selectionStart, selectionStart);
    });
  };

  const focusTracker = (key: FieldKey) => () => setActiveField(key);

  const handleEventChange = (value: string) => {
    const next = value === NONE ? null : value;
    setAudience((current) => relinkAudience(current, eventId, next));
    setEventId(next);
  };

  /** Saves what is on screen; returns the id, or null (with a toast) when the server refused. */
  const save = async (): Promise<string | null> => {
    try {
      const { data } = await saveCampaign({
        variables: {
          input: {
            id: savedId,
            name,
            subject,
            preheader: preheader || null,
            bodyMarkdown: body,
            buttonLabel: buttonLabel || null,
            buttonUrl: buttonUrl || null,
            eventId,
            audience: audienceJson,
          },
        },
      });
      const id = data?.adminSaveCampaign.id ?? null;
      if (id) setSavedId(id);
      return id;
    } catch (error) {
      toast.error(errorMessage(error, 'Could not save the email'));
      return null;
    }
  };

  const afterSave = (id: string) => {
    if (campaign) {
      onChanged();
      return;
    }
    if (onSaved) onSaved(id);
    else router.replace(`/admin/emails/${id}`);
  };

  const handleSaveDraft = async () => {
    setBusy(true);
    const id = await save();
    setBusy(false);
    if (!id) return;
    toast.success('Saved');
    afterSave(id);
  };

  const handleConfirmSend = async (sendAt: string | null) => {
    setSendMode(null);
    setBusy(true);
    try {
      const id = await save();
      if (!id) return;
      await scheduleCampaign({ variables: { id, sendAt } });
      toast.success(sendAt ? `Scheduled for ${formatIst(sendAt)}` : 'Sending now');
      afterSave(id);
    } catch (error) {
      toast.error(errorMessage(error, 'Could not schedule the email'));
    } finally {
      setBusy(false);
    }
  };

  const handleCancelSchedule = async () => {
    if (!savedId) return;
    setBusy(true);
    try {
      await cancelCampaign({ variables: { id: savedId } });
      toast.success('Cancelled. Duplicate it to send it later.');
      onChanged();
    } catch (error) {
      toast.error(errorMessage(error, 'Could not cancel the email'));
    } finally {
      setBusy(false);
    }
  };

  const handleNewFromStarter = async () => {
    if (!savedId) return;
    setBusy(true);
    try {
      const { data } = await duplicateCampaign({
        variables: { id: savedId, eventId: starterEventId === NONE ? null : starterEventId },
      });
      const id = data?.adminDuplicateCampaign.id;
      if (!id) return;
      setStarterOpen(false);
      toast.success('Draft created from the starter');
      if (onSaved) onSaved(id);
      else router.push(`/admin/emails/${id}`);
    } catch (error) {
      toast.error(errorMessage(error, 'Could not create the draft'));
    } finally {
      setBusy(false);
    }
  };

  const disabled = !editable || busy;

  return (
    <div className="space-y-6">
      {isStarter && (
        <Alert>
          <Copy />
          <AlertTitle>Starter email</AlertTitle>
          <AlertDescription>
            Starters are templates and are never sent. Use &quot;New from starter&quot; to make a draft for a
            webinar.
          </AlertDescription>
        </Alert>
      )}
      {status === 'scheduled' && campaign?.scheduledAt && (
        <Alert>
          <CalendarClock />
          <AlertTitle>Scheduled for {formatIst(campaign.scheduledAt)} (India time)</AlertTitle>
          <AlertDescription>
            <p>Changes you save still go out at that time.</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={handleCancelSchedule}
              disabled={busy}
            >
              Cancel sending
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="campaign-name">Name</Label>
            <Input
              id="campaign-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="June webinar invite"
              disabled={disabled}
            />
            <p className="text-xs text-muted-foreground">Only admins see this.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="campaign-event">Linked webinar</Label>
            <Select value={eventId ?? NONE} onValueChange={handleEventChange} disabled={disabled || isStarter}>
              <SelectTrigger id="campaign-event" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NONE}>None</SelectItem>
                {webinars.map((w) => (
                  <SelectItem key={w.id} value={w.id}>
                    {w.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {isStarter
                ? 'Starters are not linked. Pick the webinar when you use "New from starter".'
                : 'Lets you use the webinar variables like {{eventTitle}}.'}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="size-4" /> Who gets it
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isStarter && (
            <Alert>
              <Megaphone />
              <AlertDescription>{KIND_BANNER[kind]}</AlertDescription>
            </Alert>
          )}
          <AudienceBuilder
            value={audience}
            onChange={setAudience}
            conditions={conditions}
            webinars={webinars}
            campaigns={sentCampaigns}
            assessmentTypes={assessmentOptions}
            audienceCount={{
              count,
              sample: preview?.sample ?? [],
              loading: counting || !settled,
              problem: countProblem,
            }}
            disabled={disabled}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="campaign-subject">Subject</Label>
              <Input
                ref={subjectRef}
                id="campaign-subject"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                onFocus={focusTracker('subject')}
                disabled={disabled}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="campaign-preheader">Preheader</Label>
              <Input
                ref={preheaderRef}
                id="campaign-preheader"
                value={preheader}
                onChange={(event) => setPreheader(event.target.value)}
                onFocus={focusTracker('preheader')}
                placeholder="Optional. Shown after the subject in the inbox."
                disabled={disabled}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="campaign-body">Body</Label>
            <MarkdownTextarea
              id="campaign-body"
              textareaRef={bodyRef}
              value={body}
              onChange={setBody}
              onFocus={focusTracker('body')}
              disabled={disabled}
              placeholder="Hi {{firstName}},"
            />
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                Variables go where your cursor is (subject, body or button).
              </p>
              <VariableChips variables={variables} onInsert={handleInsertVariable} disabled={disabled} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="campaign-button-label">Button label</Label>
              <Input
                ref={buttonLabelRef}
                id="campaign-button-label"
                value={buttonLabel}
                onChange={(event) => setButtonLabel(event.target.value)}
                onFocus={focusTracker('buttonLabel')}
                placeholder="Optional"
                disabled={disabled}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="campaign-button-url">Button link</Label>
              <Input
                ref={buttonUrlRef}
                id="campaign-button-url"
                value={buttonUrl}
                onChange={(event) => setButtonUrl(event.target.value)}
                onFocus={focusTracker('buttonUrl')}
                placeholder="https://… or {{assessmentUrl}}"
                disabled={disabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <EmailPreview
            ensureSaved={save}
            contacts={preview?.sample ?? []}
            showSendTest={!isStarter}
            disabled={disabled}
          />
        </CardContent>
      </Card>

      <div className="sticky bottom-0 z-10 -mx-6 flex flex-wrap items-center gap-2 border-t bg-background/95 px-6 py-3 backdrop-blur">
        <Button type="button" variant="outline" className="gap-2" onClick={handleSaveDraft} disabled={disabled}>
          {busy ? <Spinner className="size-4" /> : <Save className="size-4" />}
          {isStarter ? 'Save' : 'Save draft'}
        </Button>
        {isStarter ? (
          <Button type="button" className="gap-2" onClick={() => setStarterOpen(true)} disabled={busy}>
            <Copy className="size-4" /> New from starter
          </Button>
        ) : (
          <>
            <Button
              type="button"
              variant="outline"
              className="gap-2"
              onClick={() => setSendMode('schedule')}
              disabled={disabled || Boolean(problem)}
            >
              <CalendarClock className="size-4" /> Schedule…
            </Button>
            <Button
              type="button"
              className="gap-2"
              onClick={() => setSendMode('now')}
              disabled={disabled || Boolean(problem)}
            >
              <Send className="size-4" /> Send now
            </Button>
          </>
        )}
      </div>

      <ScheduleDialog
        mode={sendMode}
        count={count}
        initialSendAt={campaign?.scheduledAt}
        onConfirm={handleConfirmSend}
        onClose={() => setSendMode(null)}
      />

      <Dialog open={starterOpen} onOpenChange={setStarterOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New from starter</DialogTitle>
            <DialogDescription>
              Makes a draft copy of &quot;{name}&quot;. Pick the webinar it is for so its details and
              registrants are filled in.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="starter-event">Webinar</Label>
            <Select value={starterEventId} onValueChange={setStarterEventId}>
              <SelectTrigger id="starter-event" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NONE}>None</SelectItem>
                {webinars.map((w) => (
                  <SelectItem key={w.id} value={w.id}>
                    {w.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setStarterOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleNewFromStarter} disabled={busy}>
              {busy && <Spinner className="size-4" />}
              Create draft
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

/** Write or edit an email: name, linked webinar, audience, content, preview, test, schedule/send. */
export const EmailEditor = ({ campaignId, defaultEventId, onSaved }: EmailEditorProps) => {
  const { campaign, loading, refetch } = useCampaign(campaignId);

  if (campaignId && loading && !campaign) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }
  if (campaignId && !campaign) return <p className="text-muted-foreground">Email not found.</p>;

  return (
    <EmailEditorForm
      key={campaign?.id ?? 'new'}
      campaign={campaign}
      defaultEventId={defaultEventId}
      onSaved={onSaved}
      onChanged={() => refetch()}
    />
  );
};
