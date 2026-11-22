'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { AdminPageHeader } from '@/modules/admin/components/shared/admin-page-header';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCampaign } from '../hooks/use-campaigns';
import { canDeleteCampaign } from '../lib/format';
import { DeleteEmailButton } from './delete-email-button';
import { EmailDetail } from './email-detail';
import { EmailEditor } from './email-editor';

const BackLink = () => (
  <Button asChild variant="ghost" size="sm" className="-ml-2 gap-1">
    <Link href="/admin/emails">
      <ArrowLeft className="size-4" /> All emails
    </Link>
  </Button>
);

/** /admin/emails/[id]: the editor while the email is a draft or scheduled, otherwise its results. */
export const EmailCampaignPage = ({ id }: { id: string }) => {
  const router = useRouter();
  const { campaign, loading, refetch } = useCampaign(id);

  if (loading && !campaign) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }
  if (!campaign) {
    return (
      <div className="space-y-3 p-6">
        <BackLink />
        <p>Email not found.</p>
      </div>
    );
  }

  const editable = campaign.status === 'draft' || campaign.status === 'scheduled';

  return (
    <div className="min-w-0 max-w-5xl space-y-6 p-6">
      <div className="space-y-3">
        <BackLink />
        <AdminPageHeader
          title={campaign.name || 'Untitled email'}
          actions={
            canDeleteCampaign(campaign) && (
              <DeleteEmailButton
                id={campaign.id}
                name={campaign.name}
                onDeleted={() => router.replace('/admin/emails')}
              />
            )
          }
        />
      </div>
      {editable ? (
        <EmailEditor campaignId={campaign.id} />
      ) : (
        <EmailDetail campaign={campaign} onRefresh={() => refetch()} />
      )}
    </div>
  );
};
