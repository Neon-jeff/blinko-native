import { useMutation, useQuery } from "@tanstack/react-query";
import { PostService } from "~/services/posts";
import { CreateCommentBody, CreatePostBody, EditCommentBody, PaginationParams, ReplyCommentBody } from "~/services/posts/types";

const postService = new PostService();

export function useCreatePost(){
    return useMutation({
        mutationFn:(data:CreatePostBody)=> postService.createPost(data)
    })
}

export function useFetchPostsFeed(){
    return useQuery({
        queryKey:['posts-feed'],
        queryFn:()=> postService.fetchPostFeed()
    })
}

export function useFetchMyPosts(){
    return useQuery({
        queryKey:['my-posts'],
        queryFn:()=> postService.fetchMyPosts(),
        refetchOnMount:true
    })
}

export function useFetchFollowingPosts(){
    return useQuery({
        queryKey:['following-posts'],
        queryFn:()=> postService.fetchFollowingPosts()
    })
}

export function useFetchTrendingPosts(){
    return useQuery({
        queryKey:['trending-posts'],
        queryFn:()=> postService.fetchTrendingPosts()
    })
}

export function useFetchPostById(id:string){
    return useQuery({
        queryKey:['post',id],
        queryFn:()=> postService.fetchPostById(id)
    })
}

export function useDeletePost(){
    return useMutation({
        mutationFn:(id:string)=> postService.deletePost(id)
    })
}

export function useLikePost(){
    return useMutation({
        mutationFn:(id:string)=> postService.likePost(id)
    })
}

export function useUnlikePost(){
    return useMutation({
        mutationFn:(id:string)=> postService.unlikePost(id)
    })
}

export function useAddComment(){
    return useMutation({
        mutationFn:(data:CreateCommentBody)=> postService.createComment(data)
    })
}

export function useEditComment(){
    return useMutation({
        mutationFn:(data:EditCommentBody)=> postService.editComment(data)
    })
}

export function useDeleteComment(){
    return useMutation({
        mutationFn:(id:string)=> postService.deleteComment(id)
    })
}

export function useReplyComment(){
    return useMutation({
        mutationFn:(data:ReplyCommentBody)=> postService.replyToComment(data)
    })
}

export function useGetPostComments(params:{ postId:string} & PaginationParams){
    
    return useQuery({
        queryKey:['post-comments',params.postId],
        queryFn:()=> postService.getPostComments(params),
        enabled:!!params.postId
    })
}


export function useGetCommentReplies(params:{ commentId:string} & PaginationParams){
    return useQuery({
        queryKey:['comment-replies',params.commentId],
        queryFn:()=> postService.getCommentReplies(params),
        enabled:!!params.commentId
    })
}

export function useLikeComment(){
    return useMutation({
        mutationFn:(id:string)=> postService.likeComment(id)
    })
}

export function useUnlikeComment(){
    return useMutation({
        mutationFn:(id:string)=> postService.unlikeComment(id)
    })
}