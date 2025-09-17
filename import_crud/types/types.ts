// Database entity types
export interface Tender {
  id: number;
  kode_paket: string;
  nama_paket: string;
  nilai_paket: number;
  nilai_paket_formatted: string;
  tanggal_pembuatan: Date;
  tanggal_pembuatan_original: string;
  lokasi_pekerjaan: string;
  satuan_kerja: string;
  jenis_pengadaan: string;
  metadata_id?: number;
  html_file_path?: string;
  html_content?: string;
  html_content_size?: number;
  html_content_hash?: string;
  html_content_updated_at?: Date;
  status: 'active' | 'inactive' | 'completed' | 'cancelled';
  created_at: Date;
  updated_at: Date;
}

export interface TenderCreate {
  kode_paket: string;
  nama_paket: string;
  nilai_paket: number;
  nilai_paket_formatted: string;
  tanggal_pembuatan: Date;
  tanggal_pembuatan_original: string;
  lokasi_pekerjaan: string;
  satuan_kerja: string;
  jenis_pengadaan: string;
  metadata_id?: number;
  html_file_path?: string;
  html_content?: string;
  status?: 'active' | 'inactive' | 'completed' | 'cancelled';
}

export interface TenderUpdate extends Partial<TenderCreate> {
  id: number;
}

export interface Metadata {
  id: number;
  tanggal_ekstraksi: Date;
  sumber: string;
  total_paket: number;
  created_at: Date;
  updated_at: Date;
}

export interface TenderCategory {
  id: number;
  category_name: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Organization {
  id: number;
  organization_name: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Location {
  id: number;
  location_name: string;
  district?: string;
  city?: string;
  province?: string;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  full_name: string;
  role: 'admin' | 'user' | 'viewer';
  is_active: boolean;
  last_login?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface AuditLog {
  id: number;
  table_name: string;
  record_id: number;
  action: 'INSERT' | 'UPDATE' | 'DELETE';
  old_values?: any;
  new_values?: any;
  user_id?: number;
  ip_address?: string;
  created_at: Date;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface TenderFilters extends PaginationParams {
  search?: string;
  satuan_kerja?: string;
  jenis_pengadaan?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  minValue?: number;
  maxValue?: number;
}

// Form types
export interface TenderFormData {
  kode_paket: string;
  nama_paket: string;
  nilai_paket: string; // String for form handling
  tanggal_pembuatan: string; // String for form handling
  lokasi_pekerjaan: string;
  satuan_kerja: string;
  jenis_pengadaan: string;
  html_file_path?: string;
  html_content?: string;
  status: 'active' | 'inactive' | 'completed' | 'cancelled';
}

// HTML Content types
export interface HtmlContentInfo {
  content: string;
  size: number;
  hash: string;
  updated_at: Date;
}

export interface TenderWithHtml extends Tender {
  html_content: string;
  html_content_size: number;
  html_content_hash: string;
  html_content_updated_at: Date;
}

// Statistics types
export interface TenderStats {
  total: number;
  totalValue: number;
  byCategory: Array<{
    category: string;
    count: number;
    totalValue: number;
  }>;
  byOrganization: Array<{
    organization: string;
    count: number;
    totalValue: number;
  }>;
  byMonth: Array<{
    month: string;
    count: number;
    totalValue: number;
  }>;
}
