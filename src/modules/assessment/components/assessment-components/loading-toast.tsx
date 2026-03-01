import { Spinner } from '@/components/ui/spinner';

interface LoadingToastProps {
  message: string;
}

export const LoadingToast = ({ message }: LoadingToastProps) => {
  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-background/90 border rounded-full px-4 py-2 shadow-sm text-xs text-muted-foreground z-20 pointer-events-none">
      <Spinner className="size-3" />
      <span>{message}</span>
    </div>
  );
};
