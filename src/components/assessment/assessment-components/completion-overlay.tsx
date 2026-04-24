import { Spinner } from '@/components/ui/spinner';

export const CompletionOverlay = () => {
  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center space-y-4 px-4">
        <div className="flex justify-center">
          <Spinner className="size-12 text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            Crafting Your Personalized Results
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            We're analyzing your responses to create meaningful insights tailored just for you...
          </p>
        </div>
      </div>
    </div>
  );
};
