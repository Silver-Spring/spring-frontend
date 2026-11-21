import { EmailCampaignPage } from '@/modules/emails/components/email-campaign-page';

type EmailRouteProps = { params: Promise<{ id: string }> };

const EmailRoute = async ({ params }: EmailRouteProps) => {
  const { id } = await params;
  return <EmailCampaignPage id={id} />;
};

export default EmailRoute;
