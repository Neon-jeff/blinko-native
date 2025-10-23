import { View } from 'react-native';
import React from 'react';
import GoBack from '../navigation/go-back';
import { Text } from '../ui/text';

const FindFriendsHeader = () => {
  return (
    <View className="gap-6 flex-row justify-center mt-2 items-center ">
      <GoBack className='absolute -left-2'/>
      <View className='gap-1 items-center'>
        <Text className="text-2xl font-semibold">Discover</Text>
        {/* <Text className='text-gray-600'>Find new friends around you all over the world</Text> */}
      </View>
    </View>
  );
};

export default FindFriendsHeader;
