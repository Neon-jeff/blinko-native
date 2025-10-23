import { Platform, TouchableOpacity, View } from 'react-native';
import { LocationFormData, locationFormSchema } from '~/schemas/forms';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Text } from '../ui/text';
import Logo from '../icons/Logo';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { Location } from '~/assets/images';
import { router } from 'expo-router';
import FormSelectModal from '../ui/form-select-modal';
import { cn } from '~/lib/utils';
import { useGetCountries, useGetStates, useUpdateProfile } from '~/hooks/auth';
import { Country, State } from '~/services/auth/types';
import React from 'react';
import { BottomSheetRef } from '../ui/bottom-sheet';
import { useAuthStore } from '~/store/auth';
import { toast } from 'sonner-native';
import ErrorSheet from '../ui/error-sheet';
import CustomImage from '../ui/image';

const LocationForm = () => {
  const form = useForm<LocationFormData>({
    resolver: zodResolver(locationFormSchema),
    defaultValues: {
      country: '',
      state: '',
    },
  });
  const updateProfile = useUpdateProfile();
  const sheetRef = React.useRef<BottomSheetRef>(null);
  const stateRef = React.useRef<BottomSheetRef>(null);
  const countryRef = React.useRef<BottomSheetRef>(null);
  const { updateProfile: updateStoreProfile } = useAuthStore();
  const [countryParams, setCountryParams] = React.useState('');
  const { data: countriesData } = useGetCountries(countryParams);
  const { data: states } = useGetStates(
    form.watch('country')
      ? countriesData?.data.find((c) => c.name === form.watch('country'))?.code || ''
      : ''
  );
  function handleSubmit(data: LocationFormData) {
    updateProfile.mutate(
      {
        country: data.country,
        state: data.state,
      },
      {
        onSuccess(data) {
          updateStoreProfile({ profile: data.data });
          toast.success('Profile updated successfully');
          router.push('/auth/interests');
        },
        onError() {
          sheetRef.current?.open();
        },
      }
    );
  }
  function handleContinue() {
    form.handleSubmit(handleSubmit)();
  }

  function handleSelectCountry(country: Country) {
    form.setValue('country', country.name);
    countryRef.current?.close();
    stateRef.current?.open();
    setCountryParams('')
  }
  function handleSelectState(state: State) {
    form.setValue('state', state.name);
    stateRef.current?.close();
  }

  return (
    <View className="flex-1 gap-6">
      <Logo variant="text" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="mt-10 flex-1">
        <View className="items-center  gap-2 self-center ">
          <CustomImage source={Location} style={{ width: 200, height: 200 }} resizeMode='cover' />
          <Text className=" android:text-3xl px-10 text-center  font-semibold text-2xl text-black">
            Enter your location details
          </Text>
        </View>
        <View className="mt-10 gap-5 ">
          <FormSelectModal
            name="country"
            control={form.control}
            label="Enter your country"
            data={countriesData?.data || []}
            placeholder="Select Country"
            searchPlaceholder="Search country"
            showSearch
            onSearchChange={setCountryParams}
            sheetRef={countryRef}
            RenderItem={({ item, selected = item.name === form.getValues('country') }) => (
              <TouchableOpacity
                onPress={() => handleSelectCountry(item)}
                className={cn('flex-row items-center justify-between pb-6')}>
                <View className="flex-row items-center gap-3">
                  <CustomImage
                    source={{ uri: item.flag }}
                    style={{ width: 24, height: 24, borderRadius: 100 }}
                    resizeMode="cover"
                  />
                  <Text className={cn('text-base', selected && 'font-semibold text-lg')}>
                    {item.name}
                  </Text>
                </View>
                {selected && <View className="h-3 w-3 rounded-full bg-black" />}
              </TouchableOpacity>
            )}
          />
          <FormSelectModal
            name="state"
            control={form.control}
            label="Enter your state"
            disabled={!form.watch('country')}
            data={states?.data || []}
            sheetRef={stateRef}
            placeholder={
              states?.data && states?.data.length > 0 ? states.data[0].name : 'Select State'
            }
            RenderItem={({ item, selected = item.name === form.watch('state') }) => (
              <TouchableOpacity
                onPress={() => handleSelectState(item)}
                className={cn('flex-row items-center justify-between pb-6')}>
                <View className="flex-row items-center gap-3">
                  <Text className={cn('text-base', selected && 'font-semibold text-lg')}>
                    {item.name}
                  </Text>
                </View>
                {selected && <View className="h-3 w-3 rounded-full bg-black" />}
              </TouchableOpacity>
            )}
          />
        </View>
        <View className="absolute bottom-0 left-0 right-0 mt-8 gap-2 px-4">
          <Button onPress={handleContinue} label='Continue' disabled={updateProfile.isPending} loading={updateProfile.isPending} />
        </View>
      </KeyboardAvoidingView>
      <ErrorSheet ref={sheetRef} errorMessage={updateProfile.error?.response.message || 'Failed to update profile'} />
    </View>
  );
};

export default LocationForm;
