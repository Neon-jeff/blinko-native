import { View, Text } from 'react-native';
import React from 'react';
import { Drawer } from 'react-native-drawer-layout';
import { useAppStore } from '~/store';

const AppDrawer = ({children}:{children:React.ReactNode}) => {
  const { isDrawerOpen, setIsDrawerOpen } = useAppStore();
  return (
    <Drawer
    style={{ flex: 1 }}
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
      onOpen={() => setIsDrawerOpen(true)}
      drawerType='back'
      renderDrawerContent={() => (
        <View>
          <Text>Drawer Content</Text>
        </View>
      )}>
      {children}
    </Drawer>
  );
};

export default AppDrawer;
