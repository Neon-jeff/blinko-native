import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Progress } from '~/components/ui/progress';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { Check, Image as ImageIcon } from 'iconsax-react-native';
import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { cn } from '~/lib/utils';
import { CheckCircle } from 'lucide-react-native';

const AddImage = () => {
  const [progress, setProgress] = React.useState(60);
  const [image, setImage] = React.useState<string | null>(null);
  React.useEffect(() => {
    setProgress(80); // Set progress to 80% for the add image step
  }, []);
  const handleContinue = () => {
    // Handle continue logic here, e.g., navigate to the next screen
  };
  const handleUploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="gap-10 bg-white px-5 pt-10">
      <Progress value={progress} className="" />
      <View className=" flex-1 justify-center">
        <View className="absolute left-0 right-0 top-0 flex-col  justify-center gap-3 pt-5">
          <Text className="font-semibold   text-4xl">Add your profile picture</Text>
          <Text className="text-base text-gray-400">
            A profile picture helps others recognize you and makes your profile more engaging.
          </Text>
        </View>
        <Pressable className="w-full items-center" onPress={handleUploadImage}>
          <View className={cn('rounded-full bg-gray-50 p-8', image && 'p-1')}>
            {!image && <ImageIcon color="#d1d1d1" size={124} />}
            {image && (
              <View className="h-40 w-40 overflow-hidden rounded-full">
                <Image source={image} style={{ width: '100%', height: '100%' }} />
              </View>
            )}
            {/* <View className="absolute -bottom-5 right-0 left-0 items-center">
              <PlusCircle strokeWidth={1.5} color="white" fill="black" size={35} />
            </View> */}
          </View>
          <View className='flex-row items-center justify-center'> 
            <Text className={cn('mt-4 text-base text-center text-gray-400')}>
              {image && '✅ '}{!image ? 'Tap to add a profile picture' : 'Image added, tap to change'}
            </Text>
          </View>
        </Pressable>
        {/* Add your image upload component here */}
      </View>
      <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-center gap-5 border-t border-gray-100 bg-white px-8 py-5 pb-16">
        <Button className="w-1/2" variant={'secondary'}>
          <Text className="native:text-base">Skip</Text>
        </Button>
        <Button className=" w-1/2" onPress={handleContinue}>
          <Text className="native:text-base text-white">Continue</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default AddImage;

const styles = StyleSheet.create({});
