'use client';

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
import { IstDateTimePicker } from '@/modules/workshop/components/ist-date-time-picker';
import { useState } from 'react';
import { formatIst, peopleLabel } from '../lib/format';

type ScheduleDialogProps = {
  /** 'now' asks to send straight away; 'schedule' also asks for a time (IST). */
  mode: 'now' | 'schedule' | null;
  /** Audience size, or null while it is being counted. */
  count: number | null;
  initialSendAt?: string | null;
  onConfirm: (sendAt: string | null) => void;
  onClose: () => void;
};

const ScheduleDialogBody = ({ mode, count, initialSendAt, onConfirm, onClose }: ScheduleDialogProps) => {
  const [sendAt, setSendAt] = useState(initialSendAt ?? '');
  const people = count === null ? '…' : peopleLabel(count);
  const canConfirm = count !== null && (mode === 'now' || Boolean(sendAt));

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Send to {people}?</AlertDialogTitle>
        <AlertDialogDescription>
          {mode === 'now'
            ? 'It starts sending straight away. Emails can’t be unsent.'
            : sendAt
              ? `It sends on ${formatIst(sendAt)} (India time). You can cancel until then.`
              : 'Pick when to send it, in India time. You can cancel until then.'}
        </AlertDialogDescription>
      </AlertDialogHeader>
      {mode === 'schedule' && (
        <div className="space-y-2">
          <Label htmlFor="campaign-send-at">Send at (IST)</Label>
          <IstDateTimePicker id="campaign-send-at" value={sendAt} onChange={setSendAt} />
        </div>
      )}
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
        <AlertDialogAction
          disabled={!canConfirm}
          onClick={() => onConfirm(mode === 'now' ? null : sendAt)}
        >
          {mode === 'now' ? 'Send now' : 'Schedule'}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

/** Confirms "Send to N people?" before sending now or at a chosen IST time. */
export const ScheduleDialog = (props: ScheduleDialogProps) => (
  <AlertDialog open={props.mode !== null} onOpenChange={(open) => !open && props.onClose()}>
    {props.mode && <ScheduleDialogBody key={props.mode} {...props} />}
  </AlertDialog>
);
