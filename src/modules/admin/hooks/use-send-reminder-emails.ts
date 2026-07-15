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
  const [sendReminderEmailsMutation, { loading }] = useMutation(SendReminderEmailsDoc, {
    onCompleted: (data) => {
      if (data.adminSendReminderEmails?.success) {
        posthog.capture('admin_reminder_emails_sent', {
          queued_count: data.adminSendReminderEmails.queuedCount,
        });
        toast.success(data.adminSendReminderEmails.message || 'Reminder emails queued successfully');
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to send reminder emails');
    },
  });

  const sendReminderEmails = async ({ userIds, reminderType, customMessage }: SendReminderEmailsArgs) => {
    try {
      const result = await sendReminderEmailsMutation({
        variables: { input: { userIds, reminderType, customMessage } },
      });
      return result.data?.adminSendReminderEmails;
    } catch (error) {
      console.error('Error sending reminder emails:', error);
      throw error;
    }
  };

  return { sendReminderEmails, loading };
};
