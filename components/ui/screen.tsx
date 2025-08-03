import { ScrollView, View, ViewStyle } from 'react-native'
import { SafeAreaView,SafeAreaViewProps } from 'react-native-safe-area-context'
import { cn } from '~/lib/utils';

interface ScreenProps extends SafeAreaViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Screen = ({children,style,...props}:ScreenProps) => {
  return (
    <SafeAreaView  {...props} className='flex-1'>
      <ScrollView className='flex-1' showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View className={cn('bg-white flex-1 px-5', props.className)} style={{flex: 1,...style}}>
           {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Screen
