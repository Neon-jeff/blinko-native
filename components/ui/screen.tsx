import { ScrollView, ViewStyle } from 'react-native'
import { SafeAreaView,SafeAreaViewProps } from 'react-native-safe-area-context'
import { cn } from '~/lib/utils';

interface ScreenProps extends SafeAreaViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Screen = ({children,style,...props}:ScreenProps) => {
  return (
    <SafeAreaView style={{flex: 1,...style}} {...props} className={cn('bg-white flex-1 px-5', props.className)}>
      <ScrollView className='flex-1' contentContainerClassName='justify-center' contentContainerStyle={{ flexGrow: 1 }}>
        {children}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Screen
