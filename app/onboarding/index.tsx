import { FlatList, ImageSourcePropType, View } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
import { OnboardingImageOne, OnboardingImageTwo, OnboardingImageThree } from '~/assets/images';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { cn } from '~/lib/utils';
import Animated, { FadeInUp, SlideInDown, useSharedValue } from 'react-native-reanimated';
import { router } from 'expo-router';

const OnboardingScreen = () => {
  const OnboardingData = [
    {
      image: OnboardingImageOne,
      title: "Let's Get Connected",
      description:
        'Discover, share, and connect on Blinko—where trending topics and fresh finds make scrolling meaningful',
    },
    {
      image: OnboardingImageTwo,
      title: 'Shop, sell and engage ',
      description: 'Stay updated with the latest trends and discussions happening around you.',
    },
    {
      image: OnboardingImageThree,
      title: 'Stream and get rewards ',
      description: 'Post your thoughts, ideas, and experiences to engage with the community.',
    },
  ];
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  return (
    <View className="" >
      {/* <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
        horizontal
        data={OnboardingData}
        renderItem={({ item }) => ( */}
      {OnboardingData.map(
        (item, index) =>
          index === currentIndex && (
            <Animated.Image
              source={item.image as ImageSourcePropType}
              className=" flex-1"
              style={{
                width: '100%',
                height: '50%',
                position: 'absolute',
              }}
              key={index + ''}
              entering={FadeInUp.duration(500).delay(index===0?500:0)}
            />
          )
      )}
      {/* )}
      //   keyExtractor={(item) => item.title}
      // /> */}
      <View className="">
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)']}
          style={{
            height: '100%',
            justifyContent: 'flex-end',
          }}>
          <View className="justify-between gap-y-12 px-12 ">
            <View className="gap-y-4">
              <Text className="text-center font-semibold text-5xl text-white">
                {OnboardingData[currentIndex].title}
              </Text>
              <Text className="text-center text-gray-300">
                {OnboardingData[currentIndex].description}
              </Text>
            </View>
            <CarouselIndicator currentIndex={currentIndex} />
            <View className="gap-2 pb-16">
              <Button
                variant={'default'}
                onPress={() => {
                  if (currentIndex < OnboardingData.length - 1) {
                    setCurrentIndex(currentIndex + 1);
                  } else {
                    router.push('/auth/signup')
                    // Navigate to the main app screen or next step
                  }
                }}>
                <Text>Next</Text>
              </Button>
              <Button variant={'ghost'}>
                <Text className="text-white ">Skip</Text>
              </Button>
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

function CarouselIndicator({ currentIndex }: { currentIndex: number }) {
  return (
    <View className="flex-row justify-center gap-2 ">
      {[...Array(3).keys()].map((index) => (
        <View
          key={index}
          className={cn('h-1 w-8 rounded-sm', {
            'bg-white ': index === currentIndex,
            'bg-gray-500': index !== currentIndex,
          })}
        />
      ))}
    </View>
  );
}

export default OnboardingScreen;
