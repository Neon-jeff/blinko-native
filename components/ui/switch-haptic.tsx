import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as Haptics from 'expo-haptics';
import { Switch } from './switch';
import { cn } from '~/lib/utils';

interface SwitchHapticProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

const SwitchHaptic = ({ checked, onCheckedChange, className }: SwitchHapticProps) => {
    function handleToggle(value: boolean) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onCheckedChange(value);
    }
  return (
       <Switch
        checked={checked}
        onCheckedChange={handleToggle}
        id="airplane-mode"
        nativeID="airplane-mode"
        // className={cn(className)}
      />
  )
}

export default SwitchHaptic

const styles = StyleSheet.create({})