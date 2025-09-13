import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SplashScreen, Stack } from 'expo-router';
import {
  useFonts,
  Manrope_200ExtraLight,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';
import '../global.css';
import { Toaster } from 'sonner-native';
import { KeyboardProvider } from "react-native-keyboard-controller";
import AppDrawer from '~/components/navigation/drawer';
import { PortalHost } from '@rn-primitives/portal';

SplashScreen.preventAutoHideAsync();
const RootLayout = () => {
  const [loaded] = useFonts({
    extralight: Manrope_200ExtraLight,
    light: Manrope_300Light,
    regular: Manrope_400Regular,
    medium: Manrope_500Medium,
    semibold: Manrope_600SemiBold,
    bold: Manrope_700Bold,
    extrabold: Manrope_800ExtraBold,
  });

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <React.Fragment>
      <KeyboardProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
        {/* <AppDrawer> */}
             <Stack
          screenOptions={{
            contentStyle: {
              flex: 1,
              backgroundColor: 'white',
            },
          }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="chat" options={{ headerShown: false }} />
        </Stack>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              backgroundColor: 'white',
              borderRadius: 8,
              padding: 20,
              shadowOpacity: 0.01,
            },
            titleStyle: {
              fontFamily: 'medium',
              color: 'black',
            },
            descriptionStyle: {
              fontFamily: 'regular',
              color: 'gray',
            },
          }}
        />
        <PortalHost />
        {/* </AppDrawer> */}
      </GestureHandlerRootView>
      </KeyboardProvider>
    </React.Fragment>
  );
};

export default RootLayout;
