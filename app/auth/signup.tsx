
import SignUpForm from '~/components/forms/signup'
import Screen from '~/components/ui/screen'
import { Text } from '~/components/ui/text'

const SignUpScreen = () => {
  return (
    <Screen className='justify-center px-0 pt-20 flex-1'>
      <SignUpForm />
    </Screen>
  )
}

export default SignUpScreen