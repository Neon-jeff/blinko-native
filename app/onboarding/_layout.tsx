import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const OnboardingLayout = () => {

  return (
    <React.Fragment>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
          contentStyle: { backgroundColor: 'black', flex: 1 },
        }}
      />
      <StatusBar style="dark" />
    </React.Fragment>
  );
};

export default OnboardingLayout;
