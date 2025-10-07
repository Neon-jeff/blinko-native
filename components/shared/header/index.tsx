import { Pressable, StyleSheet, View } from 'react-native';
import { Image, ImageBackground } from 'expo-image';
import { Bolt, Search } from 'lucide-react-native';
import { Text } from '~/components/ui/text';
import { MenuIcon, Notification } from '~/components/icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '~/store/auth';
import {ProfileCircle } from 'iconsax-react-native';
import { useAppSheet } from '~/components/providers/app-sheet';

const SharedHeader = () => {
  const { top } = useSafeAreaInsets();
  const { openAppSheet } = useAppSheet();
  const { user, isAuthenticated } = useAuthStore();
  function handleProfilePress() {
    openAppSheet();
  }
  return (
    <View
      style={{
        paddingTop: top + 10,
      }}
      className='pb-2'
      >
      <View
        style={{
          backgroundColor: 'rgb(255, 255, 255)',
        }}
        className=" w-full flex-row items-center justify-between px-5  ">
        <Pressable onPress={handleProfilePress} className="rounded-full" hitSlop={20}>
          <MenuIcon/>
        </Pressable>
        <View className="absolute left-0 right-0 items-center font-semibold text-xl text-blue-600">
          <Text className="font-semibold text-lg text-blue-600">Blinko</Text>
        </View>
        <View className="flex-row gap-5">
          <Notification />
          <Search color="black" size={24} strokeWidth={2} />
        </View>
      </View>
    </View>
  );
};

function ProfileImage() {
  return (
    <View className="flex items-center gap-2">
      <Image
        source={'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg'}
        style={{ width: 40, height: 40, borderRadius: 20 }}
      />
      {/* <Text className="font-bold text-xs text-gray-600">@Neon1234</Text> */}
    </View>
  );
}

export default SharedHeader;

const styles = StyleSheet.create({});
