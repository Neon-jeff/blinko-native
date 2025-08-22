import { ImageSourcePropType, View } from 'react-native';
import React from 'react';
import { OnboardingImageOne, OnboardingImageTwo, OnboardingImageThree } from '~/assets/images';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { cn } from '~/lib/utils';
import Animated, { FadeInUp, runOnJS } from 'react-native-reanimated';
import { router } from 'expo-router';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import * as NavigationBar from 'expo-navigation-bar';

const OnboardingScreen = () => {
    async function handleNavigationBarTheme() {
    await NavigationBar.setBackgroundColorAsync('black');
    await NavigationBar.setButtonStyleAsync('light');
  }
  React.useEffect(() => {
    handleNavigationBarTheme();
  }, []);
  const OnboardingData = [
    {
      image: OnboardingImageOne,
      title: "Let's Get Connected",
      description:
        'Discover, share, and connect on Blinko—where trending topics and fresh finds make scrolling meaningful',
    },
    {
      image: OnboardingImageTwo,
      title: 'Shop and sell in one place',
      description: 'Stay updated with the latest trends and discussions happening around you.',
    },
    {
      image: OnboardingImageThree,
      title: 'Stream and get rewards ',
      description: 'Post your thoughts, ideas, and experiences to engage with the community.',
    },
  ];
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const handleSkip = () => {
    router.replace('/auth/signup');
  };
  const gesture = Gesture.Pan().onEnd((event) => {
    if (event.translationX < -50 && currentIndex < OnboardingData.length - 1) {
      runOnJS(setCurrentIndex)(currentIndex + 1);
    }
    if (event.translationX > 50 && currentIndex > 0) {
      runOnJS(setCurrentIndex)(currentIndex - 1);
    }
  });
  return (
    <GestureDetector gesture={gesture}>
      <View className="flex-1">
        {OnboardingData.map(
          (item, index) =>
            index === currentIndex && (
              <Animated.Image
                source={item.image as ImageSourcePropType}
                style={{
                  width: '100%',
                  height: '60%',
                  position: 'absolute',
                  top: 0,
                }}
                key={index + ''}
                entering={FadeInUp.duration(500).delay(index === 0 ? 100 : 0)}
              />
            )
        )}
        {/* )}
      //   keyExtractor={(item) => item.title}
      // /> */}
        <View className=" flex-1 justify-end ">
          <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, .99)', 'rgba(0, 0, 0, 1)']}
            style={{
              height: '85%',
              justifyContent: 'flex-end',
            }}>
            <View className="justify-between  gap-y-12 px-12 ">
              <View className="gap-y-4 items-center ">
                <Text className="text-center font-medium  text-5xl leading-[45px] text-white">
                  {OnboardingData[currentIndex].title}
                </Text>
                <Text className="text-center text-gray-300">
                  {OnboardingData[currentIndex].description}
                </Text>
              </View>
              <CarouselIndicator currentIndex={currentIndex} />
              <View className="gap-2 pb-10 ">
                <Button
                  variant={'default'}
                  onPress={() => {
                    if (currentIndex < OnboardingData.length - 1) {
                      setCurrentIndex(currentIndex + 1);
                    } else {
                      router.replace('/auth/signup');
                      // Navigate to the main app screen or next step
                    }
                  }}>
                  <Text className='text-white'>Next</Text>
                </Button>
                <Button variant={'ghost'} onPress={handleSkip}>
                  <Text className="text-white ">Skip</Text>
                </Button>
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>
    </GestureDetector>
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
