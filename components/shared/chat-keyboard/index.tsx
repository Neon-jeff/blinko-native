import { Pressable, View } from 'react-native';
import React from 'react';
import { Text } from '~/components/ui/text';
import { Input } from '~/components/ui/input';
import {  Send2 } from 'iconsax-react-native';
import { BlinkoCurrency } from '~/components/icons';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Smile, SmilePlusIcon } from 'lucide-react-native';

const ChatKeyboard = () => {
  const { bottom } = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="absolute bottom-0  left-0   right-0 flex-row items-center gap-2 border-t border-gray-200 bg-white pt-5 px-5">
      <View className='flex-row items-center gap-5 justify-between flex-1' style={{ paddingBottom:bottom }}>
        <Input returnKeyType='send' returnKeyLabel='Send Message' placeholder="Type a message..." containerClassName=" flex-1 mb-5" />
        <View className=" mb-5 flex-row items-center gap-3">
          <Pressable className="">
            <Send2 size={25} color="black" />
          </Pressable>
          <Pressable className="h-8 w-8 items-center justify-center rounded-full bg-blue-100">
            <BlinkoCurrency />
          </Pressable>
          <SmilePlusIcon color='black' size={20}/>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatKeyboard;
