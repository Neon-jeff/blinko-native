import { PaginationParams } from '~/services/posts/types';
import { chatService } from '../chat';
import { queryClient } from '~/components/query-client';

export function usePrefectchActions() {
  const prefetchConversations = async () => {
    await queryClient.prefetchQuery({
      queryKey: ['conversations'],
      queryFn: () => chatService.fetchConversations(),
    });
  };
  const prefetchChatMessages = async (chatId: string, params: PaginationParams) => {
    await queryClient.prefetchQuery({
      queryKey: ['chat-messages', `chat-${chatId}`, params],
      queryFn: () => chatService.fetchChatMessages(chatId, params),
    });
  };
  return { prefetchConversations, prefetchChatMessages };
}
