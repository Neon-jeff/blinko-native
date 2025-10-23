import { StyleSheet } from 'react-native';
import React from 'react';
import Screen from '~/components/ui/screen';
import FindFriendsHeader, { Users } from '~/components/find-friends';

const FindFriends = () => {
  return (
    <Screen className='gap-4'>
      <FindFriendsHeader />
      <Users />
    </Screen>
  );
};

export default FindFriends;

const styles = StyleSheet.create({});
