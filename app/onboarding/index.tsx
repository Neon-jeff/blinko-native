import { ImageSourcePropType, Platform, Pressable, View } from 'react-native';
import React from 'react';
import { Earn, OnboardingImageOne, OnlineMarketing, Streamer } from '~/assets/images';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { cn } from '~/lib/utils';
import Animated, { FadeInUp, runOnJS } from 'react-native-reanimated';
import { router } from 'expo-router';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import * as NavigationBar from 'expo-navigation-bar';
import { Logo } from '~/components/icons';
import { useAuthStore } from '~/store/auth';

const OnboardingScreen = () => {
  async function handleNavigationBarTheme() {
    if (Platform.OS === 'android') {
      await NavigationBar.setBackgroundColorAsync('black');
      await NavigationBar.setButtonStyleAsync('light');
    }
  }
  React.useEffect(() => {
    handleNavigationBarTheme();
  }, []);
  const {setIsGuestUser,setUser} = useAuthStore();
  const OnboardingData = [
    {
      image: OnboardingImageOne,
      title: "Let's Get Connected",
      description:
        'Discover, share, and connect on Blinko—where trending topics and fresh finds make scrolling meaningful',
    },
    {
      image: OnlineMarketing,
      title: 'Shop and sell seamlessly',
      description: 'Stay updated with the latest trends and discussions happening around you.',
    },
    {
      image: Earn,
      title: 'Monitize your contents',
      description: 'Post your thoughts, ideas, and experiences to engage with the community.',
    },
  ];
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const handleCreateAccount = () => {
    router.replace('/auth/signup');
  };
  const handleLogin = () => {
    router.replace('/auth/login');
  }
  const handleGuest = ()=>{
    setUser(null)
    setIsGuestUser(true)
    router.replace('/(tabs)/home');
  }
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
        <View className='mt-16'>
              <Text className='text-white text-2xl font-semibold text-center'>Blinko</Text>
          </View>
        {OnboardingData.map(
          (item, index) =>
            index === currentIndex && (
              <Animated.Image
                source={item.image as ImageSourcePropType}
                style={{
                  width: '100%',
                  height: '50%',
                  position: 'absolute',
                  top: '12%',
                }}
                key={index + ''}
                entering={FadeInUp.duration(500).delay(index === 0 ? 100 : 0)}
              />
            )
        )}
        <View className=" flex-1 justify-end ">
          <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, .99)', 'rgba(0, 0, 0, 1)']}
            style={{
              height: '100%',
              justifyContent: 'flex-end',
            }}>
            <View className="justify-between  gap-y-12 px-12 ">
              <View className="items-center gap-y-4 ">
                <Text className="text-center font-medium  text-5xl leading-[45px] text-white">
                  {OnboardingData[currentIndex].title}
                </Text>
                <Text className="text-center text-gray-300">
                  {OnboardingData[currentIndex].description}
                </Text>
              </View>
              <CarouselIndicator currentIndex={currentIndex} />
              <View className='pb-10 gap-5'>
                <View className=" gap-5 ">
                  <Button
                    variant={'default'}
                    onPress={handleCreateAccount  }>
                    <Text className="font-semibold text-white">Create Account</Text>
                  </Button>
                  <Button variant={'outline'} onPress={handleLogin}>
                    <Text className="font-semibold text-white">Login</Text>
                  </Button>
                </View>
                <Pressable onPress={handleGuest}>
                  <Text className=" text-white font-semibold text-center">Explore as guest</Text>
                </Pressable>
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
