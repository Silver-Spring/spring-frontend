'use client';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { SendReminderEmailsDoc } from '../graphql/send-reminder-emails.graphql';
import posthog from 'posthog-js';

interface SendReminderEmailsArgs {
  userIds: string[];
  reminderType: string;
  customMessage?: string;
}

export const useSendReminderEmails = () => {
  const [sendReminderEmailsMutation, { loading }] = useMutation(SendReminderEmailsDoc);

  const sendReminderEmails = async ({ userIds, reminderType, customMessage }: SendReminderEmailsArgs) => {
    const count = userIds.length;

    const promise = sendReminderEmailsMutation({
      variables: { input: { userIds, reminderType, customMessage } },
    }).then((result) => {
      const payload = result.data?.adminSendReminderEmails;
      if (!payload?.success) {
        // Partial or total failure — the resolver puts the reason in `message`.
        throw new Error(payload?.message || 'Some reminder emails failed to send');
      }
      posthog.capture('admin_reminder_emails_sent', {
        queued_count: payload.queuedCount,
      });
      return payload;
    });

    toast.promise(promise, {
      loading: `Sending ${count} reminder email${count === 1 ? '' : 's'}...`,
      success: (payload) => payload.message || 'Reminder emails sent',
      error: (err) => (err instanceof Error ? err.message : 'Failed to send reminder emails'),
    });

    return promise;
  };

  return { sendReminderEmails, loading };
};
