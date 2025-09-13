import { http,ApiResponse } from '~/api';
import { User } from '~/types';
import { ChangePasswordBody, CreateAccountBody, LoginBody } from './types';

export class AuthService {
  private routes = {
    login: '/auth/login',
    logout: '/auth/logout',
    register: '/auth/register',
    tokens: '/auth/refresh-tokens',
    verifyEmail: '/auth/verify-email',
    resendVerificationEmail: '/auth/resend-verification-email',
    changePassword: '/auth/change-password',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  };
  async login(data: LoginBody) {
    try {
      const response = await http.post<ApiResponse<User>>(this.routes.login, {
        json: data,
      });
      return await response.json();
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  logout() {
    return http.post(this.routes.logout);
  }

  async register(data: CreateAccountBody) {
    try {
      const response = await http.post<ApiResponse<User>>(this.routes.register, {
        json: data,
      });
      return await response.json();
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  async refreshTokens() {
    try {
      const response = await http.get<ApiResponse<{ accessToken: string; refreshToken: string }>>(
        this.routes.tokens
      );
      return await response.json();
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  }

  async verifyEmail(verificationCode: number) {
    try {
      const response = await http.post<ApiResponse<null>>(this.routes.verifyEmail, {
        json: { verificationCode },
      });
      return await response.json();
    } catch (error) {
      console.error('Email verification failed:', error);
      throw error;
    }
  }

  async resendVerificationEmail(email: string) {
    try {
      const response = await http.post<ApiResponse<null>>(this.routes.resendVerificationEmail, {
        json: { email },
      });
      return await response.json();
    } catch (error) {
      console.error('Resend verification email failed:', error);
      throw error;
    }
  }

  async changePassword(data:ChangePasswordBody) {
    try {
      const response = await http.post<ApiResponse<null>>(this.routes.changePassword, {
        json: data,
      });
      return await response.json();
    } catch (error) {
      console.error('Change password failed:', error);
      throw error;
    }
  }

  async forgotPassword(email: string) {
    try {
      const response = await http.post<ApiResponse<null>>(this.routes.forgotPassword, {
        json: { email },
      });
      return await response.json();
    } catch (error) {
      console.error('Forgot password request failed:', error);
      throw error;
    }
  }

  async resetPassword(data: { verificationCode: string; newPassword: string }) {
    try {
      const response = await http.post<ApiResponse<null>>(this.routes.resetPassword, {
        json: data,
      });
      return await response.json();
    } catch (error) {
      console.error('Reset password failed:', error);
      throw error;
    }
  }
}
