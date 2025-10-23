import { ApiResponse, http } from '~/api';
import { SuggestedUser } from './types';

class FollowService {
  private routes = {
    suggestedUsers: 'profile/suggestions',
    removeFollower: 'profile/remove-follower',
    follow: 'profile/follow',
    unfollow: 'profile/unfollow',
  };

  async getSuggestedUsers() {
    try {
      return await http.get<ApiResponse<SuggestedUser[]>>(this.routes.suggestedUsers).json();
    } catch (error) {
      console.error('Error fetching suggested users:', error);
      throw error;
    }
  }

  async followUser(userId: string) {
    try {
      return await http.post<ApiResponse<null>>(this.routes.follow, { json: { userId } }).json();
    } catch (error) {
      console.error('Error following user:', error);
      throw error;
    }
  }

  async unfollowUser(userId: string) {
    try {
      return await http.post<ApiResponse<null>>(this.routes.unfollow, { json: { userId } }).json();
    } catch (error) {
      console.error('Error unfollowing user:', error);
      throw error;
    }
  }

  async removeFollower(userId: string) {
    try {
      return await http
        .post<ApiResponse<null>>(this.routes.removeFollower, { json: { userId } })
        .json();
    } catch (error) {
      console.error('Error removing follower:', error);
      throw error;
    }
  }
}

export const followServiceInstance = () => new FollowService();