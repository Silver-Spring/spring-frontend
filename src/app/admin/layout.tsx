import { AdminSidebarLayout } from '@/components/layouts/admin-sidebar-layout';
import type { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminSidebarLayout>{children}</AdminSidebarLayout>;
}
