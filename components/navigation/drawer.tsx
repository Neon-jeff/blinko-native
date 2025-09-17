import { View, Text } from 'react-native';
import React from 'react';
import { Drawer } from 'react-native-drawer-layout';
import { useAppStore } from '~/store';

const AppDrawer = ({children}:{children:React.ReactNode}) => {
  const { isDrawerOpen, setIsDrawerOpen } = useAppStore();
  return (
    <Drawer
    style={{ flex: 1 }}
      open
      onClose={() => setIsDrawerOpen(false)}
      onOpen={() => setIsDrawerOpen(true)}
      // drawerType='back'
      renderDrawerContent={() => (
        <View>
          <Text>Drawer Content</Text>
        </View>
      )}>
      <View className='flex-1 bg-red-100'>
        <Text>Hello</Text>
        {children}
      </View>
    </Drawer>
  );
};

export default AppDrawer;
