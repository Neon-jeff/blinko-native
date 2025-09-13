import { View } from 'react-native'
import React from 'react'
import { cn } from '~/lib/utils'
import { ManProfile } from '~/assets/images'
import { Image } from 'expo-image'
import { Text } from '~/components/ui/text'

interface MessagePillProps {
  message: string
  sender_image: string
  is_user_message: boolean
}

const MessagePill = ({ message, sender_image, is_user_message }: MessagePillProps) => {
  return (
    <View className={cn('flex-row gap-4 mb-6 items-end',is_user_message && 'self-end')}>
     { !is_user_message &&<Image source={ManProfile} style={{
        height:40,
        width:40,
        borderRadius:1000
      }} />}
     <View className={cn('bg-gray-100 rounded-xl max-w-[70%] p-2',is_user_message && 'bg-blue-600 ' )}>
        <Text className={cn('text-black',is_user_message && 'text-white')}>{message}</Text>
     </View>
    </View>
  )
}

export default MessagePill