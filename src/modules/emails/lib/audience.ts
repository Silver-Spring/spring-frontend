// Audience model for the Emails editor. The JSON sent to the server is
// { everyone: true } or { match, groups: [{ match, rules: [{ condition, negate, params? }] }] }.

export type Match = 'all' | 'any';
export type EmailKind = 'webinar_update' | 'promotional';

export type ConditionParam = { name: string; type: string };
export type Condition = { key: string; label: string; params: ConditionParam[] };

export type RuleState = {
  id: string;
  condition: string;
  negate: boolean;
  params: Record<string, unknown>;
  /** Raw text of the email list, kept as typed; parsed when the audience is built. */
  emailsText: string;
};
export type GroupState = { id: string; match: Match; rules: RuleState[] };
export type AudienceState = { everyone: boolean; match: Match; groups: GroupState[] };

type RuleJson = { condition: string; negate: boolean; params?: Record<string, unknown> };
type GroupJson = { match: Match; rules: RuleJson[] };
export type AudienceJson = { everyone: true } | { match: Match; groups: GroupJson[] };

export const newId = (): string => crypto.randomUUID();

export const newRule = (condition: string, params: Record<string, unknown> = {}): RuleState => ({
  id: newId(),
  condition,
  negate: false,
  params,
  emailsText: '',
});

export const newGroup = (rules: RuleState[] = []): GroupState => ({ id: newId(), match: 'all', rules });

export const parseEmails = (text: string): string[] =>
  Array.from(
    new Set(
      text
        .split(/[\s,;]+/)
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean),
    ),
  );

const isObj = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

const asMatch = (v: unknown): Match => (v === 'any' ? 'any' : 'all');

/** Loads a stored audience into editor state. Anything unexpected becomes an empty audience. */
export const audienceFromJson = (raw: unknown): AudienceState => {
  if (!isObj(raw)) return { everyone: false, match: 'all', groups: [] };
  if (raw.everyone === true) return { everyone: true, match: 'all', groups: [] };
  const groups = Array.isArray(raw.groups) ? raw.groups : [];
  return {
    everyone: false,
    match: asMatch(raw.match),
    groups: groups.filter(isObj).map((g) => ({
      id: newId(),
      match: asMatch(g.match),
      rules: (Array.isArray(g.rules) ? g.rules : []).filter(isObj).map((r) => {
        const params = isObj(r.params) ? { ...r.params } : {};
        const emails = Array.isArray(params.emails) ? params.emails.map(String) : [];
        return {
          id: newId(),
          condition: String(r.condition ?? ''),
          negate: r.negate === true,
          params,
          emailsText: emails.join('\n'),
        };
      }),
    })),
  };
};

const ruleToJson = (rule: RuleState, conditions: Condition[]): RuleJson => {
  const def = conditions.find((c) => c.key === rule.condition);
  const params: Record<string, unknown> = {};
  for (const p of def?.params ?? []) {
    if (p.type === 'email[]') {
      params[p.name] = parseEmails(rule.emailsText);
      continue;
    }
    const value = rule.params[p.name];
    if (value === undefined || value === null || value === '') continue;
    params[p.name] = value;
  }
  return Object.keys(params).length
    ? { condition: rule.condition, negate: rule.negate, params }
    : { condition: rule.condition, negate: rule.negate };
};

/** The JSON the server takes. Empty groups are left out; no groups at all means "not picked yet". */
export const audienceToJson = (state: AudienceState, conditions: Condition[]): AudienceJson => {
  if (state.everyone) return { everyone: true };
  return {
    match: state.match,
    groups: state.groups
      .filter((g) => g.rules.length > 0)
      .map((g) => ({ match: g.match, rules: g.rules.map((r) => ruleToJson(r, conditions)) })),
  };
};

/** Why the audience can't be counted yet, or null when it can. */
export const audienceProblem = (state: AudienceState, conditions: Condition[]): string | null => {
  if (state.everyone) return null;
  const groups = state.groups.filter((g) => g.rules.length > 0);
  if (groups.length === 0) return 'Add a rule to choose who gets this email.';
  for (const [gi, group] of groups.entries()) {
    for (const [ri, rule] of group.rules.entries()) {
      const def = conditions.find((c) => c.key === rule.condition);
      const where = `rule ${ri + 1} in group ${gi + 1}`;
      if (!def) return `Pick a condition for ${where}.`;
      for (const p of def.params) {
        if (p.type.endsWith('?')) continue;
        if (p.type === 'email[]') {
          if (parseEmails(rule.emailsText).length === 0) return `Add at least one email to ${where}.`;
          continue;
        }
        const value = rule.params[p.name];
        if (p.type === 'int') {
          if (typeof value !== 'number' || !Number.isInteger(value) || value < 1) {
            return `Enter a number of days for ${where}.`;
          }
          continue;
        }
        if (!value) return `Finish ${where}.`;
      }
    }
  }
  return null;
};

/** Same rule as the server: a webinar update is linked to a webinar and, at the top level (ALL),
 * requires "Registered for a webinar" for that webinar. */
export const classifyAudience = (audience: AudienceJson, eventId: string | null): EmailKind => {
  if (!eventId || 'everyone' in audience || audience.match !== 'all') return 'promotional';
  const hit = audience.groups.some(
    (g) =>
      (g.match === 'all' || g.rules.length === 1) &&
      g.rules.some(
        (r) => r.condition === 'registered_webinar' && !r.negate && r.params?.eventId === eventId,
      ),
  );
  return hit ? 'webinar_update' : 'promotional';
};

/** Starting audience for a new email: the webinar's registrants when one is given, else nothing yet. */
export const defaultAudience = (eventId?: string): AudienceState =>
  eventId
    ? {
        everyone: false,
        match: 'all',
        groups: [newGroup([newRule('registered_webinar', { eventId })])],
      }
    : { everyone: false, match: 'all', groups: [newGroup()] };
