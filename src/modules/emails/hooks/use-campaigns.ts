'use client';

import { useLazyQuery, useMutation, useQuery } from '@apollo/client/react';
import { useEffect } from 'react';
import { AdminCampaignAudiencePreviewDoc } from '../graphql/admin-campaign-audience-preview.graphql';
import { AdminCampaignConditionsDoc } from '../graphql/admin-campaign-conditions.graphql';
import { AdminCampaignRecipientsDoc } from '../graphql/admin-campaign-recipients.graphql';
import { AdminCampaignDoc } from '../graphql/admin-campaign.graphql';
import { AdminCampaignsDoc } from '../graphql/admin-campaigns.graphql';
import { AdminCancelCampaignDoc } from '../graphql/admin-cancel-campaign.graphql';
import { AdminDuplicateCampaignDoc } from '../graphql/admin-duplicate-campaign.graphql';
import { AdminPreviewCampaignDoc } from '../graphql/admin-preview-campaign.graphql';
import { AdminSaveCampaignDoc } from '../graphql/admin-save-campaign.graphql';
import { AdminScheduleCampaignDoc } from '../graphql/admin-schedule-campaign.graphql';
import { AdminSendCampaignTestDoc } from '../graphql/admin-send-campaign-test.graphql';
import type { AudienceJson } from '../lib/audience';

export const useCampaignConditions = () => {
  const { data, loading } = useQuery(AdminCampaignConditionsDoc);
  return { conditions: data?.adminCampaignConditions ?? [], loading };
};

export const useCampaigns = (opts: { eventId?: string; starters?: boolean } = {}) => {
  const { data, loading, refetch } = useQuery(AdminCampaignsDoc, {
    variables: { eventId: opts.eventId ?? null, starters: opts.starters ?? false },
    fetchPolicy: 'network-only',
  });
  return { campaigns: data?.adminCampaigns ?? [], loading, refetch };
};

/** Polls while the email is on its way so its status and counts stay current. */
export const useCampaign = (id: string | undefined) => {
  const { data, loading, error, refetch, startPolling, stopPolling } = useQuery(AdminCampaignDoc, {
    variables: { id: id ?? '' },
    skip: !id,
    fetchPolicy: 'network-only',
  });
  const campaign = data?.adminCampaign ?? null;
  const status = campaign?.status;

  useEffect(() => {
    if (status === 'sending') startPolling(3000);
    else if (status === 'scheduled') startPolling(15000);
    else stopPolling();
    return () => stopPolling();
  }, [status, startPolling, stopPolling]);

  return { campaign, loading, error, refetch };
};

export const useAudiencePreview = (audience: AudienceJson | null, eventId: string | null) => {
  const { data, previousData, loading, error, refetch } = useQuery(AdminCampaignAudiencePreviewDoc, {
    variables: { audience: audience ?? {}, eventId },
    skip: !audience,
    fetchPolicy: 'network-only',
  });
  const preview = (data ?? previousData)?.adminCampaignAudiencePreview ?? null;
  return { preview, loading, error, refetch };
};

export const useCampaignRecipients = (id: string, status: string | null, offset: number, limit: number) => {
  const { data, loading, refetch } = useQuery(AdminCampaignRecipientsDoc, {
    variables: { id, status, offset, limit },
    fetchPolicy: 'network-only',
  });
  return { recipients: data?.adminCampaignRecipients ?? [], loading, refetch };
};

export const usePreviewCampaign = () =>
  useLazyQuery(AdminPreviewCampaignDoc, { fetchPolicy: 'network-only' });

export const useSaveCampaign = () => useMutation(AdminSaveCampaignDoc);
export const useSendCampaignTest = () => useMutation(AdminSendCampaignTestDoc);
export const useScheduleCampaign = () => useMutation(AdminScheduleCampaignDoc);
export const useCancelCampaign = () => useMutation(AdminCancelCampaignDoc);
export const useDuplicateCampaign = () => useMutation(AdminDuplicateCampaignDoc);
