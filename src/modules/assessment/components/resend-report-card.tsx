'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Mail } from 'lucide-react';
import { useState } from 'react';
import { useResendReport } from '../hooks';

export function ResendReportCard() {
  const [resultId, setResultId] = useState('');
  const { resendReport, loading } = useResendReport();

  const handleResend = async () => {
    if (!resultId.trim()) {
      return;
    }

    await resendReport(resultId);
    setResultId('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Resend Assessment Report
        </CardTitle>
        <CardDescription>Resend the assessment report email to a user (Admin only)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resultId">Assessment Result ID</Label>
            <Input
              id="resultId"
              type="text"
              placeholder="Enter result UUID"
              value={resultId}
              onChange={(e) => setResultId(e.target.value)}
              disabled={loading}
            />
          </div>
          <Button onClick={handleResend} disabled={!resultId.trim() || loading} className="w-full">
            {loading ? (
              <>
                <Spinner className="mr-2 h-4 w-4" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Resend Report
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
