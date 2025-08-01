import { KeyboardAvoidingView, View } from 'react-native'
import { SignUpFormData, signupSchema } from '~/schemas/forms';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../ui/forminput';
import { Button } from '../ui/button';
import { Text } from '../ui/text';

const SignUpForm = () => {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues:{
      fullname: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });
  return (
    <View className='gap-4'>
      <KeyboardAvoidingView behavior='padding' className='gap-4'>
        <FormInput
      control={form.control}
      name='fullname'
      label='Full Name'
      />
         <FormInput
      control={form.control}
      name='email'
      label='Email'
      />
         <FormInput
      control={form.control}
      name='password'
      label='Password'
      />
         <FormInput
      control={form.control}
      name='confirmPassword'
      label='Confirm Password'
      />
      </KeyboardAvoidingView>
      <Button className='bg-black'>
        <Text className='text-white'>Create account</Text>
      </Button>
    </View>
  )
}

export default SignUpForm