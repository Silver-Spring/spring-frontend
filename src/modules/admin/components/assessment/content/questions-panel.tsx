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
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { GripVertical } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { AnswerOptionsEditor, type AnswerOption } from './answer-options-editor';
import { SortableRow } from './sortable-row';

type QuestionItem = {
  id: string;
  questionText: string;
  displayOrder: number;
  isActive: boolean;
  questionCategory?: string;
  answerOptions?: AnswerOption[] | null;
};

type SectionInfo = {
  id: string;
  name: string;
  isActive: boolean;
};

type QuestionsPanelProps = {
  section: SectionInfo | undefined;
  questions: QuestionItem[];
  questionsLoading: boolean;
  questionsPerSectionTarget: number;
  isDraft: boolean;
  creating: boolean;
  bulkCreating: boolean;
  updatingQuestion: boolean;
  deleting: boolean;
  deletingSection: boolean;
  onCreateQuestion: (questionText: string, questionCategory: 'scored' | 'profile') => Promise<void>;
  onBulkImport: (lines: string[]) => Promise<void>;
  onUpdateQuestion: (values: {
    id: string;
    questionText: string;
    displayOrder: number;
    isActive: boolean;
    questionCategory: string;
    answerOptions: AnswerOption[] | null;
  }) => Promise<void>;
  onReorderQuestions: (updates: Array<{ id: string; displayOrder: number }>) => Promise<void>;
  onDeleteQuestion: (id: string) => Promise<void>;
  onEditSection: () => void;
  onDeleteSection: () => void;
};

