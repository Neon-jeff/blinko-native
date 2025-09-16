import { Platform, Pressable, TouchableOpacity, View } from 'react-native';
import { LocationFormData, locationFormSchema } from '~/schemas/forms';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Text } from '../ui/text';
import Logo from '../icons/Logo';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { Image } from 'expo-image';
import { Location } from '~/assets/images';
import React from 'react';
import { countries, CountryListItemType } from 'country-list-json';
import { router } from 'expo-router';
import FormSelectModal from '../ui/form-select-modal';
import { cn } from '~/lib/utils';

const LocationForm = () => {
  const form = useForm<LocationFormData>({
    resolver: zodResolver(locationFormSchema),
    defaultValues: {
      country: '',
      state: '',
    },
  });
  function handleSubmit(data: LocationFormData) {
    router.push('/auth/interests');
  }
  function handleContinue() {
    form.handleSubmit(handleSubmit)();
  }

  function handleSelectCountry(country: CountryListItemType) {
    form.setValue('country', country.name);
  }
  return (
    <View className="flex-1 gap-6">
      <Logo variant="text" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="mt-10 flex-1">
        <View className="items-center  gap-2 self-center">
          <Image source={Location} style={{ width: 200, height: 200 }} />
          <Text className=" android:text-3xl px-10 text-center  font-semibold text-2xl text-black">
            Enter your location details
          </Text>
        </View>
        <View className="mt-10 gap-5 ">
          <FormSelectModal
            name="country"
            control={form.control}
            label="Select Country"
            data={countries}
            placeholder="Country/Region"
            RenderItem={({ item, selected = item.name === form.getValues('country') }) => (
              <TouchableOpacity
                onPress={() => handleSelectCountry(item)}
                className={cn('flex-row justify-between items-center pb-6')}>
                <View className="flex-row items-center gap-3">
                    <Text>{item.flag}</Text>
                    <Text className={cn('text-base',selected && 'text-lg font-semibold')}>{item.name}</Text>
                </View>
                {selected && <View className="h-3 w-3 rounded-full bg-black" />}
              </TouchableOpacity>
            )}
          />
        </View>
        <View className="absolute bottom-0 left-0 right-0 mt-8 gap-2 px-4">
          <Button onPress={handleContinue}>
            <Text className="native:text-base text-white ">Continue</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LocationForm;
