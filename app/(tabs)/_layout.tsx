import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import TabBar from '~/components/navigation/tab-bar';

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: '#f5f5f5',
          flex: 1,
        },
      }}
      tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
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
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
