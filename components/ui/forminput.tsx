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
  withTiming,
} from 'react-native-reanimated';
import { Input } from './input';
import { constants } from '~/constants';
import { ActivityIndicator, View } from 'react-native';

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
  defaultValue?: PathValue<T, Path<T>>;
  label: string;
  placeholder?: string;
  isLoading?: boolean;
  onChangeText?:(text?:string)=>void
  showMessage?:boolean
}

const FormInput = <T extends FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  label,
  placeholder,
  isLoading,
  onChangeText,
  showMessage = true,
}: FormInputProps<T>) => {
  const textcolor = useSharedValue(constants.theme.label.blur);
  const animatedTextStyle = useAnimatedStyle(() => ({
    color: textcolor.value,
  }));
  function handleFocusTextAnimation() {
    textcolor.value = withTiming(constants.theme.label.focused, { duration: 200 });
  }
  function handleBlurTextAnimation() {
    textcolor.value = withTiming(constants.theme.label.blur, { duration: 200 });
  }
  const { field, fieldState } = useController({
    name,
    control,
    rules,
    defaultValue,
  });
  const AnimatedText = Animated.createAnimatedComponent(Text);
  const handleChange=(text:string)=>{
    field.onChange(text)
    onChangeText?.(text)
  }
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={() => (
        <Animated.View className="relative">
          <View className="flex-row items-center gap-2 pb-1">
            <AnimatedText className=" android:text-base ios:text-base font-semibold text-gray-700">
              {label}
            </AnimatedText>
          </View>
          <View>
            <Input
              onFocus={handleFocusTextAnimation}
              onBlur={handleBlurTextAnimation}
              onChangeText={handleChange}
              placeholder={placeholder}
              secureTextEntry={name == 'password' || name == 'confirmPassword'}
              isInvalid={!!fieldState.error}
            />
            {isLoading && (
              <View className="absolute right-5 top-1/2 -translate-y-1/2">
                <ActivityIndicator color={'#000'} size={10} />
              </View>
            )}
          </View>

          {(fieldState.error && showMessage) && (
            <Animated.View
              entering={FadeInLeft.duration(200)}
              exiting={FadeOutLeft.duration(100)}
              className=" flex-row items-center  gap-2 pt-1  ">
              <View className='w-1.5 h-1.5 bg-orange-700 rounded-full' />
              <Text className="text-sm  text-orange-700 ">{fieldState.error.message}</Text>
            </Animated.View>
          )}
        </Animated.View>
      )}
    />
  );
};

export default FormInput;
