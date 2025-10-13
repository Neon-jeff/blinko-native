import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useAuthStore } from '~/store/auth';
import CustomImage from '~/components/ui/image';
import { ProfileCircle } from 'iconsax-react-native';
import { cn } from '~/lib/utils';

interface ProfileImageProps {
  className?: string;
}

const UserProfileImage: React.FC<ProfileImageProps> = ({ className }) => {
  const { user } = useAuthStore();
  return (
    <>
      {user?.profile?.displayPhoto?.url && (
        <CustomImage
          source={user?.profile?.displayPhoto?.url}
          className={cn('w-10 h-10 rounded-full', className)}
        />
      )}
      {!user?.profile?.displayPhoto?.url && (
        <View className="rounded-full bg-gray-100 p-2">
          <ProfileCircle color="#374151" size={30} strokeWidth={2.2} variant="Bold" />
        </View>
      )}
    </>
  );
};

export default UserProfileImage;

const styles = StyleSheet.create({});
