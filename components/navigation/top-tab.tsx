import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import SharedHeader from '../shared/header';
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { Text } from '../ui/text';
import { cn } from '~/lib/utils';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const TopTab = ({ state, descriptors, navigation, position }: MaterialTopTabBarProps) => {
  const routeName: Record<string, string> = {
    'for-you': 'For You',
    following: 'Following',
    explore: 'Explore',
  };
  return (
    <View className="bg-white pb-1 ">
      <SharedHeader />
      <View className="w-4/5 flex-row gap-2  self-center">
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };
          const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: isFocused ? withSpring(1.1) : withSpring(1.05) }],
          }));
          return (
            <AnimatedPressable
              onPress={onPress}
              key={route.key}
              className={cn('my-2 flex-1 flex-row items-center justify-center gap-1.5 py-1 ')}
              style={animatedStyle}>
              {isFocused && <View className="h-1.5 w-1.5 rounded-full bg-black" />}
              <Text
                className={cn('text-sm text-gray-400', isFocused && 'font-semibold text-black')}>
                {routeName[route.name as string]}
              </Text>
            </AnimatedPressable>
          );
        })}
      </View>
    </View>
  );
};

export default TopTab;

const styles = StyleSheet.create({});
