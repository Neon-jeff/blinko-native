import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import TabBar from '~/components/navigation/tab-bar';
import { BlurView } from 'expo-blur';
import SharedHeader from '~/components/shared/header';
import AppDrawer from '~/components/navigation/drawer';

const TabsLayout = () => {
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
