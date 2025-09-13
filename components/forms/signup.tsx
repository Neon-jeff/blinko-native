import { Platform, Pressable, View } from 'react-native';
import { SignUpFormData, signupSchema } from '~/schemas/forms';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../ui/forminput';
import { Button } from '../ui/button';
import { Text } from '../ui/text';
import { Google } from '../icons';
import Logo from '../icons/Logo';
import { router } from 'expo-router';
import { toast } from 'sonner-native';
import { Progress } from '../ui/progress';
import React from 'react';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

const SignUpForm = () => {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    setProgress(20); // Set progress to 20% for the signup step
  }, []);
  function handleSubmit(data: SignUpFormData) {
    console.log('Form Data:', data);
    router.replace('/auth/verify-email');
  }
  function handleSignUp() {
    form.handleSubmit(handleSubmit)();
  }
  return (
    <View className="flex-1 gap-6">
      <Logo />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-center">
        <View className="items-center gap-2 px-10">
          <Text className=" android:text-3xl  font-semibold text-3xl text-black">
            Create Account
          </Text>
          <Text className="text-center text-sm text-gray-500">
            Please enter your email and password to create an account.
          </Text>
        </View>
        <View className="mt-10 gap-5 px-4">
          <FormInput
            name="email"
            control={form.control}
            label="Email Address"
            placeholder="john.doe@mail.com"
          />
          <FormInput
            name="password"
            control={form.control}
            label="Password"
            placeholder="*********"
          />
        </View>
        <View className="mt-8 gap-2  px-4">
          <Button onPress={handleSignUp}>
            <Text className="native:text-base text-white ">Sign up with email</Text>
          </Button>
          <View className="flex-row items-center justify-center gap-2">
            <View className="h-[.5] w-[45%] bg-gray-200" />
            <Text className="text-center">Or</Text>
            <View className="h-[.5] w-[45%] bg-gray-200" />
          </View>
          <Button className="flex-row items-center justify-center gap-5 bg-gray-100">
            <Google />
            <Text className="native:text-base text-black">Continue with Google</Text>
          </Button>
          <View className="mt-5 flex-row items-center justify-center gap-2">
            <Text className="native:text-base">Already have an account?</Text>
            <Pressable className="px-0" onPress={() => router.push('/auth/login')} hitSlop={20}>
              <Text className="native:text-base font-semibold text-blue-500">Sign In</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUpForm;
