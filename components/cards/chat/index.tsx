import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { Text } from '~/components/ui/text';
import { cn } from '~/lib/utils';
import { router } from 'expo-router';
import { Conversation } from '~/services/chat/types';
import { formDate } from '~/utils/date';
import { usePrefectchActions } from '~/hooks/actions';
import { useAuthStore } from '~/store/auth';
import { Check } from 'lucide-react-native';

interface ChatCardProps {
  chat: Conversation;
}

const ChatCard = ({ chat }: ChatCardProps) => {
  const { user } = useAuthStore();
  const { prefetchChatMessages } = usePrefectchActions();
  function handleChatPress() {
    prefetchChatMessages(chat._id);
    router.push(`/chat/${chat._id}`);
  }
  const is_seen = chat?.lastMessage?.readBy?.length > 0;
  const otherChatParticipant =
    chat.participants.find((participant) => participant._id !== user?.profile?._id) || null;
  const lastChatSender = chat.participants.find(
    (participant) => participant._id === chat.lastMessage.sender
  );
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={cn('mb-5 flex-row items-center gap-4 rounded-xl border-b border-gray-50 p-2')}
      onPress={handleChatPress}>
      <View>
        {
          <Image
            source={{ uri: otherChatParticipant?.displayPhoto?.url }}
            style={{
              height: 40,
              width: 40,
              borderRadius: 1000,
              aspectRatio: 1,
            }}
            resizeMode="cover"
          />
        }
        {/* <View className="absolute -bottom-1 right-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500" /> */}
      </View>
      <View className="flex-1 gap-1">
        <Text
          className={cn(
            'font-semibold text-gray-800',
            !chat.lastMessage.readBy.length && 'text-gray-500'
          )}>
          {otherChatParticipant?.fullName || ''}
        </Text>
        <View className="flex-row items-center gap-1">
          {lastChatSender?._id === user?.profile?._id && <Check size={16} color={'gray'} />}
          <Text numberOfLines={1} className={cn('font-medium text-gray-800', !is_seen && 'text-gray-400')}>
            {chat.lastMessage.text}
          </Text>
        </View>
      </View>
      <Text className={cn('text-xs')}>{formDate(chat.lastMessage.createdAt)}</Text>
    </TouchableOpacity>
  );
};

export default ChatCard;

const styles = StyleSheet.create({});
