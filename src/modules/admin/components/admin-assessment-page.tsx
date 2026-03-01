'use client';

import { AdminSidebarLayout } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import {
  AdminStatsCard,
  QuestionManager,
  SectionManager,
  UsersAssessmentTable,
} from '@/modules/admin/components';
import { useEffect, useState } from 'react';

type TabType = 'stats' | 'users' | 'sections' | 'questions';

export const AdminAssessmentPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('stats');

  // Load saved tab from localStorage on mount
  useEffect(() => {
    const savedTab = localStorage.getItem('adminAssessmentTab') as TabType;
    if (savedTab && ['stats', 'users', 'sections', 'questions'].includes(savedTab)) {
      setActiveTab(savedTab);
    }
  }, []);

  // Save tab to localStorage whenever it changes
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    localStorage.setItem('adminAssessmentTab', tab);
  };

  return (
    <AdminSidebarLayout>
      <div className="p-6 md:p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assessment Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage assessment sections, questions, and view statistics
          </p>
        </div>

        <div className="flex flex-wrap gap-2 border-b pb-4">
          <Button
            variant={activeTab === 'stats' ? 'default' : 'ghost'}
            onClick={() => handleTabChange('stats')}
            className={activeTab === 'stats' ? '' : 'hover:bg-muted'}
          >
            Statistics
          </Button>
          <Button
            variant={activeTab === 'users' ? 'default' : 'ghost'}
            onClick={() => handleTabChange('users')}
            className={activeTab === 'users' ? '' : 'hover:bg-muted'}
          >
            Users & Results
          </Button>
          <Button
            variant={activeTab === 'sections' ? 'default' : 'ghost'}
            onClick={() => handleTabChange('sections')}
            className={activeTab === 'sections' ? '' : 'hover:bg-muted'}
          >
            Sections
          </Button>
          <Button
            variant={activeTab === 'questions' ? 'default' : 'ghost'}
            onClick={() => handleTabChange('questions')}
            className={activeTab === 'questions' ? '' : 'hover:bg-muted'}
          >
            Questions
          </Button>
        </div>

        <div className="mt-6">
          {activeTab === 'stats' && <AdminStatsCard />}
          {activeTab === 'users' && <UsersAssessmentTable />}
          {activeTab === 'sections' && <SectionManager />}
          {activeTab === 'questions' && <QuestionManager />}
        </div>
      </div>
    </AdminSidebarLayout>
  );
};
