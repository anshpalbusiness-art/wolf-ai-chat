import { Plus, History, Settings, HelpCircle, LogOut, Trash2, Menu, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Chat } from '@/hooks/useChat';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface ChatSidebarProps {
  chats: Chat[];
  currentChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  onLogout: () => void;
  userEmail?: string;
  isOpen: boolean;
  onToggle: () => void;
}

export const ChatSidebar = ({
  chats,
  currentChatId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  onLogout,
  userEmail,
  isOpen,
  onToggle,
}: ChatSidebarProps) => {
  const navigate = useNavigate();
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-sidebar border-r border-sidebar-border transition-transform duration-300',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          'w-[280px]'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <h1 className="text-2xl font-bold text-foreground">Wolf</h1>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onToggle}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* New Chat Button */}
        <div className="p-4 space-y-2">
          <Button
            onClick={onNewChat}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Chat
          </Button>
          <Button
            onClick={() => navigate('/puzzle')}
            variant="outline"
            className="w-full"
          >
            <Brain className="mr-2 h-4 w-4" />
            Pattern Puzzle
          </Button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-hidden px-4">
          <div className="flex items-center gap-2 mb-3">
            <History className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-sidebar-foreground">History</span>
          </div>
          <ScrollArea className="h-full">
            {chats.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4">No chats yet</p>
            ) : (
              <div className="space-y-1">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    className={cn(
                      'group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors',
                      currentChatId === chat.id
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'hover:bg-sidebar-accent/50 text-sidebar-foreground'
                    )}
                  >
                    <button
                      onClick={() => onSelectChat(chat.id)}
                      className="flex-1 text-left text-sm truncate"
                    >
                      {chat.title}
                    </button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteChat(chat.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>

        <Separator />

        {/* Bottom Menu */}
        <div className="p-4 space-y-1">
          <Button variant="ghost" className="w-full justify-start text-sidebar-foreground">
            <Settings className="mr-2 h-4 w-4" />
            Settings & Beta
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sidebar-foreground">
            <HelpCircle className="mr-2 h-4 w-4" />
            Help & Feedback
          </Button>
        </div>

        <Separator />

        {/* User Profile */}
        <div className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm">
              {userEmail?.charAt(0).toUpperCase() || 'W'}
            </div>
            <span className="text-sm text-sidebar-foreground truncate flex-1">{userEmail}</span>
          </div>
          <Button
            variant="ghost"
            onClick={onLogout}
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
};