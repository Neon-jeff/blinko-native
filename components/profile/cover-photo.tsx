import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import {Setting2, UserSearch } from 'iconsax-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Camera, ChevronLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { sizes } from '~/constants/sizes';

const CoverPhoto = () => {
  const { top } = useSafeAreaInsets();
  const profileTopIcons = [
    {
      icon: UserSearch,
      onPress: () => {
        //
        router.push('/profile/find-friends');
      },
    },
    {
      icon: Setting2,
      onPress: () => {
        //
      },
    },
  ];
  function handleBackPress() {
    //
    router.back();
  }
  return (
    <View className="bg-black" style={{
        height:sizes.screen.height * .25
    }}>
      <View className="flex-row px-4 items-center justify-between" style={{ marginTop: top }}>
        <Pressable className='bg-white/5 p-2 rounded-full' onPress={handleBackPress}>
          <ChevronLeft size={24} color="#fff" />
        </Pressable>
        <View className="flex-row items-center gap-6">
          {profileTopIcons.map((item, index) => (
            <Pressable key={index} onPress={item.onPress}>
              <item.icon size={24} color="#fff" variant='Outline' />
            </Pressable>
          ))}
        </View> 
      </View>
      <Pressable className='absolute bottom-5 right-4 bg-white/15 p-2 rounded-full'>
        <Camera color={'#fff'}/>
      </Pressable>
    </View>
  );
};

export default CoverPhoto;

const styles = StyleSheet.create({});
