import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { useAuthStore } from '~/store/auth';
import { Image } from 'expo-image';
import {
  Airdrop,
  Call,
  Coin1,
  Logout,
  Profile2User,
  ProfileCircle,
  Setting2,
  Shop,
  Wallet,
} from 'iconsax-react-native';
import { Text } from '~/components/ui/text';
import { router } from 'expo-router';
import { useAppSheet } from '~/components/providers/app-sheet';

interface ProfileSheetContentProps {
    onLogout?: () => void;
}

const ProfileSheetContent = ({ onLogout }: ProfileSheetContentProps) => {
  const { user, logout } = useAuthStore();
  function handleProfilePress() {
    //
  }
  const routes = [
    {
      name: 'My Friends',
      icon: Profile2User,
      route: '/(tabs)/home',
    },
    {
      name: 'Wallet',
      icon: Wallet,
      route: '/(tabs)/home',
    },
    {
      name: 'Settings & Privacy',
      icon: Setting2,
      route: '/(tabs)/home',
    },
    {
      name: 'Marketplace',
      icon: Shop,
      route: '/(tabs)/market',
    },
    {
      name: 'Help & Support',
      icon: Call,
      route: '/(tabs)/home',
    },
    {
      name: 'Live',
      icon: Airdrop,
      route: '/(tabs)/home',
    },
  ];
  function handleLogout() {
    onLogout?.();
    logout();
    router.replace('/onboarding');
  }
  return (
    <ScrollView
      className="flex-1 gap-4 pb-10"
      showsVerticalScrollIndicator={false}
      contentContainerClassName="gap-3">
      <View className="flex-row items-center justify-between border-b border-gray-100 pb-2">
        <Pressable onPress={handleProfilePress} className="flex-row items-center gap-3 ">
          {user?.profile?.displayPhoto?.url && (
            <Image
              source={user?.profile?.displayPhoto?.url}
              style={{
                width: 50,
                height: 50,
                borderRadius: 200,
              }}
            />
          )}
          {!user?.profile?.displayPhoto?.url && (
            <View className="w-fit rounded-full bg-gray-100 p-2">
              <ProfileCircle color="#374151" size={30} strokeWidth={2.2} variant="Bold" />
            </View>
          )}
          <View>
            <Text
              style={{
                textDecorationColor: 'capitalize',
              }}
              className="font-semibold text-lg">
              {user?.profile?.fullName}
            </Text>
            <Text className="text-sm text-gray-600">View Profile</Text>
          </View>
        </Pressable>
        <Pressable className="flex-row items-center justify-center gap-2 rounded-full bg-blue-600 p-4 py-3">
          <Coin1 color="white" size={20} variant="Bold" />
          <Text className="text-sm text-white">Get Coins</Text>
        </Pressable>
      </View>
      {routes.map((route) => (
        <Pressable
          key={route.name}
          className="flex-row items-center gap-3 rounded-lg pb-1 hover:bg-gray-100">
          <View className="rounded-full bg-gray-100 p-3">
            <route.icon color="#374151" size={20} strokeWidth={2.2} variant="Bold" />
          </View>
          <Text className="font-medium text-base">{route.name}</Text>
        </Pressable>
      ))}
      <Pressable
        className="flex-row items-center gap-3 rounded-lg border-t border-gray-100 pb-1 pt-4 hover:bg-gray-100"
        onPress={handleLogout}>
        <View className="rounded-full bg-red-100 p-3">
          <Logout color="red" size={20} strokeWidth={2.2} variant="Bold" />
        </View>
        <Text className="font-semibold text-base text-red-600">Logout</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProfileSheetContent;

const styles = StyleSheet.create({});
