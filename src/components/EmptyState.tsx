import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onPromptClick: (prompt: string) => void;
}

const SUGGESTED_PROMPTS = [
  'Explain quantum computing in simple terms',
  'Write a poem about the ocean',
  'What are the best practices for React development?',
  'Help me plan a healthy meal prep for the week',
];

export const EmptyState = ({ onPromptClick }: EmptyStateProps) => {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <div className="space-y-4">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">Ask Wolf anything</h2>
          <p className="text-muted-foreground">
            Start a conversation or try one of these suggestions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SUGGESTED_PROMPTS.map((prompt) => (
            <Button
              key={prompt}
              variant="outline"
              className="h-auto py-4 px-6 text-left justify-start hover:bg-card hover:border-primary/50 transition-colors"
              onClick={() => onPromptClick(prompt)}
            >
              <span className="text-sm">{prompt}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};