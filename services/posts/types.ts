export interface CreateCommentBody {
  post: string;
  content: string;
  media?: Media[];
}

export interface EditCommentBody {
  id: string;
  content: string;
}

export interface ReplyCommentBody {
  post: string;
  content: string;
  parentComment: string;
  media?: Media[];
}

export type EditPostBody = Partial<CreateCommentBody>;

export interface CreatePostBody {
  description: string;
  postMedia?: Media[];
  visibility?: string;
  isPremium?: boolean;
}

export interface CreatePostResponse {
  description: string;
  visibility: string;
  isPremium: boolean;
  postMedia: PostMedia[];
  likes: Like[];
  createdBy: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface FetchPostResponse {
  docs: PostDoc[]
  page: number
  limit: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  nextPage: any
  previousPage: any
  totalDocs: number
  totalPages: number
}

export interface PostDoc {
  _id: string
  description: string
  visibility: string
  isPremium: boolean
  postMedia: PostMedia[]
  likes: Like[]
  createdBy: CreatedBy
  __v: number
  createdAt: string
  updatedAt: string
  topComments: Comment[]
  commentCount: number
}

export interface PostMedia {
  url: string
  cloudinary_id: string
  _id: string
}

export interface CreatedBy {
  _id: string
  fullName: string
  displayPhoto: Media | null
}

export interface CommentsResponse {
  docs: Comment[]
  page: number
  limit: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  nextPage: any
  previousPage: any
  totalDocs: number
  totalPages: number
}

export interface Comment {
  _id: string
  content: string
  createdBy: CreatedBy
  post: string
  parentComment: any
  media: any[]
  likes: any[]
  createdAt: string
  updatedAt: string
  __v: number
}


export interface Media {
  url: string;
  cloudinary_id: string;
  _id?: string | null
}

export interface fetchParams{
    page: number;
    limit: number;
}

export interface Like {
  _id: string
  displayPhoto: Media | null
  fullName: string
}

export interface PaginationParams {
  page: number
  limit: number
}

export interface ReplyResponse {
  docs: Reply[]
  page: number
  limit: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  nextPage: any
  previousPage: any
  totalDocs: number
  totalPages: number
}

export interface Reply {
  _id: string
  content: string
  createdBy: CreatedBy
  post: string
  parentComment: string
  media: any[]
  likes: any[]
  createdAt: string
  updatedAt: string
  __v: number
}