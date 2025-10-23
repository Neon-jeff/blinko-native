import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from '../ui/text';
import Animated, {
  interpolate,
  measure,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { cn } from '~/lib/utils';
import { FlashList } from '@shopify/flash-list';
import { useFetchMyPosts } from '~/hooks/posts';
import PostCard from '../cards/posts';

const PostsAndItems = () => {
  const [selectedTab, setSelectedTab] = React.useState<'posts' | 'items'>('posts');
  return (
    <View>
      <View className="flex-row -translate-y-6 justify-center gap-10 border-b border-gray-100 px-4 pb-2 ">
        <TabItem
          selected={selectedTab === 'posts'}
          onPress={() => setSelectedTab('posts')}
          label="Posts"
        />
        <TabItem
          selected={selectedTab === 'items'}
          onPress={() => setSelectedTab('items')}
          label="My Items"
        />
      </View>
      {selectedTab === 'posts' && <UserPosts />}
    </View>
  );
};

function TabItem({
  selected,
  onPress,
  label,
  Icon,
}: {
  selected: boolean;
  onPress: () => void;
  label: string;
  Icon?: React.ReactNode;
}) {
  const progress = useSharedValue(selected ? 1 : 0);
  React.useEffect(() => {
    progress.value = selected ? withTiming(1) : withTiming(0);
  }, [selected]);

  const animatedRef = useAnimatedRef();

  const animatedStyle = useAnimatedStyle(() => ({
    // borderBottomWidth: interpolate(progress.value, [0, 1], [0, 2]),
    transform: [
      {
        scale: interpolate(progress.value, [0, 1], [1, 1.1]),
      },
    ],
  }));

  const borderStyle = useAnimatedStyle(() => ({
    width: interpolate(progress.value, [0, 1], [0, measure(animatedRef)?.width || 10]),
  }));

  return (
    <Animated.View ref={animatedRef} style={animatedStyle} className="gap-1 border-black items-center ">
      <Pressable onPress={onPress} className="flex-row items-center gap-2">
        {Icon && Icon}
        <Text className={cn(' ', selected ? 'font-semibold text-black' : 'text-gray-500')}>
          {label}
        </Text>
      </Pressable>
      {selected && (
        <Animated.View style={borderStyle} className=" absolute -bottom-2 h-0.5 bg-black" />
      )}
    </Animated.View>
  );
}

function UserPosts() {
  const { data: posts, isLoading } = useFetchMyPosts();
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <View className='px-5 mt-5'>
        <FlashList
      data={posts?.data.docs || []}
      renderItem={({ item }) => (
        <PostCard
          key={item._id}
          title={item.description}
          content={item.description}
          date={item.createdAt}
          creator={item.createdBy}
          id={item._id}
          images={item.postMedia.map((media) => media.url)}
          likes={item.likes}
          commentCount={item.commentCount}
        />
      )}
      keyExtractor={(item) => item._id}
      showsVerticalScrollIndicator={false}
      extraData={posts}
      contentContainerStyle={{ gap: 20, paddingBottom: 150 }}
    />
    </View>
  );
}

export default PostsAndItems;

const styles = StyleSheet.create({});
