import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Screen from '~/components/ui/screen'
import { CoverPhoto, PostsAndItems, ProfileDetails } from '~/components/profile'

const MyProfile = () => {
  return (
   <Screen edges={['bottom']} className='px-0'>
   <CoverPhoto />
   <ProfileDetails />
   <PostsAndItems />
   </Screen>
  )
}

export default MyProfile

const styles = StyleSheet.create({})