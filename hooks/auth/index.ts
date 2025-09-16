import { useMutation, useQuery } from '@tanstack/react-query';
import { AuthService } from '~/services/auth';
import {
  ChangePasswordBody,
  CreateAccountBody,
  LoginBody,
  ValidateCredentialsBody,
} from '~/services/auth/types';
import { Profile, User } from '~/types';

const auth_service = () => new AuthService();

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginBody) => auth_service().login(data),
  });
}

export function useSignUp() {
  return useMutation({
    mutationFn: (data: CreateAccountBody) => auth_service().register(data),
  });
}

export function useRefreshTokens() {
  return useQuery({
    queryKey: ['refresh-tokens'],
    queryFn: () => auth_service().refreshTokens(),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: false,
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordBody) => auth_service().changePassword(data),
  });
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: (verificationCode: number) => auth_service().verifyEmail(verificationCode),
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => auth_service().forgotPassword(email),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: { verificationCode: string; newPassword: string }) =>
      auth_service().resetPassword(data),
  });
}

export function useValidateCredentials() {
  return useMutation({
    mutationFn: (data: ValidateCredentialsBody) => auth_service().validateCredentials(data),
  });
}

export function useValidateIdentifier() {
  return useMutation({
    mutationFn: (data: Pick<ValidateCredentialsBody, 'identifier'>) => {
      return auth_service().validateIdentifier(data);
    }
  });
}

export const useResendVerificationEmail = () => {
  return useMutation({
    mutationFn: (email: string) => auth_service().resendVerificationEmail(email),
  });
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: (data: Partial<Profile>) => auth_service().updateProfile(data),
  });
}