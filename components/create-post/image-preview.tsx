import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import CustomImage from '../ui/image';
import { Text } from '../ui/text';
import { Image } from 'expo-image';
import { ArrowRotateRight } from 'iconsax-react-native';

interface ImagePreviewProps {
  onRetake: () => void;
  imageUri: string;
  onClose?: () => void;
  onAddImage?: () => void;
}

const ImagePreview = ({ onRetake, imageUri, onClose, onAddImage }: ImagePreviewProps) => {
    function handleAddImage() {
        if (onAddImage) {
            onAddImage();
        }
    }
  return (
    <View className="flex-1 bg-red-100 z-50" style={StyleSheet.absoluteFill}>
      <Image
        source={{ uri: imageUri }}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
        }}
        contentFit="cover"
      />
      <View className='absolute top-5 px-4 w-full justify-between items-center flex-row'>
        <Pressable
          onPress={onClose}
          className=" rounded-full bg-black/30 p-2 px-4">
          <Text className="font-semibold text-sm text-white">Close</Text>
        </Pressable>
        <Pressable onPress={handleAddImage} className="rounded-full w-fit bg-white px-6 py-3">
          <Text>Add Photo</Text>
        </Pressable>
      </View>
      <Pressable onPress={onRetake} className="absolute bottom-28 gap-2 self-center ">
        <ArrowRotateRight size={68} color="white" strokeWidth={4} />
        <Text className="text-center font-semibold text-white">Retake</Text>
      </Pressable>
    </View>
  );
};

export default ImagePreview;

const styles = StyleSheet.create({});
