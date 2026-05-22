'use client';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { useAdminAssessmentTypes } from '@/modules/admin/hooks/use-admin-assessment-types';
import {
  TYPE_PANEL_LINKS,
  useAdminAssessmentWorkspace,
  type AssessmentWorkspaceView,
} from '@/modules/admin/hooks/use-admin-assessment-workspace';
import { ChevronRight, ClipboardList } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo, useMemo } from 'react';

const SidebarMenuChevron = ({ className }: { className?: string }) => (
  <ChevronRight
    className={cn(
      'ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90',
      className
    )}
  />
);

type AssessmentTypeNavItemProps = {
  type: {
    code: string;
    name: string;
    isActive: boolean;
  };
  defaultOpen: boolean;
  isTypeActive: boolean;
  isViewActive: (view: AssessmentWorkspaceView, typeCode?: string) => boolean;
  buildHref: (view: AssessmentWorkspaceView, typeCode?: string) => string;
};

const AssessmentTypeNavItem = memo(function AssessmentTypeNavItem({
  type,
  defaultOpen,
  isTypeActive,
  isViewActive,
  buildHref,
}: AssessmentTypeNavItemProps) {
  return (
    <Collapsible defaultOpen={defaultOpen} className="group/collapsible">
      <SidebarMenuSubItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuSubButton isActive={isTypeActive}>
            <span className="min-w-0 flex-1 truncate">{type.name}</span>
            {!type.isActive && (
              <span className="shrink-0 rounded-md bg-sidebar-accent px-1.5 py-0.5 text-[10px] font-medium leading-none text-muted-foreground">
                Draft
              </span>
            )}
            <SidebarMenuChevron className="shrink-0" />
          </SidebarMenuSubButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {TYPE_PANEL_LINKS.map(({ view, label }) => (
              <SidebarMenuSubItem key={`${type.code}-${view}`}>
                <SidebarMenuSubButton
                  asChild
                  isActive={isViewActive(view, type.code)}
                  size="sm"
                >
                  <Link href={buildHref(view, type.code)} prefetch={false}>
                    {label}
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuSubItem>
    </Collapsible>
  );
});

export const AdminAssessmentSidebarNav = () => {
  const pathname = usePathname();
  const { assessmentTypes, loading } = useAdminAssessmentTypes();
  const { selectedType, isViewActive, buildHref } = useAdminAssessmentWorkspace();

  const sortedTypes = useMemo(
    () => [...assessmentTypes].sort((a, b) => a.displayOrder - b.displayOrder || a.name.localeCompare(b.name)),
    [assessmentTypes]
  );

  const isAssessmentRoute = pathname === '/admin/assessment';

  return (
    <Collapsible defaultOpen={isAssessmentRoute} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip="Assessments">
            <ClipboardList />
            <span>Assessments</span>
            <SidebarMenuChevron />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {loading && assessmentTypes.length === 0 ? (
              <SidebarMenuSubItem>
                <div className="flex items-center gap-2 px-2 py-1.5 text-xs text-muted-foreground">
                  <Spinner className="size-3" />
                  Loading...
                </div>
              </SidebarMenuSubItem>
            ) : (
              sortedTypes.map((type) => (
                <AssessmentTypeNavItem
                  key={type.code}
                  type={type}
                  defaultOpen={isAssessmentRoute && selectedType === type.code}
                  isTypeActive={
                    isAssessmentRoute &&
                    selectedType === type.code &&
                    !isViewActive('catalog') &&
                    !isViewActive('users')
                  }
                  isViewActive={isViewActive}
                  buildHref={buildHref}
                />
              ))
            )}

            <SidebarMenuSubItem>
              <SidebarMenuSubButton asChild isActive={isViewActive('catalog')}>
                <Link href={buildHref('catalog')} prefetch={false}>
                  All Types
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton asChild isActive={isViewActive('users')}>
                <Link href={buildHref('users')} prefetch={false}>
                  User Results
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};
