import { z } from 'zod';

// Login form validation
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email harus diisi')
    .email('Format email tidak valid'),
  password: z
    .string()
    .min(1, 'Password harus diisi')
    .min(8, 'Password minimal 8 karakter'),
});

// Registration form validation
export const registerSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Nama lengkap harus diisi')
    .min(2, 'Nama lengkap minimal 2 karakter'),
  email: z
    .string()
    .min(1, 'Email harus diisi')
    .email('Format email tidak valid'),
  password: z
    .string()
    .min(1, 'Password harus diisi')
    .min(8, 'Password minimal 8 karakter')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password harus mengandung huruf kecil, huruf besar, dan angka'),
  confirmPassword: z
    .string()
    .min(1, 'Konfirmasi password harus diisi'),
  companyName: z
    .string()
    .optional(),
  phoneNumber: z
    .string()
    .optional(),
  industry: z
    .string()
    .optional(),
  termsAccepted: z
    .boolean()
    .refine((val) => val === true, 'Anda harus menyetujui syarat dan ketentuan'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password dan konfirmasi password tidak sama',
  path: ['confirmPassword'],
});

// Forgot password form validation
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email harus diisi')
    .email('Format email tidak valid'),
});

// Reset password form validation
export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(1, 'Password harus diisi')
    .min(8, 'Password minimal 8 karakter')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password harus mengandung huruf kecil, huruf besar, dan angka'),
  confirmPassword: z
    .string()
    .min(1, 'Konfirmasi password harus diisi'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password dan konfirmasi password tidak sama',
  path: ['confirmPassword'],
});

// Industry options
export const industryOptions = [
  { value: 'konstruksi', label: 'Konstruksi' },
  { value: 'pengadaan-barang', label: 'Pengadaan Barang' },
  { value: 'elektrikal', label: 'Elektrikal' },
  { value: 'lainnya', label: 'Lainnya' },
];

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

