export interface SuggestedUser {
  _id: string
  fullName: string
  email: string
  username: string
  dateOfBirth: string
  country: string
  state: string
  address: string
  notificationTokens: any[]
  role: string
  displayPhoto: DisplayPhoto
  interests: string[]
  followers: Follower[]
  following: Following[]
  createdAt: string
  updatedAt: string
  __v: number
  mutualConnections: number
  commonInterests: string[]
  matchReasons: string[]
}

export interface DisplayPhoto {
  url: string
  cloudinary_id: string
}

export interface Follower {
  _id: string
}

export interface Following {
  _id: string
}
