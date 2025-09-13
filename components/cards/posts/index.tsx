import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
import { Text } from '~/components/ui/text';
import { sizes } from '~/constants/sizes';
import Dots from '~/components/icons/Dots';
import {HeartIcon, MessageCircle, PlusCircle, Send } from 'lucide-react-native';
import { BlinkoCurrency } from '~/components/icons';

interface PostCardProps {
  title: string;
  content: string;
  date: string;
  creator: string;
  images: string[];
}

const PostCard = ({ title, content, date, creator, images }: PostCardProps) => {
  return (
    <View className="gap-2.5  bg-white p-4 pb-6 border-b border-gray-50">
 <View className='flex-row justify-between items-center'>
       <View className="flex-row items-center gap-1">
        <Image
          source={'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg'}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        <Text className="text-sm text-gray-500">@{creator}</Text>
      </View>
      <View className=" flex-row items-center gap-4 text-sm text-gray-600">
        <Pressable className='bg-blue-50 px-2 py-1 rounded-full flex-row gap-1 items-center' hitSlop={10}>
          <PlusCircle size={12} fill="#3B82F6" stroke={'white'}/>
          <Text className='text-xs text-blue-600'>Follow</Text>
        </Pressable>
        <Pressable hitSlop={10}>
          <Dots/>
        </Pressable>
      </View>
 </View>

      <View className="flex-row justify-between py-2">
        <Text className="text-gray-600 text-sm">{content}</Text>
      </View>

      <FlatList
        data={images}
        horizontal
        renderItem={({ item }) => (
          <View className="flex-1 ">
            <Image
              source={{ uri: item }}
              style={{
                width: sizes.screen.width - 70,
                height: 240,
                borderRadius: 8,
              }}
            />
          </View>
        )}
        keyExtractor={(index) => index.toString()}
        contentContainerStyle={{  gap: 10 }}
        showsHorizontalScrollIndicator={false}
        decelerationRate={-1}
        snapToInterval={sizes.screen.width - 70}
      />
     <View className='flex-row justify-between items-center mt-5  w-full'>
      <Text className='text-sm text-gray-600'>{date}</Text>
       <PostInteractions />
     </View>
    </View>
  );
};

function PostInteractions() {
  const interactions = [
    {
      icon: HeartIcon,
      label: 'Like',
      count:200
    },
    {
      icon: MessageCircle,
      label: 'Comment',
      count: 50
    },
    {
      icon: BlinkoCurrency,
      label: 'Tip',
      count: 100
    },
    {
      icon: Send,
      label: 'Share',
      count: 10
    },
  ];
  return (
    <View className="flex-row gap-5 flex-1 justify-end">
      {interactions.map((interaction, index) => (
        <Pressable key={index} className=" flex-row gap-1.5 items-center">
          {/* {interaction.icon} */}
          <interaction.icon size={20} color='#989898' strokeWidth={1.7} />
          <Text className="text-xs text-gray-500">{interaction.count}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export default PostCard;

const styles = StyleSheet.create({});
