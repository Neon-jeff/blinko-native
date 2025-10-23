import { StyleSheet} from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ProfileLayout = () => {
  return (
    <Stack screenOptions={{
      headerShown:false,
      contentStyle:{
        flex:1,
        backgroundColor:'#fff'
      }
    }}>
        <Stack.Screen name="me" />
        <Stack.Screen name="[user]" />
        <Stack.Screen name='find-friends'/>
    </Stack>
  )
}

export default ProfileLayout

const styles = StyleSheet.create({})