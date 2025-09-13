import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Text } from '~/components/ui/text';
import { Image } from 'expo-image';
import { ManProfile } from '~/assets/images';
import { cn } from '~/lib/utils';
import { router } from 'expo-router';

interface ChatCardProps {
  sender: string;
  last_message: string;
  is_seen: boolean;
  time: string;
  sender_image?: string;
}

const ChatCard = ({ sender, last_message, is_seen, time, sender_image }: ChatCardProps) => {
  function handleChatPress() {
    router.push(`/chat/${sender}`);
  }
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={cn('mb-5 flex-row items-center gap-4 rounded-xl border-b border-gray-50 p-2')}
      onPress={handleChatPress}>
      <View>
        {
          <Image
            recyclingKey={sender}
            source={ManProfile}
            style={{
              height: 40,
              width: 40,
              borderRadius: 1000,
            }}
          />
        }
        <View className='h-3 w-3 bg-green-500 border-2 border-white rounded-full absolute right-0.5 -bottom-1' />
      </View>
      <View className="flex-1 gap-1">
        <Text className={cn('font-semibold text-gray-800', !is_seen && 'text-gray-500')}>
          {sender}
        </Text>
        <Text className={cn('text-gray-800 font-medium', !is_seen && 'text-gray-400')}>{last_message}</Text>
      </View>
      <Text className={cn('text-xs')}>{time}</Text>
    </TouchableOpacity>
  );
};

export default ChatCard;

const styles = StyleSheet.create({});
