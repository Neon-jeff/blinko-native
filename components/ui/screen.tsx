import { ScrollView, View, ViewStyle } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView,SafeAreaViewProps } from 'react-native-safe-area-context'
import { cn } from '~/lib/utils';

interface ScreenProps extends SafeAreaViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  isSafeAreaDisabled?: boolean;
}

const Screen = ({children,style,...props}:ScreenProps) => {
  return (
    <SafeAreaView  {...props} className='flex-1' edges={props.isSafeAreaDisabled ? [] : ['top','left','right','bottom']}>
      <KeyboardAwareScrollView className='flex-1' showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View className={cn('bg-white flex-1 px-5', props.className)} style={{flex: 1,...style}}>
           {children}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default Screen
