import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import OTPFormInput from '~/components/ui/otp-forminput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OtpFormData, verifyEmailSchema } from '~/schemas/forms';
import Screen from '~/components/ui/screen';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Mail } from 'lucide-react-native';
import { router } from 'expo-router';
import { toast } from 'sonner-native';
import { Progress } from '~/components/ui/progress';

const VerifyEmail = () => {
  const form = useForm<OtpFormData>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      otp: '',
    },
  });
  const [timer, setTimer] = React.useState(60);
  const [progress, setProgress] = React.useState(20);
  React.useEffect(() => {
    setProgress(40); // Set progress to 20% for the verify email step
  }, []);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const handleVerifyOtp = (data: { otp: string }) => {
    console.log('OTP Verified:', data.otp);
    // Handle OTP verification logic here
    router.push('/auth/interests');
    toast.success('Email verified successfully!');
  };
  return (
    <Screen className=" gap-10 px-5 pt-10 ">
       <Progress value={progress} />
      <View className="gap-2 ">
        <View className="items-center self-start  rounded-full bg-gray-100 p-3">
          <Mail size={30} strokeWidth={1.5} />
        </View>
        <Text className=" android:text-3xl  font-semibold text-2xl text-black">
          Verify Your Email
        </Text>
        <Text className="text-base text-gray-500">
          Please enter the OTP sent to your email address.
        </Text>
      </View>
      <OTPFormInput name="otp" control={form.control} />
      <View className="flex-row items-center justify-between">
        <Button disabled={timer > 0} variant={'ghost'} className="native:px-0">
          <Text className="native:text-base font-semibold">Resend Code</Text>
        </Button>
        <Text className="text-base text-gray-500">
          00 : {timer}
          {timer === 0 ? '0' : ''} seconds
        </Text>
      </View>
      <Button
        className="absolute bottom-0 left-0 right-0 m-5"
        onPress={form.handleSubmit(handleVerifyOtp)}
        disabled={!form.formState.isValid}
        >
        <Text className="native:text-base text-white">Verify Email</Text>
      </Button>
    </Screen>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({});
