import * as React from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  View,
  type TextInputProps,
} from 'react-native';
import { cn } from '@/lib/utils';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Eye, EyeSlash } from 'iconsax-react-native';
import { Button } from './button';
import { constants } from '~/constants';

interface InputProps extends TextInputProps {
  label?: string;
  isInvalid?: boolean;
  Icon?: React.ReactNode;
  containerClassName?: string;
}

const Input = React.forwardRef<React.ComponentRef<typeof TextInput>, InputProps>(
  (
    { className, placeholderClassName, onFocus, onBlur, secureTextEntry, isInvalid, Icon,containerClassName, ...props },
    ref
  ) => {
    const focusProgress = useSharedValue(0);
    // check focused state of input to display validation feedback
    const borderColor = useSharedValue(constants.theme.blur);
    const handlefocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (!isInvalid) {
        borderColor.value = withTiming(constants.theme.focused, { duration: 200 });
        return;
      }
      onFocus?.(e);
    }
    const handleblur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
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

    // React.useEffect(() => {
    //   if (isInvalid) {
    //     borderColor.value = withTiming('#f97314', { duration: 400 });
    //     return;
    //   }
    //   if (!isInvalid && isFocused) {
    //     borderColor.value = withTiming(constants.theme.focused, { duration: 200 });
    //   }
    // }, [isInvalid]);

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
        className={cn("relative flex-row gap-1 bg-gray-100/80 border border-gray-200/80 justify-center rounded-xl  ", containerClassName)}
     >
          {
            Icon && <View className='w-8 items-start justify-center pl-2'>{Icon}</View>
          }
        <TextInput
          ref={ref}
          className={cn(
            '   native:text-base font-medium flex-1 font-regular native:leading-[1.25] h-12 px-3 text-sm  text-gray-800 file:border-0  file:bg-transparent file:font-medium web:py-2 lg:text-sm ',
            props.editable === false && 'opacity-50 web:cursor-not-allowed',
            className
          )}
          placeholderClassName={cn('text-muted-foreground ', placeholderClassName)}
          onFocus={handlefocus}
          onBlur={handleblur}
          secureTextEntry={secureText}
          autoCorrect={false}
          autoCapitalize="sentences"
          {...props}
          cursorColor={'#000'}
          placeholderTextColor={'#6b7280'}
  
        />
        {secureTextEntry && (
          <Button
            onPress={handleToggle}
            variant="ghost"
            className="absolute right-1 top-1/2 -translate-y-1/2 "
            style={{}}>
            {secureText && <EyeSlash className="absolute" size={18} color="#000" />}
            {!secureText && <Eye className="absolute" size={18} color="#000" />}
          </Button>
        )}
      </Animated.View>
    );
  }
);

Input.displayName = 'Input';

export { Input };
