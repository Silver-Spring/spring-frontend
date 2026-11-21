import { AdminPageHeader } from '@/modules/admin/components/shared/admin-page-header';
import { EmailEditor } from '@/modules/emails/components/email-editor';

const NewEmailPage = () => (
  <div className="min-w-0 max-w-5xl space-y-6 p-6">
    <AdminPageHeader
      title="New email"
      description="Choose who gets it, write it, preview it, then send it now or schedule it."
    />
    <EmailEditor />
  </div>
);

export default NewEmailPage;
