import { View } from 'react-native';
import { SvgFromXml } from 'react-native-svg';
import { Text } from '../ui/text';
import { cn } from '~/lib/utils';

interface LogoProps {
  variant?: 'icon' | 'text';
}

const Logo = ({ variant = 'icon' }: LogoProps) => {
  return (
    <View className={cn("items-center justify-center self-center rounded-full bg-blue-50 p-5", variant === 'text' && 'bg-transparent p-0')}>
      {variant === 'icon' && (
        <SvgFromXml
          height={30}
          width={30}
          xml={`<svg width="40" height="40" viewBox="0 0 68 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M56.0894 44.7796H34.1582V36.8906C38.1373 31.417 44.6576 29.0272 52.0781 29.0016C53.4488 28.9962 54.7873 29.119 56.0894 29.3458V44.7796ZM34 68.5141C21.8191 68.5141 11.9092 58.9577 11.9092 47.2126V11.4859H22.2476V56.2654H53.9892C50.454 63.4956 42.8248 68.5141 34 68.5141ZM52.3609 17.5157C45.6782 17.4792 39.4352 19.3128 34.1582 22.5019V0H0V47.2126C0 65.2913 15.2513 80 34 80C52.7473 80 68 65.2913 68 47.2126V21.338C63.3307 18.9293 58.0159 17.5468 52.3609 17.5157Z" fill="#1F78FF"/>
</svg>
`}
        />
      )}
      {variant === 'text' && (
        <Text className=" android:text-2xl ios:text-2xl font-semibold text-2xl text-blue-500">
          Blinko
        </Text>
      )}
    </View>
  );
};

export default Logo;
