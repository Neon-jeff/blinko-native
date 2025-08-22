import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { HambergerMenu, Message, Notification, NotificationCircle } from 'iconsax-react-native';
import { Image } from 'expo-image';
import { BackdropBlur, Canvas,Rect } from '@shopify/react-native-skia';


const SharedHeader = () => {
  return (
    <View className=" left-0 right-0 flex-row items-center justify-between bg-transparent p-4 pt-16 ">
      <ProfileImage />
      <Text className="absolute left-0 right-0 pt-12 text-center font-bold text-xl text-blue-600">
        Blinko
      </Text>
      <View className="flex-row gap-5">
        <Notification color="black" size={24} fill={'black'}  />
        <Message color="black" size={24} fill={'black'}  />
      </View>
      <Canvas style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <Rect x={0} y={0} width={100} height={100} color="blue" />
        <BackdropBlur blur={10}  />
      </Canvas>
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
