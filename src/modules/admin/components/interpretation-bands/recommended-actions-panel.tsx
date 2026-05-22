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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { AssessmentTypeCode } from '@/modules/assessment/constants';
import {
  useCreateRecommendedAction,
  useDeleteRecommendedAction,
  useUpdateRecommendedAction,
  type BandScope,
  type InterpretationBandNode,
} from '@/modules/admin/hooks';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { EMPTY_ACTION_FORM } from './constants';
import type { ActionFormState } from './types';

export const RecommendedActionsPanel = ({
  assessmentType,
  band,
  bandScope,
}: {
  assessmentType: AssessmentTypeCode;
  band: InterpretationBandNode;
  bandScope: BandScope;
}) => {
  const { createRecommendedAction, loading: creating } = useCreateRecommendedAction(assessmentType);
  const { updateRecommendedAction, loading: updating } = useUpdateRecommendedAction(assessmentType);
  const { deleteRecommendedAction, loading: deleting } = useDeleteRecommendedAction(assessmentType);
  const [form, setForm] = useState<ActionFormState>(EMPTY_ACTION_FORM);
  const [editingActionId, setEditingActionId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ActionFormState>(EMPTY_ACTION_FORM);

  const actions = band.assessmentRecommendedActionsByInterpretationBandId.nodes;

  const helpText =
    bandScope === 'section' && 'sectionType' in band
      ? `Shown on the ${band.sectionType} insight page and eligible for result recommendations (max 5 across all dimensions).`
      : 'Focus for Growth bullets on the PDF overall page and recommendations page (3rd block).';

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createRecommendedAction({
      interpretationBandId: band.id,
      actionText: form.actionText.trim(),
      priority: parseInt(form.priority, 10),
    });
    setForm(EMPTY_ACTION_FORM);
  };

  const handleSaveEdit = async (actionId: string) => {
    await updateRecommendedAction({
      id: actionId,
      actionText: editForm.actionText.trim(),
      priority: parseInt(editForm.priority, 10),
    });
    setEditingActionId(null);
  };

  return (
    <div className="space-y-4 border-t pt-4">
      <div>
        <h4 className="text-sm font-medium">
          {bandScope === 'overall' ? 'Focus for Growth Actions' : 'Recommended Actions'}
        </h4>
        <p className="text-xs text-muted-foreground mt-1">{helpText}</p>
      </div>

      {actions.length === 0 ? (
        <p className="text-sm text-muted-foreground">No actions yet.</p>
      ) : (
        <ul className="space-y-2">
          {actions.map((action) => (
            <li
              key={action.id}
              className={cn('rounded-md border p-3 space-y-2', !action.isActive && 'opacity-60')}
            >
              {editingActionId === action.id ? (
                <div className="space-y-2">
                  <Textarea
                    value={editForm.actionText}
                    onChange={(e) => setEditForm({ ...editForm, actionText: e.target.value })}
                    aria-label="Edit action text"
                  />
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`edit-priority-${action.id}`} className="text-xs shrink-0">
                      Priority
                    </Label>
                    <Input
                      id={`edit-priority-${action.id}`}
                      type="number"
                      min={1}
                      value={editForm.priority}
                      onChange={(e) => setEditForm({ ...editForm, priority: e.target.value })}
                      className="w-20"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleSaveEdit(action.id)} disabled={updating}>
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setEditingActionId(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{action.actionText}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Priority {action.priority}
                      {!action.isActive && ' · Inactive'}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Switch
                      checked={action.isActive}
                      onCheckedChange={() =>
                        updateRecommendedAction({ id: action.id, isActive: !action.isActive })
                      }
                      aria-label="Toggle action active state"
                      disabled={updating}
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setEditingActionId(action.id);
                        setEditForm({
                          actionText: action.actionText,
                          priority: String(action.priority),
                        });
                      }}
                      aria-label="Edit recommended action"
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="icon" variant="ghost" aria-label="Delete recommended action">
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete recommended action?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This removes the action from future reports.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteRecommendedAction({ id: action.id })}
                            disabled={deleting}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleCreate} className="space-y-3 border rounded-md p-3 bg-muted/30">
        <Label htmlFor={`new-action-${band.id}`}>Add action</Label>
        <Textarea
          id={`new-action-${band.id}`}
          value={form.actionText}
          onChange={(e) => setForm({ ...form, actionText: e.target.value })}
          required
        />
        <div className="flex items-center gap-2">
          <Label htmlFor={`new-priority-${band.id}`} className="text-xs shrink-0">
            Priority (1 = highest)
          </Label>
          <Input
            id={`new-priority-${band.id}`}
            type="number"
            min={1}
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
            className="w-20"
            required
          />
        </div>
        <Button type="submit" size="sm" disabled={creating}>
          {creating ? 'Adding...' : 'Add Action'}
        </Button>
      </form>
    </div>
  );
};
