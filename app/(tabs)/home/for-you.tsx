import { FlashList } from '@shopify/flash-list';
import { useEffect } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import PostCard from '~/components/cards/posts';
import { usePrefectchActions } from '~/hooks/actions';
import { useFetchTrendingPosts } from '~/hooks/posts';

const Home = () => {
  const { prefetchConversations } = usePrefectchActions();
  useEffect(() => {
    prefetchConversations();
  }, []);
  const { data: posts, isLoading } = useFetchTrendingPosts();
  if (isLoading) {
    return (
      <ActivityIndicator
        size={32}
        color="gray"
        className="mt-20 flex-1 items-center justify-center"
      />
    );
  }
  return (
    <View className=" flex-1 bg-white px-5">
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
      {/* <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        <View className="mt-4 px-3 ">
          <View className='gap-5 '>
            {
              [...Array(10).keys()].map((_, index) => (
                <PostCard
                  key={index}
                  title=""
                  content="Show some love to Mikhail Nilov by giving them a small donation."
                  date="12-04-2023"
                  creator="Neon Koke"
                  images={[
                    'https://images.pexels.com/photos/18064537/pexels-photo-18064537.jpeg',
                    'https://images.pexels.com/photos/33827863/pexels-photo-33827863.jpeg',
                    'https://images.pexels.com/photos/32832329/pexels-photo-32832329.jpeg',
                  ]}
                />
              ))
            }
          </View>
        </View>
      </ScrollView> */}
    </View>
  );
};

export default Home;
