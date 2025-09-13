import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(100),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type SignUpFormData = z.infer<typeof signupSchema>;

export const verifyEmailSchema = z.object({
  otp: z.string().length(6, 'OTP must be exactly 6 characters long'),
});

export const detailsFormSchema = z.object({
  fullName: z.string().min(5, 'Full name must be at least 5 characters long'),
  username: z.string().min(5, 'Username must be at least 3 characters long'),
  dateOfBirth: z.string().min(10, 'Date of birth must be in the format YYYY-MM-DD'),
});

export type DetailsFormData = z.infer<typeof detailsFormSchema>;

export const locationFormSchema = z.object({
  country: z.string().min(4, 'Country must be at least 4 characters long'),
  state: z.string().min(2, 'State must be at least 2 characters long'),
});

export type LocationFormData = z.infer<typeof locationFormSchema>;

export type OtpFormData = z.infer<typeof verifyEmailSchema>;