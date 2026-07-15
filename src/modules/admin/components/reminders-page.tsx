'use client';

import { useState } from 'react';
import type { RowSelectionState } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Send } from 'lucide-react';
import { useReminderCandidates, useSendReminderEmails } from '../hooks';
import { ReminderCandidatesTable } from './reminders/reminder-candidates-table';
import { SendReminderDialog } from './dialogs/send-reminder-dialog';

const SEGMENTS = [
  { value: 'no_payment_attempt', label: 'No Payment Attempt — signed up, never started payment' },
  { value: 'payment_abandoned', label: 'Payment Abandoned — payment order created, never completed' },
  { value: 'payment_failed', label: 'Payment Failed — payment attempted and failed' },
  { value: 'paid_no_test', label: 'Paid, No Test — paid, assessment not started' },
  { value: 'test_incomplete', label: 'Test Incomplete — assessment started, not finished' },
];

export const RemindersPage = () => {
  const [segment, setSegment] = useState(SEGMENTS[0].value);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [showSendDialog, setShowSendDialog] = useState(false);

  const { users, totalCount, loading, refetch } = useReminderCandidates(segment);
  const { sendReminderEmails, loading: sending } = useSendReminderEmails();

  const selectedUserIds = Object.keys(rowSelection).filter((key) => rowSelection[key]);

  const handleSegmentChange = (value: string) => {
    setSegment(value);
    setRowSelection({});
  };

  const handleConfirmSend = async (customMessage: string) => {
    const userIds = selectedUserIds.map((index) => users[Number(index)]?.userId).filter(Boolean) as string[];

    await sendReminderEmails({
      userIds,
      reminderType: segment,
      customMessage: customMessage.trim() || undefined,
    });

    setShowSendDialog(false);
    setRowSelection({});
    refetch();
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reminder Emails</h1>
        <p className="text-muted-foreground mt-1">
          Pick a segment, select who to email, and send via the matching Postmark template.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Segment</CardTitle>
          <Select value={segment} onValueChange={handleSegmentChange}>
            <SelectTrigger className="w-[420px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SEGMENTS.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Candidates ({totalCount})</CardTitle>
          <Button
            onClick={() => setShowSendDialog(true)}
            disabled={selectedUserIds.length === 0}
            className="gap-2"
          >
            <Send className="h-4 w-4" />
            Send to {selectedUserIds.length} user{selectedUserIds.length === 1 ? '' : 's'}
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <Spinner className="h-8 w-8" />
            </div>
          ) : (
            <ReminderCandidatesTable
              data={users}
              rowSelection={rowSelection}
              onRowSelectionChange={setRowSelection}
            />
          )}
        </CardContent>
      </Card>

      <SendReminderDialog
        open={showSendDialog}
        onOpenChange={setShowSendDialog}
        onConfirm={handleConfirmSend}
        recipientCount={selectedUserIds.length}
        loading={sending}
      />
    </div>
  );
};
