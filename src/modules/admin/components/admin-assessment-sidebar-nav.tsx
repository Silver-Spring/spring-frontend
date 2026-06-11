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
  GLOBAL_WORKSPACE_NAV,
  TYPE_PANEL_LINKS,
} from '@/modules/admin/lib/assessment-workspace-nav';
import {
  useAdminAssessmentWorkspace,
  type AssessmentWorkspaceView,
} from '@/modules/admin/hooks/use-admin-assessment-workspace';
import { ChevronRight, FolderOpen, Plus, Users } from 'lucide-react';
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
  const isDraft = !type.isActive;

  return (
    <Collapsible defaultOpen={defaultOpen} className="group/collapsible">
      <SidebarMenuSubItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuSubButton isActive={isTypeActive}>
            <span className="min-w-0 flex-1 truncate">{type.name}</span>
            {isDraft && (
              <span className="shrink-0 rounded-md bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-1.5 py-0.5 text-[10px] font-medium leading-none">
                Draft
              </span>
            )}
            <SidebarMenuChevron className="shrink-0" />
          </SidebarMenuSubButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {TYPE_PANEL_LINKS.map(({ view, label, icon: Icon }, index) => {
              const isActive = isViewActive(view, type.code);
              return (
                <SidebarMenuSubItem key={`${type.code}-${view}`}>
                  <SidebarMenuSubButton asChild isActive={isActive} size="sm">
                    <Link href={buildHref(view, type.code)} prefetch={false}>
                      {isDraft ? (
                        <span
                          className={cn(
                            'inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-semibold shrink-0',
                            isActive
                              ? 'bg-primary-foreground/20 text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          )}
                        >
                          {index + 1}
                        </span>
                      ) : (
                        <Icon className="size-3.5 shrink-0" aria-hidden="true" />
                      )}
                      <span className="truncate">{label}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              );
            })}
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
    () =>
      [...assessmentTypes].sort((a, b) => {
        if (a.isActive !== b.isActive) return a.isActive ? -1 : 1;
        return a.name.localeCompare(b.name);
      }),
    [assessmentTypes]
  );

  const isAssessmentRoute = pathname === '/admin/assessment';

  const catalogItem = GLOBAL_WORKSPACE_NAV.find((n) => n.view === 'catalog');
  const usersItem = GLOBAL_WORKSPACE_NAV.find((n) => n.view === 'users');

  return (
    <>
      {/* All types — primary entry point, always visible at top */}
      {catalogItem && (
        <SidebarMenuItem>
          <SidebarMenuButton asChild isActive={isViewActive('catalog')}>
            <Link href={buildHref('catalog')} prefetch={false}>
              <FolderOpen className="size-4 shrink-0" aria-hidden="true" />
              <span>All types</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}

      {/* Per-type collapsibles */}
      {loading && assessmentTypes.length === 0 ? (
        <SidebarMenuItem>
          <div className="flex items-center gap-2 px-2 py-1.5 text-xs text-muted-foreground">
            <Spinner className="size-3" />
            Loading...
          </div>
        </SidebarMenuItem>
      ) : sortedTypes.length > 0 ? (
        <SidebarMenuItem>
          <SidebarMenuSub>
            {sortedTypes.map((type) => (
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
            ))}
          </SidebarMenuSub>
        </SidebarMenuItem>
      ) : null}

      {/* User sessions — monitoring, secondary */}
      {usersItem && (
        <SidebarMenuItem>
          <SidebarMenuButton asChild isActive={isViewActive('users')}>
            <Link href={buildHref('users')} prefetch={false}>
              <Users className="size-4 shrink-0" aria-hidden="true" />
              <span>User sessions</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}

      {/* Separator */}
      <SidebarMenuItem aria-hidden="true">
        <div className="mx-2 my-0.5 h-px bg-sidebar-border" />
      </SidebarMenuItem>

      {/* Create new type */}
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href="/admin/assessment/create" prefetch={false}>
            <Plus className="size-4 shrink-0" aria-hidden="true" />
            <span className="text-muted-foreground">New type</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </>
  );
};
