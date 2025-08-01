import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <Stack screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
        animation: 'fade_from_bottom',
    }}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  )
}

export default AuthLayout

const styles = StyleSheet.create({})