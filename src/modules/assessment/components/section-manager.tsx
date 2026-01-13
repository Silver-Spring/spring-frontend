'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useGetSections, useUpdateSection } from '../hooks';

export const SectionManager = () => {
  const { sections, loading, refetch } = useGetSections();
  const { updateSection, loading: updating } = useUpdateSection();

  const [editingId, setEditingId] = useState<string | null>(null);

  // Edit form state (displayOrder removed - now read-only)
  const [editForm, setEditForm] = useState({
    id: '',
    name: '',
    description: '',
    isActive: true,
  });

  const startEdit = (section: {
    id: string;
    name: string;
    description?: string | null;
    displayOrder: number;
    isActive: boolean;
  }) => {
    setEditingId(section.id);
    setEditForm({
      id: section.id,
      name: section.name,
      description: section.description || '',
      isActive: section.isActive,
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSection(editForm);
    setEditingId(null);
    refetch();
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="text-center text-muted-foreground">Loading sections...</div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Assessment Sections</h2>
      </div>

      <div className="space-y-2">
        {sections.map(
          (section: {
            id: string;
            type: string;
            name: string;
            description?: string | null;
            displayOrder: number;
            isActive: boolean;
          }) => (
            <Card key={section.id} className="p-4">
              {editingId === section.id ? (
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor={`edit-name-${section.id}`}>Section Name</Label>
                    <Input
                      id={`edit-name-${section.id}`}
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label htmlFor={`edit-description-${section.id}`}>Description</Label>
                    <Input
                      id={`edit-description-${section.id}`}
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button type="submit" disabled={updating}>
                      {updating ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setEditingId(null)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{section.name}</h3>
                      <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                        {section.type}
                      </span>
                      {!section.isActive && (
                        <span className="text-xs px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 rounded">
                          Inactive
                        </span>
                      )}
                    </div>
                    {section.description && (
                      <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => startEdit(section)}>
                      Edit Details
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          )
        )}
      </div>

      {sections.length === 0 && (
        <Card className="p-6">
          <div className="text-center text-muted-foreground">
            No sections found. There should be 5 fixed sections.
          </div>
        </Card>
      )}
    </div>
  );
};
