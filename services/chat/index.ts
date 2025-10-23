import { ApiResponse, http } from '~/api';
import { PaginationParams } from '../posts/types';
import { ChatMessage, ChatMessagesResponse, Conversation, ConversationResponse, SendChatMessagePayload } from './types';

export class ChatService {
  private routes = {
    conversations: {
      fetch_conversations: 'chat',
      get_chat(id: string) {
        return `chat/${id}`;
      },
      delete_chat(id: string) {
        return `chat/${id}`;
      },
      get_chat_messages(id: string) {
        return `message/${id}`;
      },
      delete_message(id: string) {
        return `message/${id}`;
      },
      delete_multiple_messages: 'messages',
      edit_message(id: string) {
        return `message/${id}`;
      },
      mark_as_read(id: string) {
        return `message/${id}/mark-as-read`;
      },
    },
    messages: {
      send_message: 'message',
    },
  };

  async fetchConversations(params?: PaginationParams) {
    try {
      return await http
        .get<ApiResponse<ConversationResponse>>(this.routes.conversations.fetch_conversations, {
          searchParams: { ...params },
        })
        .json();
    } catch (error) {
      throw error;
    }
  }

  async fetchChatById(id: string) {
    try {
      return await http
        .get<ApiResponse<Conversation>>(this.routes.conversations.get_chat(id))
        .json();
    } catch (error) {
      throw error;
    }
  }

  async deleteChat(id: string) {
    try {
      return await http
        .delete<ApiResponse<Conversation>>(this.routes.conversations.delete_chat(id))
        .json();
    } catch (error) {
      throw error;
    }
  }

  async fetchChatMessages(id: string, params?: PaginationParams) {
    try {
      return await http
        .get<ApiResponse<ChatMessagesResponse>>(this.routes.conversations.get_chat_messages(id), {
          searchParams: { ...params },
        })
        .json();
    } catch (error) {
      throw error;
    }
  }

  async deleteMessage(id: string) {
    try {
      return await http
        .delete<ApiResponse<ChatMessage>>(this.routes.conversations.delete_message(id))
        .json();
    } catch (error) {
      throw error;
    }
  }

  async deleteMultipleMessages(ids: string[]) {
    try {
      return await http
        .delete<ApiResponse<ChatMessage[]>>(this.routes.conversations.delete_multiple_messages, {
          json: { ids },
        })
        .json();
    } catch (error) {
      throw error;
    }
  }

  async editMessage(id: string, text: string) {
    try {
      return await http
        .put<ApiResponse<ChatMessage>>(this.routes.conversations.edit_message(id), {
          json: { text },
        })
        .json();
    } catch (error) {
      throw error;
    }
  }

  async markMessageAsRead(id: string) {
    try {
      return await http
        .post<ApiResponse<ChatMessage>>(this.routes.conversations.mark_as_read(id))
        .json();
    } catch (error) {
      throw error;
    }
  }

  async sendMessage(data: SendChatMessagePayload) {
    try {
      return await http
        .post<ApiResponse<ChatMessage>>(this.routes.messages.send_message, {
          json: data,
        })
        .json();
    } catch (error) {
      throw error;
    }
  }
}

export const chatService = new ChatService();