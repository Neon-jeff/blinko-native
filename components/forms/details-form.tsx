import { Platform, View } from 'react-native';
import { DetailsFormData, detailsFormSchema } from '~/schemas/forms';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../ui/forminput';
import { Button } from '../ui/button';
import { Text } from '../ui/text';
import Logo from '../icons/Logo';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import FormDatePicker from '../ui/form-date-picker';
import { Profile } from '~/assets/images';
import { useUpdateProfile, useValidateIdentifier } from '~/hooks/auth';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { router } from 'expo-router';
import { toast } from 'sonner-native';
import { BottomSheetRef } from '../ui/bottom-sheet';
import React from 'react';
import ErrorSheet from '../ui/error-sheet';
import { cn } from '~/lib/utils';
import { Check, XCircle } from 'lucide-react-native';
import { useAuthStore } from '~/store/auth';
import CustomImage from '../ui/image';
const DetailsForm = () => {
  const form = useForm<DetailsFormData>({
    resolver: zodResolver(detailsFormSchema),
    defaultValues: {
      fullName: '',
      // username: '',
      dateOfBirth: '',
    },
    mode: 'onChange',
  });
  const updateProfile = useUpdateProfile();
  const validateIdentfier = useValidateIdentifier();
  const { updateProfile: updateStoreProfile } = useAuthStore();
  const sheetRef = React.useRef<BottomSheetRef>(null);
  function handleSubmit(data: DetailsFormData) {
    if (!form.watch('dateOfBirth')) {
      form.setError('dateOfBirth', { message: 'Date of Birth is required' });
      return;
    }
    updateProfile.mutate(
      {
        fullName: data.fullName,
        // username: data.username,
        dateOfBirth: data.dateOfBirth,
      },
      {
        onSuccess(data) {
          updateStoreProfile({ profile: data.data });
          toast.success('Profile updated successfully');
          router.push('/auth/location');
        },
        onError() {
          sheetRef.current?.open();
        },
      }
    );
  }
  // const handleUsernameChange = React.useCallback(() => {
  //   if (form.watch('username') && form.watch('username').length >= 5) {
  //     setTimeout(() => {
  //       validateIdentfier.mutate({
  //         identifier: form.getValues('username').toLocaleLowerCase(),
  //       });
  //     }, 500);
  //   }
  // }, []);
  function handleContinue() {
    form.handleSubmit(handleSubmit)();
  }
  return (
    <View className="flex-1 gap-6">
      <Logo variant="text" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="mt-10 flex-1 gap-20">
        <Animated.View className="items-center  gap-2 self-center" entering={ZoomIn.duration(700)}>
          <CustomImage source={Profile} resizeMode="contain" style={{ width: 100, height: 100 }} />
        </Animated.View>

        <View className=" gap-5 ">
          <Text className=" android:text-3xl  text-center  font-semibold text-3xl text-black">
            Let's know more about you.
          </Text>
          <FormInput
            name="fullName"
            control={form.control}
            label="Full Name"
            placeholder="John Doe"
          />
          {/* <View className="flex-1 gap-2">
            <FormInput
              name="username"
              control={form.control}
              label="Username"
              placeholder="johndoe@43"
              isLoading={validateIdentfier.isPending}
              onChangeText={handleUsernameChange}
            />
            {validateIdentfier.data?.data && !form.formState.errors.username?.message && (
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
                  {validateIdentfier.data.data.exists
                    ? 'Username already used'
                    : 'Username is available'}
                </Text>
              </View>
            )}
          </View> */}
          <FormDatePicker name="dateOfBirth" control={form.control} label="Date of Birth" />
        </View>
        <View className="absolute bottom-0 left-0 right-0 mt-8 gap-2 px-4">
          <Button onPress={handleContinue} loading={updateProfile.isPending} label="Continue" />
        </View>
      </KeyboardAvoidingView>
      <ErrorSheet
        ref={sheetRef}
        errorMessage={
          updateProfile.error?.message || 'An error occurred while updating your profile.'
        }
      />
    </View>
  );
};

export default DetailsForm;
