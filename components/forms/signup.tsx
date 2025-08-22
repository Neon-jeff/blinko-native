import { KeyboardAvoidingView, Platform, Pressable, View } from 'react-native';
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

const SignUpForm = () => {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    setProgress(20); // Set progress to 20% for the signup step
  }, []);
  function handleSubmit(data: SignUpFormData) {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords don't match", {
        duration: Infinity,
      });
      return;
    }
    console.log('Form Data:', data);
    router.replace('/auth/verify-email');
  }
  function handleSignUp(){
    if(form.getValues('password') !== form.getValues('confirmPassword')){
      toast.error("Passwords don't match");
      return;
    }
    form.handleSubmit(handleSubmit)();
  }
  return (
    <KeyboardAvoidingView
      behavior='height'
      className="flex-1 gap-6">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 ">
        <View className="gap-2 px-4">
           <Progress value={progress} className="mb-10" />
          <Text className=" android:text-3xl  font-semibold text-2xl text-black">
            Create Account
          </Text>
        </View>
        <View className="mt-5 gap-5 px-4">
          <View className="flex-row items-center gap-2">
            <FormInput
              name="fullname"
              control={form.control}
              label="Full Name"
              placeholder="Enter your full name"
            />
            <FormInput
              name="email"
              control={form.control}
              label="Email Address"
              placeholder="Enter your email address"
            />
          </View>
          <FormInput
            name="password"
            control={form.control}
            label="Password"
            placeholder="Enter your password"
          />
          <FormInput
            name="confirmPassword"
            control={form.control}
            label="Confirm Password"
            placeholder="Re-enter your password"
          />
        </View>
        <View className="mt-8 gap-2  px-4">
          <Button onPress={handleSignUp}>
            <Text className="native:text-sm text-white">Create account</Text>
          </Button>
          <View className="flex-row items-center justify-center gap-2">
            <View className="h-[.5] w-[45%] bg-gray-200" />
            <Text className="text-center">Or</Text>
            <View className="h-[.5] w-[45%] bg-gray-200" />
          </View>
          <Button className="flex-row items-center justify-center gap-5 bg-gray-100">
            <Google />
            <Text className="native:text-sm text-black">Continue with Google</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
      <View className="absolute bottom-10 left-0 right-0 flex-row items-center justify-center gap-1">
        <Text className="native:text-base">Already have an account?</Text>
        <Pressable className="px-0" onPress={() => router.push('/auth/login')} hitSlop={20}>
          <Text className="native:text-base font-semibold text-blue-500">Sign In</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpForm;
