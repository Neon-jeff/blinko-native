import { Following } from "~/services/follow/types"

export interface User {
  _id: string
  fullName: string
  email: string
  role: string
  status: string
  isEmailVerified: boolean
  createdAt: string
  updatedAt: string
  __v: number
  profile: Profile | null
  tokens: Tokens | null
}

export interface Profile {
  followers: Following[]
  following: Following[]
  _id: string
  fullName: string
  email: string
  username: string
  dateOfBirth: string
  country: string
  state: string
  address: string
  createdBy: string
  notificationTokens: any[]
  role: string
  interests: string[]
  createdAt: string
  updatedAt: string
  __v: number
  displayPhoto: DisplayPhoto
}

export interface DisplayPhoto {
  url: string
  cloudinary_id: string
}

export interface Tokens {
  accessToken: string
  refreshToken: string
}