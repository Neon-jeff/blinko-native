import { View, Text } from 'react-native';
import React from 'react';
import { useImage, ImageProps, Image } from 'expo-image';
import { cn } from '~/lib/utils';
import { sizes } from '~/constants/sizes';
import { generateRandomBlurhash } from '~/utils/blurhash';
import { useSharedValue } from 'react-native-reanimated';

interface CustomImageProps extends ImageProps {
  className?: string;
}

const CustomImage = React.forwardRef<React.ComponentRef<typeof Image>, CustomImageProps>(
  (props, ref) => {
    const [hash, setImageHash] = React.useState<string | null>(null);
    const image = useImage((props.source as string) || '', {
        maxWidth: sizes.screen.width,
      onError: (error) => {
        console.log('Error loading image:', error);
      },
    });



    if (!image) {
      return (
        <View className={cn('w-[94vw] h-[300] overflow-hidden rounded-xl', props.className)}/>
      );
    }
    return (
      <View className={cn('overflow-hidden w-[94vw] h-[300] rounded-xl ', props.className)}>
        <Image
          source={image}
          ref={ref}
          style={{
            width: '100%',
            height: '100%',
          }}
          {...props}
        />
      </View>
    );
  }
);

export default CustomImage;
