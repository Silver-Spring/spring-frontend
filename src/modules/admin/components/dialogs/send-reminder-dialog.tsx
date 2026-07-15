'use client';

import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface SendReminderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (customMessage: string) => void;
  recipientCount: number;
  loading: boolean;
}

export const SendReminderDialog = ({
  open,
  onOpenChange,
  onConfirm,
  recipientCount,
  loading,
}: SendReminderDialogProps) => {
  const [customMessage, setCustomMessage] = useState('');

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Send Reminder Emails</AlertDialogTitle>
          <AlertDialogDescription>
            This will send a reminder email to{' '}
            <strong className="text-foreground">
              {recipientCount} user{recipientCount === 1 ? '' : 's'}
            </strong>
            . Add an optional note that will appear in the email alongside the standard message.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-2">
          <Label htmlFor="reminder-custom-message">Custom message (optional)</Label>
          <Textarea
            id="reminder-custom-message"
            placeholder="e.g. We've extended your discount by 48 hours..."
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            rows={4}
            disabled={loading}
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onConfirm(customMessage)} disabled={loading}>
            {loading ? 'Sending...' : `Send to ${recipientCount} user${recipientCount === 1 ? '' : 's'}`}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
