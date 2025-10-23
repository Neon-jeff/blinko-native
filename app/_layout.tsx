import React, { Fragment } from 'react';
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
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { PortalHost } from '@rn-primitives/portal';
import ReactQueryClientProvider from '~/components/query-client';
import { AppSheetProvider } from '~/components/providers/app-sheet';
import { FullWindowOverlay } from "react-native-screens"
import { Platform } from 'react-native';
import { SocketProvider } from '~/components/providers/socket-client';

if (__DEV__) {
  require("../ReactotronConfig");
}

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
  const WindowOverlay = Platform.OS === "ios" ? FullWindowOverlay : Fragment
  return (
    <React.Fragment>
      <KeyboardProvider>
      <ReactQueryClientProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
          <SocketProvider>
               <AppSheetProvider>
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
                <Stack.Screen
                  name="create-post"
                  options={{
                    headerShown: false,
                    presentation: 'modal',
                    fullScreenGestureEnabled: false,
                    sheetGrabberVisible: true,
                    sheetAllowedDetents: [0.8, 1],
                    gestureEnabled: false,
                  }}
                />
                <Stack.Screen name="profile" options={{ headerShown: false }} />
              </Stack>
              <Toaster
                position="bottom-center"
                toastOptions={{
                  style: {
                    backgroundColor: 'white',
                    borderRadius: 1000,
                    padding: 12,
                    shadowOpacity: 0.01,
                  },
                  titleStyle: {
                    fontFamily: 'medium',
                    color: 'black',
                    fontSize: 14,
                  },
                  descriptionStyle: {
                    fontFamily: 'regular',
                    color: 'gray',
                    fontSize: 10
                  },
                }}
                
              />
            </AppSheetProvider>
          </SocketProvider>
            <WindowOverlay><PortalHost/></WindowOverlay>
            {/* </AppDrawer> */}
          </GestureHandlerRootView>
      </ReactQueryClientProvider>
      </KeyboardProvider>
    </React.Fragment>
  );
};

export default RootLayout;
