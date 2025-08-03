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
  FadeOutRight,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Input } from './input';
import { constants } from '~/constants';
import { X } from 'lucide-react-native';
import { View } from 'react-native';

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
  defaultValue?: PathValue<T, Path<T>>;
  label: string;
  placeholder?: string;
}

const FormInput = <T extends FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  label,
  placeholder,
}: FormInputProps<T>) => {
  const textcolor = useSharedValue(constants.theme.label.blur);
  const animatedTextStyle = useAnimatedStyle(() => ({
    color: textcolor.value,
  }));
  function handleFocusTextAnimation() {
    console.log('focused ');
    
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

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={() => (
        <Animated.View className="relative gap-2 flex-1 h-full">
            <View className="flex-row items-center gap-2">
                 
          <AnimatedText style={[animatedTextStyle]} className=" android:text-base ios:text-sm">
            {label}
          </AnimatedText>
            </View>
          <Input
            onFocus={handleFocusTextAnimation}
            onBlur={handleBlurTextAnimation}
            onChangeText={field.onChange}
            placeholder={placeholder}
            secureTextEntry={name == 'password' || name == 'confirmPassword'}
            isInvalid={!!fieldState.error}
          />

          {fieldState.error && (
            <Animated.View
              entering={FadeInLeft.duration(500)}
              exiting={FadeOutLeft.duration(100)}
              className=" flex-row items-start gap-1">
                <X size={16} color={'orange'} />
              <Text className="text-xs  text-orange-500/70 ">{fieldState.error.message}</Text>
            </Animated.View>
          )}
        </Animated.View>
      )}
    />
  );
};

export default FormInput;
