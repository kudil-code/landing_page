'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ArrowLeft, Save, X } from 'lucide-react';

interface TenderFormData {
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
}

export default function NewTenderPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<TenderFormData>({
    kode_paket: '',
    nama_paket: '',
    nilai_paket: 0,
    nilai_paket_formatted: '',
    tanggal_pembuatan: '',
    tanggal_pembuatan_original: '',
    lokasi_pekerjaan: '',
    satuan_kerja: '',
    jenis_pengadaan: '',
    status: 'active'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'nilai_paket') {
      const numericValue = parseFloat(value) || 0;
      const formatted = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(numericValue);
      
      setFormData(prev => ({
        ...prev,
        [name]: numericValue,
        nilai_paket_formatted: formatted
      }));
    } else if (name === 'tanggal_pembuatan') {
      const date = new Date(value);
      const formattedDate = date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      setFormData(prev => ({
        ...prev,
        [name]: value,
        tanggal_pembuatan_original: formattedDate
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/tenders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/tenders');
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error creating tender:', error);
      alert('Terjadi kesalahan saat menyimpan tender');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/tenders');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tambah Tender Baru</h1>
              <p className="mt-2 text-gray-600">
                Isi form di bawah ini untuk menambah tender baru
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Informasi Dasar</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kode Paket *
                  </label>
                  <input
                    type="text"
                    name="kode_paket"
                    value={formData.kode_paket}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A6FA5] focus:border-transparent"
                    placeholder="Contoh: 10261077000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A6FA5] focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Paket *
                </label>
                <textarea
                  name="nama_paket"
                  value={formData.nama_paket}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A6FA5] focus:border-transparent"
                  placeholder="Masukkan nama lengkap paket tender"
                />
              </div>
            </div>

            {/* Financial Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Informasi Keuangan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nilai Paket (Rupiah) *
                  </label>
                  <input
                    type="number"
                    name="nilai_paket"
                    value={formData.nilai_paket}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="1000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A6FA5] focus:border-transparent"
                    placeholder="150000000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Format Nilai
                  </label>
                  <input
                    type="text"
                    value={formData.nilai_paket_formatted}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    placeholder="Rp. 150.000.000,00"
                  />
                </div>
              </div>
            </div>

            {/* Date Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Informasi Tanggal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Pembuatan *
                  </label>
                  <input
                    type="date"
                    name="tanggal_pembuatan"
                    value={formData.tanggal_pembuatan}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A6FA5] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Format Tanggal
                  </label>
                  <input
                    type="text"
                    value={formData.tanggal_pembuatan_original}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    placeholder="15 Juli 2025"
                  />
                </div>
              </div>
            </div>

            {/* Location and Organization */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Lokasi dan Organisasi</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lokasi Pekerjaan *
                  </label>
                  <input
                    type="text"
                    name="lokasi_pekerjaan"
                    value={formData.lokasi_pekerjaan}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A6FA5] focus:border-transparent"
                    placeholder="Kabupaten Indramayu - Indramayu (Kab.)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Satuan Kerja *
                  </label>
                  <input
                    type="text"
                    name="satuan_kerja"
                    value={formData.satuan_kerja}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A6FA5] focus:border-transparent"
                    placeholder="DINAS PERHUBUNGAN"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jenis Pengadaan *
                </label>
                <select
                  name="jenis_pengadaan"
                  value={formData.jenis_pengadaan}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A6FA5] focus:border-transparent"
                >
                  <option value="">Pilih Jenis Pengadaan</option>
                  <option value="Pekerjaan Konstruksi">Pekerjaan Konstruksi</option>
                  <option value="Pengadaan Barang">Pengadaan Barang</option>
                  <option value="Jasa Lainnya">Jasa Lainnya</option>
                  <option value="Jasa Konsultansi Badan Usaha Konstruksi">Jasa Konsultansi Badan Usaha Konstruksi</option>
                </select>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={loading}
              >
                <X className="w-4 h-4 mr-2" />
                Batal
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#4A6FA5] hover:bg-[#3A5A95] text-white"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Simpan Tender
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
