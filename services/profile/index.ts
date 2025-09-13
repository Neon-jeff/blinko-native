import { ApiResponse, http } from '~/api';
import { User } from '~/types';

export class ProfileService {
  private routes = {
    getProfile: '/profile',
    updateProfile: '/profile',
    uploadPhoto: '/profile/photo',
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

  async uploadPhoto(file: File) {
    try {
      const formData = new FormData();
      formData.append('photo', file);
      const response = await http.post<ApiResponse<User>>(this.routes.uploadPhoto, {
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
