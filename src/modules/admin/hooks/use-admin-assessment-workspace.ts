'use client';

import {
  DEFAULT_ASSESSMENT_TYPE,
  type AssessmentTypeCode,
} from '@/modules/assessment/constants';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export type AssessmentWorkspaceView =
  | 'overview'
  | 'content'
  | 'scoring'
  | 'reports'
  | 'pdf-theme'
  | 'settings'
  | 'catalog'
  | 'users';

const TYPE_VIEWS: AssessmentWorkspaceView[] = [
  'overview',
  'content',
  'scoring',
  'reports',
  'pdf-theme',
  'settings',
];

export const isTypeScopedView = (
  view: AssessmentWorkspaceView
): view is Exclude<AssessmentWorkspaceView, 'catalog' | 'users'> => {
  return TYPE_VIEWS.includes(view);
};

export const buildAssessmentHref = (
  view: AssessmentWorkspaceView,
  type: AssessmentTypeCode = DEFAULT_ASSESSMENT_TYPE
) => {
  if (view === 'catalog' || view === 'users') {
    return `/admin/assessment?view=${view}`;
  }
  return `/admin/assessment?type=${type}&view=${view}`;
};

export const useAdminAssessmentWorkspace = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isAssessmentRoute = pathname === '/admin/assessment';

  const view = useMemo((): AssessmentWorkspaceView => {
    const param = searchParams.get('view');
    if (
      param === 'catalog' ||
      param === 'users' ||
      param === 'overview' ||
      param === 'content' ||
      param === 'scoring' ||
      param === 'reports' ||
      param === 'pdf-theme' ||
      param === 'settings'
    ) {
      return param;
    }
    return 'overview';
  }, [searchParams]);

  const selectedType = useMemo((): AssessmentTypeCode => {
    return searchParams.get('type') ?? DEFAULT_ASSESSMENT_TYPE;
  }, [searchParams]);

  const navigate = useCallback(
    (nextView: AssessmentWorkspaceView, nextType?: AssessmentTypeCode) => {
      router.push(buildAssessmentHref(nextView, nextType ?? selectedType));
    },
    [router, selectedType]
  );

  const isViewActive = useCallback(
    (checkView: AssessmentWorkspaceView, checkType?: AssessmentTypeCode) => {
      if (!isAssessmentRoute) return false;
      if (view !== checkView) return false;
      if (checkView === 'catalog' || checkView === 'users') return true;
      return selectedType === (checkType ?? selectedType);
    },
    [isAssessmentRoute, view, selectedType]
  );

  return {
    isAssessmentRoute,
    view,
    selectedType,
    navigate,
    isViewActive,
    buildHref: buildAssessmentHref,
  };
};

export { TYPE_PANEL_LINKS } from '@/modules/admin/lib/assessment-workspace-nav';
