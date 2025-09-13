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
   <View className='border-t border-gray-100 rounded-t-[30px]'>
     <View
      className="flex-row items-center justify-center gap-8 rounded-t-[30px]   px-5  "
      style={{
        backgroundColor: 'rgba(255, 255, 255, 1)',
        height: sizes.screen.height * 0.1,
        paddingBottom: Platform.select({
          ios: 10,
          android: sizes.screen.height * 0.05
        }),
      }}>
      {state.routes.map((routeToScreen, index) => {
        const isFocused = state.index === index;
        const isCreatePost = routeToScreen.name === 'create-post';
        const scaleProgress = useSharedValue<number>(0);
        const styles = useAnimatedStyle(() => {
          const scale = interpolate(scaleProgress.value, [0, 1], [1, 1.1]);
          return {
            transform: [{ scale }, { translateY: isCreatePost ? -15 : 0 }],
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
            className={cn(
              `items-center gap-1 rounded-full  px-1.5  `,
              isCreatePost && ''
            )}
            onPress={handleNavigation}
            style={[styles]}>
            <View
              className={cn(
                isCreatePost && 'h-16 w-16 items-center justify-center rounded-full  bg-blue-600',
                'items-center '
              )}>
              <TabIcon
                focused={isFocused}
                Icon={icons[routeToScreen.name]}
                isCreatePost={isCreatePost}
                isGroup={routeToScreen.name==='groups'}
              />
              {!isCreatePost && (
                <Text
                  className={cn(
                    'caption-top  text-xs text-zinc-400',
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
   </View>
  );
};

export default TabBar;
