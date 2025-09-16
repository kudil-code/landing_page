import AuthLayout from '../../components/auth/AuthLayout';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Lupa Password?"
      subtitle="Masukkan email Anda dan kami akan mengirimkan link untuk reset password"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}

