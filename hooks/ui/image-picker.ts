import * as ImagePicker from 'expo-image-picker';
import React from 'react';

export function useImagePicker(options?: ImagePicker.ImagePickerOptions) {
  const [imageUri, setImageUri] = React.useState<string[] | null>(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      ...options,
    });
    if (!result.canceled) {
      setImageUri(prev=> [...(prev || []), ...(result.assets.map((asset) => asset.uri) || [])]);
    }
  };
  return { imageUri, pickImage, setImageUri };
}
