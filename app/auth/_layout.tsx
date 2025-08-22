import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';

const AuthLayout = () => {
  async function handleNavigationBarTheme() {
    await NavigationBar.setBackgroundColorAsync('white');
    await NavigationBar.setButtonStyleAsync('dark');
  }
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      handleNavigationBarTheme();
    }, 100);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'white', flex: 1 },
        animation: 'fade_from_bottom',
      }}>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="verify-email" options={{ headerShown: false }} />
      <Stack.Screen name="interests" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
