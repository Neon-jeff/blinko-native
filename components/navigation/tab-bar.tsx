import { Platform, Pressable, View } from 'react-native';
import { FunctionComponent, useEffect } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import TabIcon from './tabicon';
import { cn } from '~/lib/utils';
import { Text } from '../ui/text';
import { sizes } from '~/constants/sizes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AddSquare, Home2, Message, Profile2User, Shop } from 'iconsax-react-native';
import type { IconProps } from 'iconsax-react-native';
import { router } from 'expo-router';

interface TabBarProps extends BottomTabBarProps {}

type iconType = { [key: string]: FunctionComponent<IconProps> };

const TabBar = ({ state, navigation }: TabBarProps) => {
  const icons: iconType = {
    home: Home2,
    market: Shop,
    'create-post': AddSquare,
    chat: Message,
    groups: Profile2User,
  };
  const { bottom } = useSafeAreaInsets();
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const routes = [
    ...state.routes.slice(0, 2).map((route) => ({ name: route.name, key: route.key })),
    { name: 'create-post', key: null },
    ...state.routes
      .slice(2, state.routes.length)
      .map((route) => ({ name: route.name, key: route.key })),
  ];
  return (
    <View
      className=" border-t border-gray-100 bg-white pt-4"
      style={{
        paddingBottom: Platform.select({
          ios: bottom * 0.3,
          android: bottom * 0.3,
        }),
      }}>
      <View
        className="flex-row items-center justify-between rounded-t-[30px]   px-8  "
        style={{
          backgroundColor: 'rgba(255, 255, 255, 1)',
          height: sizes.screen.height * 0.1,
          paddingBottom: Platform.select({
            ios: 10,
            android: sizes.screen.height * 0.05,
          }),
        }}>
        {routes.map((routeToScreen, index) => {
          const isFocused =
            state.index === (index >= 2 ? (index === 2 ? false : index - 1) : index);
          const isCreatePost = routeToScreen.name === 'create-post';
          const scaleProgress = useSharedValue<number>(0);
          const styles = useAnimatedStyle(() => {
            const scale = interpolate(scaleProgress.value, [0, 1], [1, 1.1]);
            return {
              transform: [{ scale }],
            };
          });

          const handleNavigation = () => {
            if (isFocused) return;
            if (routeToScreen.name === 'create-post') {
              router.push('/create-post');
              return;
            }
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
              className={cn(`items-center gap-1 rounded-full  px-1.5  `, isCreatePost && '')}
              onPress={handleNavigation}
              style={[styles]}>
              <View
                className={cn(isCreatePost && 'rounded-xl bg-gray-100 p-2 px-4 ', 'items-center ')}>
                <TabIcon
                  focused={isFocused}
                  Icon={icons[routeToScreen.name]}
                  isCreatePost={isCreatePost}
                  isGroup={routeToScreen.name === 'groups'}
                />
                {/* {!isCreatePost && (
                  <Text
                    className={cn(
                      'caption-top  text-xs text-zinc-400',
                      isFocused && 'font-semibold text-black'
                    )}
                    style={{
                      textTransform: 'capitalize',
                    }}>
                    {routeToScreen.name}
                  </Text>
                )} */}
              </View>
            </AnimatedPressable>
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;
