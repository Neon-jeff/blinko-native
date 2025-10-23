import { DisplayPhoto } from "~/types";

export interface ConversationResponse {
  docs: Conversation[];
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: any;
  previousPage: any;
  totalDocs: number;
  totalPages: number;
}

export interface Conversation {
  _id: string;
  isGroup: boolean;
  participants: Participant[];
  tags: any[];
  deletedFor: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  lastMessage: LastMessage;
  id: string;
}

export interface Participant {
  _id: string;
  fullName: string;
  username: string;
  displayPhoto:DisplayPhoto;
}

export interface LastMessage {
  _id: string;
  chat: string;
  sender: string;
  text: string;
  media: any[];
  readBy: any[];
  deletedFor: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ChatMessagesResponse {
  docs: ChatMessage[];
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: any;
  previousPage: any;
  totalDocs: number;
  totalPages: number;
}

export interface ChatMessage {
  _id: string;
  chat: string;
  sender: Sender;
  text: string;
  media: any[];
  readBy: any[];
  deletedFor: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Sender {
  _id: string;
  fullName: string;
}

export interface SendChatMessagePayload {
  receiverProfileId: string;
  text: string;
  media?: ChatMedia[];
}

export interface ChatMedia {
  url: string;
  cloudinary_id: string;
  mediaType: string;
}
