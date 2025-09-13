import { View, Text } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'

const ChatLayout = () => {
  return (
    <Stack screenOptions={{headerShown:false,contentStyle:{flex:1,backgroundColor:'white'}}}>
        <Stack.Screen name='index' />
    </Stack>
  )
}

export default ChatLayout