import type { AssessmentWorkspaceView } from '@/modules/admin/hooks/use-admin-assessment-workspace';
import {
  BarChart3,
  FileText,
  FolderOpen,
  LayoutDashboard,
  Layers,
  Settings2,
  Users,
  type LucideIcon,
} from 'lucide-react';

export type WorkspaceNavItem = {
  view: AssessmentWorkspaceView;
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const TYPE_WORKSPACE_NAV: WorkspaceNavItem[] = [
  {
    view: 'overview',
    label: 'Overview',
    title: 'Overview',
    description: 'Status, counts, and publish checklist.',
    icon: LayoutDashboard,
  },
  {
    view: 'content',
    label: 'Sections & questions',
    title: 'Sections & questions',
    description: 'Dimensions, question bank, emoji, and color.',
    icon: Layers,
  },
  {
    view: 'scoring',
    label: 'Score bands',
    title: 'Score bands',
    description: 'Stage ranges and interpretation narratives.',
    icon: BarChart3,
  },
  {
    view: 'reports',
    label: 'Report copy',
    title: 'Report copy',
    description: 'PDF cover, header, and about-page text.',
    icon: FileText,
  },
  {
    view: 'settings',
    label: 'Type details',
    title: 'Type details',
    description: 'Name, price, structure, and display order.',
    icon: Settings2,
  },
];

export const GLOBAL_WORKSPACE_NAV: WorkspaceNavItem[] = [
  {
    view: 'catalog',
    label: 'All types',
    title: 'All types',
    description: 'Browse and create assessment products.',
    icon: FolderOpen,
  },
  {
    view: 'users',
    label: 'User sessions',
    title: 'User sessions',
    description: 'Who started, finished, or is in progress.',
    icon: Users,
  },
];

export const WORKSPACE_NAV_BY_VIEW: Record<AssessmentWorkspaceView, WorkspaceNavItem> = {
  ...Object.fromEntries(
    [...TYPE_WORKSPACE_NAV, ...GLOBAL_WORKSPACE_NAV].map((item) => [item.view, item])
  ) as Record<AssessmentWorkspaceView, WorkspaceNavItem>,
};

export const TYPE_PANEL_LINKS = TYPE_WORKSPACE_NAV.map(({ view, label, icon }) => ({
  view,
  label,
  icon,
}));

export const WORKSPACE_TAB_GUIDE = TYPE_WORKSPACE_NAV.filter(
  (item) => item.view !== 'overview'
).map(({ view, label, icon }) => ({ view, label, icon }));

export const getWorkspaceNavLabel = (view: AssessmentWorkspaceView): string =>
  WORKSPACE_NAV_BY_VIEW[view]?.label ?? view;
