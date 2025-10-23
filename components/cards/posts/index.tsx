import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from '~/components/ui/text';
import { sizes } from '~/constants/sizes';
import Dots from '~/components/icons/Dots';
import { PlusCircle, Send } from 'lucide-react-native';
import { BlinkoCurrency } from '~/components/icons';
import CustomImage from '~/components/ui/image';
import { useLikePost, useUnlikePost } from '~/hooks/posts';
import { useAuthStore } from '~/store/auth';
import { CreatedBy, Like } from '~/services/posts/types';
import { BottomSheetRef } from '~/components/ui/bottom-sheet';
import Comments from './comments';
import { Heart, Message } from 'iconsax-react-native';
import { cn } from '~/lib/utils';
import { formDate } from '~/utils/date';
import { ProfileImage } from '~/components/shared';

interface PostCardProps {
  title: string;
  content: string;
  date: string;
  creator: CreatedBy;
  images: string[];
  id: string;
  likes?: Like[];
  commentCount: number;
}

const PostCard = ({
  title,
  content,
  date,
  creator,
  images,
  id,
  likes,
  commentCount,
}: PostCardProps) => {
  const padding = 40;
  const imageWidth = sizes.screen.width - padding;
  const sheetRef = React.useRef<BottomSheetRef>(null);
  return (
    <View className="mb-6   gap-2.5">
      <View className="flex-row items-center justify-between ">
        <View className="flex-row items-center gap-4">
          <ProfileImage source={creator.displayPhoto?.url} className="size-14" iconSize={30} />
          <View className="gap-1">
            <Text className="text-base text-gray-800">@{creator.fullName}</Text>
            <Text className="  text-sm  text-gray-600">{formDate(date)}</Text>
          </View>
        </View>
        <View className=" flex-row items-center gap-4 text-sm text-gray-600">
          <Pressable
            className="flex-row items-center gap-1 rounded-full bg-blue-50 px-2 py-1"
            hitSlop={10}>
            <PlusCircle size={12} fill="#3B82F6" stroke={'white'} />
            <Text className="text-xs text-blue-600">Follow</Text>
          </Pressable>
          <Pressable hitSlop={10}>
            <Dots />
          </Pressable>
        </View>
      </View>

      <View className="flex-row justify-between py-2 pr-5">
        <Text className="text-sm text-gray-600">{content}</Text>
      </View>

      <FlatList
        data={images}
        horizontal
        style={{ width: sizes.screen.width }}
        renderItem={({ item }) => (
          <View className="flex-1" style={{ width: imageWidth }}>
            <CustomImage
              // className="w-full rounded-lg"
              source={{ uri: item }}
              style={{
                width: sizes.screen.width * 0.9,
                height: sizes.screen.height * 0.4,
                borderRadius: 8,
              }}
            />
          </View>
        )}
        keyExtractor={(item, index) => item + index.toString()}
        contentContainerStyle={{ gap: 2 }}
        showsHorizontalScrollIndicator={false}
        decelerationRate={-1}
        snapToInterval={imageWidth}
      />
      <View className="mt-5 w-full flex-row items-center  justify-between">
        <PostInteractions
          id={id}
          likes={likes}
          commentRef={sheetRef}
          commentsCount={commentCount}
        />
      </View>
      <Comments ref={sheetRef} postId={id} />
    </View>
  );
};

function PostInteractions({
  id,
  likes,
  commentRef,
  commentsCount,
}: {
  id: string;
  likes?: Like[];
  commentRef: React.RefObject<BottomSheetRef | null>;
  commentsCount: number;
}) {
  const likeMutation = useLikePost();
  const unlikeMutation = useUnlikePost();
  const { user } = useAuthStore();
  const [isLiked, setIsLiked] = React.useState(
    likes?.some((like) => like.fullName === user?.profile?.fullName) || false
  );
  const [likeCount, setLikeCount] = React.useState(likes?.length || 0);

  const handleLike = () => {
    setIsLiked(true);
    setLikeCount((prev) => prev + 1);
    likeMutation.mutate(id, {
      onError() {
        setIsLiked(false);
        setLikeCount((prev) => (prev > 0 ? prev - 1 : 0));
      },
    });
  };

  const handleUnlike = () => {
    setIsLiked(false);
    setLikeCount((prev) => (prev > 0 ? prev - 1 : 0));
    unlikeMutation.mutate(id, {
      onError() {
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
      },
    });
  };
  const handleOpenComments = () => {
    commentRef.current?.open();
  };
  const interactions = [
    {
      icon: Heart,
      label: 'Like',
      count: likeCount,
      action: !isLiked ? handleLike : handleUnlike,
    },
    {
      icon: Message,
      label: 'Comment',
      count: commentsCount,
      action: handleOpenComments,
    },
    {
      icon: BlinkoCurrency,
      label: 'Tip',
      count: 100,
    },
    {
      icon: Send,
      label: 'Share',
      count: 10,
    },
  ];

  function interactionLabelStyles(label: string) {
    if (label === 'Like' && isLiked) {
      return 'text-red-500';
    }
    return 'text-gray-500';
  }

  return (
    <View className="flex-1 flex-row justify-end gap-5">
      {interactions.map((interaction, index) => (
        <Pressable
          onPress={interaction.action}
          key={index}
          className=" flex-row items-center gap-1.5">
          {/* {interaction.icon} */}
          <interaction.icon
            fill={interaction.label === 'Like' ? (isLiked ? 'red' : '#fff') : '#fff'}
            color={interaction.label === 'Like' ? (isLiked ? 'red' : '#989898') : '#989898'}
            size={22}
            variant={interaction.label === 'Like' ? (isLiked ? 'Bold' : 'Linear') : 'Linear'}
            strokeWidth={1.5}
          />
          <Text
            className={cn(
              'font-semibold text-sm text-gray-500',
              interactionLabelStyles(interaction.label)
            )}>
            {interaction.count}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

export default PostCard;

const styles = StyleSheet.create({});
