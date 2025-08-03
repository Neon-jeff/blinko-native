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

const SignUpForm = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  function handleSubmit(data: LoginFormData) {
    console.log('Form Data:', data);
    router.replace('/auth/verify-email');
  }
  const handleCreateAccount = () => {
    router.push('/auth/signup');
  };
  return (
    <KeyboardAvoidingView
      className="mt-20 flex-1 gap-6"
      keyboardVerticalOffset={100}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="justify-center">
        <View className="gap-2">
          <Text className=" android:text-3xl  font-semibold text-2xl text-black">
            Welcome Back!
          </Text>
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
          <Button className="" onPress={form.handleSubmit(handleSubmit)}>
            <Text className="native:text-sm text-black">Login</Text>
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
        <Text className="native:text-base">Don't have an account?</Text>
        <Pressable className="px-0" onPress={handleCreateAccount}>
          <Text className="native:text-base font-semibold text-blue-500">Create account</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpForm;
