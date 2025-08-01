import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const OnboardingLayout = () => {
  return (
   <Stack screenOptions={{headerShown: false,animation:'none', contentStyle: {backgroundColor: 'black'}}} />
  )
}

export default OnboardingLayout;