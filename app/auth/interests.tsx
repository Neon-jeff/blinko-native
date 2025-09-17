import { Pressable, View } from 'react-native';
import React from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import { useUpdateProfile } from '~/hooks/auth';
import { useAuthStore } from '~/store/auth';
import { toast } from 'sonner-native';
import ErrorSheet from '~/components/ui/error-sheet';
import { BottomSheetRef } from '~/components/ui/bottom-sheet';
import { Logo } from '~/components/icons';

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
  const updateProfile = useUpdateProfile();
  const { updateProfile: updateStoreProfile } = useAuthStore();
  const sheetRef = React.useRef<BottomSheetRef>(null);
  const handleSelectInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((item) => item !== interest) : [...prev, interest]
    );
  };
  function handleSkip() {
    router.push('/auth/add-image');
  }
  function handleContinue() {
    updateProfile.mutate(
      {
        interests: selectedInterests,
      },
      {
        onSuccess(data) {
          updateStoreProfile({ profile: data.data });
          toast.success('Profile updated successfully');
          router.push('/auth/add-image');
        },
        onError() {
          sheetRef.current?.open();
        },
      }
    );
  }
  return (
    <SafeAreaView className="relative flex-1 gap-10  px-5  ">
      <Logo variant="text"  />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1   "
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100, gap: 20 }}>
        <View className="mt-10">
          <Text className="mb-2 w-2/3  font-semibold text-3xl sm:w-1/2">
            Let us know your interests
          </Text>
          <Text className="text-base text-gray-600">
            Choose the topics that interest you the most.
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
                  selectedInterests.includes(interest.title) && ' bg-blue-100 border border-blue-200'
                )}>
                <Text className="text-base">{interest.emoji}</Text>
                <Text
                  className={cn(
                    'text-base',
                    selectedInterests.includes(interest.title) && ' '
                  )}>
                  {interest.title}
                </Text>
              </Animated.View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-center gap-5 border-t border-gray-100 bg-white px-8 py-5 pb-16">
        <Button onPress={handleSkip} className="w-1/2" variant={'secondary'}>
          <Text className="native:text-base">Skip</Text>
        </Button>
        <Button className=" w-1/2" onPress={handleContinue} disabled={updateProfile.isPending || selectedInterests.length === 0} loading={updateProfile.isPending}>
          <Text className="native:text-base text-white">Continue</Text>
        </Button>
      </View>
      <ErrorSheet
        ref={sheetRef}
        errorMessage={updateProfile.error?.response.message || 'Failed to update profile'}
      />
    </SafeAreaView>
  );
};

export default SelectInterest;
