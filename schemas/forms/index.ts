import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(100),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  fullname: z.string().min(6, 'Full name must be at least 6 characters long'),
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Confirm Password must be at least 6 characters long'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
});

export type SignUpFormData = z.infer<typeof signupSchema>;

export const verifyEmailSchema = z.object({
  otp: z.string().length(6, 'OTP must be exactly 6 characters long'),
});

export type OtpFormData = z.infer<typeof verifyEmailSchema>;