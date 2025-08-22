import { Pressable, View } from 'react-native';
import React from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import Screen from '~/components/ui/screen';
import { Text } from '~/components/ui/text';
import { Progress } from '~/components/ui/progress';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { router } from 'expo-router';

const SelectInterest = () => {
  const interests = [
    {
      title: 'Memes',
      emoji: '😄',
    },
    {
      title: 'Motivation',
      emoji: '💪',
    },
    {
      title: 'News',
      emoji: '📰',
    },
    {
      title: 'Technology',
      emoji: '💻',
    },
    { title: 'Sports', emoji: '⚽' },
    {
      title: 'Food',
      emoji: '🍔',
    },
    {
      title: 'Travel',
      emoji: '✈️',
    },
    {
      title: 'Fashion',
      emoji: '👗',
    },
    {
      title: 'Music',
      emoji: '🎵',
    },
    {
      title: 'Gaming',
      emoji: '🎮',
    },
    {
      title: 'Health & Fitness',
      emoji: '🏋️‍♂️',
    },
    {
      title: 'Art & Design',
      emoji: '🎨',
    },
    {
      title: 'Education',
      emoji: '📚',
    },
  ];
  const [selectedInterests, setSelectedInterests] = React.useState<string[]>([]);
  const [progress, setProgress] = React.useState(40);
  React.useEffect(() => {
    setProgress(60); // Set progress to 60% for the interests selection step
  }, []);
  const handleSelectInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((item) => item !== interest) : [...prev, interest]
    );
  };
  function handleContinue() {
    // Handle continue logic here, e.g., save selected interests and navigate to the next screen
    router.push('/auth/add-image');
  }
  return (
    <SafeAreaView className="relative flex-1 gap-10 px-5 pt-10 ">
      <Progress value={progress} className="mb-5" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1   "
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100, gap: 20 }}>
        <View className="">
          <Text className="mb-2 w-2/3 font-semibold text-4xl sm:w-1/2">
            Let us know your interests
          </Text>
          <Text className="text-base text-gray-400">
            Choose the topics that interest you the most. You can select multiple interests.
          </Text>
        </View>
        <View className="flex-row flex-wrap gap-4">
          {interests.map((interest, index) => (
            <Pressable onPress={() => handleSelectInterest(interest.title)} key={index}>
              <Animated.View
                entering={FadeIn.duration(100)
                  .delay(index * 100)
                  .springify()}
                key={index}
                className={cn(
                  'flex-row items-center gap-2 rounded-full border border-transparent bg-gray-100/50 p-4 px-6',
                  selectedInterests.includes(interest.title) &&
                    'border border-orange-100 bg-orange-50/80'
                )}>
                <Text className="text-base">{interest.emoji}</Text>
                <Text className="text-base">{interest.title}</Text>
              </Animated.View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-center gap-5 border-t border-gray-100 bg-white px-8 py-5 pb-16">
        <Button onPress={handleContinue} className="w-1/2" variant={'secondary'}>
          <Text className="native:text-base">Skip</Text>
        </Button>
        <Button className=" w-1/2" onPress={handleContinue}>
          <Text className="native:text-base text-white">Continue</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default SelectInterest;
