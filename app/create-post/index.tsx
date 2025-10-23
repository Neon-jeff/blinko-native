import { Pressable, StyleSheet, View } from 'react-native';
import Screen from '~/components/ui/screen';
import { Text } from '~/components/ui/text';
import { useAuthStore } from '~/store/auth';
import { UserProfileImage } from '~/components/shared';
import { Input } from '~/components/ui/input';
import React from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { CameraView, ImagePreview } from '~/components/create-post';
import { Button } from '~/components/ui/button';
import { useImagePicker } from '~/hooks/ui';
import CustomImage from '~/components/ui/image';
import { FlashList } from '@shopify/flash-list';
import { ChevronDown, X } from 'lucide-react-native';
import { useMediaUpload } from '~/hooks/media-store';
import { toast } from 'sonner-native';
import { router } from 'expo-router';
import { AtIcon, CameraIcon, GalleryIcon } from '~/components/icons';
import { SelectModal, SelectModalContent, SelectModalTrigger } from '~/components/ui/select-modal';
import { EyeSlash, Global, Profile2User, Tag } from 'iconsax-react-native';
import RadioItem from '~/components/ui/radio-item';
import { sizes } from '~/constants/sizes';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useCreatePost } from '~/hooks/posts';
import { useQueryClient } from '@tanstack/react-query';

const visibilityOptions = [
  { label: 'Anyone can view this post', value: 'public', icon: Global },
  { label: 'Only my friends can view this post', value: 'friends', icon: Profile2User },
  { label: 'Only me can view this post', value: 'only_me', icon: EyeSlash },
];

