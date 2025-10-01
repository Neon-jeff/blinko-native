import { StyleSheet, View } from 'react-native';
import React from 'react';
import { BottomSheetModal, BottomSheetRef } from './bottom-sheet';
import { Image } from 'expo-image';
import { ErrorIcon } from '~/assets/images';
import { Button } from './button';
import { Text } from './text';

interface ErrorSheetProps {
  ref: React.RefObject<BottomSheetRef | null>;
  errorMessage?: string;
  title?: string;
  onRetry?: () => void;
}
const ErrorSheet = ({
  ref,
  errorMessage,
  title = 'Something went wrong',
  onRetry,
}: ErrorSheetProps) => {
  function handleRetry() {
    ref?.current?.close();
  }
  return (
    <BottomSheetModal.Root ref={ref}>
      <BottomSheetModal.Content className="flex-1">
        <View className="flex-1 items-center justify-between gap-4 ">
          <View className='items-center justify-center gap-5 mt-10'>
            <Image
              source={ErrorIcon}
              style={{
                width: 100,
                height: 100,
              }}
            />
            <View className="items-center gap-2">
              <Text className="font-semibold text-2xl">{title}</Text>
              <Text className="text-center text-base text-gray-600">{errorMessage}</Text>
            </View>
          </View>
          <Button onPress={handleRetry} className="mt-14 w-4/5 rounded-full  bg-black">
            <Text className="native:text-lg text-white ">Close</Text>
          </Button>
        </View>
      </BottomSheetModal.Content>
    </BottomSheetModal.Root>
  );
};

export default ErrorSheet;

const styles = StyleSheet.create({});
