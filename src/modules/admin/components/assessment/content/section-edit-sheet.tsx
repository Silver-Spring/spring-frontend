'use client';

import { Button } from '@/components/ui/button';
import { EmojiPickerField } from '@/components/ui/emoji-picker-field';
import { HexColorPicker } from '@/components/ui/hex-color-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NarrativeTextarea } from '@/components/ui/narrative-textarea';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { ReportFieldHint } from '@/modules/admin/components/report-field-hint';
import { useEffect, useState } from 'react';

type SectionData = {
  id: string;
  name: string;
  type: string;
  emoji?: string | null;
  displayColor?: string | null;
  aboutDescription?: string | null;
  subtitle?: string | null;
  description?: string | null;
  isActive: boolean;
};

type SectionEditSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  section: SectionData | null;
  onSave: (values: {
    id: string;
    name: string;
    emoji?: string;
    displayColor?: string;
    aboutDescription?: string;
    subtitle?: string;
    description?: string;
  }) => Promise<void>;
  saving: boolean;
};

export const SectionEditSheet = ({
  open,
  onOpenChange,
  section,
  onSave,
  saving,
}: SectionEditSheetProps) => {
  const [form, setForm] = useState({
    name: '',
    emoji: '',
    displayColor: '',
    aboutDescription: '',
    subtitle: '',
    description: '',
  });

  useEffect(() => {
    if (section) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        name: section.name,
        emoji: section.emoji ?? '',
        displayColor: section.displayColor ?? '',
        aboutDescription: section.aboutDescription ?? '',
        subtitle: section.subtitle ?? '',
        description: section.description ?? '',
      });
    }
  }, [section]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!section) return;
    await onSave({
      id: section.id,
      name: form.name,
      emoji: form.emoji || undefined,
      displayColor: form.displayColor || undefined,
      aboutDescription: form.aboutDescription.trim() || undefined,
      subtitle: form.subtitle.trim() || undefined,
      description: form.description.trim() || undefined,
    });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {section?.emoji && (
              <span className="mr-2" aria-hidden="true">
                {section.emoji}
              </span>
            )}
            {section?.name ?? 'Edit section'}
          </SheetTitle>
          <SheetDescription>
            {section?.type}
            {section && !section.isActive && ' · Inactive'}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="px-4 pb-8 space-y-5 mt-2">
          <div className="space-y-2">
            <Label htmlFor="sheet-section-name">Name</Label>
            <Input
              id="sheet-section-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Section name"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <EmojiPickerField
              id="sheet-section-emoji"
              label="Emoji"
              value={form.emoji}
              onChange={(emoji) => setForm({ ...form, emoji })}
              placeholder="Pick emoji"
            />
            <HexColorPicker
              id="sheet-section-color"
              label="Color"
              value={form.displayColor}
              onChange={(displayColor) => setForm({ ...form, displayColor })}
              placeholder="#6366f1"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="sheet-section-about">About page blurb</Label>
              <ReportFieldHint hintId="section.about_description" />
            </div>
            <p className="text-xs text-muted-foreground">
              Short copy for the About page dimension list.
            </p>
            <Textarea
              id="sheet-section-about"
              value={form.aboutDescription}
              onChange={(e) => setForm({ ...form, aboutDescription: e.target.value })}
              rows={3}
              placeholder="One or two sentences describing this dimension..."
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="sheet-section-subtitle">Intro tagline</Label>
              <ReportFieldHint hintId="section.subtitle" />
            </div>
            <p className="text-xs text-muted-foreground">
              Italic subtitle on dimension intro pages.
            </p>
            <Input
              id="sheet-section-subtitle"
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              placeholder="Who am I without work?"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="sheet-section-description">Intro body (report)</Label>
              <ReportFieldHint hintId="section.description" />
            </div>
            <p className="text-xs text-muted-foreground">
              Long narrative. Use blank lines for paragraphs; 3–4 paragraphs fits one page.
            </p>
            <NarrativeTextarea
              id="sheet-section-description"
              value={form.description}
              onChange={(description) => setForm({ ...form, description })}
              rows={8}
              placeholder="Paragraph one...&#10;&#10;Paragraph two..."
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving…' : 'Save section'}
            </Button>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};
