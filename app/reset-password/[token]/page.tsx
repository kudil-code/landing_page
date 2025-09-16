import { Lock, CheckCircle, AlertCircle } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface ResetPasswordPageProps {
  params: Promise<{
    token: string;
  }>;
}

export default async function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  const { token } = await params;
  
  // For demo purposes, assume token is valid if it's not empty
  const isValidToken = token.length > 0;

  if (!isValidToken) {
    return (
      <AuthLayout
        title="Token Tidak Valid"
        subtitle="Link reset password tidak valid atau sudah kadaluarsa"
        showBackButton={false}
      >
        <div className="text-center space-y-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Link Tidak Valid
            </h3>
            <p className="text-sm text-gray-600">
              Link reset password yang Anda gunakan tidak valid atau sudah kadaluarsa. 
              Silakan minta link reset password yang baru.
            </p>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/forgot-password">
                Minta Link Reset Password Baru
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <Link href="/login">
                Kembali ke Login
              </Link>
            </Button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Masukkan password baru untuk akun Anda"
      showBackButton={false}
    >
      <div className="text-center space-y-6">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Token Valid
          </h3>
          <p className="text-sm text-gray-600">
            Link reset password Anda valid. Silakan gunakan form di bawah untuk mengatur password baru.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-start">
            <Lock className="h-5 w-5 text-gray-600 mt-0.5 mr-3 flex-shrink-0" />
            <div className="text-sm text-gray-600">
              <p className="font-medium mb-1">Form Reset Password</p>
              <p>
                Dalam implementasi nyata, di sini akan ada form untuk mengatur password baru 
                dengan validasi dan konfirmasi password.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href="/login">
              Kembali ke Login
            </Link>
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}