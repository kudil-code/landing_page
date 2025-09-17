'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Calendar, 
  MapPin, 
  Building, 
  DollarSign,
  FileText,
  Hash
} from 'lucide-react';

interface Tender {
  id: number;
  kode_paket: string;
  nama_paket: string;
  nilai_paket: number;
  nilai_paket_formatted: string;
  tanggal_pembuatan: string;
  tanggal_pembuatan_original: string;
  lokasi_pekerjaan: string;
  satuan_kerja: string;
  jenis_pengadaan: string;
  status: string;
  html_file_path?: string;
  html_content_size?: number;
  html_content_hash?: string;
  html_content_updated_at?: string;
  created_at: string;
  updated_at: string;
}

interface TenderPageProps {
  params: Promise<{ id: string }>;
}

export default function TenderDetailPage({ params }: TenderPageProps) {
  const router = useRouter();
  const [tender, setTender] = useState<Tender | null>(null);
  const [loading, setLoading] = useState(true);
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setResolvedParams(resolved);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (resolvedParams) {
      fetchTender();
    }
  }, [resolvedParams]);

  const fetchTender = async () => {
    if (!resolvedParams) return;
    
    try {
      const response = await fetch(`/api/tenders/${resolvedParams.id}`);
      const data = await response.json();
      
      if (data.success) {
        setTender(data.data);
      } else {
        console.error('Error fetching tender:', data.error);
      }
    } catch (error) {
      console.error('Error fetching tender:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!tender || !confirm('Apakah Anda yakin ingin menghapus tender ini?')) return;
    
    try {
      const response = await fetch(`/api/tenders/${tender.id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        router.push('/tenders');
      }
    } catch (error) {
      console.error('Error deleting tender:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A6FA5] mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat detail tender...</p>
        </div>
      </div>
    );
  }

  if (!tender) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tender Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-6">Tender yang Anda cari tidak ditemukan atau telah dihapus.</p>
          <Button onClick={() => router.push('/tenders')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Daftar Tender
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="outline"
                onClick={() => router.push('/tenders')}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{tender.kode_paket}</h1>
                <p className="mt-2 text-gray-600">Detail Tender</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button 
                variant="outline"
                onClick={handleDelete}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Hapus
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Informasi Dasar</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Nama Paket</label>
                  <p className="mt-1 text-lg text-gray-900">{tender.nama_paket}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Kode Paket</label>
                    <p className="mt-1 text-gray-900 font-mono">{tender.kode_paket}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Status</label>
                    <div className="mt-1">
                      <Badge className={getStatusColor(tender.status)}>
                        {tender.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Financial Information */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Informasi Keuangan</h2>
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg mr-4">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Nilai Paket</label>
                  <p className="text-2xl font-bold text-gray-900">{tender.nilai_paket_formatted}</p>
                </div>
              </div>
            </Card>

            {/* Location and Organization */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Lokasi dan Organisasi</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3 mt-1">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Lokasi Pekerjaan</label>
                    <p className="mt-1 text-gray-900">{tender.lokasi_pekerjaan}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 bg-purple-100 rounded-lg mr-3 mt-1">
                    <Building className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Satuan Kerja</label>
                    <p className="mt-1 text-gray-900">{tender.satuan_kerja}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Jenis Pengadaan</label>
                  <p className="mt-1 text-gray-900">{tender.jenis_pengadaan}</p>
                </div>
              </div>
            </Card>

            {/* HTML Content Information */}
            {(tender.html_file_path || tender.html_content_size) && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Konten HTML</h2>
                <div className="space-y-4">
                  {tender.html_file_path && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500">File Path</label>
                      <p className="mt-1 text-sm text-gray-900 font-mono bg-gray-100 p-2 rounded">
                        {tender.html_file_path}
                      </p>
                    </div>
                  )}
                  
                  {tender.html_content_size && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Ukuran Konten</label>
                        <p className="mt-1 text-gray-900">
                          {tender.html_content_size.toLocaleString('id-ID')} bytes
                        </p>
                      </div>
                      
                      {tender.html_content_updated_at && (
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Terakhir Diupdate</label>
                          <p className="mt-1 text-gray-900">
                            {formatDateTime(tender.html_content_updated_at)}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {tender.html_content_hash && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Hash Konten</label>
                      <p className="mt-1 text-sm text-gray-900 font-mono bg-gray-100 p-2 rounded break-all">
                        {tender.html_content_hash}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Date Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Tanggal</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="p-2 bg-orange-100 rounded-lg mr-3 mt-1">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Tanggal Pembuatan</label>
                    <p className="mt-1 text-gray-900">{formatDate(tender.tanggal_pembuatan)}</p>
                    <p className="text-sm text-gray-500">{tender.tanggal_pembuatan_original}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Dibuat</label>
                  <p className="mt-1 text-gray-900">{formatDateTime(tender.created_at)}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Terakhir Diupdate</label>
                  <p className="mt-1 text-gray-900">{formatDateTime(tender.updated_at)}</p>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
              <div className="space-y-3">
                <Button className="w-full" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Lihat Konten HTML
                </Button>
                <Button className="w-full" variant="outline">
                  <Hash className="w-4 h-4 mr-2" />
                  Verifikasi Hash
                </Button>
                <Button className="w-full" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Tender
                </Button>
              </div>
            </Card>

            {/* System Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Sistem</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <label className="block text-sm font-medium text-gray-500">ID Database</label>
                  <p className="mt-1 text-gray-900 font-mono">{tender.id}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Status Database</label>
                  <p className="mt-1 text-green-600 font-medium">Aktif</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
