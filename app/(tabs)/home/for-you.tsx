import { FlashList } from '@shopify/flash-list';
import { View, ScrollView, ActivityIndicator,FlatList } from 'react-native';
import PostCard from '~/components/cards/posts';
import { useFetchMyPosts } from '~/hooks/posts';

const Home = () => {
  const {data:posts,isLoading} = useFetchMyPosts()
  if(isLoading){
    return <ActivityIndicator size={32} color="gray" className='flex-1 justify-center mt-20 items-center' />
  }
  return (
    <View className=" px-5 flex-1 bg-white">
      <FlashList
        data={posts?.data.docs || []}
        renderItem={({ item }) => (
          <PostCard
            key={item._id}
            title={item.description}
            content={item.description}
            date={new Date(item.createdAt).toLocaleDateString()}
            creator={item.createdBy.fullName}
            id={item._id}
            images={item.postMedia.map((media) => media.url)}
            likes={item.likes}
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
