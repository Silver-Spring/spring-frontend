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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { AssessmentTypeCode } from '@/modules/assessment/constants';
import {
  buildAssessmentHref,
  useAdminAssessmentTypes,
  useAssessmentSectionPresets,
  useCreateAssessmentSection,
  useDeactivateAssessmentSection,
  useDeleteAssessmentSection,
  useSeedAssessmentTypeContent,
  useSeedAssessmentTypeSections,
} from '@/modules/admin/hooks';
import { getDefaultTemplateCode } from '@/modules/admin/lib/assessment-type-lifecycle';
import Link from 'next/link';
import { CircleAlert } from 'lucide-react';
import {
  useBulkCreateQuestions,
  useCreateQuestion,
  useDeleteQuestion,
  useGetSectionQuestions,
  useGetSections,
  useUpdateQuestion,
  useUpdateSection,
} from '@/modules/assessment/hooks';
import { useEffect, useMemo, useState } from 'react';

type AssessmentContentManagerProps = {
  assessmentType: AssessmentTypeCode;
};

export const AssessmentContentManager = ({ assessmentType }: AssessmentContentManagerProps) => {
  const { assessmentTypes } = useAdminAssessmentTypes();
  const typeInfo = assessmentTypes.find((type) => type.code === assessmentType);
  const isDraft = typeInfo ? !typeInfo.isActive : false;
  const targetSectionCount = typeInfo?.sectionCount ?? 0;

  const {
    sections,
    loading: sectionsLoading,
  } = useGetSections(assessmentType);
  const { presets, loading: presetsLoading } = useAssessmentSectionPresets();
  const { updateSection, loading: updatingSection } = useUpdateSection(assessmentType);
  const { createAssessmentSection, loading: creatingSection } = useCreateAssessmentSection();
  const { deactivateAssessmentSection, loading: deactivatingSection } =
    useDeactivateAssessmentSection(assessmentType);
  const { deleteAssessmentSection, loading: deletingSection } =
    useDeleteAssessmentSection(assessmentType);
  const { seedAssessmentTypeSections, loading: seedingSections } =
    useSeedAssessmentTypeSections();
  const { seedAssessmentTypeContent, loading: seedingBands } = useSeedAssessmentTypeContent();

  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const {
    questions,
    loading: questionsLoading,
    refetch: refetchQuestions,
  } = useGetSectionQuestions(selectedSectionId);
  const { createQuestion, loading: creating } = useCreateQuestion();
  const { bulkCreateQuestions, loading: bulkCreating } = useBulkCreateQuestions();
  const { updateQuestion, loading: updatingQuestion } = useUpdateQuestion();
  const { deleteQuestion, loading: deleting } = useDeleteQuestion();

  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [sectionForm, setSectionForm] = useState({ id: '', name: '', description: '' });
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [questionForm, setQuestionForm] = useState({
    id: '',
    questionText: '',
    displayOrder: 1,
    isActive: true,
  });
  const [newQuestionText, setNewQuestionText] = useState('');
  const [bulkText, setBulkText] = useState('');
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [addSectionOpen, setAddSectionOpen] = useState(false);
  const [selectedPresetType, setSelectedPresetType] = useState('');
  const [seedTemplateCode, setSeedTemplateCode] = useState('ssri');
  const [sectionToDeactivate, setSectionToDeactivate] = useState<string | null>(null);
  const [questionToDeleteId, setQuestionToDeleteId] = useState<string | null>(null);

  const questionsPerSectionTarget = typeInfo?.questionsPerSection ?? 0;

  const bandTemplateOptions = useMemo(
    () => assessmentTypes.filter((type) => type.code !== assessmentType && type.isActive),
    [assessmentTypes, assessmentType]
  );

  const activeSectionCount = useMemo(
    () => sections.filter((section) => section.isActive).length,
    [sections]
  );

  const showOverCapSections =
    isDraft && targetSectionCount > 0 && activeSectionCount > targetSectionCount;

  const usedSectionTypes = useMemo(
    () => new Set(sections.map((section) => String(section.type))),
    [sections]
  );

  const availablePresets = useMemo(
    () => presets.filter((preset) => !usedSectionTypes.has(String(preset.type))),
    [presets, usedSectionTypes]
  );

  const canAddSection = isDraft && activeSectionCount < targetSectionCount && availablePresets.length > 0;

  useEffect(() => {
    setSelectedSectionId(null);
    setEditingSectionId(null);
    setEditingQuestionId(null);
    setShowBulkImport(false);
    setAddSectionOpen(false);
  }, [assessmentType]);

  useEffect(() => {
    if (!selectedSectionId && sections.length > 0) {
      const firstActive = sections.find((section) => section.isActive);
      setSelectedSectionId(firstActive?.id ?? sections[0].id);
    }
  }, [sections, selectedSectionId]);

  useEffect(() => {
    if (availablePresets.length === 0) {
      setSelectedPresetType('');
      return;
    }
    setSelectedPresetType((current) => {
      if (availablePresets.some((preset) => preset.type === current)) return current;
      return availablePresets[0].type;
    });
  }, [availablePresets]);

  useEffect(() => {
    if (bandTemplateOptions.length === 0) return;
    setSeedTemplateCode((current) => {
      if (bandTemplateOptions.some((type) => type.code === current)) return current;
      return getDefaultTemplateCode(bandTemplateOptions);
    });
  }, [bandTemplateOptions]);

  const selectedSection = sections.find((section) => section.id === selectedSectionId);
  const selectedPreset = presets.find((preset) => preset.type === selectedPresetType);

  const activeQuestionsInSection = useMemo(
    () => questions.filter((question) => question.isActive).length,
    [questions]
  );

  const handleSectionUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSection({ ...sectionForm, isActive: true });
    setEditingSectionId(null);
  };

  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSectionId) return;
    await createQuestion({ sectionId: selectedSectionId, questionText: newQuestionText });
    setNewQuestionText('');
    refetchQuestions();
  };

  const handleBulkImport = async () => {
    if (!selectedSectionId) return;
    const lines = bulkText.split('\n').filter((line) => line.trim());
    await bulkCreateQuestions({
      sectionId: selectedSectionId,
      questions: lines.map((line) => ({ questionText: line.trim() })),
    });
    setBulkText('');
    setShowBulkImport(false);
    refetchQuestions();
  };

  const handleQuestionUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateQuestion(questionForm);
    setEditingQuestionId(null);
    refetchQuestions();
  };

  const handleDeleteQuestion = async () => {
    if (!questionToDeleteId) return;
    await deleteQuestion(questionToDeleteId);
    setQuestionToDeleteId(null);
    refetchQuestions();
  };

  const handleSeedSections = async () => {
    const seedResult = await seedAssessmentTypeSections({ assessmentTypeCode: assessmentType });
    if (!seedResult?.success) return;

    await seedAssessmentTypeContent({
      assessmentTypeCode: assessmentType,
      templateCode: seedTemplateCode,
      cloneBands: true,
      cloneTemplateContent: false,
    });
  };

  const handleAddSection = async () => {
    if (!selectedPreset) return;
    const result = await createAssessmentSection({
      assessmentTypeCode: assessmentType,
      type: selectedPreset.type,
      name: selectedPreset.name,
      description: selectedPreset.description ?? undefined,
    });
    if (result?.success) {
      setAddSectionOpen(false);
    }
  };

  const handleReactivateSection = async (sectionId: string) => {
    await updateSection({ id: sectionId, isActive: true });
  };

  const handleConfirmDeactivateSection = async () => {
    if (!sectionToDeactivate) return;
    await deactivateAssessmentSection({ id: sectionToDeactivate });
    if (selectedSectionId === sectionToDeactivate) {
      setSelectedSectionId(null);
    }
    setSectionToDeactivate(null);
  };

  const handleDeleteSection = async (sectionId: string) => {
    const result = await deleteAssessmentSection({ id: sectionId });
    if (result?.success && selectedSectionId === sectionId) {
      setSelectedSectionId(null);
    }
  };

  const seeding = seedingSections || seedingBands;

  if (sectionsLoading) {
    return (
      <Card className="p-8">
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Spinner className="size-4" />
          Loading content...
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {showOverCapSections && (
        <Alert variant="destructive">
          <CircleAlert />
          <AlertTitle>Too many active sections</AlertTitle>
          <AlertDescription className="space-y-2">
            <p>
              This type has {activeSectionCount} active sections but the target is{' '}
              {targetSectionCount}. Readiness will fail until you deactivate or remove{' '}
              {activeSectionCount - targetSectionCount} section
              {activeSectionCount - targetSectionCount === 1 ? '' : 's'}.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="link" className="h-auto p-0" asChild>
                <Link href={buildAssessmentHref('settings', assessmentType)}>
                  Adjust target in Settings
                </Link>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Content Editor</h2>
          <p className="text-sm text-muted-foreground">
            Manage sections and questions for {assessmentType.toUpperCase()}.
            {isDraft && targetSectionCount > 0 && (
              <>
                {' '}
                Readiness target: {targetSectionCount} active section
                {targetSectionCount === 1 ? '' : 's'} ({activeSectionCount} active now).
              </>
            )}
          </p>
        </div>
        {isDraft && (
          <div className="flex flex-wrap gap-2">
            {sections.length === 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleSeedSections}
                disabled={seeding}
              >
                {seeding ? 'Seeding...' : 'Seed preset sections'}
              </Button>
            )}
            <Button type="button" onClick={() => setAddSectionOpen(true)} disabled={!canAddSection}>
              Add section
            </Button>
          </div>
        )}
      </div>

      {sections.length === 0 ? (
        <Card className="p-8 text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            No sections yet for this type.
            {isDraft
              ? ' Seed the first N preset dimensions (from Settings target), then clone bands from SSRI.'
              : ' Sections can only be added on draft types.'}
          </p>
          {isDraft && (
            <div className="space-y-4 max-w-sm mx-auto">
              {bandTemplateOptions.length > 0 && (
                <div className="space-y-2 text-left">
                  <Label htmlFor="seed-band-template">Clone bands from</Label>
                  <Select value={seedTemplateCode} onValueChange={setSeedTemplateCode}>
                    <SelectTrigger id="seed-band-template" aria-label="Band template type">
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      {bandTemplateOptions.map((type) => (
                        <SelectItem key={type.code} value={type.code}>
                          {type.name} ({type.code.toUpperCase()})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="flex flex-wrap justify-center gap-2">
                <Button type="button" onClick={handleSeedSections} disabled={seeding || bandTemplateOptions.length === 0}>
                  {seeding ? 'Seeding...' : 'Seed preset sections + bands'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setAddSectionOpen(true)}
                  disabled={!canAddSection}
                >
                  Add section manually
                </Button>
              </div>
            </div>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 min-h-[480px]">
          <Card className="p-0 overflow-hidden">
            <div className="px-4 py-3 border-b">
              <p className="text-sm font-medium">
                Sections ({activeSectionCount} active / {sections.length} total)
              </p>
            </div>
            <ScrollArea className="h-[420px]">
              <div className="p-2 space-y-1">
                {sections.map((section) => (
                  <div key={section.id}>
                    {editingSectionId === section.id ? (
                      <form
                        onSubmit={handleSectionUpdate}
                        className="p-3 space-y-2 rounded-md bg-muted/40"
                      >
                        <Input
                          value={sectionForm.name}
                          onChange={(e) => setSectionForm({ ...sectionForm, name: e.target.value })}
                          placeholder="Section name"
                          required
                        />
                        <Input
                          value={sectionForm.description}
                          onChange={(e) =>
                            setSectionForm({ ...sectionForm, description: e.target.value })
                          }
                          placeholder="Description"
                        />
                        <div className="flex gap-2">
                          <Button type="submit" size="sm" disabled={updatingSection}>
                            Save
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingSectionId(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <div
                        className={cn(
                          'rounded-md group',
                          !section.isActive && 'opacity-70',
                          selectedSectionId === section.id && 'bg-primary/10'
                        )}
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedSectionId(section.id)}
                          className={cn(
                            'w-full rounded-md px-3 py-2.5 text-left transition-colors',
                            selectedSectionId !== section.id && 'hover:bg-muted/60'
                          )}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="text-sm font-medium truncate">{section.name}</p>
                              <p className="text-xs text-muted-foreground">{section.type}</p>
                            </div>
                            {!section.isActive && (
                              <Badge variant="secondary" className="text-[10px] shrink-0">
                                Inactive
                              </Badge>
                            )}
                          </div>
                        </button>
                        <div className="px-3 pb-2 flex flex-wrap gap-1">
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="h-6 px-2 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingSectionId(section.id);
                              setSectionForm({
                                id: section.id,
                                name: section.name,
                                description: section.description || '',
                              });
                            }}
                          >
                            Edit
                          </Button>
                          {isDraft && section.isActive && (
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              className="h-6 px-2 text-xs"
                              onClick={() => setSectionToDeactivate(section.id)}
                              disabled={deactivatingSection}
                            >
                              Deactivate
                            </Button>
                          )}
                          {isDraft && !section.isActive && (
                            <>
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                className="h-6 px-2 text-xs"
                                onClick={() => handleReactivateSection(section.id)}
                                disabled={updatingSection}
                              >
                                Reactivate
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant="ghost"
                                    className="h-6 px-2 text-xs text-destructive hover:text-destructive"
                                    disabled={deletingSection}
                                  >
                                    Remove
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Remove section permanently?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Deletes {section.name}. Only allowed when the section has no
                                      questions and no historical results. Orphan bands may remain
                                      in Scoring until cleaned up.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteSection(section.id)}
                                    >
                                      Remove permanently
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>

          <Card className="p-0 overflow-hidden flex flex-col">
            {selectedSection ? (
              <>
                <div className="px-4 py-3 border-b flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium">{selectedSection.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {questionsLoading
                        ? '...'
                        : questionsPerSectionTarget > 0
                          ? `${activeQuestionsInSection}/${questionsPerSectionTarget} active questions (${questions.length} total)`
                          : `${questions.length} questions`}
                      {!selectedSection.isActive && ' · Section is inactive'}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {isDraft &&
                      !questionsLoading &&
                      questions.length === 0 &&
                      selectedSection.isActive && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button type="button" variant="outline" size="sm" disabled={deletingSection}>
                              Remove section
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Remove section permanently?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Deletes {selectedSection.name}. This cannot be undone if the section
                                has historical assessment results.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteSection(selectedSection.id)}
                              >
                                Remove permanently
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    {selectedSection.isActive && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowBulkImport((prev) => !prev)}
                      >
                        {showBulkImport ? 'Cancel import' : 'Bulk import'}
                      </Button>
                    )}
                  </div>
                </div>

                {!selectedSection.isActive ? (
                  <div className="flex-1 flex items-center justify-center p-8 text-sm text-muted-foreground text-center">
                    This section is inactive. Reactivate it from the sidebar to manage questions, or
                    remove it if it has no questions or results.
                  </div>
                ) : (
                  <ScrollArea className="flex-1 h-[360px]">
                    <div className="p-4 space-y-4">
                      <form onSubmit={handleCreateQuestion} className="flex gap-2">
                        <Input
                          value={newQuestionText}
                          onChange={(e) => setNewQuestionText(e.target.value)}
                          placeholder="Add a new question..."
                          className="flex-1"
                          required
                        />
                        <Button type="submit" disabled={creating || !newQuestionText.trim()}>
                          Add
                        </Button>
                      </form>

                      {showBulkImport && (
                        <div className="space-y-2 rounded-lg border p-3 bg-muted/20">
                          <Label htmlFor="bulk-import">One question per line</Label>
                          <Textarea
                            id="bulk-import"
                            value={bulkText}
                            onChange={(e) => setBulkText(e.target.value)}
                            rows={5}
                            placeholder="Question one&#10;Question two"
                          />
                          <Button
                            type="button"
                            size="sm"
                            onClick={handleBulkImport}
                            disabled={bulkCreating || !bulkText.trim()}
                          >
                            Import {bulkText.split('\n').filter((l) => l.trim()).length} questions
                          </Button>
                        </div>
                      )}

                      <Separator />

                      {questionsLoading ? (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground py-8 justify-center">
                          <Spinner className="size-4" />
                          Loading questions...
                        </div>
                      ) : questions.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-8">
                          No questions yet. Add one above.
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {questions.map((question, index) => (
                            <div key={question.id} className="rounded-md border px-3 py-2.5 text-sm">
                              {editingQuestionId === question.id ? (
                                <form onSubmit={handleQuestionUpdate} className="space-y-2">
                                  <Textarea
                                    value={questionForm.questionText}
                                    onChange={(e) =>
                                      setQuestionForm({
                                        ...questionForm,
                                        questionText: e.target.value,
                                      })
                                    }
                                    required
                                  />
                                  <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2">
                                      <Label htmlFor={`order-${question.id}`} className="text-xs">
                                        Order
                                      </Label>
                                      <Input
                                        id={`order-${question.id}`}
                                        type="number"
                                        className="w-20 h-8"
                                        value={questionForm.displayOrder}
                                        onChange={(e) =>
                                          setQuestionForm({
                                            ...questionForm,
                                            displayOrder: parseInt(e.target.value, 10),
                                          })
                                        }
                                        min={1}
                                      />
                                    </div>
                                    <label className="flex items-center gap-1.5 text-xs">
                                      <Checkbox
                                        checked={questionForm.isActive ?? false}
                                        onCheckedChange={(checked) =>
                                          setQuestionForm({
                                            ...questionForm,
                                            isActive: !!checked,
                                          })
                                        }
                                      />
                                      Active
                                    </label>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button type="submit" size="sm" disabled={updatingQuestion}>
                                      Save
                                    </Button>
                                    <Button
                                      type="button"
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => setEditingQuestionId(null)}
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </form>
                              ) : (
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex gap-2 min-w-0">
                                    <span className="text-muted-foreground shrink-0 w-6">
                                      {index + 1}.
                                    </span>
                                    <div>
                                      <p>{question.questionText}</p>
                                      {!question.isActive && (
                                        <Badge variant="secondary" className="mt-1 text-[10px]">
                                          Inactive
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex gap-1 shrink-0">
                                    <Button
                                      type="button"
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => {
                                        setEditingQuestionId(question.id);
                                        setQuestionForm({
                                          id: question.id,
                                          questionText: question.questionText,
                                          displayOrder: question.displayOrder,
                                          isActive: question.isActive,
                                        });
                                      }}
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      type="button"
                                      size="sm"
                                      variant="ghost"
                                      className="text-destructive hover:text-destructive"
                                      onClick={() => setQuestionToDeleteId(question.id)}
                                      disabled={deleting}
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-full p-8 text-sm text-muted-foreground">
                Select a section to manage questions
              </div>
            )}
          </Card>
        </div>
      )}

      <Dialog open={addSectionOpen} onOpenChange={setAddSectionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add section</DialogTitle>
            <DialogDescription>
              Choose an unused preset dimension. Creates the section and clones 5 stage bands from
              SSRI by default.
            </DialogDescription>
          </DialogHeader>
          {presetsLoading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
              <Spinner className="size-4" />
              Loading presets...
            </div>
          ) : availablePresets.length === 0 ? (
            <p className="text-sm text-muted-foreground py-2">
              {activeSectionCount >= targetSectionCount
                ? `Active section cap reached (${targetSectionCount}). Deactivate a section or raise the target in Settings.`
                : 'All preset dimensions are already used. Reactivate an inactive section instead of creating a duplicate type.'}
            </p>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="section-preset">Preset dimension</Label>
              <Select value={selectedPresetType} onValueChange={setSelectedPresetType}>
                <SelectTrigger id="section-preset" aria-label="Preset dimension">
                  <SelectValue placeholder="Select dimension" />
                </SelectTrigger>
                <SelectContent>
                  {availablePresets.map((preset) => (
                    <SelectItem key={preset.type} value={preset.type}>
                      {preset.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedPreset?.description && (
                <p className="text-xs text-muted-foreground">{selectedPreset.description}</p>
              )}
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setAddSectionOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAddSection}
              disabled={creatingSection || !selectedPreset || !canAddSection}
            >
              {creatingSection ? 'Adding...' : 'Add section'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={sectionToDeactivate != null}
        onOpenChange={(open) => {
          if (!open) setSectionToDeactivate(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deactivate section?</AlertDialogTitle>
            <AlertDialogDescription>
              The section will be hidden from the assessment flow and readiness checks. You can
              reactivate it later if the row still exists.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deactivatingSection}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={deactivatingSection}
              onClick={(event) => {
                event.preventDefault();
                void handleConfirmDeactivateSection();
              }}
            >
              {deactivatingSection ? 'Deactivating...' : 'Deactivate'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={questionToDeleteId != null}
        onOpenChange={(open) => {
          if (!open) setQuestionToDeleteId(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete question?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the question. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={deleting}
              onClick={(event) => {
                event.preventDefault();
                void handleDeleteQuestion();
              }}
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
