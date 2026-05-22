'use client';

export const BandStageMetadata = ({
  label,
  displayOrder,
  rangeStart,
  rangeEnd,
  displayRangeLabel,
  isSection,
  contextSectionLabel,
  sectionType,
}: {
  label: string;
  displayOrder: string;
  rangeStart: string;
  rangeEnd: string;
  displayRangeLabel?: string;
  isSection: boolean;
  contextSectionLabel?: string;
  sectionType?: string;
}) => (
  <div className="md:col-span-2 rounded-lg border bg-muted/30 p-4 space-y-3">
    <div>
      <p className="text-sm font-medium">Stage details</p>
      <p className="text-xs text-muted-foreground mt-1">
        Synced from the stage editor. Edit stages above to change these values.
      </p>
    </div>
    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
      {isSection ? (
        <div>
          <dt className="text-xs text-muted-foreground">Dimension</dt>
          <dd className="font-medium mt-0.5">
            {contextSectionLabel || sectionType || 'Unknown dimension'}
          </dd>
        </div>
      ) : null}
      <div>
        <dt className="text-xs text-muted-foreground">Stage name</dt>
        <dd className="font-medium mt-0.5">{label.trim() || '—'}</dd>
      </div>
      <div>
        <dt className="text-xs text-muted-foreground">Display order</dt>
        <dd className="font-medium mt-0.5">{displayOrder || '—'}</dd>
      </div>
      <div>
        <dt className="text-xs text-muted-foreground">Score range</dt>
        <dd className="font-medium mt-0.5">
          {rangeStart && rangeEnd ? `${rangeStart}–${rangeEnd}` : '—'}
        </dd>
      </div>
      {!isSection && displayRangeLabel ? (
        <div className="sm:col-span-2">
          <dt className="text-xs text-muted-foreground">PDF score range label</dt>
          <dd className="font-medium mt-0.5">{displayRangeLabel}</dd>
        </div>
      ) : null}
    </dl>
    {isSection ? (
      <p className="text-xs text-muted-foreground">
        Per-dimension score range (10–100). Edit in the stage editor.
      </p>
    ) : null}
  </div>
);
