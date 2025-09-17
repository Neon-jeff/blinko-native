import { View, ScrollView } from 'react-native';
import PostCard from '~/components/cards/posts';

const Home = () => {
  return (
    <View className=" px-0">
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
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
