export interface CreateAccountBody {
  fullName: string;
  email: string;
  password: string;
  username: string;
  dateOfBirth: string;
  country: string;
  state: string;
  address: string;
}

export interface LoginBody {
  identifier: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface ChangePasswordBody{
    currentPassword: string;
    newPassword: string;
}

export interface ResetPasswordBody {
    token: number;
    newPassword: string;
}