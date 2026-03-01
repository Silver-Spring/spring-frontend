'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import {
  useBulkCreateQuestions,
  useCreateQuestion,
  useDeleteQuestion,
  useGetSectionQuestions,
  useGetSections,
  useUpdateQuestion,
} from '../../assessment/hooks';

export const QuestionManager = () => {
  const { sections, loading: sectionsLoading } = useGetSections();
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const {
    questions,
    loading: questionsLoading,
    refetch,
  } = useGetSectionQuestions(selectedSectionId);
  const { createQuestion, loading: creating } = useCreateQuestion();
  const { bulkCreateQuestions, loading: bulkCreating } = useBulkCreateQuestions();
  const { updateQuestion, loading: updating } = useUpdateQuestion();
  const { deleteQuestion, loading: deleting } = useDeleteQuestion();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Create form state (displayOrder removed - auto-assigned by backend)
  const [createForm, setCreateForm] = useState({
    questionText: '',
  });

  // Edit form state
  const [editForm, setEditForm] = useState({
    id: '',
    questionText: '',
    displayOrder: 1,
    isActive: true,
  });

  // Bulk import state
  const [bulkText, setBulkText] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSectionId) return;

    await createQuestion({
      sectionId: selectedSectionId,
      ...createForm,
    });

    setCreateForm({ questionText: '' });
    setShowCreateForm(false);
    refetch();
  };

  const handleBulkImport = async () => {
    if (!selectedSectionId) return;

    const lines = bulkText.split('\n').filter((line) => line.trim());
    const questions = lines.map((line) => ({
      questionText: line.trim(),
      // displayOrder removed - auto-assigned sequentially by backend
    }));

    await bulkCreateQuestions({
      sectionId: selectedSectionId,
      questions,
    });

    setBulkText('');
    setShowBulkImport(false);
    refetch();
  };

  const startEdit = (question: {
    id: string;
    questionText: string;
    displayOrder: number;
    isActive: boolean;
  }) => {
    setEditingId(question.id);
    setEditForm({
      id: question.id,
      questionText: question.questionText,
      displayOrder: question.displayOrder,
      isActive: question.isActive,
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateQuestion(editForm);
    setEditingId(null);
    refetch();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this question? This cannot be undone.')) {
      await deleteQuestion(id);
      refetch();
    }
  };

  if (sectionsLoading) {
    return (
      <Card className="p-6">
        <div className="text-center text-muted-foreground">Loading...</div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Question Management</h2>

      <Card className="p-4">
        <Label htmlFor="section-select">Select Section</Label>
        <select
          id="section-select"
          className="w-full border rounded-md p-2 mt-2"
          value={selectedSectionId || ''}
          onChange={(e) => setSelectedSectionId(e.target.value || null)}
        >
          <option value="">-- Select a section --</option>
          {sections.map(
            (section: { id: string; name: string; type: string; isActive: boolean }) => (
              <option key={section.id} value={section.id}>
                {section.name} ({section.type}) {!section.isActive && '(Inactive)'}
              </option>
            )
          )}
        </select>
      </Card>

      {selectedSectionId && (
        <>
          <div className="flex items-center space-x-2">
            <Button onClick={() => setShowCreateForm(!showCreateForm)}>
              {showCreateForm ? 'Cancel' : 'Add Single Question'}
            </Button>
            <Button variant="outline" onClick={() => setShowBulkImport(!showBulkImport)}>
              {showBulkImport ? 'Cancel' : 'Bulk Import'}
            </Button>
          </div>

          {showCreateForm && (
            <Card className="p-6">
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <Label htmlFor="questionText">Question Text</Label>
                  <Input
                    id="questionText"
                    value={createForm.questionText}
                    onChange={(e) => setCreateForm({ ...createForm, questionText: e.target.value })}
                    placeholder="e.g., I can easily identify and express my emotions"
                    required
                  />
                </div>

                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    ℹ️ Display order will be automatically assigned as the next available number in
                    the selected section.
                  </p>
                </div>

                <Button type="submit" disabled={creating}>
                  {creating ? 'Creating...' : 'Create Question'}
                </Button>
              </form>
            </Card>
          )}

          {showBulkImport && (
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bulkText">Bulk Import Questions</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Enter one question per line. Display orders will be assigned automatically
                    starting from the next available number.
                  </p>
                  <textarea
                    id="bulkText"
                    className="w-full border rounded-md p-2 min-h-[200px]"
                    value={bulkText}
                    onChange={(e) => setBulkText(e.target.value)}
                    placeholder="I handle stress effectively&#10;I maintain healthy relationships&#10;I adapt well to change&#10;I practice self-care regularly"
                  />
                </div>

                <Button onClick={handleBulkImport} disabled={bulkCreating || !bulkText.trim()}>
                  {bulkCreating
                    ? 'Importing...'
                    : `Import ${bulkText.split('\n').filter((l) => l.trim()).length} Questions`}
                </Button>
              </div>
            </Card>
          )}

          {questionsLoading ? (
            <Card className="p-6">
              <div className="text-center text-muted-foreground">Loading questions...</div>
            </Card>
          ) : (
            <>
              <div className="text-sm text-muted-foreground">
                Total questions: {questions.length}
              </div>

              <div className="space-y-2">
                {questions.map(
                  (question: {
                    id: string;
                    questionText: string;
                    displayOrder: number;
                    isActive: boolean;
                  }) => (
                    <Card key={question.id} className="p-4">
                      {editingId === question.id ? (
                        <form onSubmit={handleUpdate} className="space-y-4">
                          <div>
                            <Label htmlFor={`edit-text-${question.id}`}>Question Text</Label>
                            <Input
                              id={`edit-text-${question.id}`}
                              value={editForm.questionText}
                              onChange={(e) =>
                                setEditForm({ ...editForm, questionText: e.target.value })
                              }
                              required
                            />
                          </div>

                          <div>
                            <Label htmlFor={`edit-order-${question.id}`}>Display Order</Label>
                            <Input
                              id={`edit-order-${question.id}`}
                              type="number"
                              value={editForm.displayOrder}
                              onChange={(e) =>
                                setEditForm({ ...editForm, displayOrder: parseInt(e.target.value) })
                              }
                              min={1}
                              required
                            />
                          </div>

                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`edit-active-${question.id}`}
                              checked={editForm.isActive}
                              onChange={(e) =>
                                setEditForm({ ...editForm, isActive: e.target.checked })
                              }
                            />
                            <Label htmlFor={`edit-active-${question.id}`}>Active</Label>
                          </div>

                          <div className="flex space-x-2">
                            <Button type="submit" disabled={updating}>
                              {updating ? 'Saving...' : 'Save Changes'}
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setEditingId(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </form>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs px-2 py-1 bg-gray-200 rounded">
                                #{question.displayOrder}
                              </span>
                              <p className="text-sm">{question.questionText}</p>
                              {!question.isActive && (
                                <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">
                                  Inactive
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => startEdit(question)}>
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(question.id)}
                              disabled={deleting}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      )}
                    </Card>
                  )
                )}
              </div>

              {questions.length === 0 && (
                <Card className="p-6">
                  <div className="text-center text-muted-foreground">
                    No questions found for this section. Create your first question above.
                  </div>
                </Card>
              )}
            </>
          )}
        </>
      )}

      {!selectedSectionId && (
        <Card className="p-6">
          <div className="text-center text-muted-foreground">
            Please select a section to manage questions
          </div>
        </Card>
      )}
    </div>
  );
};
