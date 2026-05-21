'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { AssessmentTypeCode } from '@/modules/assessment/constants';
import {
  useBulkCreateQuestions,
  useCreateQuestion,
  useDeleteQuestion,
  useGetSectionQuestions,
  useGetSections,
  useUpdateQuestion,
  useUpdateSection,
} from '@/modules/assessment/hooks';
import { useEffect, useState } from 'react';

type AssessmentContentManagerProps = {
  assessmentType: AssessmentTypeCode;
};

export const AssessmentContentManager = ({ assessmentType }: AssessmentContentManagerProps) => {
  const {
    sections,
    loading: sectionsLoading,
    refetch: refetchSections,
  } = useGetSections(assessmentType);
  const { updateSection, loading: updatingSection } = useUpdateSection();
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

  useEffect(() => {
    setSelectedSectionId(null);
    setEditingSectionId(null);
    setEditingQuestionId(null);
    setShowBulkImport(false);
  }, [assessmentType]);

  useEffect(() => {
    if (!selectedSectionId && sections.length > 0) {
      setSelectedSectionId(sections[0].id);
    }
  }, [sections, selectedSectionId]);

  const selectedSection = sections.find((s) => s.id === selectedSectionId);

  const handleSectionUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSection({ ...sectionForm, isActive: true });
    setEditingSectionId(null);
    refetchSections();
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

  const handleDeleteQuestion = async (id: string) => {
    if (!confirm('Delete this question? This cannot be undone.')) return;
    await deleteQuestion(id);
    refetchQuestions();
  };

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
      <div>
        <h2 className="text-lg font-semibold">Content Editor</h2>
        <p className="text-sm text-muted-foreground">
          Select a section, then manage its questions. Sections and questions are scoped to{' '}
          {assessmentType.toUpperCase()}.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 min-h-[480px]">
        <Card className="p-0 overflow-hidden">
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-medium">Sections ({sections.length})</p>
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
                    <button
                      type="button"
                      onClick={() => setSelectedSectionId(section.id)}
                      className={cn(
                        'w-full rounded-md px-3 py-2.5 text-left transition-colors group',
                        selectedSectionId === section.id ? 'bg-primary/10' : 'hover:bg-muted/60'
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{section.name}</p>
                          <p className="text-xs text-muted-foreground">{section.type}</p>
                        </div>
                        {!section.isActive && (
                          <Badge variant="secondary" className="text-[10px] shrink-0">
                            Off
                          </Badge>
                        )}
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="mt-1 h-6 px-2 text-xs opacity-0 group-hover:opacity-100"
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
                        Edit section
                      </Button>
                    </button>
                  )}
                </div>
              ))}
              {sections.length === 0 && (
                <p className="px-3 py-6 text-sm text-muted-foreground text-center">
                  No sections for this type.
                </p>
              )}
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
                    {questionsLoading ? '...' : `${questions.length} questions`}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowBulkImport((prev) => !prev)}
                >
                  {showBulkImport ? 'Cancel import' : 'Bulk import'}
                </Button>
              </div>

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
                                  setQuestionForm({ ...questionForm, questionText: e.target.value })
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
                                  onClick={() => handleDeleteQuestion(question.id)}
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
            </>
          ) : (
            <div className="flex items-center justify-center h-full p-8 text-sm text-muted-foreground">
              Select a section to manage questions
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
