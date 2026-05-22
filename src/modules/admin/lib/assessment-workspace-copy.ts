import type { AssessmentWorkspaceView } from '@/modules/admin/hooks/use-admin-assessment-workspace';
import {
  GLOBAL_WORKSPACE_NAV,
  TYPE_PANEL_LINKS,
  TYPE_WORKSPACE_NAV,
  WORKSPACE_NAV_BY_VIEW,
  WORKSPACE_TAB_GUIDE,
  getWorkspaceNavLabel,
  type WorkspaceNavItem,
} from './assessment-workspace-nav';

export {
  GLOBAL_WORKSPACE_NAV,
  TYPE_PANEL_LINKS,
  TYPE_WORKSPACE_NAV,
  WORKSPACE_NAV_BY_VIEW,
  WORKSPACE_TAB_GUIDE,
  getWorkspaceNavLabel,
  type WorkspaceNavItem,
};

export const WORKSPACE_VIEW_META: Record<
  AssessmentWorkspaceView,
  { title: string; description: string }
> = Object.fromEntries(
  Object.entries(WORKSPACE_NAV_BY_VIEW).map(([view, item]) => [
    view,
    { title: item.title, description: item.description },
  ])
) as Record<AssessmentWorkspaceView, { title: string; description: string }>;
