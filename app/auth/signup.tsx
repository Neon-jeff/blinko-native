
import SignUpForm from '~/components/forms/signup'
import Screen from '~/components/ui/screen'
import { Text } from '~/components/ui/text'

const SignUpScreen = () => {
  return (
    <Screen className='justify-center'>
        <Text className='text-2xl font-semibold pb-10 text-center'>Create Account</Text>
      <SignUpForm />
    </Screen>
  )
}

export default SignUpScreen