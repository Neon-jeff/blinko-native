import { View, Text } from 'react-native';
import React from 'react';
import { useGlobalSearchParams } from 'expo-router';
import ChatHeader from '~/components/shared/chat-header';
import ChatKeyboard from '~/components/shared/chat-keyboard';
import Screen from '~/components/ui/screen';
import { FlashList } from '@shopify/flash-list';
import { chatMessages } from '~/mock';
import MessagePill from '~/components/cards/message-pill';

const ChatScreen = () => {
  const { user } = useGlobalSearchParams();
  return (
    <View className="bg-white flex-1  px-4">
      <ChatHeader sender_name={user as string} />
     <View className='flex-1 mt-44'>
         <FlashList
        data={chatMessages}
        renderItem={({ item }) => (
          <MessagePill
            message={item.message}
            sender_image={item.sender_image}
            is_user_message={item.is_user_message}
          />
        )}
        keyExtractor={(item) => item.message}
        showsVerticalScrollIndicator={false}
      />
     </View>
      <ChatKeyboard />
    </View>
  );
};

export default ChatScreen;
