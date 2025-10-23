import React from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { Send, Send2 } from 'iconsax-react-native';
import { BlinkoCurrency } from '~/components/icons';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Text } from '~/components/ui/text';
import { sizes } from '~/constants/sizes';
import { useSendMessage } from '~/hooks/chat';
import { ChatMessage } from '~/services/chat/types';
import { useAuthStore } from '~/store/auth';

interface ChatKeyboardProps {
  receiverId: string;
  onMessageSent: (newMessage: Partial<ChatMessage>) => void;
  onMessageDelivered?: () => void;
}
const ChatKeyboard = ({ receiverId, onMessageSent, onMessageDelivered }: ChatKeyboardProps) => {
  const { bottom } = useSafeAreaInsets();
  const { user } = useAuthStore();
  const emojiList = ['😀', '😂', '😍', '😎', '😭', '👍', '🙏', '🔥', '💯', '🎉'];
  const [message, setMessage] = React.useState('');
  // const socket = useSocket()
  function handleAddEmoji(emoji: string) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const currentText = message;
    const newText = currentText + emoji;
    setMessage(newText);
  }
  const sendMessage = useSendMessage();
  function handleSendMessage() {
    if (message.trim().length === 0) return;
    setMessage('');
    onMessageSent({
      text: message,
      sender: { _id: user?.profile?._id || '', fullName: user?.profile?.fullName || '' },
      _id: '',
      createdAt: new Date().toISOString(),
    });
    sendMessage.mutate(
      { text: message.trim(), receiverProfileId: receiverId, media: [] },
      {
        onSuccess: (data) => {
          console.log('Message sent successfully:', data);
          onMessageDelivered?.();
        },
        onError: (error) => {
          console.error('Error sending message:', error);
        },
      }
    );
  }
  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="absolute bottom-0 left-0 right-0 items-center  gap-2 border-t border-gray-100 bg-white px-2  pt-2"
      style={{ paddingBottom: bottom + 40 }}>
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        keyboardDismissMode="none"
        horizontal
        showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-2 " pointerEvents="box-none">
          {emojiList.map((emoji) => (
            <Pressable
              key={emoji}
              className="p-2"
              onPress={(e) => {
                handleAddEmoji(emoji);
              }}>
              <Text className="text-xl">{emoji}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <View
        className="mb-4 flex-1  flex-row items-center justify-between gap-2 rounded-full px-2"
        style={{ paddingBottom: bottom - 20 }}>
        <TextInput
          multiline
          returnKeyType="send"
          className=" w-5/6 rounded-3xl bg-gray-100 px-4 py-3 font-medium "
          returnKeyLabel="Send Message"
          placeholder="Send a message..."
          value={message}
          style={{
            flexGrow: 1,
            maxHeight: sizes.screen.height * 0.15,
            flexShrink: 1,
          }}
          onChangeText={setMessage}
        />
        <View className="  flex-row items-center gap-3">
          <Pressable className="rounded-full bg-blue-500 p-2" onPress={handleSendMessage}>
            <Send size={20} color="#fff" variant="Bold" />
          </Pressable>
          <Pressable className="size-10 items-center justify-center rounded-full bg-blue-100">
            <BlinkoCurrency />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatKeyboard;
