import { z } from 'zod';

export const personalInfoSchema = z.object({
  firstName: z.string().trim().min(2, { message: 'Please enter your first name' }),
  lastName: z.string().trim().min(2, { message: 'Please enter your last name' }),
  dob: z.string().min(1, { message: 'Please select your date of birth' }),
});

export const accountDetailsSchema = z.object({
  email: z.string().trim().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const totalRegistrationSchema = z.object({
  firstName: z.string().trim().min(2, { message: 'Please enter your first name' }),
  lastName: z.string().trim().min(2, { message: 'Please enter your last name' }),
  dob: z.string().min(1, { message: 'Please select your date of birth' }),
  email: z.string().trim().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});