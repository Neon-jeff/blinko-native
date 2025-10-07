import { ApiResponse, http } from '~/api';
import {
  Comment,
  CreateCommentBody,
  CreatePostBody,
  CreatePostResponse,
  EditCommentBody,
  fetchParams,
  FetchPostResponse,
  ReplyCommentBody,
} from './types';

export class PostService {
  private routes = {
    comments: {
      create_comment: 'comments',
      reply_comment: 'comments',
      edit_comment(id: string) {
        return `comments/${id}`;
      },
      delete_comment(id: string) {
        return `comments/${id}`;
      },
      like_comment(id: string) {
        return `comments/${id}/like`;
      },
      unlike_comment(id: string) {
        return `comments/${id}/unlike`;
      },
    },
    posts: {
      create_post: 'posts',
      fetch_my_posts: 'posts',
      get_post(id: string) {
        return `posts/${id}`;
      },
      post_feed: 'posts/feed',
      get_trending: 'posts/trending',
      get_following_posts: 'posts/following',
      delete_post(id: string) {
        return `posts/${id}`;
      },
      update_post(id: string) {
        return `posts/${id}`;
      },
      like_post(id: string) {
        return `posts/${id}/like`;
      },
      unlike_post(id: string) {
        return `posts/${id}/unlike`;
      },
      bookmark_post(id: string) {
        return `posts/${id}/bookmark`;
      },
      unbookmark_post(id: string) {
        return `posts/${id}/unbookmark`;
      },
      get_bookmarked_posts: 'posts/bookmarks',
    },
  };

  async createPost(data: CreatePostBody) {
    try {
      return http
        .post<ApiResponse<CreatePostResponse>>(this.routes.posts.create_post, {
          json: data,
        })
        .json();
    } catch (error) {
      console.log('Error creating post:', error);
      throw error;
    }
  }
  async fetchMyPosts(params?: fetchParams) {
    try {
      return http
        .get<ApiResponse<FetchPostResponse>>(this.routes.posts.fetch_my_posts, {
          searchParams: { ...params },
        })
        .json();
    } catch (error) {
      console.log('Error fetching my posts:', error);
      throw error;
    }
  }

  async fetchPostFeed(params?: fetchParams) {
    try {
      return http
        .get<ApiResponse<FetchPostResponse>>(this.routes.posts.post_feed, {
          searchParams: { ...params },
        })
        .json();
    } catch (error) {
      console.log('Error fetching post feed:', error);
      throw error;
    }
  }

  async fetchPostById(id: string) {
    try {
      return http.get<ApiResponse<CreatePostResponse>>(this.routes.posts.get_post(id)).json();
    } catch (error) {
      console.log('Error fetching post :', error);
      throw error;
    }
  }

  async fetchTrendingPosts(params?: fetchParams) {
    try {
      return http.get<ApiResponse<FetchPostResponse>>(this.routes.posts.get_trending, {
        searchParams: { ...params },
      });
    } catch (error) {
      console.log('Error fetching trending posts:', error);
      throw error;
    }
  }

  async fetchFollowingPosts(params?: fetchParams) {
    try {
      return http.get<ApiResponse<FetchPostResponse>>(this.routes.posts.get_following_posts, {
        searchParams: { ...params },
      });
    } catch (error) {
      console.log('Error fetching following posts:', error);
      throw error;
    }
  }

  async deletePost(id: string) {
    try {
      return http.delete<ApiResponse<null>>(this.routes.posts.delete_post(id)).json();
    } catch (error) {
      console.log('Error deleting post:', error);
      throw error;
    }
  }

  async updatePost(id: string, data: CreatePostBody) {
    try {
      return http
        .put<ApiResponse<CreatePostResponse>>(this.routes.posts.update_post(id), {
          json: data,
        })
        .json();
    } catch (error) {
      console.log('Error updating post:', error);
      throw error;
    }
  }

  async likePost(id: string) {
    try {
      return http.put<ApiResponse<null>>(this.routes.posts.like_post(id)).json();
    } catch (error) {
      console.log('Error liking post:', error);
      throw error;
    }
  }

  async unlikePost(id: string) {
    try {
      return http.put<ApiResponse<null>>(this.routes.posts.unlike_post(id)).json();
    } catch (error) {
      console.log('Error unliking post:', error);
      throw error;
    }
  }

  async createComment(data: CreateCommentBody) {
    try {
      return http
        .post<ApiResponse<Comment>>(this.routes.comments.create_comment, {
          json: data,
        })
        .json();
    } catch (error) {
      console.log('Error creating comment:', error);
      throw error;
    }
  }

  async replyToComment(data: ReplyCommentBody) {
    try {
      return http
        .post<ApiResponse<Comment>>(this.routes.comments.reply_comment, {
          json: data,
        })
        .json();
    } catch (error) {
      console.log('Error replying to comment:', error);
      throw error;
    }
  }

  async editComment(data: EditCommentBody) {
    try {
      return http
        .put<ApiResponse<Comment>>(this.routes.comments.edit_comment(data.id), {
          json: data,
        })
        .json();
    } catch (error) {
      console.log('Error editing comment:', error);
      throw error;
    }
  }

  async deleteComment(id: string) {
    try {
      return http.delete<ApiResponse<null>>(this.routes.comments.delete_comment(id)).json();
    } catch (error) {
      console.log('Error deleting comment:', error);
      throw error;
    }
  }

  async likeComment(id: string) {
    try {
      return http.post<ApiResponse<null>>(this.routes.comments.like_comment(id)).json();
    } catch (error) {
      console.log('Error liking comment:', error);
      throw error;
    }
  }

  async unlikeComment(id: string) {
    try {
      return http.post<ApiResponse<null>>(this.routes.comments.unlike_comment(id)).json();
    } catch (error) {
      console.log('Error unliking comment:', error);
      throw error;
    }
  }
}
