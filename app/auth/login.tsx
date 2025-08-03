import { View, Text } from 'react-native'
import React from 'react'
import Screen from '~/components/ui/screen'
import { LoginForm } from '~/components/forms'

const LoginScreen = () => {
  return (
    <Screen>
      <LoginForm />
    </Screen>
  )
}

export default LoginScreen