'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import {
  newGroup,
  newRule,
  parseEmails,
  type AudienceState,
  type Condition,
  type ConditionParam,
  type GroupState,
  type Match,
  type RuleState,
} from '../lib/audience';
import { peopleLabel } from '../lib/format';

type Option = { id: string; label: string };

export type AudienceCount = {
  count: number | null;
  sample: { email: string; name?: string | null; hasAccount: boolean }[];
  loading: boolean;
  /** Why there is no count: an unfinished rule, or the server's message. */
  problem: string | null;
};

type AudienceBuilderProps = {
  value: AudienceState;
  onChange: (value: AudienceState) => void;
  conditions: Condition[];
  webinars: Option[];
  campaigns: Option[];
  assessmentTypes: Option[];
  audienceCount: AudienceCount;
  disabled?: boolean;
};

const ANY = '__any__';

const MatchSelect = ({
  value,
  onChange,
  disabled,
  label,
}: {
  value: Match;
  onChange: (value: Match) => void;
  disabled?: boolean;
  label: string;
}) => (
  <Select value={value} onValueChange={(v) => onChange(v as Match)} disabled={disabled}>
    <SelectTrigger className="h-8 w-24" aria-label={label}>
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="all">ALL</SelectItem>
      <SelectItem value="any">ANY</SelectItem>
    </SelectContent>
  </Select>
);

type ParamInputProps = {
  param: ConditionParam;
  rule: RuleState;
  onChange: (rule: RuleState) => void;
  webinars: Option[];
  campaigns: Option[];
  assessmentTypes: Option[];
  disabled?: boolean;
};

