import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { ChevronLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { cn } from '~/lib/utils';

const GoBack = ({ className }: { className?: string }) => {
  function handleBackPress() {
    router.back();
  }
  return (
    <Pressable className={cn('rounded-full self-start', className)} onPress={handleBackPress}>
      <ChevronLeft size={24} color="#000" />
    </Pressable>
  );
};

export default GoBack;
