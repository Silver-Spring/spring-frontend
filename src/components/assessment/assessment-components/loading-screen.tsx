import { Spinner } from '@/components/ui/spinner';

interface LoadingScreenProps {
  message: string;
  description?: string;
}

export const LoadingScreen = ({ message, description }: LoadingScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4">
      <Spinner className="size-8" />
      <div className="text-center space-y-1">
        <p className="text-lg font-medium text-foreground">{message}</p>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
};
