'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Eye, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { usePreviewCampaign, useSendCampaignTest } from '../hooks/use-campaigns';
import { errorMessage } from '../lib/format';

const FIRST = '__first__';

type EmailPreviewProps = {
  /** Saves the editor's current content and returns the email id, or null when saving failed. */
  ensureSaved: () => Promise<string | null>;
  /** People to render the preview for (the audience sample). */
  contacts: { email: string; name?: string | null }[];
  showSendTest: boolean;
  disabled?: boolean;
};

/** Renders the email as a chosen recipient would see it, in a sandboxed frame, and sends a test. */
export const EmailPreview = ({ ensureSaved, contacts, showSendTest, disabled = false }: EmailPreviewProps) => {
  const [contact, setContact] = useState(FIRST);
  const [loadPreview, { data, loading }] = usePreviewCampaign();
  const [sendTest, { loading: sendingTest }] = useSendCampaignTest();
  const [busy, setBusy] = useState(false);
  const preview = data?.adminPreviewCampaign ?? null;
  const contactEmail = contact === FIRST ? null : contact;

  const handlePreview = async () => {
    setBusy(true);
    try {
      const id = await ensureSaved();
      if (!id) return;
      await loadPreview({ variables: { id, contactEmail } });
    } catch (error) {
      toast.error(errorMessage(error, 'Could not build the preview'));
    } finally {
      setBusy(false);
    }
  };

  const handleSendTest = async () => {
    setBusy(true);
    try {
      const id = await ensureSaved();
      if (!id) return;
      await sendTest({ variables: { id, contactEmail } });
      toast.success('Test sent to your email');
    } catch (error) {
      toast.error(errorMessage(error, 'Could not send the test'));
    } finally {
      setBusy(false);
    }
  };

  const working = busy || loading || sendingTest;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">Preview as</span>
        <Select value={contact} onValueChange={setContact} disabled={disabled}>
          <SelectTrigger className="h-9 w-full sm:w-72" aria-label="Preview as">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FIRST}>First person in the audience</SelectItem>
            {contacts.map((c) => (
              <SelectItem key={c.email} value={c.email}>
                {c.name ? `${c.name} (${c.email})` : c.email}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="button" variant="outline" className="gap-2" onClick={handlePreview} disabled={disabled || working}>
          {loading ? <Spinner className="size-4" /> : <Eye className="size-4" />}
          Preview
        </Button>
        {showSendTest && (
          <Button type="button" variant="outline" className="gap-2" onClick={handleSendTest} disabled={disabled || working}>
            {sendingTest ? <Spinner className="size-4" /> : <Send className="size-4" />}
            Send test to me
          </Button>
        )}
      </div>

      {preview && (
        <div className="space-y-2">
          <div className="text-sm">
            <span className="text-muted-foreground">Subject: </span>
            <span className="font-medium">{preview.subject}</span>
            {preview.recipientEmail && (
              <span className="text-muted-foreground"> · as {preview.recipientEmail}</span>
            )}
          </div>
          <iframe
            title="Email preview"
            sandbox=""
            srcDoc={preview.html}
            className="h-[640px] w-full rounded-lg border bg-white"
          />
        </div>
      )}
    </div>
  );
};
