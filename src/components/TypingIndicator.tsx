import { Bot } from 'lucide-react';

export const TypingIndicator = () => {
  return (
    <div className="flex gap-4 py-6 px-6 bg-card">
      <div className="flex-shrink-0">
        <div className="h-8 w-8 rounded-full bg-wolf-gray border border-border flex items-center justify-center">
          <Bot className="h-5 w-5 text-foreground" />
        </div>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};