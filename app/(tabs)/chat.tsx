import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Screen from '~/components/ui/screen';
import { Text } from '~/components/ui/text';
import { FlashList } from '@shopify/flash-list';
import { messages } from '~/mock';
import ChatCard from '~/components/cards/chat';
import { Input } from '~/components/ui/input';
import { Plus, SearchIcon } from 'lucide-react-native';
import { MessageAdd1 } from 'iconsax-react-native';
import { useFetchConversations } from '~/hooks/chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSuggestedUsers } from '~/hooks/follow';
import React from 'react';
import { BottomSheetModal, BottomSheetRef } from '~/components/ui/bottom-sheet';
import UserCard from '~/components/cards/user';
import { usePrefectchActions } from '~/hooks/actions';

const Chat = () => {
  const { data: conversations } = useFetchConversations();
  const { prefetchChatMessages } = usePrefectchActions();
  const { data: suggestedUsers } = useSuggestedUsers();
  const { top } = useSafeAreaInsets();
  const sheetRef = React.useRef<BottomSheetRef>(null);
  function handleOpenSuggestedUsers() {
    sheetRef.current?.open();
  }
  if (conversations) {
    for (const convo of conversations.data.docs) {
      prefetchChatMessages(convo._id, {
        limit: 100,
        page: 1,
      });
    }
  }
  return (
    <View className="flex-1 px-4" style={{ paddingTop: top + 10 }}>
      <View className=" flex-row items-end justify-between pb-5">
        <Text className="font-semibold text-3xl">Chats</Text>
        <Pressable className="rounded-full bg-gray-100 p-3" onPress={handleOpenSuggestedUsers}>
          <MessageAdd1 size={24} color="black" />
        </Pressable>
      </View>
      {/* search bar */}
      <View className="mb-5">
        <Input
          Icon={<SearchIcon color={'gray'} size={20} />}
          className="h-12 "
          placeholder="Search"
          containerClassName="rounded-full bg-gray-50"
        />
      </View>
      <FlashList
        data={conversations?.data.docs || []}
        renderItem={({ item }) => <ChatCard chat={item} />}
        keyExtractor={(item, index) => item._id + index}
        contentContainerStyle={{ paddingBottom: 100, flexGrow: 1 }}
        className=""
        showsVerticalScrollIndicator={false}
      />
      <BottomSheetModal.Root ref={sheetRef}>
        <BottomSheetModal.Content>
          <Text className="pb-4 font-semibold text-2xl">Start a chat with:</Text>
          <FlashList
            data={suggestedUsers?.data || []}
            renderItem={({ item }) => (
              <UserCard
                id={item._id}
                imageUrl={item?.displayPhoto?.url || ''}
                name={item?.fullName || ''}
                isChatSuggestion
                onPress={() => sheetRef.current?.close()}
              />
            )}
            keyExtractor={(item) => item._id}
          />
        </BottomSheetModal.Content>
      </BottomSheetModal.Root>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
