import { ApiResponse, http } from '~/api';
import { Profile, User } from '~/types';

export class ProfileService {
  private routes = {
    getProfile: 'profile',
    updateProfile: 'profile',
    uploadPhoto: 'profile/upload-photo',
  };

  async getProfile() {
    try {
      const response = await http.get<ApiResponse<User>>(this.routes.getProfile);
      return await response.json();
    } catch (error) {
      console.error('Get profile failed:', error);
      throw error;
    }
  }

  async updateProfile(data: Partial<User>) {
    try {
      const response = await http.put<ApiResponse<User>>(this.routes.updateProfile, {
        json: data,
      });
      return await response.json();
    } catch (error) {
      console.error('Update profile failed:', error);
      throw error;
    }
  }

  async uploadPhoto(uri: string) {
    try {
      const formData = new FormData();
      formData.append('photo', {
        uri,
        name: 'profile.jpg',
        type: 'image/jpeg',
      } as any);
      const response = await http.put<ApiResponse<Profile>>(this.routes.uploadPhoto, {
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Upload photo failed:', error);
      throw error;
    }
  }
}
