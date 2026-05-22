'use client';

import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { AssessmentTypeCode } from '@/modules/assessment/constants';
import type { SectionInterpretationBandNode } from '@/modules/admin/hooks';
import { useGetSections } from '@/modules/assessment/hooks';
import { useMemo, useState } from 'react';
import { BandEditSheet } from './band-edit-sheet';
import type { BandFormState, TypeStageRow } from './types';
import { formatRangeLabel, normalizeSectionType } from './utils';

export const SectionBandMatrix = ({
  assessmentType,
  sectionBands,
  bandsLoading,
  requiredSectionBands,
  stagesPerSection,
  stages,
  onBandsChanged,
}: {
  assessmentType: AssessmentTypeCode;
  sectionBands: SectionInterpretationBandNode[];
  bandsLoading: boolean;
  requiredSectionBands: number | null;
  stagesPerSection: number;
  stages: TypeStageRow[];
  onBandsChanged: () => void;
}) => {
  const { sections, loading: sectionsLoading } = useGetSections(assessmentType);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedBand, setSelectedBand] = useState<SectionInterpretationBandNode | null>(null);
  const [preset, setPreset] = useState<Partial<BandFormState> | undefined>();
  const [matrixContext, setMatrixContext] = useState<{
    type: string;
    label: string;
  } | null>(null);

  const activeSections = useMemo(
    () =>
      [...sections]
        .filter((section) => section.isActive)
        .sort((a, b) => a.displayOrder - b.displayOrder),
    [sections]
  );

  const activeSectionTypes = useMemo(
    () => new Set(activeSections.map((section) => normalizeSectionType(String(section.type)))),
    [activeSections]
  );

  const filteredSectionBands = useMemo(
    () =>
      sectionBands.filter(
        (band) =>
          band.sectionType &&
          activeSectionTypes.has(normalizeSectionType(band.sectionType))
      ),
    [sectionBands, activeSectionTypes]
  );

  const expectedBandCount =
    requiredSectionBands ?? activeSections.length * (stagesPerSection ?? 5);

  const bandMap = useMemo(() => {
    const map = new Map<string, SectionInterpretationBandNode>();
    filteredSectionBands.forEach((band) => {
      if (band.sectionType && band.displayOrder != null) {
        map.set(`${normalizeSectionType(band.sectionType)}:${band.displayOrder}`, band);
      }
    });
    return map;
  }, [filteredSectionBands]);

  const handleCellClick = (
    section: (typeof activeSections)[number],
    stage: TypeStageRow
  ) => {
    const sectionTypeKey = normalizeSectionType(String(section.type));
    const existing = bandMap.get(`${sectionTypeKey}:${stage.displayOrder}`);
    setMatrixContext({ type: sectionTypeKey, label: section.name });
    setSelectedBand(existing ?? null);
    setPreset(
      existing
        ? undefined
        : {
            sectionType: sectionTypeKey,
            label: stage.label,
            rangeStart: String(stage.sectionRangeStart),
            rangeEnd: String(stage.sectionRangeEnd),
            displayOrder: String(stage.displayOrder),
            narrative: '',
          }
    );
    setSheetOpen(true);
  };

  const filledCellCount = useMemo(() => {
    let count = 0;
    activeSections.forEach((section) => {
      stages.forEach((stage) => {
        if (bandMap.has(`${normalizeSectionType(String(section.type))}:${stage.displayOrder}`)) {
          count += 1;
        }
      });
    });
    return count;
  }, [activeSections, bandMap, stages]);

  const totalCellCount = activeSections.length * stages.length;

  if (sectionsLoading || bandsLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (activeSections.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-8 text-center">
        No active sections for this type. Add or reactivate sections in the Content tab to
        configure dimension bands.
      </p>
    );
  }

  return (
    <>
      <p className="text-sm text-muted-foreground mb-4">
        {filteredSectionBands.length} section bands configured (expected {expectedBandCount}).
        Matrix: {filledCellCount}/{totalCellCount} cells filled. Each active dimension has its own
        narrative per stage.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="text-left p-2 font-medium text-muted-foreground">Dimension</th>
              {stages.map((stage) => (
                <th key={stage.displayOrder} className="p-2 font-medium text-center">
                  <span className="block">{stage.label}</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {formatRangeLabel(stage.sectionRangeStart, stage.sectionRangeEnd)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activeSections.map((section) => (
              <tr key={section.id} className="border-t">
                <td className="p-2 font-medium align-top">{section.name}</td>
                {stages.map((stage) => {
                  const band = bandMap.get(
                    `${normalizeSectionType(String(section.type))}:${stage.displayOrder}`
                  );
                  return (
                    <td key={stage.displayOrder} className="p-1">
                      <button
                        type="button"
                        onClick={() => handleCellClick(section, stage)}
                        className={cn(
                          'w-full rounded-md border p-2 text-left transition-colors hover:bg-muted/60 min-h-[72px]',
                          band ? 'border-primary/30 bg-primary/5' : 'border-dashed text-muted-foreground',
                          band && !band.isActive && 'opacity-50'
                        )}
                        aria-label={`Edit ${section.name} ${stage.label} band`}
                      >
                        {band ? (
                          <>
                            <span className="font-medium block">{band.label}</span>
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
        contextSectionType={matrixContext?.type}
        contextSectionLabel={matrixContext?.label}
        onSaved={onBandsChanged}
      />
    </>
  );
};
