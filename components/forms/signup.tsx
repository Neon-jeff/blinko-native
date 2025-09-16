import { ActivityIndicator, Platform, Pressable, View } from 'react-native';
import { SignUpFormData, signupSchema } from '~/schemas/forms';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../ui/forminput';
import { Button } from '../ui/button';
import { Text } from '../ui/text';
import { Google } from '../icons';
import Logo from '../icons/Logo';
import { router } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useSignUp, useValidateCredentials, useValidateIdentifier } from '~/hooks/auth';
import { BottomSheetRef } from '../ui/bottom-sheet';
import ErrorSheet from '../ui/error-sheet';
import { cn } from '~/lib/utils';
import { Check, XCircle } from 'lucide-react-native';
import { useAuthStore } from '~/store/auth';

const SignUpForm = () => {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });
  const validateCredentials = useValidateCredentials();
  const createAccount = useSignUp();
  const validateIdentfier = useValidateIdentifier();
  const sheetRef = React.useRef<BottomSheetRef>(null);
  const { user, login } = useAuthStore();
  function handleSubmit(data: SignUpFormData) {
    validateCredentials.mutate(
      {
        identifier: data.email.toLocaleLowerCase(),
        password: data.password,
      },
      {
        onSuccess: () => {
          // call the create account endpoint.
          createAccount.mutate(
            {
              email: data.email,
              username: data.email + 'not-set',
              password: data.password,
              dateOfBirth: '2000-01-01',
              fullName: 'not-set',
              country: 'not-set',
              state: 'not-set',
              address: 'not-set',
            },
            {
              onSuccess(data) {
                login({ ...data.data });
                router.push('/auth/verify-email');
              },
              onError() {
                sheetRef.current?.open();
              },
            }
          );
        },
        onError: (error) => {
          sheetRef.current?.open();
        },
      }
    );
  }
  function handleSignUp() {
    form.handleSubmit(handleSubmit)();
  }
  function handleEmailChange() {
    if (
      !form.getFieldState('email').error?.message &&
      form.getValues('email') &&
      form.getValues('email').includes('@')
    ) {
      setTimeout(() => {
        validateIdentfier.mutate(
          {
            identifier: form.getValues('email'),
          },
          {
            onSuccess(data) {},
          }
        );
      }, 500);
    }
  }
  const passwordValidationObject = [
    {
      name: 'At least 8 characters',
      isValid: form.watch('password').length >= 8,
    },
    {
      name: 'At least one uppercase letter',
      isValid: /[A-Z]/.test(form.watch('password')),
    },
    {
      name: 'At least one lowercase letter',
      isValid: /[a-z]/.test(form.watch('password')),
    },
    {
      name: 'At least one number',
      isValid: /[0-9]/.test(form.watch('password')),
    },
    {
      name: 'At least one special character',
      isValid: /[!@#$%^&*(),.?":{}|<>]/.test(form.watch('password')),
    },
  ];
  return (
    <View className="flex-1 gap-6">
      <Logo variant="text" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-center">
        <View className="items-center gap-2 px-10">
          <Text className=" android:text-3xl  font-semibold text-3xl text-black">
            Create Account
          </Text>
          {/* <Text className="text-center text-base text-gray-500">
            Please enter your email and password to create an account.
          </Text> */}
        </View>
        <View className="mt-10 gap-5 px-4 ">
          <View className="flex-1 gap-2">
            <FormInput
              name="email"
              control={form.control}
              label="Email Address"
              placeholder="john.doe@mail.com"
              isLoading={validateIdentfier.isPending}
              onChangeText={handleEmailChange}
            />
            {validateIdentfier.data?.data && !form.getFieldState('email').invalid && (
              <View className="flex-row items-center gap-1">
                {validateIdentfier.data.data.exists ? (
                  <XCircle fill={'red'} stroke={'white'} size={18} />
                ) : (
                  <Check stroke={'green'} size={18} />
                )}
                <Text
                  className={cn(
                    'text-sm text-green-700 ',
                    validateIdentfier.data.data.exists && 'text-red-500'
                  )}>
                  {validateIdentfier.data.data.exists ? 'Email already used' : 'Email is available'}
                </Text>
              </View>
            )}
          </View>
          <View className="flex-1 gap-2">
            <FormInput
              name="password"
              control={form.control}
              label="Password"
              placeholder="*********"
              showMessage={false}
            />
            <View className="flex-1 gap-1">
              {passwordValidationObject.map((item, index) => (
                <View key={index} className="flex-row items-center gap-1">
                  {<Check stroke={item.isValid ? 'green' : 'white'} size={15} />}
                  <Text
                    className={cn('text-sm', item.isValid ? 'text-green-700' : 'text-gray-500')}>
                    {item.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View className="mt-8 gap-2  px-4">
          <Button
            onPress={handleSignUp}
            disabled={validateCredentials.isPending || createAccount.isPending}
            label="Sign up with email"
            loading={validateCredentials.isPending || createAccount.isPending}
          />

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
      <ErrorSheet
        ref={sheetRef}
        errorMessage={
          validateCredentials.error?.response?.message ||
          createAccount.error?.response.message ||
          'An error occurred'
        }
      />
    </View>
  );
};

export default SignUpForm;
