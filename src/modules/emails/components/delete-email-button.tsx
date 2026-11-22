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
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useDeleteCampaign } from '../hooks/use-campaigns';
import { errorMessage } from '../lib/format';

type DeleteEmailButtonProps = {
  id: string;
  name: string;
  /** Icon only, for table rows. */
  compact?: boolean;
  onDeleted: () => void;
};

/** Deletes an email that never went out, after a confirmation. Show it only when canDeleteCampaign. */
export const DeleteEmailButton = ({ id, name, compact = false, onDeleted }: DeleteEmailButtonProps) => {
  const [deleteCampaign, { loading }] = useDeleteCampaign();
  const label = name || 'Untitled email';

  const handleDelete = async () => {
    try {
      await deleteCampaign({ variables: { id } });
      toast.success('Email deleted');
      onDeleted();
    } catch (error) {
      toast.error(errorMessage(error, 'Could not delete the email'));
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant={compact ? 'ghost' : 'outline'}
          size={compact ? 'icon' : 'sm'}
          className="gap-2 text-destructive hover:text-destructive"
          aria-label={`Delete ${label}`}
          disabled={loading}
        >
          <Trash2 className="size-4" />
          {!compact && 'Delete'}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="break-words">Delete &quot;{label}&quot;?</AlertDialogTitle>
          <AlertDialogDescription>
            This permanently deletes the email and can&apos;t be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep it</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
