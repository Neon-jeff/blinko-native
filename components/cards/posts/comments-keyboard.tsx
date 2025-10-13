import {
  Pressable,
  View,
  ActivityIndicator,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { Input } from '~/components/ui/input';
import { ArrowUp, Send2 } from 'iconsax-react-native';
import {
  KeyboardAvoidingView,
  KeyboardExtender,
  OverKeyboardView,
  useKeyboardController,
  useKeyboardState,
} from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '~/components/ui/text';
import React, { useEffect } from 'react';
import { useAddComment, useReplyComment } from '~/hooks/posts';
import { Comment } from '~/services/posts/types';
import * as Haptics from 'expo-haptics';
import Animated from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import { sizes } from '~/constants/sizes';

interface CommentsKeyboardProps {
  onAddComment?: () => void;
  postId: string;
  commentMode?: 'comment' | 'reply';
  resetMode?: () => void;
  replyTo?: Comment | null;
}
const CommentsKeyboard = ({
  onAddComment,
  postId,
  commentMode,
  resetMode,
  replyTo,
}: CommentsKeyboardProps) => {
  const { bottom } = useSafeAreaInsets();
  const emojiList = ['😀', '😂', '😍', '😎', '😭', '👍', '🙏', '🔥', '💯', '🎉'];
  const inputRef = React.useRef<TextInput | null>(null);
  const [comment, setComment] = React.useState('');
  const addCommentMutation = useAddComment();
  const addReplyMutation = useReplyComment();
  const [placeholder, setPlaceholder] = React.useState('Enter a comment');
  const {} = useKeyboardState();

  useEffect(() => {
    if (commentMode === 'reply' && inputRef.current) {
      setPlaceholder(`Reply to ${replyTo?.createdBy?.fullName || 'user'} comment`);
      console.log('Focusing input for reply');
      inputRef.current.focus();
    }
  }, [commentMode]);

  function handleAddEmoji(emoji: string) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const currentText = comment;
    const newText = currentText + emoji;
    setComment(newText);
    // requestAnimationFrame(() => {
    //   setTimeout(() => inputRef.current?.focus(), 0);
    // });
  }

  function handleAddComment() {
    // console.log({ commentMode, replyTo });
    // return;
    if (comment.trim().length === 0) return;
    if (commentMode === 'reply' && replyTo) {
      addReplyMutation.mutate(
        { content: comment, post: postId, parentComment: replyTo._id },
        {
          onSuccess(data) {
            console.log("Added a reply", data);
            onAddComment?.();
            setComment('');
            setPlaceholder('Enter a comment');
            setTimeout(() => {
              resetMode?.();
            }, 500);
          },
        }
      );
      return;
    }
    if (commentMode === 'comment') {
      addCommentMutation.mutate(
        { content: comment, post: postId },
        {
          onSuccess(data) {
            console.log("Added a comment", data);
            onAddComment?.();
            setComment('');
          },
        }
      );
      return;
    }
  }
  function handleBlur() {
    if (commentMode === 'reply' && comment.trim().length === 0) {
      console.log('Resetting mode on blur');
      resetMode?.();
      setPlaceholder('Enter a comment');
    }
  }
  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="absolute bottom-0 left-0 right-0  gap-2  border-gray-200 bg-white pt-2"
      // keyboardVerticalOffset={0}
    >
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        keyboardDismissMode="none"
        horizontal
        showsHorizontalScrollIndicator={false}>
        <Animated.View className="flex-row gap-2  px-4" pointerEvents="box-none">
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
        </Animated.View>
      </ScrollView>

      <View className="flex-1 flex-row items-center justify-between gap-5" style={{}}>
        <TextInput
          value={comment}
          onChangeText={setComment}
          multiline
          returnKeyType="send"
          returnKeyLabel="Send Message"
          placeholder={placeholder}
          className="flex-grow rounded-3xl bg-gray-100 p-4 font-medium placeholder:text-gray-400 "
          // containerClassName=" flex-1 bg-gray-100 flex-col flex-grow h-50 rounded-full  w-full border-white"
          ref={inputRef}
          style={{
            flexGrow: 1,
            maxHeight: sizes.screen.height * 0.15,
            flexShrink: 1,
          }}
          onSubmitEditing={handleAddComment}
          onBlur={() => {
            handleBlur?.();
          }}
        />
        <Pressable
          className="absolute right-2 h-10 w-10  items-center justify-center  rounded-full bg-blue-500"
          onPress={handleAddComment}
          disabled={
            comment.trim().length === 0 ||
            addCommentMutation.isPending ||
            addReplyMutation.isPending
          }>
          {addCommentMutation.isPending || addReplyMutation.isPending ? (
            <ActivityIndicator color="white" size={10} />
          ) : (
            <ArrowUp size={20} color="white" />
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CommentsKeyboard;
