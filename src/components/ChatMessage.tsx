import { Message } from '@/hooks/useChat';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex gap-4 py-6 px-6', isUser ? 'bg-background' : 'bg-card')}>
      <div className="flex-shrink-0">
        <div
          className={cn(
            'h-8 w-8 rounded-full flex items-center justify-center border',
            isUser ? 'bg-primary border-primary' : 'bg-wolf-gray border-border'
          )}
        >
          {isUser ? (
            <User className="h-5 w-5 text-primary-foreground" />
          ) : (
            <Bot className="h-5 w-5 text-foreground" />
          )}
        </div>
      </div>
      <div className="flex-1 space-y-2 overflow-hidden">
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-2 leading-7">{children}</p>,
              code: ({ className, children }) => {
                const isInline = !className;
                return isInline ? (
                  <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
                    {children}
                  </code>
                ) : (
                  <code className="block bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    {children}
                  </code>
                );
              },
              ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
              li: ({ children }) => <li className="mb-1">{children}</li>,
              h1: ({ children }) => <h1 className="text-2xl font-bold mb-2">{children}</h1>,
              h2: ({ children }) => <h2 className="text-xl font-bold mb-2">{children}</h2>,
              h3: ({ children }) => <h3 className="text-lg font-bold mb-2">{children}</h3>,
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};