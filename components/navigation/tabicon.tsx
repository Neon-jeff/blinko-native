import { FunctionComponent } from 'react';
import { SvgProps } from 'react-native-svg';

interface TabIconProps {
  focused: boolean;
  Icon: FunctionComponent<SvgProps>;
  isCreatePost: boolean;
}

const TabIcon = ({ focused, Icon, isCreatePost }: TabIconProps) => {
  return (
    <>
      {Icon && (
        <Icon height={22} width={22} stroke={isCreatePost? '#fff':focused ? '#2563eb' : '#6b7280'} strokeWidth={focused ? 2 : 1.4} />
      )}
    </>
  );
};

export default TabIcon;
