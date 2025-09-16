import { CheckCircle, AlertCircle, Mail, ArrowRight } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import { validateToken } from '@/lib/auth';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface VerifyEmailPageProps {
  params: Promise<{
    token: string;
  }>;
}

export default async function VerifyEmailPage({ params }: VerifyEmailPageProps) {
  const { token } = await params;
  const isValidToken = await validateToken(token);

  if (!isValidToken) {
    return (
      <AuthLayout
        title="Token Tidak Valid"
        subtitle="Link verifikasi email tidak valid atau sudah kadaluarsa"
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
              Link verifikasi email yang Anda gunakan tidak valid atau sudah kadaluarsa. 
              Silakan minta email verifikasi yang baru.
            </p>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/forgot-password">
                Kirim Ulang Email Verifikasi
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
      title="Email Berhasil Diverifikasi"
      subtitle="Akun Anda telah aktif dan siap digunakan"
      showBackButton={false}
    >
      <div className="text-center space-y-6">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Email Berhasil Diverifikasi!
          </h3>
          <p className="text-sm text-gray-600">
            Terima kasih! Email Anda telah berhasil diverifikasi. 
            Akun Anda sekarang sudah aktif dan siap digunakan.
          </p>
        </div>

        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href="/dashboard">
              <span>Masuk ke Dashboard</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="w-full">
            <Link href="/login">
              Login Manual
            </Link>
          </Button>
        </div>

        {/* Additional Info */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-start">
            <Mail className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Selamat datang di TenderInformation ID!</p>
              <p>
                Sekarang Anda dapat mengakses semua fitur premium dan mendapatkan 
                informasi tender terbaru langsung di dashboard Anda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
