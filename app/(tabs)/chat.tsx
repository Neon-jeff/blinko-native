import { Pressable, StyleSheet, View } from 'react-native'
import Screen from '~/components/ui/screen'
import { Text } from '~/components/ui/text'
import { FlashList } from "@shopify/flash-list";
import { messages } from '~/mock';
import ChatCard from '~/components/cards/chat';
import { Input } from '~/components/ui/input';
import { Plus, SearchIcon } from 'lucide-react-native';
import { MessageAdd1 } from 'iconsax-react-native';


const Chat = () => {
  return (
    <Screen className=''>
     <View className='mt-5 pb-5 flex-row justify-between items-end'>
       <Text className='text-3xl font-semibold'>Chats</Text>
       <Pressable className='bg-gray-100 p-3 rounded-full'>
        <MessageAdd1 size={24} color="black" />
       </Pressable>
     </View>
      {/* search bar */}
      <View className='mb-5'>
        <Input Icon={<SearchIcon color={'gray'} size={20} />} placeholder="Search" containerClassName='rounded-2xl bg-gray-50' />
      </View>
      <FlashList
        data={messages}
        renderItem={({item}) => <ChatCard {...item} />}
        estimatedItemSize={20}
        keyExtractor={(item) => item.title}
      />
    </Screen>
  )
}

export default Chat

const styles = StyleSheet.create({})