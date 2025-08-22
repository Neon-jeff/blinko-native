import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
import { Text } from '~/components/ui/text';
import { Like, Message, MessageAdd } from 'iconsax-react-native';

interface PostCardProps {
  title: string;
  content: string;
  date: string;
  creator: string;
  images: string[];
}

const PostCard = ({ title, content, date, creator, images }: PostCardProps) => {
  return (
    <View className="rounded-xl bg-white p-5 gap-2">
      <View className='gap-1 flex-row items-center'>
        <Image
          source={'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg'}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        <Text className="text-sm text-gray-500">@{creator}</Text>
      </View>
      <Text className="absolute right-4 top-4 text-sm text-gray-600">{date}</Text>

      <View className="flex-row justify-between">
        <Text className="text-gray-800">{content}</Text>
      </View>
      <View className="mt-2 flex-row flex-wrap gap-2">
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={{
              width: '45%',
              height: 120,
              borderRadius: 8,
            }}
          />
        ))}
      </View>
    </View>
  );
};

function PostInteractions(){
    const interactions = [
        {
            icon:<Like />,
            label: 'Like'
        },
              {
            icon:<Message />,
            label: 'Like'
        },
        {
            icon:<MessageAdd />,
            label: 'Like'
        }
    ]
    return (
        <View className='flex-row gap-4'>
            {interactions.map((interaction, index) => (
                <View key={index} className='flex-row items-center gap-1'>
                    {interaction.icon}
                    <Text className='text-sm text-gray-600'>{interaction.label}</Text>
                </View>
            ))}
        </View>
    )
}

export default PostCard;

const styles = StyleSheet.create({});
