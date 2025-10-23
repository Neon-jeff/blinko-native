import { StyleSheet, View } from 'react-native';
import React from 'react';
import OTPFormInput from '~/components/ui/otp-forminput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OtpFormData, verifyEmailSchema } from '~/schemas/forms';
import Screen from '~/components/ui/screen';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { router } from 'expo-router';
import { toast } from 'sonner-native';
import { Email } from '~/assets/images';
import { Logo } from '~/components/icons';
import { useResendVerificationEmail, useVerifyEmail } from '~/hooks/auth';
import ErrorSheet from '~/components/ui/error-sheet';
import { useAuthStore } from '~/store/auth';
import { BottomSheetRef } from '~/components/ui/bottom-sheet';
import Animated, { ZoomIn } from 'react-native-reanimated';
import CustomImage from '~/components/ui/image';

const VerifyEmail = () => {
  const form = useForm<OtpFormData>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      otp: '',
    },
  });
  const [timer, setTimer] = React.useState(60);
  const sheetRef = React.useRef<BottomSheetRef>(null);
  const verifyOtp = useVerifyEmail();
  const resendCode = useResendVerificationEmail();
  const { user,logout } = useAuthStore();
  React.useEffect(() => {
    // if(!user){
    //   router.replace('/auth/signup');
    //   return;
    // }
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
  const handleResendCode = () => {
    // logout();
    // return;
    if (resendCode.isPending) return;
    if (!user?.email) {
      toast.error('User email not found');
      return;
    }
    resendCode.mutate(user.email, {
      onSuccess() {
        toast.success('Verification code resent successfully');
        setTimer(60);
      },
      onError() {
        sheetRef.current?.open();
      },
    });
  };
  const handleVerifyOtp = (data: { otp: string }) => {
    verifyOtp.mutate(Number(data.otp), {
      onSuccess() {
        router.push('/auth/details');
        toast.success('Email verified successfully!');
      },
      onError() {
        sheetRef.current?.open();
      },
    });
  };
  return (
    <Screen className=" gap-10 px-5 pb-10">
      <Logo variant="text" />
      <View className="items-center gap-2 ">
        <Animated.View className="items-center rounded-full p-3" entering={ZoomIn.duration(700)}>
          <CustomImage source={Email} style={{ width: 200, height: 250 }} resizeMode="contain" />
        </Animated.View>
        <Text className=" android:text-3xl  font-semibold text-3xl text-black">
          Verify Your Email
        </Text>
        <Text className="text-center text-base text-gray-500">
          Please enter the OTP sent to {user?.email}
        </Text>
      </View>
      <OTPFormInput name="otp" control={form.control} />
      <View className="flex-row items-center justify-between">
        <Text className="text-base text-gray-500">
          00 : {timer}
          {timer === 0 ? '0' : ''} seconds
        </Text>
      </View>
      <View className="absolute bottom-0 left-0 right-0 m-5 gap-3">
        <Text className="text-center text-base text-gray-500">Didn't receive the code?</Text>
        <Button
          loading={resendCode.isPending}
          disabled={timer > 0}
          variant={'ghost'}
          className="native:px-0 mb-2 rounded-full border border-gray-500"
          onPress={handleResendCode}
          label="Resend Code"
          labelClassName={timer > 0 ? 'text-gray-400' : 'text-black'}
          />
        <Button
          loading={verifyOtp.isPending}
          className=""
          onPress={form.handleSubmit(handleVerifyOtp)}
          disabled={!form.formState.isValid}
          label="Verify and Continue"
        />
      </View>
      <ErrorSheet
        ref={sheetRef}
        errorMessage={
          verifyOtp.error?.response?.message ||
          resendCode.error?.response?.message ||
          'Error verifying email'
        }
      />
    </Screen>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({});
