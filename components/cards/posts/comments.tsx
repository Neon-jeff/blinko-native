import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { BottomSheetModal, BottomSheetRef } from '~/components/ui/bottom-sheet';
import { Text } from '~/components/ui/text';
import { Comment } from '~/services/posts/types';
import { sizes } from '~/constants/sizes';
import CommentsKeyboard from './comments-keyboard';
import { ProfileImage } from '~/components/shared';
import { FlashList, FlashListRef } from '@shopify/flash-list';
import { useDeleteComment, useGetCommentReplies, useGetPostComments } from '~/hooks/posts';
import { Heart } from 'iconsax-react-native';
import { ThumbsUp } from 'lucide-react-native';
import { formDate } from '~/utils/date';
import { ContextMenu, ContextMenuContent, ContextMenuItem } from '~/components/ui/context-menu';
import * as Haptics from 'expo-haptics';
import { Popover, PopoverContent } from '~/components/ui/popover';
import { useAuthStore } from '~/store/auth';
import { toast } from 'sonner-native';

interface CommentsProps {
  ref: React.RefObject<BottomSheetRef | null>;
  postId: string;
}

const Comments = ({ ref, postId }: CommentsProps) => {
  const {
    data: commentsData,
    isLoading,
    refetch,
  } = useGetPostComments({
    postId,
    page: 1,
    limit: 20,
  });
  const [commentMode, setCommentMode] = React.useState<'comment' | 'reply'>('comment');
  const [replyTo, setReplyTo] = React.useState<Comment | null>(null);
  const listRef = React.useRef<FlashListRef<Comment | null>>(null);
  function addComment() {
    refetch();
  }
  function resetMode() {
    setCommentMode('comment');
    setReplyTo(null);
  }
  async function handleCommentPress(comment: Comment, index: number) {
    setCommentMode('reply');
    setReplyTo(comment);
    await listRef?.current?.scrollToIndex({ index, animated: true, viewPosition: 0 }); // scroll to top
  }
  return (
    <BottomSheetModal.Root className="gap-0" ref={ref} height={sizes.screen.height * 0.75}>
      <Text className="px-4 pt-5 font-semibold text-lg">
        {commentsData?.data.docs?.length || 0} Comments
      </Text>
      <BottomSheetModal.Content scrollEnabled={false}>
        <FlashList
          data={commentsData?.data?.docs || []}
          renderItem={({ item, index }) => (
            <CommentItem comment={item} onPress={() => handleCommentPress(item, index)} />
          )}
          keyExtractor={(item) => item._id}
          scrollToOverflowEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          extraData={{}}
          keyboardShouldPersistTaps="handled"
          className="pt-4"
        />
        {/* {
            comments.map((comment) => <CommentItem key={comment._id} comment={comment} />)
          } */}
        <CommentsKeyboard
          postId={postId}
          onAddComment={addComment}
          commentMode={commentMode}
          resetMode={resetMode}
          replyTo={replyTo}
        />
      </BottomSheetModal.Content>
    </BottomSheetModal.Root>
  );
};

function CommentItem({ comment, onPress }: { comment: Comment; onPress: () => void }) {
  const { content, _id } = comment;
  const { user } = useAuthStore();
  const {refetch:refetchComments} = useGetPostComments({postId:comment.post,page:1,limit:20})
  const { data: repliesData, refetch: refetchReplies } = useGetCommentReplies({
    commentId: _id,
    page: 1,
    limit: 5,
  });
  const [showReplies, setShowReplies] = React.useState(false);
  const [showContextMenu, setShowContextMenu] = React.useState(false);
  const sheetRef = React.useRef<BottomSheetRef | null>(null);
  const deleteCommentMutation = useDeleteComment()

  function handleDeleteComment() {
    deleteCommentMutation.mutate(comment._id, {
      onSuccess() {
        toast.success('Comment deleted');
        refetchComments();
      }
    });
  }

  function handleLongPress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    sheetRef.current?.open();
  }
  function handleReply() {
    onPress?.();
  }
  function handleToggleReplies() {
    if (!showReplies) {
      refetchReplies();
    }
    setShowReplies(!showReplies);
  }
  return (
    <View className="pt-6">
      <Pressable
        onPress={handleReply}
        className="flex-row  justify-between  pb-2"
        onLongPress={handleLongPress}>
        <View className="flex-row items-start gap-2">
          <ProfileImage
            iconSize={20}
            className=""
            source={comment?.createdBy?.displayPhoto?.url || ''}
          />
          <View className="gap-1">
            <Text className="font-semibold text-base">{comment.createdBy.fullName}</Text>
            <Text className="text-sm text-gray-600">{content}</Text>
            <View className="flex-row items-center gap-5">
              <Pressable onPress={handleToggleReplies} className="flex-row items-center gap-5 pt-2">
                <Text className="text-sm text-gray-500">{formDate(comment.createdAt)}</Text>
                <Text className="font-semibold text-sm text-gray-700">
                  {repliesData?.data?.docs?.length || 0}{' '}
                  {repliesData?.data?.docs?.length === 1 ? 'Reply' : 'Replies'}
                </Text>
              </Pressable>
              {user?._id === comment.createdBy._id && (
                <Pressable
                  disabled={deleteCommentMutation.isPending}
                  onPress={handleDeleteComment}
                  className="flex-row items-center gap-5 pt-2 disabled:opacity-45">
                  <Text className="font-semibold text-sm text-gray-700">Delete</Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
        <Pressable className="items-center gap-2 pr-4">
          <Heart size={20} color="#6b7280" />
          <Text className="text-gray-500">{comment.likes?.length || 0}</Text>
        </Pressable>
      </Pressable>
      {/* comment replies */}
      {(repliesData?.data?.docs || [])?.length > 0 && showReplies && (
        <FlashList
          data={repliesData?.data?.docs || []}
          renderItem={({ item }) => (
            <Pressable onPress={handleReply} className="mt-4  flex-row  justify-between ">
              <View className="flex-row items-start gap-2">
                <ProfileImage
                  iconSize={20}
                  className="size-8"
                  source={item?.createdBy?.displayPhoto?.url || ''}
                />
                <View className="gap-1">
                  <Text className="font-semibold text-sm">{item.createdBy.fullName}</Text>
                  <Text className="text-sm text-gray-600">{item.content}</Text>
                  <View className="flex-row items-center gap-5 pt-2">
                    <Text className="text-sm text-gray-500">{formDate(item.createdAt)}</Text>
                    {/* <Text className="font-semibold text-sm text-gray-700">
                    {repliesData?.data?.docs?.length || 0}{' '}
                    {repliesData?.data?.docs?.length === 1 ? 'Reply' : 'Replies'}
                  </Text> */}
                  </View>
                </View>
              </View>
              <Pressable className="items-center gap-2 pr-4">
                <Heart size={20} color="#6b7280" />
                <Text className="text-gray-500">{item.likes?.length || 0}</Text>
              </Pressable>
            </Pressable>
          )}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 0, paddingLeft: 20 }}
          extraData={{}}
          className="ml-4 border-l border-gray-200/60"
        />
      )}
    </View>
  );
}

export default Comments;

const styles = StyleSheet.create({});
