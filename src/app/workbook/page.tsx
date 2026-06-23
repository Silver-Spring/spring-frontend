import type { Metadata } from 'next';
import { WorkbookPage } from '@/modules/workbook/components/workbook-page';

export const metadata: Metadata = {
  title: 'Designing Your Next Phase — Retirement Workbook',
  description:
    'A workbook to help you reflect on the non-financial side of retirement readiness — purpose, identity, relationships, health, and the life you want to build. By Rajat Mathur, Founder of Silver Spring.',
};

export default function Page() {
  return <WorkbookPage />;
}
