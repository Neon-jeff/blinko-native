import { KeyboardAvoidingView, Platform, Pressable, View } from 'react-native';
import { LoginFormData, loginSchema } from '~/schemas/forms';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../ui/forminput';
import { Button } from '../ui/button';
import { Text } from '../ui/text';
import { Google } from '../icons';
import Logo from '../icons/Logo';
import { router } from 'expo-router';
import { useLogin } from '~/hooks/auth';
import { useAuthStore } from '~/store/auth';
import React from 'react';
import { BottomSheetRef } from '../ui/bottom-sheet';
import ErrorSheet from '../ui/error-sheet';

const SignUpForm = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode:'onChange'
  });
  const handleLogin = useLogin();
  const { login } = useAuthStore();
  const sheetRef = React.useRef<BottomSheetRef>(null);
  function handleSubmit(data: LoginFormData) {
    handleLogin.mutate(
      {
        identifier: data.email.toLowerCase(),
        password: data.password,
      },
      {
        onSuccess(data) {
          login({ ...data.data });
          router.push('/(tabs)/home');
        },
        onError() {
          sheetRef.current?.open();
        },
      }
    );
  }
  function onSubmit() {
    form.handleSubmit(handleSubmit)();
  }
  const handleCreateAccount = () => {
    router.push('/auth/signup');
  };
  return (
    <View className=" flex-1 gap-20 pt-10">
        <Logo variant="text" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 ">
        <View className="gap-2">
          <Text className=" android:text-3xl text-center  font-semibold text-3xl text-black">
            Welcome Back!
          </Text>
          <Text className=" native:text-base text-gray-600 text-center">Login to your account to continue</Text>
        </View>
        <View className="mt-10 gap-5 ">
          <FormInput
            name="email"
            control={form.control}
            label="Email Address"
            placeholder="Enter your email address"
          />
          <FormInput
            name="password"
            control={form.control}
            label="Password"
            placeholder="Enter your password"
          />
        </View>
        <View className="mt-8 gap-2 ">
          <Button
            className=""
            onPress={onSubmit}
            label="Login"
            disabled={handleLogin.isPending}
            loading={handleLogin.isPending}
          />
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
        <Text className="native:text-base">Don't have an account?</Text>
        <Pressable className="px-0" onPress={handleCreateAccount} hitSlop={20}>
          <Text className="native:text-base font-semibold text-blue-500">Create account</Text>
        </Pressable>
      </View>
      <ErrorSheet
        ref={sheetRef}
        errorMessage={handleLogin.error?.response?.message || 'An error occured while logging in'}
      />
    </View>
  );
};

export default SignUpForm;
