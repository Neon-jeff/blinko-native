import { View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import ChatHeader from '~/components/shared/chat-header';
import ChatKeyboard from '~/components/shared/chat-keyboard';
import { LegendList } from '@legendapp/list';
import MessagePill from '~/components/cards/message-pill';
import { useFetchChatById, useFetchChatMessages, useFetchConversations } from '~/hooks/chat';
import ChatEmpty from '~/components/shared/chat-empty';
import { useAuthStore } from '~/store/auth';
import { useSocket } from '~/components/providers/socket-client';
import { queryClient } from '~/components/query-client';
import { ChatMessage, ChatMessagesResponse } from '~/services/chat/types';
import { ApiResponse } from '~/api';

const ChatScreen = () => {
  const { user } = useAuthStore();
  const { id, receiver_id, receiver_name, receiver_image } = useLocalSearchParams<{
    id: string;
    receiver_id?: string;
    receiver_name: string;
    receiver_image: string;
  }>();
  const { refetch: refetchConversations } = useFetchConversations();
  const {
    data: messages,
    isLoading,
    refetch: refetchMessages,
  } = useFetchChatMessages(id !== 'undefined' && id ? id : '', { limit: 100, page: 1 });
  const { data: chatDetails, isLoading: isLoadingChatDetails } = useFetchChatById(
    id !== 'undefined' && id ? id : ''
  );
  const messageUpdatedRef = React.useRef<boolean>(false);
  const socket = useSocket();

  const handleMessageSocketEvent = React.useCallback((data: any) => {
    if (data?.sender?._id !== user?.profile?._id && !messageUpdatedRef.current) {
      handleMessageSent(data);
      messageUpdatedRef.current = true;
    }
    refetchMessages();
    refetchConversations();
  }, []);

  React.useEffect(() => {
    socket.emit('join-dm', id);
    socket.on('dm-message', (data) => {
      handleMessageSocketEvent(data);
    });
    return () => {
      messageUpdatedRef.current = false;
    };
  }, []);
  const receiverFromChat =
    chatDetails?.data?.participants?.find(
      (participant) => participant._id !== user?.profile?._id
    ) || null;

  function handleMessageSent(newMessage: Partial<ChatMessage>) {
    queryClient.setQueryData(
      ['chat-messages', `chat-${id}`, { limit: 100, page: 1 }],
      (oldData: ApiResponse<ChatMessagesResponse>) => {
        if (!oldData) return oldData;

        const oldMessages = oldData?.data?.docs || [];
        return {
          ...oldData,
          data: {
            ...oldData?.data,
            docs: [...oldMessages, newMessage as ChatMessage],
          },
        };
      }
    );
  }
  const handleMessageDelivered = React.useCallback(() => {
    refetchMessages();
    refetchConversations();
  }, []);

  return (
    <View className="flex-1 bg-white  px-4">
      <ChatHeader
        receiver={{
          name: receiverFromChat?.fullName || receiver_name || '',
          image: receiverFromChat?.displayPhoto?.url || receiver_image || '',
        }}
      />
      {id === 'undefined' && <ChatEmpty />}
      {id !== 'undefined' && (
        // <KeyboardAwareScrollView showsVerticalScrollIndicator={false} className="flex-1 ">
        <LegendList
          // ref={messageListRef}
          data={messages?.data.docs || []}
          renderItem={({ item }) => (
            <MessagePill
              message={item.text}
              sender_name={item.sender.fullName}
              is_user_message={item.sender._id === user?.profile?._id}
              id={item._id}
              is_delivered={!!item._id}
            />
          )}
          keyExtractor={(item, index) => item._id + item.text + index}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 150, flexGrow: 1 }}
          onStartReached={() => {}}
          estimatedItemSize={320}
          alignItemsAtEnd
          maintainScrollAtEnd
          maintainScrollAtEndThreshold={0.1}
          style={{ flex: 1 }}
          extraData={{}}
        />
        // </KeyboardAwareScrollView>
      )}
      <ChatKeyboard
        onMessageSent={handleMessageSent}
        receiverId={receiverFromChat?._id || receiver_id || ''}
        onMessageDelivered={handleMessageDelivered}
      />
    </View>
  );
};

export default ChatScreen;
