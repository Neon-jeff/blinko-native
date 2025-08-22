import { Pressable, View } from 'react-native';
import React, { FunctionComponent, useEffect } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import TabIcon from './tabicon';
import { AddIcon, HomeIcon, MarketIcon, MessageIcon, UsersIcon } from '../icons/tab-icons';
import { SvgProps } from 'react-native-svg';
import { cn } from '~/lib/utils';
import { Text } from '../ui/text';
import { Canvas, Fill, Image, BackdropBlur, useImage } from '@shopify/react-native-skia';
import { sizes } from '~/constants/sizes';

interface TabBarProps extends BottomTabBarProps {}

type iconType = { [key: string]: FunctionComponent<SvgProps> };

const TabBar = ({ state, navigation }: TabBarProps) => {
  const icons: iconType = {
    home: HomeIcon,
    market: MarketIcon,
    'create-post': AddIcon,
    chat: MessageIcon,
    groups: UsersIcon,
  };
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  return (
    <View
      className="h-24 bg-transparent w-full flex-row items-center justify-center gap-8 self-center p-4 pb-8 "
      style={{}}>
      <Canvas style={{  position: 'absolute', top: 0, left: 0,right: 0,bottom: 0 }}>
        <BackdropBlur blur={100} clip={{ x: 0, y: 0, width: sizes.screen.width, height: 96 }}>
          <Fill color="rgba(255, 255, 255, 0.2)" />
        </BackdropBlur>
      </Canvas>
      {state.routes.map((routeToScreen, index) => {
        const isFocused = state.index === index;
        const isCreatePost = routeToScreen.name === 'create-post';
        const scaleProgress = useSharedValue<number>(0);
        const styles = useAnimatedStyle(() => {
          const scale = interpolate(scaleProgress.value, [0, 1], [1, 1.1]);
          return {
            transform: [{ translateY: isCreatePost ? -15 : 0 }, { scale }],
          };
        });

        const handleMove = () => {
          if (isFocused) return;
          navigation.navigate(routeToScreen.name);
        };

        useEffect(() => {
          if (!isFocused) {
            scaleProgress.value = withTiming(0);
          }
          if (isFocused) {
            scaleProgress.value = withTiming(1);
          }
        }, [isFocused]);

        return (
          <AnimatedPressable
            key={routeToScreen.key}
            className={cn(
              `items-center gap-1.5 rounded-full bg-white px-1.5  `,
              isCreatePost && 'p-5'
            )}
            onPress={handleMove}
            style={[styles]}>
            <View
              className={cn(
                isCreatePost && 'h-12 w-12 items-center justify-center rounded-full bg-blue-600',
                'items-center '
              )}>
              <TabIcon
                focused={isFocused}
                Icon={icons[routeToScreen.name]}
                isCreatePost={isCreatePost}
              />
              {!isCreatePost && (
                <Text
                  className={cn(
                    'caption-top pt-1 text-xs text-zinc-400',
                    isFocused && 'font-semibold text-blue-600'
                  )}
                  style={{
                    textTransform: 'capitalize',
                  }}>
                  {routeToScreen.name}
                </Text>
              )}
            </View>
          </AnimatedPressable>
        );
      })}
    </View>
  );
};

export default TabBar;
