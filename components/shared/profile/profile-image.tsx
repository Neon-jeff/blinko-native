import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomImage from '~/components/ui/image';
import { ProfileCircle } from 'iconsax-react-native';
import { cn } from '~/lib/utils';

interface ProfileImageProps {
  className?: string;
  source?: string;
  iconSize?: number;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ className, source, iconSize }) => {
  return (
    <>
      {!!source && (
        <CustomImage source={source} className={cn('h-10 w-10 rounded-full', className)} />
      )}
      {!source && (
        <View className="rounded-full bg-gray-100 p-2">
          <ProfileCircle color="#374151" size={iconSize || 20} strokeWidth={2.2} variant="Bold" />
        </View>
      )}
    </>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({});
