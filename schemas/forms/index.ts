import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  email: z.email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});

export type SignUpFormData = z.infer<typeof signupSchema>;

export const verifyEmailSchema = z.object({
  otp: z.string().length(6, 'OTP must be exactly 6 characters long'),
});

export const detailsFormSchema = z.object({
  fullName: z.string().min(5, 'Full name must be at least 5 characters long'),
  // username: z.string().min(5, 'Username must be at least 5 characters long'),
  dateOfBirth: z.string().min(10, 'Date of birth must be in the format YYYY-MM-DD'),
});

export type DetailsFormData = z.infer<typeof detailsFormSchema>;

export const locationFormSchema = z.object({
  country: z.string().min(4, 'Country must be at least 4 characters long'),
  state: z.string().min(2, 'State must be at least 2 characters long'),
});

export type LocationFormData = z.infer<typeof locationFormSchema>;

export type OtpFormData = z.infer<typeof verifyEmailSchema>;
