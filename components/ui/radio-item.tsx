import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Text } from './text';
import { cn } from '~/lib/utils';
import { IconProps } from 'iconsax-react-native';
import * as Haptics from 'expo-haptics';

interface RadioItemProps {
  label: string;
  value?: string;
  selected: boolean;
  onSelect: (value: string) => void;
  className?: string;
  Icon?: React.ComponentType<IconProps>;
}
const RadioItem = ({ label, value, selected, onSelect, className, Icon }: RadioItemProps) => {
  function handlePress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSelect(value || label);
  }
  return (
    <TouchableOpacity
      className={cn('flex flex-row items-center justify-between pb-6', className)}
      onPress={handlePress}>
      <View className='flex flex-row items-center gap-3'>
        {Icon && <Icon variant='Bold' size={15} color="black" />}
        <Text className="text-base text-gray-black font-medium">{label}</Text>
      </View>
      <View className="border border-gray-500 size-6 flex items-center justify-center rounded-full">
        {selected && <View className="size-4 rounded-full bg-black" />}
      </View>
    </TouchableOpacity>
  );
};

export default RadioItem;

const styles = StyleSheet.create({});
