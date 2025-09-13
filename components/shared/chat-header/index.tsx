import { View, Text, Pressable } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { Image } from 'expo-image';
import { ManProfile } from '~/assets/images';
import { Setting2 } from 'iconsax-react-native';
import { router } from 'expo-router';

interface ChatHeaderProps {
  sender_name: string;
}

const ChatHeader = ({ sender_name }: ChatHeaderProps) => {
    function handleBackPress(){
     router.back();
    }
  return (
    <View className="absolute border-b border-gray-200 left-0 right-0 top-16 flex flex-row items-center justify-between px-4 pb-4">
      <Pressable onPress={handleBackPress}>
        <ChevronLeft color={'black'} size={24} />
      </Pressable>
      <View className="items-center gap-2">
        <Image source={ManProfile} style={{ width: 40, height: 40, borderRadius: 20 }} />
        <Text>{sender_name}</Text>
      </View>
      <Pressable>
        <Setting2 color='black' size={25} />
      </Pressable>
    </View>
  );
};

export default ChatHeader;
