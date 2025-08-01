import React from 'react'
import { SplashScreen, Stack } from 'expo-router'
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
import '../global.css'
import 'react-native-reanimated'

SplashScreen.preventAutoHideAsync()
const RootLayout = () => {
        const [loaded] = useFonts({
        extralight: Manrope_200ExtraLight,
        light: Manrope_300Light,
        regular: Manrope_400Regular,
        medium: Manrope_500Medium,
        semibold: Manrope_600SemiBold,
        bold: Manrope_700Bold,
        extrabold: Manrope_800ExtraBold,
    })

    React.useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])

    if (!loaded) {
        return null
    }
    return (
        <React.Fragment>
            <Stack screenOptions={{
                contentStyle:{
                    flex: 1,
                    backgroundColor: 'white',
                }
            }}>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name='onboarding' options={{ headerShown: false }} />
                <Stack.Screen name="auth" options={{ headerShown: false }} />
            </Stack>
        </React.Fragment>
    )
}

export default RootLayout