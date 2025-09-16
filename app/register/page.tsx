import AuthLayout from '../../components/auth/AuthLayout';
import RegisterForm from '../../components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Daftar Akun Baru"
      subtitle="Bergabung dengan ribuan perusahaan yang sudah menggunakan TenderInformation ID"
    >
      <RegisterForm />
    </AuthLayout>
  );
}