const ParamInput = ({ param, rule, onChange, webinars, campaigns, assessmentTypes, disabled }: ParamInputProps) => {
  const setParam = (value: unknown) => onChange({ ...rule, params: { ...rule.params, [param.name]: value } });

  if (param.type === 'int') {
    const value = rule.params[param.name];
    return (
      <div className="flex items-center gap-2">
        <Input
          type="number"
          min={1}
          className="h-8 w-24"
          aria-label="Days"
          disabled={disabled}
          value={typeof value === 'number' ? String(value) : ''}
          onChange={(event) =>
            setParam(event.target.value === '' ? undefined : Number(event.target.value))
          }
        />
        <span className="text-sm text-muted-foreground">days</span>
      </div>
    );
  }

  if (param.type === 'email[]') {
    const count = parseEmails(rule.emailsText).length;
    return (
      <div className="w-full space-y-1 sm:w-72">
        <Textarea
          rows={3}
          className="min-h-0 text-sm"
          placeholder="One email per line"
          aria-label="Emails"
          disabled={disabled}
          value={rule.emailsText}
          onChange={(event) => onChange({ ...rule, emailsText: event.target.value })}
        />
        <p className="text-xs text-muted-foreground">{count} {count === 1 ? 'email' : 'emails'}</p>
      </div>
    );
  }

  const optional = param.type.endsWith('?');
  let options: Option[] = [];
  let anyLabel = 'Any';
  let placeholder = 'Choose…';
  if (param.name === 'eventId') {
    options = webinars;
    anyLabel = 'Any webinar';
    placeholder = 'Choose a webinar';
  } else if (param.name === 'campaignId') {
    options = campaigns;
    placeholder = campaigns.length ? 'Choose an email' : 'No sent emails yet';
  } else if (param.name === 'assessmentTypeId') {
    options = assessmentTypes;
    anyLabel = 'Any assessment';
  }
  const current = rule.params[param.name];
  const value = typeof current === 'string' && current ? current : optional ? ANY : '';

  return (
    <Select
      value={value}
      onValueChange={(v) => setParam(v === ANY ? undefined : v)}
      disabled={disabled}
    >
      <SelectTrigger className="h-8 w-full sm:w-56" aria-label={param.name}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {optional && <SelectItem value={ANY}>{anyLabel}</SelectItem>}
        {options.map((o) => (
          <SelectItem key={o.id} value={o.id}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

type RuleRowProps = Omit<ParamInputProps, 'param'> & {
  conditions: Condition[];
  onRemove: () => void;
};

const RuleRow = ({ rule, onChange, onRemove, conditions, disabled, ...pickers }: RuleRowProps) => {
  const def = conditions.find((c) => c.key === rule.condition);
  return (
    <div className="flex flex-wrap items-start gap-2">
      <Select
        value={rule.negate ? 'not' : 'has'}
        onValueChange={(v) => onChange({ ...rule, negate: v === 'not' })}
        disabled={disabled}
      >
        <SelectTrigger className="h-8 w-28" aria-label="Has or has not">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="has">has</SelectItem>
          <SelectItem value="not">has NOT</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={rule.condition || undefined}
        onValueChange={(v) => onChange({ ...rule, condition: v, params: {}, emailsText: '' })}
        disabled={disabled}
      >
        <SelectTrigger className="h-8 w-full sm:w-64" aria-label="Condition">
          <SelectValue placeholder="Choose a condition" />
        </SelectTrigger>
        <SelectContent>
          {conditions.map((c) => (
            <SelectItem key={c.key} value={c.key}>
              {c.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {def?.params.map((param) => (
        <ParamInput
          key={param.name}
          param={param}
          rule={rule}
          onChange={onChange}
          disabled={disabled}
          {...pickers}
        />
      ))}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="ml-auto h-8 w-8 p-0"
        onClick={onRemove}
        disabled={disabled}
        aria-label="Remove rule"
      >
        <X className="size-4" />
      </Button>
    </div>
  );
};

/** "Who gets it": ALL/ANY of groups, each group ALL/ANY of rules, with the live count. */
export const AudienceBuilder = ({
  value,
  onChange,
  conditions,
  webinars,
  campaigns,
  assessmentTypes,
  audienceCount,
  disabled = false,
}: AudienceBuilderProps) => {
  const [showSample, setShowSample] = useState(false);
  const pickers = { webinars, campaigns, assessmentTypes };

  const setGroups = (groups: GroupState[]) => onChange({ ...value, groups });
  const updateGroup = (id: string, next: GroupState) =>
    setGroups(value.groups.map((g) => (g.id === id ? next : g)));
  const removeGroup = (id: string) => setGroups(value.groups.filter((g) => g.id !== id));
  const firstCondition = conditions[0]?.key ?? '';

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Select
          value={value.everyone ? 'everyone' : 'rules'}
          onValueChange={(v) => onChange({ ...value, everyone: v === 'everyone' })}
          disabled={disabled}
        >
          <SelectTrigger className="h-8 w-full sm:w-64" aria-label="Who gets it">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rules">People matching rules</SelectItem>
            <SelectItem value="everyone">Everyone with an account</SelectItem>
          </SelectContent>
        </Select>
        {!value.everyone && (
          <>
            <span className="text-muted-foreground">Match</span>
            <MatchSelect
              value={value.match}
              onChange={(match) => onChange({ ...value, match })}
              disabled={disabled}
              label="Match groups"
            />
            <span className="text-muted-foreground">of these groups</span>
          </>
        )}
      </div>

      {!value.everyone && (
        <div className="space-y-3">
          {value.groups.map((group, gi) => (
            <div key={group.id} className="space-y-2 rounded-lg border p-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">Group {gi + 1}</span>
                <span className="text-muted-foreground">Match</span>
                <MatchSelect
                  value={group.match}
                  onChange={(match) => updateGroup(group.id, { ...group, match })}
                  disabled={disabled}
                  label={`Match rules in group ${gi + 1}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="ml-auto h-8 text-muted-foreground"
                  onClick={() => removeGroup(group.id)}
                  disabled={disabled}
                >
                  Remove group
                </Button>
              </div>
              {group.rules.map((rule) => (
                <RuleRow
                  key={rule.id}
                  rule={rule}
                  conditions={conditions}
                  disabled={disabled}
                  onChange={(next) =>
                    updateGroup(group.id, {
                      ...group,
                      rules: group.rules.map((r) => (r.id === rule.id ? next : r)),
                    })
                  }
                  onRemove={() =>
                    updateGroup(group.id, { ...group, rules: group.rules.filter((r) => r.id !== rule.id) })
                  }
                  {...pickers}
                />
              ))}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="gap-1"
                disabled={disabled || !firstCondition}
                onClick={() => updateGroup(group.id, { ...group, rules: [...group.rules, newRule(firstCondition)] })}
              >
                <Plus className="size-4" /> rule
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2">
        {!value.everyone ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1"
            disabled={disabled || !firstCondition}
            onClick={() => setGroups([...value.groups, newGroup([newRule(firstCondition)])])}
          >
            <Plus className="size-4" /> group
          </Button>
        ) : (
          <span />
        )}
        <div className="flex items-center gap-2 text-sm" aria-live="polite">
          {audienceCount.loading && <Spinner className="size-4" />}
          {audienceCount.problem ? (
            <span className="text-muted-foreground">{audienceCount.problem}</span>
          ) : audienceCount.count !== null ? (
            <>
              <span className="font-semibold">→ {peopleLabel(audienceCount.count)}</span>
              {audienceCount.sample.length > 0 && (
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className="h-auto p-0"
                  onClick={() => setShowSample((s) => !s)}
                >
                  {showSample ? 'hide sample' : 'show sample'}
                </Button>
              )}
            </>
          ) : null}
        </div>
      </div>

      {showSample && !audienceCount.problem && audienceCount.sample.length > 0 && (
        <ul className="divide-y rounded-lg border text-sm">
          {audienceCount.sample.map((c) => (
            <li key={c.email} className="flex items-center justify-between gap-2 px-3 py-1.5">
              <span className="min-w-0 truncate">
                {c.name ? `${c.name} · ` : ''}
                <span className="text-muted-foreground">{c.email}</span>
              </span>
              {!c.hasAccount && <Badge variant="secondary">No account</Badge>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
