import { Redirect, router } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { useAuthStore } from '~/store/auth';

const IndexScreen = () => {
  const { isAuthenticated, isOnboardingComplete } = useAuthStore();
  useLayoutEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)/home');
      return;
    }
    if (!isAuthenticated && isOnboardingComplete) {
      router.replace('/auth/login');
      return;
    }
    if (!isAuthenticated && !isOnboardingComplete) {
      router.replace('/onboarding');
      return;
    }
  }, []);
  return <React.Fragment></React.Fragment>;
};

export default IndexScreen;
