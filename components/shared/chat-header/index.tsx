import { View, Pressable } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { Setting2 } from 'iconsax-react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '~/components/ui/text';
import CustomImage from '~/components/ui/image';

interface ChatHeaderProps {
  receiver:{
    name: string;
    image: string;
  }
}

const ChatHeader = ({ receiver }: ChatHeaderProps) => {
    function handleBackPress(){
     router.back();
    }
  const {top} = useSafeAreaInsets();
  return (
    <View className="  flex flex-row items-center justify-between  pb-4" style={{paddingTop: top}}>
      <Pressable onPress={handleBackPress}>
        <ChevronLeft color={'black'} size={24} />
      </Pressable>
      <View className="items-center gap-2">
        <CustomImage source={{ uri: receiver.image }} style={{ width: 40, height: 40, borderRadius: 20 }} />
        <Text className='text-sm'>{receiver.name}</Text>
      </View>
      <Pressable>
        <Setting2 color='black' size={25} />
      </Pressable>
    </View>
  );
};

export default ChatHeader;
