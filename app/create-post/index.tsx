import { Pressable, StyleSheet, View } from 'react-native';
import Screen from '~/components/ui/screen';
import { Camera, Gallery, VideoSquare } from 'iconsax-react-native';
import { Text } from '~/components/ui/text';
import { useAuthStore } from '~/store/auth';
import { ProfileImage } from '~/components/shared';
import { Input } from '~/components/ui/input';
import React from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { CameraView, ImagePreview } from '~/components/create-post';
import { Button } from '~/components/ui/button';
import { useImagePicker } from '~/hooks/ui';
import CustomImage from '~/components/ui/image';
import { FlashList } from '@shopify/flash-list';

const CreatePost = () => {
  const { user } = useAuthStore();
  const AnimatedInput = Animated.createAnimatedComponent(Input);
  const height = useSharedValue(36);
  const [inputWidth, setInputWidth] = React.useState(0);
  const [imageUri, setImageUri] = React.useState<string | null>(null);
  const [cameraOpen, setCameraOpen] = React.useState(false);
  const {
    pickImage,
    imageUri: uploadedImageUri,
    setImageUri: setUploadedImageUri,
  } = useImagePicker({
    allowsMultipleSelection: true,
    allowsEditing: false,
  });
  const animatedStyles = useAnimatedStyle(() => ({
    height: height.value,
  }));

  function handleRetake() {
    setImageUri(null);
  }
  function handleOpenCamera() {
    setCameraOpen(true);
  }
  function handleCapture(photo: string) {
    setImageUri(photo);
  }
  function handleClosePreview() {
    setImageUri(null);
    setCameraOpen(false);
  }
  function handleCloseCamera() {
    setCameraOpen(false);
  }
  function handleAddImage() {
    if (imageUri) {
      setUploadedImageUri((prev) => [...prev || [], imageUri]);
      setImageUri(null);
      setCameraOpen(false);
    }
  }
  return (
    <Screen isSafeAreaDisabled className="h-screen flex-1  px-0">
      <CreatePostHeader />
      {/* layout view */}
      <View className="px-4 pt-6">
        <View className="flex-row gap-4">
          <ProfileImage className="h-12 w-12" />
          <View className="flex-1 ">
            <Text className="font-semibold text-lg">{user?.profile?.fullName}</Text>
            <AnimatedInput
              multiline
              placeholder="Write something..."
              containerClassName="bg-white border-white px-0 "
              className="px-0"
              onLayout={(e) => {
                const { width } = e.nativeEvent.layout;
                setInputWidth(width);
              }}
              style={[
                {
                  flex: 1,
                  alignSelf: 'flex-end',
                  maxHeight: 600,
                },
                animatedStyles,
              ]}
              onChangeText={(text) => {
                const textPerLine = inputWidth / 9;
                const numberOfLines = Math.trunc(text.length / textPerLine);

                console.log({ textPerLine, inputWidth, length: text.length, numberOfLines });
                const newHeight = numberOfLines * 20;
                height.value = withTiming(newHeight < 36 ? 36 : newHeight, { duration: 400 });
              }}
            />
            <View className="mt-4 flex-row items-center gap-6 self-start rounded-xl bg-gray-50 p-2 px-4  ">
              <Pressable onPress={pickImage}>
                <Gallery size={20} color="black" className="text-red-100" />
              </Pressable>
              <Pressable onPress={handleOpenCamera}>
                <Camera size={20} color="black" className="text-red-100" />
              </Pressable>
              <VideoSquare size={20} color="black" className="text-red-100" />
            </View>
          </View>
        </View>
      </View>
      {cameraOpen && <CameraView onCapture={handleCapture} onClose={handleCloseCamera} />}
      {imageUri && (
        <ImagePreview imageUri={imageUri} onRetake={handleRetake} onClose={handleClosePreview} onAddImage={handleAddImage} />
      )}
      <View className="flex-row pl-16">
        {uploadedImageUri && uploadedImageUri.length > 0 && (
          <FlashList
            data={uploadedImageUri}
            horizontal
            renderItem={({ item }) => (
              <CustomImage
                source={item}
                className=" mr-5 mt-4 h-48 w-40 rounded-xl bg-white"
                contentFit="cover"
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
      <View className="absolute bottom-28 z-0 w-full px-4">
        <Button>
          <Text className="text-center text-white">Post</Text>
        </Button>
      </View>
    </Screen>
  );
};

function CreatePostHeader() {
  return (
    <View className="flex-row items-center  gap-4 border-b border-gray-100 px-4 py-6 ">
      <Text className="text-blue-500">Cancel</Text>
      <Text className="absolute left-1/2 ml-4 -translate-x-1/2 font-semibold text-xl">
        Create Post
      </Text>
    </View>
  );
}

export default CreatePost;

const styles = StyleSheet.create({});
