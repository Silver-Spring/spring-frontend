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
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

type SectionItem = {
  id: string;
  name: string;
  type: string;
  emoji?: string | null;
  displayColor?: string | null;
  isActive: boolean;
  sectionCategory?: string | null;
};

type SectionListPanelProps = {
  sections: SectionItem[];
  activeSectionCount: number;
  selectedSectionId: string | null;
  isDraft: boolean;
  deactivatingSection: boolean;
  deletingSection: boolean;
  updatingSection: boolean;
  onSelectSection: (id: string) => void;
  onEditSection: (id: string) => void;
  onDeactivateSection: (id: string) => void;
  onReactivateSection: (id: string) => void;
  onDeleteSection: (id: string) => void;
};

export const SectionListPanel = ({
  sections,
  activeSectionCount,
  selectedSectionId,
  isDraft,
  deactivatingSection,
  deletingSection,
  updatingSection,
  onSelectSection,
  onEditSection,
  onDeactivateSection,
  onReactivateSection,
  onDeleteSection,
}: SectionListPanelProps) => (
  <Card className="flex min-h-128 flex-col overflow-hidden p-0 lg:min-h-0 lg:h-full">
    <div className="shrink-0 border-b px-4 py-3">
      <p className="text-sm font-medium">Sections</p>
      <p className="text-xs text-muted-foreground">
        {activeSectionCount} active · {sections.length} total
      </p>
    </div>
    <ScrollArea className="min-h-0 flex-1">
      <div className="p-2 space-y-1">
        {sections.map((section) => (
          <div key={section.id}>
            <div
              className={cn(
                'group flex items-stretch overflow-hidden rounded-md',
                !section.isActive && 'opacity-70',
                selectedSectionId === section.id && 'bg-primary/10'
              )}
            >
              {section.displayColor && (
                <span
                  className="w-1 shrink-0"
                  style={{ backgroundColor: section.displayColor }}
                  aria-label={`Color ${section.displayColor}`}
                />
              )}
              <div className="min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => onSelectSection(section.id)}
                  className={cn(
                    'w-full rounded-md px-3 py-2.5 text-left transition-colors',
                    selectedSectionId !== section.id && 'hover:bg-muted/60'
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex min-w-0 items-start gap-2">
                      {section.emoji && (
                        <span className="shrink-0 text-base leading-none" aria-hidden="true">
                          {section.emoji}
                        </span>
                      )}
                      <div className="min-w-0 py-0.5">
                        <p className="text-sm font-medium truncate">{section.name}</p>
                        <p className="text-xs text-muted-foreground">{section.type}</p>
                      </div>
                    </div>
                    {!section.isActive && (
                      <Badge variant="secondary" className="text-[10px] shrink-0">
                        Inactive
                      </Badge>
                    )}
                  </div>
                </button>
                <div className="flex flex-wrap gap-1 px-3 pb-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-6 px-2 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditSection(section.id);
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
                      onClick={() => onDeactivateSection(section.id)}
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
                        onClick={() => onReactivateSection(section.id)}
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
                              Deletes {section.name}. Only allowed when the section has no questions
                              and no historical results. Orphan bands may remain in Scoring until
                              cleaned up.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDeleteSection(section.id)}>
                              Remove permanently
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  </Card>
);
