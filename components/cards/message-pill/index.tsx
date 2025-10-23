import { View, Image } from 'react-native';
import React from 'react';
import { cn } from '~/lib/utils';
import { Text } from '~/components/ui/text';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '~/components/ui/context-menu';
import { ArchiveBox, Clock, Copy, Edit } from 'iconsax-react-native';
import { useDeleteMessage } from '~/hooks/chat';
import * as Clipboard from 'expo-clipboard';
import { toast } from 'sonner-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

interface MessagePillProps {
  message: string;
  sender_name: string;
  is_user_message: boolean;
  id: string;
  is_delivered?: boolean;
}

const MessagePill = ({
  message,
  sender_name,
  is_user_message,
  id,
  is_delivered,
}: MessagePillProps) => {
  const deleteMessage = useDeleteMessage();
  function handleDeleteMessage() {
    deleteMessage.mutate(id);
  }
  async function handleCopyMessage() {
    await Clipboard.setStringAsync(message);
    toast.success('Message copied to clipboard');
  }
  const messageActions = [
    { label: 'Copy Message', action: handleCopyMessage, Icon: Copy, disabled: false },
    { label: 'Edit Message', action: () => {}, Icon: Edit, disabled: true },
    {
      label: 'Delete',
      action: handleDeleteMessage,
      Icon: ArchiveBox,
      disabled: deleteMessage.isPending,
    },
  ];
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Animated.View
          entering={is_user_message ? FadeInDown.duration(100) : FadeInUp.duration(100)}
          className={cn('mb-6  items-start gap-2', is_user_message && 'self-end')}>
          {/* {!is_user_message && (
            <Image
              source={{ uri: sender_image }}
              style={{
                height: 40,
                width: 40,
                borderRadius: 1000,
              }}
            />
          )} */}
          {/* {!is_user_message && (
            <Text className="font-semibold text-sm">{!is_user_message && sender_name}</Text>
          )} */}
          <View
            className={cn(
              'max-w-[70%] rounded-2xl rounded-bl-none bg-gray-100 p-4 px-5',
              is_user_message && 'rounded-bl-2xl rounded-br-none bg-blue-600'
            )}>
            <Text className={cn('text-black', is_user_message && 'text-white')}>{message}</Text>
            {is_user_message && !is_delivered && (
              <View className="mt-2 self-end absolute bottom-1.5 right-1 flex-row items-center gap-1">
                <Clock size={12} color="white" />
              </View>
            )}
          </View>
        </Animated.View>
      </ContextMenuTrigger>
      <ContextMenuContent className="rounded-xl border-gray-100 bg-white p-2 ">
        {messageActions.map(({ label, action, Icon, disabled }, index) => (
          <ContextMenuItem
            key={index}
            className="flex-row items-center gap-4 rounded-lg px-2 pt-4 "
            onPress={action}
            disabled={disabled}>
            <Icon size={18} color="black" variant="Linear" />
            <Text className="text-base text-black">{label}</Text>
          </ContextMenuItem>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default React.memo(MessagePill);