const CreatePost = () => {
  const [cameraImage, setCameraImage] = React.useState<string | null>(null);
  const [selectedVisibility, setSelectedVisibility] = React.useState(visibilityOptions[0].value);
  const [cameraOpen, setCameraOpen] = React.useState(false);
  const [isPremium, setIsPremium] = React.useState(false);
  const [description, setDescription] = React.useState('');
  const { user } = useAuthStore();
  const createPostMutation = useCreatePost();
  const queryClient = useQueryClient();
  const {
    pickImage,
    imageUri: uploadedImageUri,
    setImageUri: setUploadedImageUri,
  } = useImagePicker({
    // allowsMultipleSelection: true,
    allowsEditing: false,
  });
  const animatedStyles = useAnimatedStyle(() => ({
    // height: height.value,
  }));
  const uploadMediaMutation = useMediaUpload();
  function handleSelectVisibility(value: string) {
    setSelectedVisibility(value);
  }
  function handleUploadMedia() {
    if (description.trim().length === 0) {
      toast.error('Please enter a description');
      return;
    }
    if (uploadedImageUri && uploadedImageUri.length > 0) {
      uploadMediaMutation.mutate(uploadedImageUri[0], {
        onSuccess(data) {
          if (!data) {
            toast.error('Failed to upload image');
            return;
          }
          createPostMutation.mutate(
            {
              description,
              postMedia: [data],
              // isPremium,
              // visibility: selectedVisibility
            },
            {
              onSuccess() {
                queryClient.resetQueries({ queryKey: ['my-posts'] });
                toast.success('Post created successfully');
                router.back();
              },
            }
          );
        },
        onError(error) {
          toast.error(error.message || 'Failed to upload image');
        },
      });
    }
  }
  function handleRetake() {
    setCameraImage(null);
  }
  function handleOpenCamera() {
    setCameraOpen(true);
  }
  function handleCapture(photo: string) {
    setCameraImage(photo);
  }
  function handleClosePreview() {
    setCameraImage(null);
    setCameraOpen(false);
  }
  function handleCloseCamera() {
    setCameraOpen(false);
  }
  function handleCameraImage() {
    if (cameraImage) {
      setUploadedImageUri((prev) => [...(prev || []), cameraImage]);
      setCameraImage(null);
      setCameraOpen(false);
    }
  }
  const OptionOne = visibilityOptions[0];
  return (
    <Screen isSafeAreaDisabled className="h-screen flex-1  px-0">
      <CreatePostHeader />
      {/* layout view */}
      <View className="px-5  pt-6">
        <View className="flex-row gap-4">
          <UserProfileImage className="h-12 w-12" />
          <View className="flex-1 ">
            <Text className="font-semibold text-lg">{user?.profile?.fullName}</Text>
            <Text className="text-gray-500"> @username</Text>
          </View>
        </View>
        <Input
          multiline
          placeholder="Share a thought with us ..."
          containerClassName="bg-white border-white px-0 "
          className="mt-4 px-0 placeholder:text-gray-400"
          style={[
            {
              flex: 1,
              alignSelf: 'flex-end',
              maxHeight: 600,
              height: 100,
            },
          ]}
          onChangeText={setDescription}
        />
        <View className="mt-4 flex-row items-center gap-4 self-start rounded-xl ">
          <Pressable onPress={pickImage} className="rounded-full bg-gray-100 p-2" hitSlop={10}>
            <GalleryIcon color="black" className="text-red-100" />
          </Pressable>
          <Pressable
            onPress={handleOpenCamera}
            className="rounded-full bg-gray-100 p-2"
            hitSlop={10}>
            <CameraIcon color="black" className="text-red-100" />
          </Pressable>
          <Pressable className="rounded-full bg-gray-100 p-2" hitSlop={10}>
            <AtIcon color="black" className="text-red-100" />
          </Pressable>
        </View>
      </View>
      {cameraOpen && <CameraView onCapture={handleCapture} onClose={handleCloseCamera} />}
      {cameraImage && (
        <ImagePreview
          imageUri={cameraImage}
          onRetake={handleRetake}
          onClose={handleClosePreview}
          onAddImage={handleCameraImage}
        />
      )}
      <View className="flex-row pl-5">
        {uploadedImageUri && uploadedImageUri.length > 0 && (
          <FlashList
            data={uploadedImageUri}
            horizontal
            renderItem={({ item }) => (
              <View>
                <Pressable hitSlop={20} className="absolute z-10 bg-white p-2 rounded-full right-3 top-1">
                  <X
                    size={20}
                    color="black"
                    strokeWidth={2}
                    onPress={() => {
                      setUploadedImageUri((prev) => prev?.filter((uri) => uri !== item) || null);
                    }}
                  />
                </Pressable>
                <CustomImage
                  source={{ uri: item }}
                  className=" mr-5 mt-4 h-48 w-40 rounded-xl bg-white"
                  resizeMode="cover"
                />
              </View>
            )}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
      <SelectModal>
        <SelectModalTrigger>
          <View className="mt-5 flex-row items-center justify-between gap-2 px-5 py-3">
            <View className="flex-row items-center gap-2">
              <OptionOne.icon size={15} color="black" variant="Bold" />
              <Text className="font-medium text-base">{OptionOne.label}</Text>
            </View>
            <ChevronDown size={16} color="black" />
          </View>
        </SelectModalTrigger>
        <SelectModalContent
          height={sizes.screen.height * 0.3}
          data={visibilityOptions}
          RenderItem={({ item }) => (
            <RadioItem
              Icon={item.icon}
              label={item.label}
              value={item.value}
              selected={selectedVisibility === item.value}
              onSelect={handleSelectVisibility}
            />
          )}
        />
      </SelectModal>
      <View className="px-5 pt-2">
        <RadioItem
          Icon={Tag}
          selected={isPremium}
          onSelect={() => setIsPremium((prev) => !prev)}
          label="Premium post"
          className="m-0 p-0"
        />
      </View>
      <KeyboardAvoidingView className="absolute bottom-28 z-0 w-full px-4">
        <Button loading={uploadMediaMutation.isPending} onPress={handleUploadMedia}>
          <Text className="text-center text-white">Post</Text>
        </Button>
      </KeyboardAvoidingView>
    </Screen>
  );
};

function CreatePostHeader() {
  function handleGoBack() {
    // router.back();
    router.back();
  }
  return (
    <View className="flex-row items-center  gap-4 border-b border-gray-100 px-4 py-6 ">
      <Pressable onPress={handleGoBack} hitSlop={10}>
        <X size={24} color="black" strokeWidth={1.5} />
      </Pressable>
      <Text className="absolute left-1/2 ml-4 -translate-x-1/2 font-semibold text-xl">
        Create Post
      </Text>
    </View>
  );
}

export default CreatePost;

const styles = StyleSheet.create({});
