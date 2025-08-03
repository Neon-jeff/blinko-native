import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import Screen from '~/components/ui/screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Progress } from '~/components/ui/progress';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { CameraIcon, ImagePlus, PlusCircle } from 'lucide-react-native';
import { Camera, Image } from 'iconsax-react-native';

const AddImage = () => {
  const handleContinue = () => {
    // Handle continue logic here, e.g., navigate to the next screen
  };
  return (
    <SafeAreaView style={{ flex: 1 }} className="gap-10 bg-white px-5 pt-10">
      <Progress value={80} className="mb-5" />
      <View className=" flex-1 justify-center">
        <View className="absolute left-0 right-0 top-0 flex-col  justify-center gap-2 pt-5">
          <Text className="font-semibold sm:w-2/3 max-sm:text-3xl text-4xl">Add Your Profile Picture</Text>
          <Text className="text-base text-gray-400">
            A profile picture helps others recognize you.
          </Text>
        </View>
        <Pressable className="w-full items-center">
          <View className="rounded-full bg-gray-50 p-8">
            <Image  color="#d1d1d1" size={124} />
            {/* <View className="absolute -bottom-5 right-0 left-0 items-center">
              <PlusCircle strokeWidth={1.5} color="white" fill="black" size={35} />
            </View> */}
          </View>
          <Text className="mt-4 text-sm text-gray-400">Tap to add a profile picture</Text>
        </Pressable>
        {/* Add your image upload component here */}
      </View>
      <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-center gap-5 border-t border-gray-100 bg-white px-8 py-5 pb-16">
        <Button className="w-1/2" variant={'secondary'}>
          <Text className="native:text-base">Skip</Text>
        </Button>
        <Button className=" w-1/2" onPress={handleContinue}>
          <Text className="native:text-base">Continue</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default AddImage;

const styles = StyleSheet.create({});
