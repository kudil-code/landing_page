# CRUD Export Package
## Tender Management System - Complete CRUD Implementation

Package ini berisi semua file dan fungsi CRUD yang telah dibuat untuk sistem manajemen tender. Package ini dapat di-export dan digunakan di proyek lain yang menggunakan database yang sama.

## 📁 Struktur Package

```
export/
├── README.md                    # Dokumentasi ini
├── INSTALLATION.md              # Panduan instalasi
├── services/                    # Service layer (CRUD operations)
│   ├── TenderService.ts         # Service untuk operasi tender
│   ├── MetadataService.ts       # Service untuk metadata
│   └── index.ts                 # Export semua services
├── database/                    # Database layer
│   ├── database.ts              # Koneksi database
│   ├── schema.sql               # Database schema
│   └── migration_add_html_content.sql
├── types/                       # TypeScript types
│   ├── types.ts                 # Semua interface dan types
│   └── index.ts                 # Export semua types
├── utils/                       # Utility functions
│   ├── html-processor.ts        # HTML processing utilities
│   ├── data-parser.ts           # Data parsing utilities
│   ├── xml-parser.ts            # XML parsing utilities
│   └── index.ts                 # Export semua utilities
├── api/                         # API routes (Next.js)
│   ├── tenders/                 # Tender API endpoints
│   └── files/                   # File serving endpoints
├── components/                  # React components
│   ├── tender/                  # Tender-specific components
│   └── ui/                      # UI components (Shadcn)
└── examples/                    # Contoh penggunaan
    ├── basic-crud.ts            # Contoh operasi CRUD dasar
    ├── html-operations.ts       # Contoh operasi HTML
    └── data-import.ts           # Contoh import data
```

## 🚀 Fitur Utama

### ✅ CRUD Operations Lengkap
- **Create**: Tambah tender baru dengan validasi
- **Read**: Baca data dengan filtering, pagination, dan search
- **Update**: Update data tender dan HTML content
- **Delete**: Hapus data tender

### ✅ HTML Content Management
- Upload dan simpan HTML content ke database
- Validasi dan sanitasi HTML content
- Hash verification untuk integritas data
- Bulk operations untuk HTML files

### ✅ Advanced Features
- Filtering dan search yang powerful
- Pagination dengan metadata
- Statistics dan analytics
- Data import dari XML
- Export ke CSV
- Audit logging

### ✅ Database Integration
- MySQL connection pooling
- Transaction support
- Stored procedures untuk operasi kompleks
- Database schema yang lengkap

## 📋 Requirements

- Node.js 18+
- MySQL 8.0+
- TypeScript 5+
- Next.js 15+ (untuk API routes)

## 🔧 Dependencies

```json
{
  "mysql2": "^3.6.0",
  "crypto": "built-in",
  "fs": "built-in"
}
```

## 📖 Quick Start

1. **Install dependencies**:
   ```bash
   npm install mysql2
   ```

2. **Setup database**:
   ```bash
   mysql -u root -p < database/schema.sql
   ```

3. **Configure environment**:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=tender_management
   ```

4. **Import dan gunakan**:
   ```typescript
   import { TenderService } from './services/TenderService';
   
   // Create tender
   const tender = await TenderService.create({
     kode_paket: '10261077000',
     nama_paket: 'Pemeliharaan Alat Bengkel',
     nilai_paket: 150000000,
     // ... other fields
   });
   ```

## 📚 Dokumentasi Lengkap

- [Installation Guide](./INSTALLATION.md)
- [API Documentation](./api/README.md)
- [Service Documentation](./services/README.md)
- [Examples](./examples/README.md)

## 🔄 Migration dari Proyek Lama

Package ini kompatibel dengan database yang sudah ada. Tidak perlu migrasi data, cukup:

1. Copy file-file dari package ini
2. Install dependencies yang diperlukan
3. Update import paths sesuai struktur proyek baru
4. Test koneksi database

## 🆘 Support

Jika ada pertanyaan atau masalah, silakan lihat dokumentasi lengkap atau contoh penggunaan di folder `examples/`.
