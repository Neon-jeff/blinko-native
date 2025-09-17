import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { router, Tabs } from 'expo-router';
import TabBar from '~/components/navigation/tab-bar';
import { BlurView } from 'expo-blur';
import SharedHeader from '~/components/shared/header';
import AppDrawer from '~/components/navigation/drawer';
import { useAuthStore } from '~/store/auth';

const TabsLayout = () => {
  const { isAuthenticated, isGuestUser, user } = useAuthStore();
  useLayoutEffect(() => {
    if (!isAuthenticated && !isGuestUser) {
      router.replace('/onboarding');
      return;
    }
    if (isAuthenticated) {
      if (user?.profile?.fullName === 'not-set') {
        router.replace('/auth/details');
        return;
      }
      if (user?.profile?.country === 'not-set') {
        router.replace('/auth/location');
        return;
      }
    }
  }, [user, isAuthenticated, isGuestUser]);
  if(!user && !isGuestUser) return null;
  return (
    // <AppDrawer>
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: '#fff',
          flex: 1,
        },
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0,
          backgroundColor: 'red',
          height: 0,
        },
      }}
      tabBar={(props) => (
        <View
          className=" absolute bottom-0 left-0 right-0 bg-transparent"
          style={{ backgroundColor: 'transparent' }}>
          <TabBar {...props} />
        </View>
      )}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          header: () => <SharedHeader />,
        }}
      />
      <Tabs.Screen
        name="market"
        options={{
          title: 'Market',
        }}
      />

      <Tabs.Screen
        name="create-post"
        options={{
          title: 'Create Post',
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: 'Groups',
        }}
      />
    </Tabs>
    // </AppDrawer>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
