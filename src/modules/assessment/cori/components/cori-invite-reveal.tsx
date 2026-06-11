'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Copy, Check, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface CoriInviteRevealProps {
  inviteCode: string;
  onStartAssessment: () => void;
}

export function CoriInviteReveal({ inviteCode, onStartAssessment }: CoriInviteRevealProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      setCopied(true);
      toast.success('Invite code copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy. Please copy the code manually.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border-2 border-primary/20 bg-card p-8 shadow-2xl md:p-10">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <Share2 className="size-8 text-primary" />
          </div>
          <h2 className="mb-2 text-2xl font-semibold">Share with your partner</h2>
          <p className="text-sm text-muted-foreground">
            Send this invite code to your partner so they can join the assessment. Keep a copy — you
            can also see it from the assessment screen.
          </p>
        </div>

        <div className="mb-6 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-6 text-center">
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Your Invite Code
          </p>
          <p className="font-mono text-4xl font-bold tracking-widest text-primary">{inviteCode}</p>
        </div>

        <div className="mb-6 flex flex-col gap-3">
          <Button
            size="lg"
            variant="outline"
            className="h-12 w-full gap-2 rounded-full font-medium"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="size-4 text-green-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="size-4" />
                Copy Code
              </>
            )}
          </Button>
        </div>

        <Button
          size="lg"
          className="h-14 w-full gap-2 rounded-full text-base font-medium shadow-md transition-all hover:scale-[1.02] hover:shadow-lg"
          onClick={onStartAssessment}
        >
          Start My Assessment
          <ArrowRight className="size-4" />
        </Button>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          You can share the code later from your assessment screen.
        </p>
      </div>
    </div>
  );
}
