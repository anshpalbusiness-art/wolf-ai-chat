import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Chat } from './useChat';

export const useChatHistory = (userId: string | undefined) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!userId) {
      setChats([]);
      return;
    }

    const fetchChats = async () => {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error fetching chats:', error);
        return;
      }

      setChats(data || []);
    };

    fetchChats();
  }, [userId]);

  const createNewChat = async () => {
    if (!userId) return null;

    const { data, error } = await supabase
      .from('chats')
      .insert({
        user_id: userId,
        title: 'New Chat',
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating chat:', error);
      toast({
        title: 'Error',
        description: 'Failed to create new chat',
        variant: 'destructive',
      });
      return null;
    }

    setChats((prev) => [data, ...prev]);
    return data;
  };

  const deleteChat = async (chatId: string) => {
    const { error } = await supabase.from('chats').delete().eq('id', chatId);

    if (error) {
      console.error('Error deleting chat:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete chat',
        variant: 'destructive',
      });
      return;
    }

    setChats((prev) => prev.filter((chat) => chat.id !== chatId));
  };

  return { chats, createNewChat, deleteChat };
};