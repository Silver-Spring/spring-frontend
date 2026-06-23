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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { AddSectionDialog } from '@/modules/admin/components/assessment/content/add-section-dialog';
import { SectionEditSheet } from '@/modules/admin/components/assessment/content/section-edit-sheet';
import { SectionListPanel } from '@/modules/admin/components/assessment/content/section-list-panel';
import { QuestionsPanel } from '@/modules/admin/components/assessment/content/questions-panel';
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
import { useReportPreviewRefresh } from '@/modules/admin/components/report-preview-context';
import { previewSlugFromName } from '@/modules/assessment/lib/section-display';
import Link from 'next/link';
import { CircleAlert } from 'lucide-react';
import { toast } from 'sonner';
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

  const { sections, loading: sectionsLoading } = useGetSections(assessmentType);
  const { presets, loading: presetsLoading } = useAssessmentSectionPresets();
  const { updateSection, loading: updatingSection } = useUpdateSection(assessmentType);
  const { createAssessmentSection, loading: creatingSection } = useCreateAssessmentSection();
  const { deactivateAssessmentSection, loading: deactivatingSection } =
    useDeactivateAssessmentSection(assessmentType);
  const { deleteAssessmentSection, loading: deletingSection } =
    useDeleteAssessmentSection(assessmentType);
  const { seedAssessmentTypeSections, loading: seedingSections } = useSeedAssessmentTypeSections();
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

  const [editingSection, setEditingSection] = useState<(typeof sections)[number] | null>(null);
  const [addSectionOpen, setAddSectionOpen] = useState(false);
  const [addSectionMode, setAddSectionMode] = useState<'custom' | 'preset'>('custom');
  const [customSectionForm, setCustomSectionForm] = useState<{
    name: string;
    slugOverride: string;
    emoji: string;
    displayColor: string;
    aboutDescription: string;
    subtitle: string;
    description: string;
    sectionCategory: 'scored' | 'profile';
  }>({
    name: '',
    slugOverride: '',
    emoji: '',
    displayColor: '#6366f1',
    aboutDescription: '',
    subtitle: '',
    description: '',
    sectionCategory: 'scored',
  });
  const [selectedPresetType, setSelectedPresetType] = useState('');
  const [seedTemplateCode, setSeedTemplateCode] = useState('ssri');
  const [sectionToDeactivate, setSectionToDeactivate] = useState<string | null>(null);
  const { bumpPreview } = useReportPreviewRefresh();

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

  const canAddSection = isDraft && activeSectionCount < targetSectionCount;

  const previewSlug = useMemo(() => {
    if (customSectionForm.slugOverride.trim()) {
      return customSectionForm.slugOverride.trim().toLowerCase();
    }
    return previewSlugFromName(customSectionForm.name);
  }, [customSectionForm.name, customSectionForm.slugOverride]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedSectionId(null);
    setEditingSection(null);
    setAddSectionOpen(false);
  }, [assessmentType]);

  useEffect(() => {
    if (!selectedSectionId && sections.length > 0) {
      const firstActive = sections.find((section) => section.isActive);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedSectionId(firstActive?.id ?? sections[0].id);
    }
  }, [sections, selectedSectionId]);

  useEffect(() => {
    if (availablePresets.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSeedTemplateCode((current) => {
      if (bandTemplateOptions.some((type) => type.code === current)) return current;
      return getDefaultTemplateCode(bandTemplateOptions);
    });
  }, [bandTemplateOptions]);

  const selectedSection = sections.find((section) => section.id === selectedSectionId);
  const selectedPreset = presets.find((preset) => preset.type === selectedPresetType);

  const handleSectionSave = async (values: {
    id: string;
    name: string;
    emoji?: string;
    displayColor?: string;
    aboutDescription?: string;
    subtitle?: string;
    description?: string;
  }) => {
    await updateSection(values);
    bumpPreview();
  };

  const handleOpenSectionEdit = (section: (typeof sections)[number]) => {
    setSelectedSectionId(section.id);
    setEditingSection(section);
  };

  const handleCreateQuestion = async (questionText: string) => {
    if (!selectedSectionId) return;
    await createQuestion({ sectionId: selectedSectionId, questionText });
    refetchQuestions();
  };

  const handleBulkImport = async (lines: string[]) => {
    if (!selectedSectionId) return;
    await bulkCreateQuestions({
      sectionId: selectedSectionId,
      questions: lines.map((line) => ({ questionText: line })),
    });
    refetchQuestions();
  };

  const handleUpdateQuestion = async (values: {
    id: string;
    questionText: string;
    displayOrder: number;
    isActive: boolean;
  }) => {
    await updateQuestion(values);
    refetchQuestions();
  };

  const handleDeleteQuestion = async (id: string) => {
    await deleteQuestion(id);
    refetchQuestions();
  };

  const handleReorderQuestions = async (updates: Array<{ id: string; displayOrder: number }>) => {
    await Promise.all(updates.map(({ id, displayOrder }) => updateQuestion({ id, displayOrder })));
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
    if (addSectionMode === 'preset') {
      if (!selectedPreset) return;
      const result = await createAssessmentSection({
        assessmentTypeCode: assessmentType,
        type: selectedPreset.type,
        name: selectedPreset.name,
        description: selectedPreset.description ?? undefined,
        emoji: selectedPreset.emoji ?? undefined,
        displayColor: selectedPreset.displayColor ?? undefined,
      });
      if (result?.success) {
        setAddSectionOpen(false);
        toast.message('Section created. Review band narratives in Scoring.', {
          action: {
            label: 'Open Score bands',
            onClick: () => {
              window.location.href = buildAssessmentHref('scoring', assessmentType);
            },
          },
        });
      }
      return;
    }

    if (!customSectionForm.name.trim()) return;

    const result = await createAssessmentSection({
      assessmentTypeCode: assessmentType,
      name: customSectionForm.name.trim(),
      aboutDescription: customSectionForm.aboutDescription.trim() || undefined,
      subtitle: customSectionForm.subtitle.trim() || undefined,
      description: customSectionForm.description.trim() || undefined,
      type: customSectionForm.slugOverride.trim() || undefined,
      emoji: customSectionForm.emoji.trim() || undefined,
      displayColor: customSectionForm.displayColor.trim() || undefined,
      sectionCategory: customSectionForm.sectionCategory,
      cloneBandsFromTemplate: customSectionForm.sectionCategory === 'profile' ? null : 'ssri',
    });

    if (result?.success) {
      setAddSectionOpen(false);
      setCustomSectionForm({
        name: '',
        slugOverride: '',
        emoji: '',
        displayColor: '#6366f1',
        aboutDescription: '',
        subtitle: '',
        description: '',
        sectionCategory: 'scored',
      });
      toast.message('Section created. Review band narratives in Scoring.', {
        action: {
          label: 'Open Score bands',
          onClick: () => {
            window.location.href = buildAssessmentHref('scoring', assessmentType);
          },
        },
      });
    }
  };

  const handleOpenAddSection = () => {
    setAddSectionMode('custom');
    setAddSectionOpen(true);
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
                  Adjust target in Type details
                </Link>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {isDraft && targetSectionCount > 0 ? (
            <Badge variant="outline">
              {activeSectionCount}/{targetSectionCount} sections
            </Badge>
          ) : (
            <Badge variant="outline">{sections.length} sections</Badge>
          )}
          {!isDraft ? <Badge variant="secondary">Live type</Badge> : null}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {isDraft && (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={handleSeedSections}
                disabled={seeding}
              >
                {seeding ? 'Seeding...' : 'Seed presets'}
              </Button>
              <Button type="button" onClick={handleOpenAddSection} disabled={!canAddSection}>
                Add section
              </Button>
            </>
          )}
        </div>
      </div>

      {sections.length === 0 ? (
        <Card className="p-8 text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            No sections yet for this type.
            {isDraft
              ? ' Seed preset sections (up to 5) or add custom sections manually, then clone bands from a template type.'
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
                <Button
                  type="button"
                  onClick={handleSeedSections}
                  disabled={seeding || bandTemplateOptions.length === 0}
                >
                  {seeding ? 'Seeding...' : 'Seed preset sections + bands'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleOpenAddSection}
                  disabled={!canAddSection}
                >
                  Add section manually
                </Button>
              </div>
            </div>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 lg:min-h-[calc(100vh-14rem)] lg:items-stretch">
          <SectionListPanel
            sections={sections}
            activeSectionCount={activeSectionCount}
            selectedSectionId={selectedSectionId}
            isDraft={isDraft}
            deactivatingSection={deactivatingSection}
            deletingSection={deletingSection}
            updatingSection={updatingSection}
            onSelectSection={setSelectedSectionId}
            onEditSection={(id) => {
              const section = sections.find((s) => s.id === id);
              if (section) handleOpenSectionEdit(section);
            }}
            onDeactivateSection={setSectionToDeactivate}
            onReactivateSection={handleReactivateSection}
            onDeleteSection={handleDeleteSection}
          />

          <QuestionsPanel
            section={selectedSection}
            questions={questions}
            questionsLoading={questionsLoading}
            questionsPerSectionTarget={questionsPerSectionTarget}
            isDraft={isDraft}
            creating={creating}
            bulkCreating={bulkCreating}
            updatingQuestion={updatingQuestion}
            deleting={deleting}
            deletingSection={deletingSection}
            onCreateQuestion={handleCreateQuestion}
            onBulkImport={handleBulkImport}
            onUpdateQuestion={handleUpdateQuestion}
            onReorderQuestions={handleReorderQuestions}
            onDeleteQuestion={handleDeleteQuestion}
            onEditSection={() => selectedSection && handleOpenSectionEdit(selectedSection)}
            onDeleteSection={() => selectedSection && handleDeleteSection(selectedSection.id)}
          />
        </div>
      )}

      <SectionEditSheet
        open={!!editingSection}
        onOpenChange={(open) => {
          if (!open) setEditingSection(null);
        }}
        section={editingSection}
        onSave={handleSectionSave}
        saving={updatingSection}
      />

      <AddSectionDialog
        open={addSectionOpen}
        onOpenChange={setAddSectionOpen}
        canAddSection={canAddSection}
        activeSectionCount={activeSectionCount}
        targetSectionCount={targetSectionCount}
        addSectionMode={addSectionMode}
        onAddSectionModeChange={setAddSectionMode}
        customSectionForm={customSectionForm}
        onCustomSectionFormChange={setCustomSectionForm}
        previewSlug={previewSlug}
        availablePresets={availablePresets}
        presetsLoading={presetsLoading}
        selectedPresetType={selectedPresetType}
        onSelectedPresetTypeChange={setSelectedPresetType}
        selectedPreset={selectedPreset}
        creatingSection={creatingSection}
        onAddSection={handleAddSection}
      />

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
    </div>
  );
};
