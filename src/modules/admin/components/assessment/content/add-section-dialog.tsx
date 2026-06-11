'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { EmojiPickerField } from '@/components/ui/emoji-picker-field';
import { HexColorPicker } from '@/components/ui/hex-color-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';

export type AddSectionFormState = {
  name: string;
  slugOverride: string;
  emoji: string;
  displayColor: string;
  aboutDescription: string;
  subtitle: string;
  description: string;
  sectionCategory: 'scored' | 'profile';
};

export type SectionPresetOption = {
  type: string;
  name: string;
  description?: string | null;
  emoji?: string | null;
};

type AddSectionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  canAddSection: boolean;
  activeSectionCount: number;
  targetSectionCount: number;
  addSectionMode: 'custom' | 'preset';
  onAddSectionModeChange: (mode: 'custom' | 'preset') => void;
  customSectionForm: AddSectionFormState;
  onCustomSectionFormChange: (form: AddSectionFormState) => void;
  previewSlug: string;
  availablePresets: SectionPresetOption[];
  presetsLoading: boolean;
  selectedPresetType: string;
  onSelectedPresetTypeChange: (type: string) => void;
  selectedPreset?: SectionPresetOption;
  creatingSection: boolean;
  onAddSection: () => void;
};

const AddSectionDialog = ({
  open,
  onOpenChange,
  canAddSection,
  activeSectionCount,
  targetSectionCount,
  addSectionMode,
  onAddSectionModeChange,
  customSectionForm,
  onCustomSectionFormChange,
  previewSlug,
  availablePresets,
  presetsLoading,
  selectedPresetType,
  onSelectedPresetTypeChange,
  selectedPreset,
  creatingSection,
  onAddSection,
}: AddSectionDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Add section</DialogTitle>
        <DialogDescription>
          Create a custom section or pick an unused preset. Bands clone from the template type by
          default.
        </DialogDescription>
      </DialogHeader>

      {!canAddSection ? (
        <p className="text-sm text-muted-foreground py-2">
          {activeSectionCount >= targetSectionCount
            ? `Active section cap reached (${targetSectionCount}). Deactivate a section or raise the target in Settings.`
            : 'Sections can only be added on draft types.'}
        </p>
      ) : (
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant={addSectionMode === 'custom' ? 'default' : 'outline'}
              onClick={() => onAddSectionModeChange('custom')}
            >
              Custom
            </Button>
            {availablePresets.length > 0 && (
              <Button
                type="button"
                size="sm"
                variant={addSectionMode === 'preset' ? 'default' : 'outline'}
                onClick={() => onAddSectionModeChange('preset')}
              >
                From preset
              </Button>
            )}
          </div>

          {addSectionMode === 'custom' ? (
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="custom-section-name">Name</Label>
                <Input
                  id="custom-section-name"
                  value={customSectionForm.name}
                  onChange={(e) =>
                    onCustomSectionFormChange({ ...customSectionForm, name: e.target.value })
                  }
                  placeholder="Financial Security"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-section-slug">Slug (optional)</Label>
                <Input
                  id="custom-section-slug"
                  value={customSectionForm.slugOverride}
                  onChange={(e) =>
                    onCustomSectionFormChange({
                      ...customSectionForm,
                      slugOverride: e.target.value,
                    })
                  }
                  placeholder={previewSlug || 'auto-generated from name'}
                />
                {previewSlug ? (
                  <p className="text-xs text-muted-foreground">
                    Slug preview: <span className="font-mono">{previewSlug}</span>
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-section-about-description">About page blurb (optional)</Label>
                <Textarea
                  id="custom-section-about-description"
                  value={customSectionForm.aboutDescription}
                  onChange={(e) =>
                    onCustomSectionFormChange({
                      ...customSectionForm,
                      aboutDescription: e.target.value,
                    })
                  }
                  rows={2}
                  placeholder="Short dimension description for the About page"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-section-subtitle">Intro tagline (optional)</Label>
                <Input
                  id="custom-section-subtitle"
                  value={customSectionForm.subtitle}
                  onChange={(e) =>
                    onCustomSectionFormChange({
                      ...customSectionForm,
                      subtitle: e.target.value,
                    })
                  }
                  placeholder="Who am I without work?"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-section-description">Intro body (optional)</Label>
                <Textarea
                  id="custom-section-description"
                  value={customSectionForm.description}
                  onChange={(e) =>
                    onCustomSectionFormChange({
                      ...customSectionForm,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                  placeholder="Long intro narrative for dimension intro pages"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <EmojiPickerField
                  id="custom-section-emoji"
                  label="Emoji"
                  value={customSectionForm.emoji}
                  onChange={(emoji) =>
                    onCustomSectionFormChange({ ...customSectionForm, emoji })
                  }
                  placeholder="Pick emoji"
                />
                <HexColorPicker
                  id="custom-section-color"
                  label="Color"
                  value={customSectionForm.displayColor}
                  onChange={(displayColor) =>
                    onCustomSectionFormChange({ ...customSectionForm, displayColor })
                  }
                  placeholder="#6366f1"
                />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <Label htmlFor="custom-section-category" className="text-sm font-medium">Profile section</Label>
                  <p className="text-xs text-muted-foreground">
                    Profile sections are shown first and do not count toward the score
                  </p>
                </div>
                <Switch
                  id="custom-section-category"
                  checked={customSectionForm.sectionCategory === 'profile'}
                  onCheckedChange={(checked) =>
                    onCustomSectionFormChange({
                      ...customSectionForm,
                      sectionCategory: checked ? 'profile' : 'scored',
                    })
                  }
                />
              </div>
            </div>
          ) : presetsLoading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
              <Spinner className="size-4" />
              Loading presets...
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="section-preset">Preset dimension</Label>
              <Select value={selectedPresetType} onValueChange={onSelectedPresetTypeChange}>
                <SelectTrigger id="section-preset" aria-label="Preset dimension">
                  <SelectValue placeholder="Select dimension" />
                </SelectTrigger>
                <SelectContent>
                  {availablePresets.map((preset) => (
                    <SelectItem key={preset.type} value={preset.type}>
                      {preset.emoji ? `${preset.emoji} ` : ''}
                      {preset.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedPreset?.description ? (
                <p className="text-xs text-muted-foreground">{selectedPreset.description}</p>
              ) : null}
            </div>
          )}
        </div>
      )}

      <DialogFooter>
        <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button
          type="button"
          onClick={onAddSection}
          disabled={
            creatingSection ||
            !canAddSection ||
            (addSectionMode === 'custom' ? !customSectionForm.name.trim() : !selectedPreset)
          }
        >
          {creatingSection ? 'Adding...' : 'Add section'}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export { AddSectionDialog };
