import * as React from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  type TextInputProps,
} from 'react-native';
import { cn } from '@/lib/utils';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Eye, EyeSlash } from 'iconsax-react-native';
import { Button } from './button';
import { constants } from '~/constants/indext';

interface InputProps extends TextInputProps {
  label?: string;
  isInvalid?: boolean;
}

const Input = React.forwardRef<React.ComponentRef<typeof TextInput>, InputProps>(
  (
    { className, placeholderClassName, onFocus, onBlur, secureTextEntry, isInvalid, ...props },
    ref
  ) => {
    const focusProgress = useSharedValue(0);
    // check focused state of input to display validation feedback
    const [isFocused, setIsFocused] = React.useState(false);
    const borderColor = useSharedValue(constants.theme.blur);
    function handlefocus(e: NativeSyntheticEvent<TextInputFocusEventData>) {
      setIsFocused(true);
      if (!isInvalid) {
        borderColor.value = withTiming(constants.theme.focused, { duration: 200 });
        return;
      }
      onFocus?.(e);
    }
    function handleblur(e: NativeSyntheticEvent<TextInputFocusEventData>) {
      setIsFocused(false);
      borderColor.value = withTiming(constants.theme.blur, { duration: 200 });
      onBlur?.(e);
    }
    const containerAnimatedStyle = useAnimatedStyle(() => ({
      borderColor: borderColor.value,
      borderWidth: 1,
    }));
    const [secureText, setSecureText] = React.useState(false);
    React.useEffect(() => {
      setSecureText(secureTextEntry ?? false);
    }, [secureTextEntry]);

    React.useEffect(() => {
      if (isInvalid) {
        borderColor.value = withTiming('#f97314', { duration: 400 });
        return;
      }
      if (!isInvalid && isFocused) {
        borderColor.value = withTiming(constants.theme.focused, { duration: 200 });
      }
    }, [isInvalid]);

    // handle the toggle of the secure text entry
    function handleToggle() {
      if (secureText) {
        setSecureText(false);
      } else {
        setSecureText(true);
      }
    }
    return (
      <Animated.View
        className=" relative justify-center rounded-xl "
        style={[containerAnimatedStyle]}>
        <TextInput
          ref={ref}
          className={cn(
            '  bg-background native:text-base  native:leading-[1.25] h-12 rounded-md px-3 text-sm text-gray-600 file:border-0  file:bg-transparent file:font-medium web:py-2 lg:text-sm ',
            props.editable === false && 'opacity-50 web:cursor-not-allowed',
            className
          )}
          placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
          onFocus={handlefocus}
          onBlur={handleblur}
          secureTextEntry={secureText}
          autoCorrect={false}
          autoCapitalize="sentences"
          {...props}
          cursorColor={'#000'}
        />
        {secureTextEntry && (
          <Button
            onPress={handleToggle}
            variant="ghost"
            className="absolute right-1 top-1/2 -translate-y-1/2 "
            style={{}}>
            {secureText && <EyeSlash className="absolute" size={18} color="#fff" />}
            {!secureText && <Eye className="absolute" size={18} color="#fff" />}
          </Button>
        )}
      </Animated.View>
    );
  }
);

Input.displayName = 'Input';

export { Input };
