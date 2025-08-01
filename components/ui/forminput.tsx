
import { Control, Controller, FieldValues, Path, PathValue, RegisterOptions, useController } from "react-hook-form"
import { Text } from './text'
import Animated, { FadeInLeft, FadeOutLeft, FadeOutRight, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { Input } from './input'
import { constants } from "~/constants/indext"

interface FormInputProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    rules?: RegisterOptions<T>
    defaultValue?: PathValue<T, Path<T>>
    label: string;
    placeholder?: string;
}

const FormInput = <T extends FieldValues>({ name, control, rules, defaultValue, label, placeholder }: FormInputProps<T>) => {
    const textcolor = useSharedValue(constants.theme.label.blur);
    const animatedTextStyle = useAnimatedStyle(() => (
        {
            color: textcolor.value,
        }
    ))
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
    })
    const AnimatedText = Animated.createAnimatedComponent(Text)

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={() => (
                <Animated.View className='gap-2 relative'>
                    <AnimatedText style={[animatedTextStyle]} className=' android:text-base ios:text-sm'>{label}</AnimatedText>
                    <Input
                        onFocus={handleFocusTextAnimation}
                        onBlur={handleBlurTextAnimation}
                        onChangeText={field.onChange}
                        placeholder={placeholder}
                        secureTextEntry={name == 'password'}
                        isInvalid={!!fieldState.error}
                        />

                    {fieldState.error && <Animated.View entering={FadeInLeft.duration(500)} exiting={FadeOutLeft.duration(100)} className='bg-orange-950/30 p-2  rounded-md border border-red-500/10'>
                        <Text className='text-orange-600/90  text-xs '>{fieldState.error.message}</Text>
                    </Animated.View>}
                </Animated.View>
            )}
        />
    )
}

export default FormInput