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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Spinner } from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { AssessmentTypeCode } from '@/modules/assessment/constants';
import {
  useCreateInterpretationBand,
  useCreateRecommendedAction,
  useDeleteInterpretationBand,
  useDeleteRecommendedAction,
  useInterpretationBands,
  useUpdateInterpretationBand,
  useUpdateRecommendedAction,
  type BandScope,
  type InterpretationBandNode,
  type OverallInterpretationBandNode,
  type SectionInterpretationBandNode,
  type SectionTypeKey,
} from '@/modules/admin/hooks';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type AssessmentTypePanelProps = {
  assessmentType: AssessmentTypeCode;
};

type BandFormState = {
  sectionType: string;
  rangeStart: string;
  rangeEnd: string;
  label: string;
  narrative: string;
  keyMindset: string;
  displayRangeLabel: string;
  displayOrder: string;
};

type ActionFormState = {
  actionText: string;
  priority: string;
};

type StagePreset = {
  label: string;
  rangeStart: number;
  rangeEnd: number;
  displayOrder: number;
  displayRangeLabel?: string;
};

const SECTION_TYPES: { key: SectionTypeKey; label: string }[] = [
  { key: 'psychological', label: 'Psychological Adaptation' },
  { key: 'social', label: 'Social Connection' },
  { key: 'mental', label: 'Mental Engagement' },
  { key: 'physical', label: 'Physical Wellness' },
  { key: 'lifestyle', label: 'Lifestyle Integration' },
];

const SECTION_STAGES: StagePreset[] = [
  { label: 'Vulnerable', rangeStart: 10, rangeEnd: 29, displayOrder: 1 },
  { label: 'Emerging', rangeStart: 30, rangeEnd: 49, displayOrder: 2 },
  { label: 'Developing', rangeStart: 50, rangeEnd: 69, displayOrder: 3 },
  { label: 'Proactive', rangeStart: 70, rangeEnd: 89, displayOrder: 4 },
  { label: 'Thriving', rangeStart: 90, rangeEnd: 100, displayOrder: 5 },
];

const OVERALL_STAGES: StagePreset[] = [
  { label: 'Vulnerable', rangeStart: 50, rangeEnd: 100, displayOrder: 1, displayRangeLabel: '50–149' },
  { label: 'Emerging', rangeStart: 101, rangeEnd: 200, displayOrder: 2, displayRangeLabel: '150–249' },
  { label: 'Developing', rangeStart: 201, rangeEnd: 300, displayOrder: 3, displayRangeLabel: '250–349' },
  { label: 'Proactive', rangeStart: 301, rangeEnd: 400, displayOrder: 4, displayRangeLabel: '350–449' },
  { label: 'Thriving', rangeStart: 401, rangeEnd: 500, displayOrder: 5, displayRangeLabel: '450–500' },
];

const EMPTY_BAND_FORM: BandFormState = {
  sectionType: '',
  rangeStart: '',
  rangeEnd: '',
  label: '',
  narrative: '',
  keyMindset: '',
  displayRangeLabel: '',
  displayOrder: '',
};

const EMPTY_ACTION_FORM: ActionFormState = {
  actionText: '',
  priority: '1',
};

const ADMIN_FOOTER_NOTE =
  'Section body text is saved on the user\'s result at completion. Recommended actions and overall band content update immediately when PDFs are regenerated.';

const SECTION_AFFECTS = [
  'PDF insight body (new completions)',
  'PDF actions (immediate regen)',
  'Email',
  'Results',
];

const OVERALL_AFFECTS = [
  'PDF overall body/focus/mindset (immediate regen)',
  'Email TRI (new completions)',
  'Results',
];

const BandAffectsChips = ({ bandScope }: { bandScope: BandScope }) => {
  const items = bandScope === 'section' ? SECTION_AFFECTS : OVERALL_AFFECTS;
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <Badge key={item} variant="secondary" className="text-xs font-normal">
          {item}
        </Badge>
      ))}
    </div>
  );
};

