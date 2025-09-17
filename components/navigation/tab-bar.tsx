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
import { AddIcon, HomeIcon, MarketIcon, MessageIcon, UsersIcon } from '../icons/tab-icons';
import { SvgProps } from 'react-native-svg';
import { cn } from '~/lib/utils';
import { Text } from '../ui/text';
import { sizes } from '~/constants/sizes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AddSquare, Home2, Home3, Message, Profile2User, Shop } from 'iconsax-react-native';
import type { Icon, IconProps } from 'iconsax-react-native';

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
  return (
    <View
      className=" border-t border-gray-100 bg-white"
      style={{
        paddingBottom: Platform.select({
          ios: bottom * 0.3,
          android: bottom * 0.8,
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
        {state.routes.map((routeToScreen, index) => {
          const isFocused = state.index === index;
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
                className={cn(
                  isCreatePost && 'bg-gray-100 p-2 px-4 rounded-xl ',
                  'items-center '
                )}>
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
