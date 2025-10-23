import { View, Image } from 'react-native';
import React from 'react';
import { MessageEmpty } from '~/assets/images';
import { Text } from '~/components/ui/text';

const ChatEmpty = () => {
  return (
    <View className="mt-16 items-center gap-4">
      <Image style={{
        height: 100,
        width: 100
      }} resizeMode='contain' source={MessageEmpty} />
      <Text className='text-gray-600'>No messages yet, Say hi!</Text>
    </View>
  );
};

export default ChatEmpty;
