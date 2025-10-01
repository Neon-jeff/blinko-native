import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const CreatePostLayout = () => {
  return (
    <Stack
      screenOptions={{
        contentStyle: { 
          backgroundColor: 'white', 
          flex: 1
        },
      }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent', flex: 1 },
        }}
      />
    </Stack>
  );
};

export default CreatePostLayout;

const styles = StyleSheet.create({});
