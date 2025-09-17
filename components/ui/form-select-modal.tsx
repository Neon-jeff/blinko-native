import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  useController,
} from 'react-hook-form';
import { Text } from './text';
import Animated, {
  FadeInLeft,
  FadeOutLeft,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { constants } from '~/constants';
import { TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import React from 'react';
import { cn } from '~/lib/utils';
import { Calendar1 } from 'iconsax-react-native';
import { Dot } from 'lucide-react-native';
import { BottomSheetModal, BottomSheetRef } from './bottom-sheet';
import { FlashList } from '@shopify/flash-list';

interface FormSelectProps<T extends FieldValues,K> {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
  defaultValue?: PathValue<T, Path<T>>;
  label: string;
  data: K[];
  RenderItem: ({ item, selected }: { item: K; selected?: boolean }) => React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
}

const FormSelectModal = <T extends FieldValues, K>({
  name,
  control,
  rules,
  defaultValue,
  label,
  data,
  RenderItem,
  placeholder = 'Select',
  disabled = false,
}: FormSelectProps<T, K>) => {
  const textcolor = useSharedValue(constants.theme.label.blur);
  const animatedTextStyle = useAnimatedStyle(() => ({
    color: textcolor.value,
  }));
  const { field, fieldState } = useController({
    name,
    control,
    rules,
    defaultValue,
  });
  const AnimatedText = Animated.createAnimatedComponent(Text);
  const modalRef = React.useRef<BottomSheetRef>(null);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={() => (
        <Animated.View className="relative h-full flex-1 gap-2">
          <View className="flex-row items-center gap-2">
            <AnimatedText className=" android:text-base ios:text-base font-semibold text-gray-600">
              {label}
            </AnimatedText>
          </View>
          <TouchableOpacity
            disabled={disabled}
            className="h-12 justify-center rounded-xl border border-gray-100 bg-gray-100 px-2"
            onPress={() => modalRef.current?.open()}>
            <Text className={cn('text-base', !field.value && 'text-gray-400')}>{field.value || placeholder}</Text>
          </TouchableOpacity>

          <BottomSheetModal.Root ref={modalRef}>
            <BottomSheetModal.Content className="px-2 pt-5">
              <FlashList
                data={data}
                extraData={{selected: field.value}}
                renderItem={({ item }) => <RenderItem item={item} />}
                estimatedItemSize={40}
                keyExtractor={(_, index) => index.toString() + label}
              />
            </BottomSheetModal.Content>
          </BottomSheetModal.Root>

          {fieldState.error && (
            <Animated.View
              entering={FadeInLeft.duration(200)}
              exiting={FadeOutLeft.duration(100)}
              className=" flex-row items-center ">
              <Dot color={'#c2410c'} size={30} />
              <Text className="text-sm  text-orange-700 ">{fieldState.error.message}</Text>
            </Animated.View>
          )}
        </Animated.View>
      )}
    />
  );
};

export default FormSelectModal;
