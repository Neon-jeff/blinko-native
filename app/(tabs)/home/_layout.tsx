import React from 'react';
import { withLayoutContext } from 'expo-router';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { TabNavigationState, ParamListBase } from '@react-navigation/native';
import TopTab from '~/components/navigation/top-tab';

const { Navigator } = createMaterialTopTabNavigator();
const TopTabBar = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const FeedsLayout = () => {
  return (
    <TopTabBar screenOptions={{
        sceneStyle:{
            backgroundColor: '#fff',
        }
    }}
    tabBar={(props) => <TopTab {...props} />}
    >
        <TopTabBar.Screen name="for-you"  />
        <TopTabBar.Screen name="following"  />
        <TopTabBar.Screen name="explore"  />
    </TopTabBar>
  );
};

export default FeedsLayout;
