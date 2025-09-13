import { Platform, Pressable, View } from 'react-native';
import { DetailsFormData, detailsFormSchema } from '~/schemas/forms';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../ui/forminput';
import { Button } from '../ui/button';
import { Text } from '../ui/text';
import Logo from '../icons/Logo';
import { router } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import DatePicker from 'react-native-date-picker'
const DetailsForm = () => {
  const form = useForm<DetailsFormData>({
    resolver: zodResolver(detailsFormSchema),
    defaultValues: {
      fullName: '',
      username: '',
      dateOfBirth: '',
    },
  });
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    setProgress(20); // Set progress to 20% for the signup step
  }, []);
  function handleSubmit(data: DetailsFormData) {
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
        <View className=" w-4/5 gap-2">
          <Text className=" android:text-3xl  font-semibold text-3xl text-black">
            Let's know more about you
          </Text>
          <Text className="text-sm text-gray-500">
            Please enter your email and password to create an account.
          </Text>
        </View>
        <View className="mt-10 gap-5 ">
          <FormInput
            name="fullName"
            control={form.control}
            label="Full Name"
            placeholder="John Doe"
          />
          <FormInput
            name="username"
            control={form.control}
            label="Select Username"
            placeholder="johndoe"
          />
            <DatePicker
            mode="date"
            open
            date={new Date()}
            onDateChange={(date) => {
              const formattedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
              form.setValue('dateOfBirth', formattedDate);
            }}
            maximumDate={new Date()} // Prevent selecting future dates
            className="w-full"
          />
          {/* <FormInput
            name="dateOfBirth"
            control={form.control}
            label="Date of Birth"
            placeholder="YYYY-MM-DD"
          /> */}
        </View>
        <View className="mt-8 gap-2  px-4">
          <Button onPress={handleSignUp}>
            <Text className="native:text-base text-white ">Continue</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default DetailsForm;
