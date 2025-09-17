import { http, ApiResponse } from '~/api';
import { Profile, User } from '~/types';
import { ChangePasswordBody, Country, CreateAccountBody, LoginBody, State, ValidateCredentialsBody } from './types';

export class AuthService {
  private routes = {
    login: 'auth/login',
    logout: 'auth/logout',
    register: 'auth/register',
    tokens: 'auth/refresh-tokens',
    verifyEmail: 'auth/verify-email',
    resendVerificationEmail: 'auth/resend-verification-email',
    changePassword: 'auth/change-password',
    forgotPassword: 'auth/forgot-password',
    resetPassword: 'auth/reset-password',
    validateCredentials: 'auth/validate-credentials',
    validateIdentifier: 'auth/identifierValidator',
    profile: 'profile',
    countries: 'location/countries',
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

  async changePassword(data: ChangePasswordBody) {
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

  async validateCredentials(data: ValidateCredentialsBody) {
    try {
      const response = await http.post<ApiResponse<null>>(this.routes.validateCredentials, {
        json: data,
      });
      return await response.json();
    } catch (error) {
      console.error('Validate credentials failed:', error);
      throw error;
    }
  }
  async validateIdentifier(data: Pick<ValidateCredentialsBody, 'identifier'>) {
    // Implement the method logic here
    try {
      const response = await http.post<
        ApiResponse<{
          message: string;
          exists: boolean;
        }>
      >(this.routes.validateIdentifier, {
        json: data,
      });
      return await response.json();
    } catch (error) {
      console.error('Validate identifier failed:', error);
      throw error;
    }
  }
  async updateProfile(data: Partial<Profile>) {
    try {
      const response = await http.put<ApiResponse<null>>(this.routes.profile, {
        json: data,
      });
      return await response.json();
    } catch (error) {
      console.error('Update profile failed:', error);
      throw error;
    }
  }

  async getCountries() {
    try {
      const response = await http.get<ApiResponse<Country[]>>(this.routes.countries);
      return await response.json();
    } catch (error) {
      console.error('Get countries failed:', error);
      throw error;
    }
  }

  async getStates(countryCode: string) {
    try {
      const response = await http.get<ApiResponse<State[]>>(
        `${this.routes.countries}/${countryCode}/states`
      );
      return await response.json();
    } catch (error) {
      console.error('Get states failed:', error);
      throw error;
    }
  }
}
