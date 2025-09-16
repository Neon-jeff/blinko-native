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

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
  defaultValue?: PathValue<T, Path<T>>;
  label: string;
}

const FormDatePicker = <T extends FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  label,
}: FormInputProps<T>) => {
  const textcolor = useSharedValue(constants.theme.label.blur);
  const [showDatePicker, setShowDatePicker] = React.useState(false);

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

  function openDatePicker() {
    setShowDatePicker(true);
  }

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={() => (
        <Animated.View className="relative h-full flex-1 gap-2">
          <View className="flex-row items-center gap-2">
            <AnimatedText className=" android:text-base ios:text-base font-semibold text-gray-700">
              {label}
            </AnimatedText>
          </View>
          <TouchableOpacity
            className="h-12 w-full  flex-row items-center justify-between rounded-xl border  border-gray-200 bg-gray-100/80 px-2"
            onPress={openDatePicker}>
            <Text
              className={cn('native:text-base  text-gray-700', !field.value && 'text-gray-500')}>
              {field.value ? field.value : 'YYYY-MM-DD'}
            </Text>
            <View className="">
              <Calendar1 color="#374151" size={25} />
            </View>
          </TouchableOpacity>

          <DatePicker
            modal
            mode="date"
            open={showDatePicker}
            date={new Date()}
            onCancel={() => {
              setShowDatePicker(false);
            }}
            onConfirm={(date) => {
              const formattedDate = date.toISOString().split('T')[0];
              field.onChange(formattedDate);
              setShowDatePicker(false);
            }}
            className="w-full"
          />

          {fieldState.error && (
            <Animated.View
              entering={FadeInLeft.duration(200)}
              exiting={FadeOutLeft.duration(100)}
              className=" flex-row items-center ">
                <Dot color={'#c2410c'} size={30}/>
              <Text className="text-sm  text-orange-700 ">{fieldState.error.message}</Text>
            </Animated.View>
          )}
        </Animated.View>
      )}
    />
  );
};

export default FormDatePicker;
