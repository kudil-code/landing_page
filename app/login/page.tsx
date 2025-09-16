import AuthLayout from '../../components/auth/AuthLayout';
import LoginForm from '../../components/auth/LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout
      title="Masuk ke Akun Anda"
      subtitle="Akses dashboard dan kelola tender Anda dengan mudah"
    >
      <LoginForm />
    </AuthLayout>
  );
}

