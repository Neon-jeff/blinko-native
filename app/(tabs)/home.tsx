import { View, ScrollView } from 'react-native';
import PostCard from '~/components/cards/posts';
import SharedHeader from '~/components/shared/header';
import Screen from '~/components/ui/screen';
import { Text } from '~/components/ui/text';

const Home = () => {
  return (
    <View className="bg-transparent px-0">
      <SharedHeader />
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        <View className="mt-4 px-4">
          <Text className="font-semibold text-2xl">My Feeds</Text>
          <View className='gap-5 mt-5'>
            {
              [...Array(10).keys()].map((_, index) => (
                <PostCard
                  key={index}
                  title=""
                  content="Show some love to Mikhail Nilov by giving them a small donation."
                  date="12-04-2023"
                  creator="Neon Koke"
                  images={[
                    'https://images.pexels.com/photos/7466767/pexels-photo-7466767.jpeg',
                    'https://images.pexels.com/photos/8157745/pexels-photo-8157745.jpeg',
                    'https://images.pexels.com/photos/8157824/pexels-photo-8157824.jpeg',
                  ]}
                />
              ))
            }
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
