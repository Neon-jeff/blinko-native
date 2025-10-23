import { ActivityIndicator, View } from 'react-native';
import React from 'react';
import { Input } from '../ui/input';
import { SearchIcon } from 'lucide-react-native';
import { Text } from '../ui/text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSuggestedUsers } from '~/hooks/follow';
import { FlashList } from '@shopify/flash-list';
import UserCard from '../cards/user';

const Users = () => {
  const { data: users, isLoading, isError } = useSuggestedUsers();
  return (
    <View className="gap-5">
      <Input
        placeholder="Search users..."
        className="h-10 rounded-full"
        containerClassName="rounded-full"
        Icon={<SearchIcon size={16} />}
      />
      <KeyboardAwareScrollView>
        <Text className="text-lg font-semibold mt-4">Suggested Users</Text>
        {isLoading && <ActivityIndicator size="small" color="#000" />}
        {users && (
          <FlashList
            data={users.data || []}
            renderItem={({ item}) => (
              <UserCard
                id={item._id}
                imageUrl={item?.displayPhoto?.url || ''}
                name={item?.fullName || ''}
              />
            )}
            keyExtractor={(item) => item._id}
          />
        )}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Users;
