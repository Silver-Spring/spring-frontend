export interface InterpretationBand {
  label: string;
  min: number;
  max: number;
  color: string;
  description: string;
}

export const TOTAL_SCORE_BANDS: InterpretationBand[] = [
  {
    label: 'Vulnerable',
    min: 50,
    max: 100,
    color: 'text-red-600 dark:text-red-400',
    description: 'At this stage, retirement may feel abstract, uncertain, or even uncomfortable. Much of your identity and energy may still be tied to professional roles, achievements, or work-based structure. The future feels blurry and is usually filled with questions like “What will I do next?” or “Will I stay relevant?” rather than clear possibilities.',
  },
  {
    label: 'Emerging',
    min: 101,
    max: 200,
    color: 'text-orange-600 dark:text-orange-400',
    description: "You've started reflecting on life beyond work but haven't yet built tangible habits or structure around it. You're thinking about retirement, but planning may still feel theoretical. You may oscillate between excitement and apprehension — one day ready to explore, another day reluctant to let go.",
  },
  {
    label: 'Developing',
    min: 201,
    max: 300,
    color: 'text-yellow-600 dark:text-yellow-400',
    description: "You've gained clarity about what matters and are beginning to take intentional steps toward your next phase. You're learning to replace the structure of work with a balanced rhythm of purpose, connection, and wellness.",
  },
  {
    label: 'Proactive',
    min: 301,
    max: 400,
    color: 'text-blue-600 dark:text-blue-400',
    description: 'You are consciously shaping your retirement story by designing rather than drifting. You\'ve built habits of reflection, learning, and engagement across most dimensions. You see retirement not as withdrawal but as redesign and a chance to repurpose your time, energy, and relationships intentionally. You are self-aware, emotionally stable, socially active, and health-focused, with a strong sense of curiosity and contribution.',
  },
  {
    label: 'Thriving',
    min: 401,
    max: 500,
    color: 'text-green-600 dark:text-green-400',
    description: "You've arrived at a state of harmony and flow where purpose, people, and peace coexist naturally. You live a life of balance; physically active, mentally agile, socially connected, and emotionally grounded. You are curious, engaged, and purposeful in your daily life.",
  },
];

export const SECTION_SCORE_BANDS: InterpretationBand[] = [
  {
    label: 'Vulnerable',
    min: 10,
    max: 29,
    color: 'text-red-600 dark:text-red-400',
    description: '',
  },
  {
    label: 'Emerging',
    min: 30,
    max: 49,
    color: 'text-orange-600 dark:text-orange-400',
    description: '',
  },
  {
    label: 'Developing',
    min: 50,
    max: 69,
    color: 'text-yellow-600 dark:text-yellow-400',
    description: '',
  },
  {
    label: 'Proactive',
    min: 70,
    max: 89,
    color: 'text-blue-600 dark:text-blue-400',
    description: '',
  },
  {
    label: 'Thriving',
    min: 90,
    max: 100,
    color: 'text-green-600 dark:text-green-400',
    description: '',
  },
];

export const getInterpretationBand = (
  score: number,
  isTotal: boolean = true
): InterpretationBand | null => {
  const bands = isTotal ? TOTAL_SCORE_BANDS : SECTION_SCORE_BANDS;
  const band = bands.find((b) => score >= b.min && score <= b.max);
  return band || null;
};

export const AGE_RANGES = [
  { label: '18-25', min: 18, max: 25 },
  { label: '26-35', min: 26, max: 35 },
  { label: '36-45', min: 36, max: 45 },
  { label: '46-55', min: 46, max: 55 },
  { label: '56-65', min: 56, max: 65 },
  { label: '66+', min: 66, max: 150 },
];

export const getAgeRange = (age: number): string => {
  const range = AGE_RANGES.find((r) => age >= r.min && age <= r.max);
  return range?.label || 'Unknown';
};
