import { router } from 'expo-router';
import {  Message, UserAdd } from 'iconsax-react-native';
import { X } from 'lucide-react-native';
import { Image, Pressable, View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useFollowUser, useRemoveFollower, useUnfollowUser } from '~/hooks/follow';
import { useAuthStore } from '~/store/auth';

interface UserCardProps {
  name: string;
  username?: string;
  imageUrl?: string;
  id: string;
  isChatSuggestion?: boolean;
  onPress?: () => void;
}

export default function UserCard({
  name,
  username,
  imageUrl,
  id,
  isChatSuggestion,
  onPress,
}: UserCardProps) {
  const { addFollowing, user, removeFollowing } = useAuthStore();
  const isFollwing = user?.profile?.following.some((f) => f._id === id);
  const followUser = useFollowUser();
  const removeFollowUser = useRemoveFollower();
  const unfollowUser = useUnfollowUser();

  function handleInitiateChat() {
    // Logic to initiate chat with the user
    onPress?.();
    router.push(
      `/chat/${undefined}?receiver_name=${name}&receiver_image=${imageUrl}&receiver_id=${id}`
    );
  }

  function handleUnfollowUser() {
    unfollowUser.mutate(id, {
      onSuccess() {
        removeFollowing(id);
      },
    });
  }
  function handleFollwUser() {
    followUser.mutate(id, {
      onSuccess() {
        addFollowing({ _id: id });
      },
    });
  }
  return (
    <View className="mt-5 flex-row items-center justify-between">
      <View className="flex-row items-center gap-4">
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} height={60} width={60} borderRadius={100} />
        ) : (
          <View className="h-10 w-10 rounded-full bg-gray-100" />
        )}
        <Text>{name}</Text>
      </View>
      {isChatSuggestion && (
        <Button onPress={handleInitiateChat}  className="h-12  flex-row items-center gap-2 rounded-full bg-blue-500 px-4 ">
          <Message color='white' size={15} />
          <Text className='text-white native:text-sm'>Send message</Text>
        </Button>
      )}
      {!isChatSuggestion && (
        <View className="flex flex-row items-center gap-5">
          <Button
            onPress={isFollwing ? handleUnfollowUser : handleFollwUser}
            loading={followUser.isPending || unfollowUser.isPending}
            className="h-12 flex-row items-center gap-2 rounded-full bg-blue-500 px-6 ">
            {!isFollwing && <UserAdd color={'#fff'} size={16} />}
            <Text className="font-medium text-white">{isFollwing ? 'Unfollow' : 'Follow'}</Text>
          </Button>
          <Pressable>
            <X color={'#000'} size={20} />
          </Pressable>
        </View>
      )}
    </View>
  );
}
