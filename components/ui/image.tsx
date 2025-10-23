import { View, Text, Image, ImageProps } from 'react-native';
import React from 'react';
import { cn } from '~/lib/utils';
import { useSharedValue } from 'react-native-reanimated';

interface CustomImageProps extends ImageProps {
  className?: string;
}

const CustomImage = React.forwardRef<React.ComponentRef<typeof Image>, CustomImageProps>(
  (props, ref) => {
    const [imageLoading, setImageLoading] = React.useState(false);

    if (imageLoading) {
      return <View className={cn('size-20 overflow-hidden rounded-xl', props.className)} />;
    }
    return (
        <Image
          source={props.source}
          ref={ref}
          {...props}
        />
    );
  }
);

export default CustomImage;
