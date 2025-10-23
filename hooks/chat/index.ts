import { useMutation, useQuery } from '@tanstack/react-query';
import { ChatService } from '~/services/chat';
import { PaginationParams } from '~/services/posts/types';

export const chatService = new ChatService();

export function useFetchConversations() {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: () => chatService.fetchConversations(),
    refetchOnMount:false,
    refetchInterval: 1000 * 60 * 1, // 1 minute,
    refetchOnWindowFocus: true,
  });
}

export function useFetchChatById(id: string) {
  return useQuery({
    queryKey: ['chat', id],
    queryFn: () => chatService.fetchChatById(id),
    enabled: !!id,
  });
}

export function useFetchChatMessages(id: string,params?:PaginationParams) {
  return useQuery({
    queryKey: ['chat-messages', `chat-${id}`, params],
    queryFn: () => chatService.fetchChatMessages(id,params),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
}

export function useDeleteChat() {
  return useMutation({
    mutationFn: (id: string) => chatService.deleteChat(id),
  });
}

export function useSendMessage() {
  return useMutation({
    mutationFn: (data: { receiverProfileId: string; text: string; media?: any[] }) =>
      chatService.sendMessage(data),
  });
}

export function useDeleteMessage() {
  return useMutation({
    mutationFn: (id: string) => chatService.deleteMessage(id),
  });
}