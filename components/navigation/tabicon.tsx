import { IconProps } from 'iconsax-react-native';
import { FunctionComponent } from 'react';
import { SvgProps } from 'react-native-svg';

interface TabIconProps {
  focused: boolean;
  Icon: FunctionComponent<IconProps>;
  isCreatePost: boolean;
  isGroup: boolean;
}

const TabIcon = ({ focused, Icon, isCreatePost, isGroup }: TabIconProps) => {
  return (
    <>
      {Icon && (
        <Icon size={26} color={focused ? 'black': '#989898'} variant={(focused || isCreatePost)? 'Bold' : 'Outline'}  />
      )}
    </>
  );
};

export default TabIcon;