export const QuestionsPanel = ({
  section,
  questions,
  questionsLoading,
  questionsPerSectionTarget,
  isDraft,
  creating,
  bulkCreating,
  updatingQuestion,
  deleting,
  deletingSection,
  onCreateQuestion,
  onBulkImport,
  onUpdateQuestion,
  onReorderQuestions,
  onDeleteQuestion,
  onEditSection,
  onDeleteSection,
}: QuestionsPanelProps) => {
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionCategory, setNewQuestionCategory] = useState<'scored' | 'profile'>('scored');
  const [bulkText, setBulkText] = useState('');
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [questionForm, setQuestionForm] = useState({
    id: '',
    questionText: '',
    displayOrder: 1,
    isActive: true,
    questionCategory: 'scored' as 'scored' | 'profile',
    answerOptions: null as AnswerOption[] | null,
  });

  // Local copy for optimistic drag reordering.
  // reorderInProgressRef guards against Apollo returning a new array reference mid-mutation,
  // which would otherwise fire the useEffect and snap questions back to server order.
  const [localQuestions, setLocalQuestions] = useState<QuestionItem[]>(questions);
  const reorderInProgressRef = useRef(false);
  useEffect(() => {
    if (!reorderInProgressRef.current) {
      setLocalQuestions(questions);
    }
  }, [questions]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const activeQuestionsInSection = localQuestions.filter((q) => q.isActive).length;

  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    await onCreateQuestion(newQuestionText, newQuestionCategory);
    setNewQuestionText('');
  };

  const handleBulkImport = async () => {
    const lines = bulkText.split('\n').filter((line) => line.trim());
    await onBulkImport(lines);
    setBulkText('');
    setShowBulkImport(false);
  };

  const handleQuestionUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdateQuestion({
      id: questionForm.id,
      questionText: questionForm.questionText,
      displayOrder: questionForm.displayOrder,
      isActive: questionForm.isActive,
      questionCategory: questionForm.questionCategory,
      answerOptions: questionForm.answerOptions,
    });
    setEditingQuestionId(null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = localQuestions.findIndex((q) => q.id === active.id);
    const newIndex = localQuestions.findIndex((q) => q.id === over.id);
    const reordered = arrayMove(localQuestions, oldIndex, newIndex);

    // Block useEffect from resetting to server order while mutations are in-flight
    reorderInProgressRef.current = true;
    setLocalQuestions(reordered);

    // Compare each question's new position against its original displayOrder by id
    const originalOrderById = new Map(questions.map((q) => [q.id, q.displayOrder]));
    const updates = reordered
      .map((q, i) => ({ id: q.id, displayOrder: i + 1 }))
      .filter((u) => originalOrderById.get(u.id) !== u.displayOrder);

    try {
      if (updates.length > 0) {
        await onReorderQuestions(updates);
      }
    } finally {
      reorderInProgressRef.current = false;
    }
  };

  return (
    <Card className="flex min-h-128 flex-col overflow-hidden p-0 lg:min-h-0 lg:h-full">
      {section ? (
        <>
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b px-4 py-3">
            <div>
              <p className="text-sm font-medium">Questions</p>
              <p className="text-xs text-muted-foreground">
                {section.name} ·{' '}
                {questionsLoading
                  ? '...'
                  : questionsPerSectionTarget > 0
                    ? `${activeQuestionsInSection}/${questionsPerSectionTarget} active (${localQuestions.length} total)`
                    : `${localQuestions.length} total`}
                {!section.isActive && ' · Inactive section'}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" size="sm" onClick={onEditSection}>
                Edit section
              </Button>
              {isDraft && !questionsLoading && localQuestions.length === 0 && section.isActive && (
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
                        Deletes {section.name}. This cannot be undone if the section has historical
                        assessment results.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={onDeleteSection}>
                        Remove permanently
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              {section.isActive && (
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

          {!section.isActive ? (
            <div className="flex-1 flex items-center justify-center p-8 text-sm text-muted-foreground text-center">
              This section is inactive. Reactivate it from the sidebar to manage questions, or
              remove it if it has no questions or results.
            </div>
          ) : (
            <ScrollArea className="min-h-0 flex-1">
              <div className="p-4 space-y-4">
                <div className="space-y-2">
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
                  <RadioGroup
                    value={newQuestionCategory}
                    onValueChange={(v) => setNewQuestionCategory(v as 'scored' | 'profile')}
                    className="flex items-center gap-4"
                  >
                    <div className="flex items-center gap-1.5">
                      <RadioGroupItem value="scored" id="new-q-scored" />
                      <Label htmlFor="new-q-scored" className="text-xs font-normal cursor-pointer">
                        Scored
                      </Label>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <RadioGroupItem value="profile" id="new-q-profile" />
                      <Label htmlFor="new-q-profile" className="text-xs font-normal cursor-pointer">
                        Profile (unscored)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {showBulkImport && (
                  <div className="space-y-2 rounded-lg border p-3 bg-muted/20">
                    <Label htmlFor="bulk-import">One question per line</Label>
                    <Textarea
                      id="bulk-import"
                      value={bulkText}
                      onChange={(e) => setBulkText(e.target.value)}
                      rows={5}
                      placeholder={`Question one\nQuestion two`}
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
                ) : localQuestions.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No questions yet. Add one above.
                  </p>
                ) : (
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={localQuestions.map((q) => q.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-2">
                        {localQuestions.map((question, index) => (
                          <SortableRow key={question.id} id={question.id}>
                            {(dragHandleProps) =>
                              editingQuestionId === question.id ? (
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
                                  <div className="flex flex-wrap items-center gap-3">
                                    <label className="flex items-center gap-1.5 text-xs">
                                      <Checkbox
                                        checked={questionForm.isActive ?? false}
                                        onCheckedChange={(checked) =>
                                          setQuestionForm({ ...questionForm, isActive: !!checked })
                                        }
                                      />
                                      Active
                                    </label>
                                    <div className="flex items-center gap-2">
                                      <Label className="text-xs">Category</Label>
                                      <Select
                                        value={questionForm.questionCategory}
                                        onValueChange={(v) =>
                                          setQuestionForm({
                                            ...questionForm,
                                            questionCategory: v as 'scored' | 'profile',
                                          })
                                        }
                                      >
                                        <SelectTrigger className="h-8 w-36 text-xs">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="scored">Scored</SelectItem>
                                          <SelectItem value="profile">
                                            Profile (unscored)
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>

                                  <AnswerOptionsEditor
                                    options={questionForm.answerOptions}
                                    onChange={(opts) =>
                                      setQuestionForm({ ...questionForm, answerOptions: opts })
                                    }
                                  />

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
                                <div className="flex items-start gap-2">
                                  <button
                                    type="button"
                                    className="mt-0.5 shrink-0 cursor-grab active:cursor-grabbing text-muted-foreground/40 hover:text-muted-foreground transition-colors touch-none"
                                    aria-label="Drag to reorder"
                                    {...dragHandleProps}
                                  >
                                    <GripVertical className="size-4" />
                                  </button>

                                  <div className="flex flex-1 items-start justify-between gap-3 min-w-0">
                                    <div className="flex gap-2 min-w-0">
                                      <span className="text-muted-foreground shrink-0 w-5 text-xs pt-0.5">
                                        {index + 1}.
                                      </span>
                                      <div>
                                        <p>{question.questionText}</p>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {question.questionCategory === 'profile' && (
                                            <Badge
                                              variant="outline"
                                              className="text-[10px] border-blue-300 text-blue-700 dark:text-blue-400"
                                            >
                                              Profile
                                            </Badge>
                                          )}
                                          {question.answerOptions &&
                                            question.answerOptions.length > 0 && (
                                              <Badge
                                                variant="outline"
                                                className="text-[10px] border-violet-300 text-violet-700 dark:text-violet-400"
                                              >
                                                {question.answerOptions.length} options
                                              </Badge>
                                            )}
                                          {!question.isActive && (
                                            <Badge variant="secondary" className="text-[10px]">
                                              Inactive
                                            </Badge>
                                          )}
                                        </div>
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
                                            questionCategory:
                                              (question.questionCategory ?? 'scored') as
                                                | 'scored'
                                                | 'profile',
                                            answerOptions: question.answerOptions ?? null,
                                          });
                                        }}
                                      >
                                        Edit
                                      </Button>
                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <Button
                                            type="button"
                                            size="sm"
                                            variant="ghost"
                                            className="text-destructive hover:text-destructive"
                                            disabled={deleting}
                                          >
                                            Delete
                                          </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>Delete question?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                              This permanently removes the question. This cannot be
                                              undone.
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel disabled={deleting}>
                                              Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                              disabled={deleting}
                                              onClick={(event) => {
                                                event.preventDefault();
                                                void onDeleteQuestion(question.id);
                                              }}
                                            >
                                              {deleting ? 'Deleting...' : 'Delete'}
                                            </AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
                                    </div>
                                  </div>
                                </div>
                              )
                            }
                          </SortableRow>
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
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
  );
};