const RecommendedActionsPanel = ({
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

const BandEditForm = ({
  bandScope,
  assessmentType,
  editingBand,
  preset,
  onCancel,
  onSuccess,
}: {
  bandScope: BandScope;
  assessmentType: AssessmentTypeCode;
  editingBand: InterpretationBandNode | null;
  preset?: Partial<BandFormState>;
  onCancel: () => void;
  onSuccess: () => void;
}) => {
  const { createInterpretationBand, loading: creating } =
    useCreateInterpretationBand(assessmentType);
  const { updateInterpretationBand, loading: updating } =
    useUpdateInterpretationBand(assessmentType);
  const { deleteInterpretationBand, loading: deleting } =
    useDeleteInterpretationBand(assessmentType);

  const [form, setForm] = useState<BandFormState>(EMPTY_BAND_FORM);

  useEffect(() => {
    if (editingBand) {
      setForm({
        sectionType: 'sectionType' in editingBand ? (editingBand.sectionType ?? '') : '',
        rangeStart: String(editingBand.rangeStart),
        rangeEnd: String(editingBand.rangeEnd),
        label: editingBand.label,
        narrative: editingBand.narrative,
        keyMindset: 'keyMindset' in editingBand ? (editingBand.keyMindset ?? '') : '',
        displayRangeLabel:
          'displayRangeLabel' in editingBand ? (editingBand.displayRangeLabel ?? '') : '',
        displayOrder: String(editingBand.displayOrder),
      });
      return;
    }
    if (preset) {
      setForm({ ...EMPTY_BAND_FORM, ...preset });
      return;
    }
    setForm(EMPTY_BAND_FORM);
  }, [editingBand, preset]);

  const isOverall = bandScope === 'overall';
  const isSection = bandScope === 'section';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingBand) {
      await updateInterpretationBand({
        id: editingBand.id,
        rangeStart: parseInt(form.rangeStart, 10),
        rangeEnd: parseInt(form.rangeEnd, 10),
        label: form.label.trim(),
        narrative: form.narrative,
        keyMindset: isOverall ? form.keyMindset.trim() || null : undefined,
        displayRangeLabel: isOverall ? form.displayRangeLabel.trim() || null : undefined,
        displayOrder: form.displayOrder ? parseInt(form.displayOrder, 10) : undefined,
      });
    } else {
      await createInterpretationBand({
        assessmentType,
        bandScope,
        sectionType: isSection ? form.sectionType : undefined,
        rangeStart: parseInt(form.rangeStart, 10),
        rangeEnd: parseInt(form.rangeEnd, 10),
        label: form.label.trim(),
        narrative: form.narrative,
        keyMindset: isOverall ? form.keyMindset.trim() || undefined : undefined,
        displayRangeLabel: isOverall ? form.displayRangeLabel.trim() || undefined : undefined,
        displayOrder: form.displayOrder ? parseInt(form.displayOrder, 10) : undefined,
      });
    }

    onSuccess();
  };

  const handleDelete = async () => {
    if (!editingBand) return;
    await deleteInterpretationBand({ id: editingBand.id });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <BandAffectsChips bandScope={bandScope} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isSection && (
          <div className="md:col-span-2">
            <Label htmlFor="band-section-type">Dimension</Label>
            <Select
              value={form.sectionType}
              onValueChange={(value) => setForm({ ...form, sectionType: value })}
              disabled={!!editingBand}
            >
              <SelectTrigger id="band-section-type" className="mt-2 w-full">
                <SelectValue placeholder="Select dimension" />
              </SelectTrigger>
              <SelectContent>
                {SECTION_TYPES.map((section) => (
                  <SelectItem key={section.key} value={section.key}>
                    {section.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              Which dimension this interpretation applies to.
            </p>
          </div>
        )}

        <div>
          <Label htmlFor="band-label">Stage name</Label>
          <Input
            id="band-label"
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
            className="mt-2"
            required
          />
        </div>
        <div>
          <Label htmlFor="band-display-order">Display order</Label>
          <Input
            id="band-display-order"
            type="number"
            min={1}
            value={form.displayOrder}
            onChange={(e) => setForm({ ...form, displayOrder: e.target.value })}
            className="mt-2"
            placeholder="Auto"
          />
        </div>
        <div>
          <Label htmlFor="band-start">Completion range start</Label>
          <Input
            id="band-start"
            type="number"
            value={form.rangeStart}
            onChange={(e) => setForm({ ...form, rangeStart: e.target.value })}
            className="mt-2"
            required
          />
        </div>
        <div>
          <Label htmlFor="band-end">Completion range end</Label>
          <Input
            id="band-end"
            type="number"
            value={form.rangeEnd}
            onChange={(e) => setForm({ ...form, rangeEnd: e.target.value })}
            className="mt-2"
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            {isSection ? 'Per-dimension score (10–100).' : 'Total readiness index (50–500).'}
          </p>
        </div>

        {isOverall && (
          <div className="md:col-span-2">
            <Label htmlFor="band-display-range">PDF display range</Label>
            <Input
              id="band-display-range"
              value={form.displayRangeLabel}
              onChange={(e) => setForm({ ...form, displayRangeLabel: e.target.value })}
              className="mt-2"
              placeholder="e.g. 350–449"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Score range shown on the PDF report. Separate from the completion scoring range.
            </p>
          </div>
        )}

        <div className="md:col-span-2">
          <Label htmlFor="band-narrative">Interpretation text</Label>
          <Textarea
            id="band-narrative"
            value={form.narrative}
            onChange={(e) => setForm({ ...form, narrative: e.target.value })}
            className="mt-2 min-h-40 font-mono text-sm"
            placeholder="Separate paragraphs with a blank line."
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            Main report text. Use a blank line between paragraphs.
          </p>
        </div>

        {isOverall && (
          <div className="md:col-span-2">
            <Label htmlFor="band-key-mindset">Key mindset quote</Label>
            <Textarea
              id="band-key-mindset"
              value={form.keyMindset}
              onChange={(e) => setForm({ ...form, keyMindset: e.target.value })}
              className="mt-2"
            />
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={creating || updating || (isSection && !form.sectionType)}>
          {creating || updating ? 'Saving...' : editingBand ? 'Save Changes' : 'Create Band'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        {editingBand && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type="button" variant="destructive" disabled={deleting}>
                Delete Band
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete interpretation band?</AlertDialogTitle>
                <AlertDialogDescription>
                  Prefer deactivating if past results reference this band.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={deleting}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </form>
  );
};

const BandEditSheet = ({
  open,
  onOpenChange,
  assessmentType,
  bandScope,
  band,
  preset,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assessmentType: AssessmentTypeCode;
  bandScope: BandScope;
  band: InterpretationBandNode | null;
  preset?: Partial<BandFormState>;
  onSaved: () => void;
}) => {
  const title = band
    ? `${band.label}${
        'sectionType' in band && band.sectionType ? ` · ${band.sectionType}` : ''
      }`
    : 'Create band';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            {bandScope === 'section'
              ? 'Dimension-specific interpretation and recommended actions.'
              : 'Overall TRI interpretation, PDF display range, and Focus for Growth actions.'}
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 pb-8 space-y-6">
          <BandEditForm
            bandScope={bandScope}
            assessmentType={assessmentType}
            editingBand={band}
            preset={preset}
            onCancel={() => onOpenChange(false)}
            onSuccess={() => {
              onSaved();
              onOpenChange(false);
            }}
          />
          {band && (
            <RecommendedActionsPanel
              assessmentType={assessmentType}
              band={band}
              bandScope={bandScope}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

const SectionBandMatrix = ({ assessmentType }: { assessmentType: AssessmentTypeCode }) => {
  const { sectionBands, loading, refetch } = useInterpretationBands(assessmentType);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedBand, setSelectedBand] = useState<SectionInterpretationBandNode | null>(null);
  const [preset, setPreset] = useState<Partial<BandFormState> | undefined>();

  const bandMap = useMemo(() => {
    const map = new Map<string, SectionInterpretationBandNode>();
    sectionBands.forEach((band) => {
      if (band.sectionType) {
        map.set(`${band.sectionType}:${band.label}`, band);
      }
    });
    return map;
  }, [sectionBands]);

  const handleCellClick = (sectionType: SectionTypeKey, stage: StagePreset) => {
    const existing = bandMap.get(`${sectionType}:${stage.label}`);
    setSelectedBand(existing ?? null);
    setPreset(
      existing
        ? undefined
        : {
            sectionType,
            label: stage.label,
            rangeStart: String(stage.rangeStart),
            rangeEnd: String(stage.rangeEnd),
            displayOrder: String(stage.displayOrder),
            narrative: '',
          }
    );
    setSheetOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <>
      <p className="text-sm text-muted-foreground mb-4">
        {sectionBands.length} section bands configured (expected 25). Each dimension has its own
        narrative per stage.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="text-left p-2 font-medium text-muted-foreground">Dimension</th>
              {SECTION_STAGES.map((stage) => (
                <th key={stage.label} className="p-2 font-medium text-center">
                  {stage.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SECTION_TYPES.map((section) => (
              <tr key={section.key} className="border-t">
                <td className="p-2 font-medium align-top">{section.label}</td>
                {SECTION_STAGES.map((stage) => {
                  const band = bandMap.get(`${section.key}:${stage.label}`);
                  return (
                    <td key={stage.label} className="p-1">
                      <button
                        type="button"
                        onClick={() => handleCellClick(section.key, stage)}
                        className={cn(
                          'w-full rounded-md border p-2 text-left transition-colors hover:bg-muted/60 min-h-[72px]',
                          band ? 'border-primary/30 bg-primary/5' : 'border-dashed text-muted-foreground',
                          band && !band.isActive && 'opacity-50'
                        )}
                        aria-label={`Edit ${section.label} ${stage.label} band`}
                      >
                        {band ? (
                          <>
                            <span className="font-medium block">{stage.label}</span>
                            <span className="text-xs text-muted-foreground line-clamp-2 mt-1">
                              {band.narrative.split('\n\n')[0] || 'No narrative'}
                            </span>
                          </>
                        ) : (
                          <span className="text-xs">+ Add</span>
                        )}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BandEditSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        assessmentType={assessmentType}
        bandScope="section"
        band={selectedBand}
        preset={preset}
        onSaved={refetch}
      />
    </>
  );
};

const OverallBandPanel = ({ assessmentType }: { assessmentType: AssessmentTypeCode }) => {
  const { overallBands, loading, refetch } = useInterpretationBands(assessmentType);
  const { updateInterpretationBand, loading: updating } =
    useUpdateInterpretationBand(assessmentType);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedBand, setSelectedBand] = useState<OverallInterpretationBandNode | null>(null);
  const [preset, setPreset] = useState<Partial<BandFormState> | undefined>();

  const handleEdit = (band: OverallInterpretationBandNode) => {
    setSelectedBand(band);
    setPreset(undefined);
    setSheetOpen(true);
  };

  const handleCreate = (stage?: StagePreset) => {
    setSelectedBand(null);
    setPreset(
      stage
        ? {
            label: stage.label,
            rangeStart: String(stage.rangeStart),
            rangeEnd: String(stage.rangeEnd),
            displayOrder: String(stage.displayOrder),
            displayRangeLabel: stage.displayRangeLabel ?? '',
            narrative: '',
          }
        : undefined
    );
    setSheetOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <p className="text-sm text-muted-foreground">
          {overallBands.length} overall bands (expected 5). Completion ranges differ from PDF
          display ranges.
        </p>
        <Button variant="outline" onClick={() => handleCreate()}>
          <Plus className="size-4 mr-2" />
          Add Band
        </Button>
      </div>

      {overallBands.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          No overall bands configured.{' '}
          {OVERALL_STAGES.map((stage) => (
            <Button
              key={stage.label}
              variant="link"
              className="px-1"
              onClick={() => handleCreate(stage)}
            >
              Add {stage.label}
            </Button>
          ))}
        </Card>
      ) : (
        <ul className="space-y-3">
          {overallBands.map((band) => (
            <li key={band.id}>
              <Card className={cn('p-4', !band.isActive && 'opacity-60')}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold">{band.label}</span>
                      <Badge variant="outline">
                        Completion: {band.rangeStart}–{band.rangeEnd}
                      </Badge>
                      {band.displayRangeLabel && (
                        <Badge variant="secondary">PDF: {band.displayRangeLabel}</Badge>
                      )}
                      {!band.isActive && <Badge variant="secondary">Inactive</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2 whitespace-pre-wrap">
                      {band.narrative.split('\n\n')[0]}
                    </p>
                    {band.keyMindset && (
                      <p className="text-xs italic text-muted-foreground mt-2">{band.keyMindset}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Switch
                      checked={band.isActive}
                      onCheckedChange={() =>
                        updateInterpretationBand({ id: band.id, isActive: !band.isActive })
                      }
                      aria-label={`Toggle ${band.label} active state`}
                      disabled={updating}
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEdit(band)}
                      aria-label={`Edit ${band.label} band`}
                    >
                      <Pencil className="size-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}

      <BandEditSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        assessmentType={assessmentType}
        bandScope="overall"
        band={selectedBand}
        preset={preset}
        onSaved={refetch}
      />
    </>
  );
};

export const InterpretationBandManager = ({ assessmentType }: AssessmentTypePanelProps) => {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="font-semibold text-lg">Interpretation Bands</h3>
        <p className="text-sm text-muted-foreground mt-1">
          25 dimension-specific section bands and 5 overall bands for{' '}
          {assessmentType.toUpperCase()}.
        </p>
      </div>

      <Tabs defaultValue="section">
        <TabsList>
          <TabsTrigger value="section">Section bands (25)</TabsTrigger>
          <TabsTrigger value="overall">Overall bands (5)</TabsTrigger>
        </TabsList>
        <TabsContent value="section" className="mt-4">
          <SectionBandMatrix assessmentType={assessmentType} />
        </TabsContent>
        <TabsContent value="overall" className="mt-4">
          <OverallBandPanel assessmentType={assessmentType} />
        </TabsContent>
      </Tabs>

      <p className="text-xs text-muted-foreground border-t mt-6 pt-4">{ADMIN_FOOTER_NOTE}</p>
    </Card>
  );
};
