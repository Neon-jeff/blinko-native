import { FunctionComponent } from 'react';
import { SvgProps } from 'react-native-svg';

interface TabIconProps {
  focused: boolean;
  Icon: FunctionComponent<SvgProps>;
  isCreatePost: boolean;
  isGroup: boolean;
}

const TabIcon = ({ focused, Icon, isCreatePost, isGroup }: TabIconProps) => {
  return (
    <>
      {Icon && (
        <Icon height={26} width={26} stroke={isCreatePost? '#fff':focused ? isGroup ? '#2563eb' : '#fff' : '#989898'} strokeWidth={focused ? 2 : 1.4} fill={focused ? '#2563eb' : 'none'} />
      )}
    </>
  );
};

export default TabIcon;
