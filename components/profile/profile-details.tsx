import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { UserProfileImage } from '../shared';
import { Text } from '../ui/text';
import { useAuthStore } from '~/store/auth';

const ProfileDetails = () => {
  const { user } = useAuthStore();
  return (
    <View className="-translate-y-16 items-center gap-4">
      <View className='items-center'>
        <UserProfileImage size={100} />
        <Text className="pt-4 font-semibold text-2xl ">{user?.profile?.fullName}</Text>
        <Text className="text-gray-600 pt-1">
          {user?.profile?.following.length || 0} following , {user?.profile?.followers.length || 0}{' '}
          followers
        </Text>
      </View>

      <View className="flex flex-row items-center gap-4">
        <Pressable className="rounded-full bg-blue-500   p-3 px-4">
          <Text className="text-white text-sm">Create Product</Text>
        </Pressable>
        <Pressable className="rounded-full border border-gray-200 p-3 px-4">
          <Text className="text-gray-900 text-sm">Edit Profile</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({});
