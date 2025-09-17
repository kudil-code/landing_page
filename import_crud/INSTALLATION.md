# Installation Guide
## CRUD Export Package - Tender Management System

Panduan lengkap untuk menginstall dan menggunakan package CRUD ini di proyek Anda.

## 📋 Prerequisites

### System Requirements
- **Node.js**: 18.0 atau lebih baru
- **MySQL**: 8.0 atau lebih baru
- **TypeScript**: 5.0 atau lebih baru (opsional, untuk type safety)

### Development Environment
- **IDE**: VS Code (recommended)
- **Package Manager**: npm atau yarn
- **Database Client**: MySQL Workbench atau phpMyAdmin

## 🚀 Step-by-Step Installation

### 1. Database Setup

#### A. Install MySQL
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install mysql-server

# macOS (dengan Homebrew)
brew install mysql

# Windows
# Download dari https://dev.mysql.com/downloads/mysql/
```

#### B. Create Database
```sql
-- Login ke MySQL
mysql -u root -p

-- Create database
CREATE DATABASE tender_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user (opsional)
CREATE USER 'tender_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON tender_management.* TO 'tender_user'@'localhost';
FLUSH PRIVILEGES;
```

#### C. Import Schema
```bash
# Import schema utama
mysql -u root -p tender_management < database/schema.sql

# Import migration untuk HTML content (jika diperlukan)
mysql -u root -p tender_management < database/migration_add_html_content.sql
```

### 2. Project Setup

#### A. Initialize Project
```bash
# Buat folder proyek baru
mkdir my-tender-project
cd my-tender-project

# Initialize npm project
npm init -y

# Install dependencies
npm install mysql2
npm install -D typescript @types/node
```

#### B. Copy CRUD Files
```bash
# Copy semua file dari export package
cp -r export/* ./

# Atau copy file per file sesuai kebutuhan
cp export/services/* ./src/services/
cp export/database/* ./src/database/
cp export/types/* ./src/types/
cp export/utils/* ./src/utils/
```

#### C. Environment Configuration
Buat file `.env`:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=tender_management

# Optional: Connection Pool Settings
DB_CONNECTION_LIMIT=10
DB_QUEUE_LIMIT=0
DB_ACQUIRE_TIMEOUT=60000
DB_TIMEOUT=60000
```

### 3. TypeScript Configuration (Opsional)

Buat file `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 4. Test Installation

#### A. Test Database Connection
Buat file `test-connection.js`:
```javascript
const { testConnection } = require('./src/database/database');

async function test() {
  const isConnected = await testConnection();
  if (isConnected) {
    console.log('✅ Database connection successful!');
  } else {
    console.log('❌ Database connection failed!');
  }
}

test();
```

Jalankan test:
```bash
node test-connection.js
```

#### B. Test CRUD Operations
Buat file `test-crud.js`:
```javascript
const { TenderService } = require('./src/services/TenderService');

async function testCRUD() {
  try {
    // Test create
    const tender = await TenderService.create({
      kode_paket: 'TEST001',
      nama_paket: 'Test Tender',
      nilai_paket: 1000000,
      nilai_paket_formatted: 'Rp. 1.000.000,00',
      tanggal_pembuatan: new Date(),
      tanggal_pembuatan_original: '1 Januari 2025',
      lokasi_pekerjaan: 'Test Location',
      satuan_kerja: 'Test Organization',
      jenis_pengadaan: 'Test Category'
    });
    
    console.log('✅ Create successful:', tender.id);
    
    // Test read
    const retrieved = await TenderService.getById(tender.id);
    console.log('✅ Read successful:', retrieved?.nama_paket);
    
    // Test update
    const updated = await TenderService.update(tender.id, {
      nama_paket: 'Updated Test Tender'
    });
    console.log('✅ Update successful:', updated?.nama_paket);
    
    // Test delete
    const deleted = await TenderService.delete(tender.id);
    console.log('✅ Delete successful:', deleted);
    
  } catch (error) {
    console.error('❌ CRUD test failed:', error);
  }
}

testCRUD();
```

## 🔧 Configuration Options

### Database Connection Pool
```typescript
// src/database/database.ts
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tender_management',
  waitForConnections: true,
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '10'),
  queueLimit: parseInt(process.env.DB_QUEUE_LIMIT || '0'),
  acquireTimeout: parseInt(process.env.DB_ACQUIRE_TIMEOUT || '60000'),
  timeout: parseInt(process.env.DB_TIMEOUT || '60000'),
  reconnect: true,
  charset: 'utf8mb4',
  timezone: '+00:00'
};
```

### Environment Variables
```env
# Production
NODE_ENV=production
DB_HOST=your-production-host
DB_PORT=3306
DB_USER=your-production-user
DB_PASSWORD=your-secure-password
DB_NAME=tender_management

# Development
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=tender_management_dev
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Database Connection Failed
```bash
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Solution:**
- Pastikan MySQL service berjalan
- Check username/password
- Verify database name exists

#### 2. Module Not Found
```bash
Error: Cannot find module './services/TenderService'
```
**Solution:**
- Check file paths
- Verify file extensions (.ts vs .js)
- Update import statements

#### 3. TypeScript Errors
```bash
Error: Property 'kode_paket' does not exist on type
```
**Solution:**
- Import types dari `./types/types`
- Check interface definitions
- Verify type compatibility

#### 4. Permission Denied
```bash
Error: Access denied for user 'root'@'localhost'
```
**Solution:**
- Check MySQL user permissions
- Create dedicated user untuk aplikasi
- Update connection credentials

### Debug Mode
Aktifkan debug mode untuk troubleshooting:
```typescript
// src/database/database.ts
const dbConfig = {
  // ... other config
  debug: process.env.NODE_ENV === 'development',
  multipleStatements: false
};
```

## 📚 Next Steps

Setelah instalasi berhasil:

1. **Baca dokumentasi lengkap**: [Service Documentation](./services/README.md)
2. **Lihat contoh penggunaan**: [Examples](./examples/README.md)
3. **Explore API endpoints**: [API Documentation](./api/README.md)
4. **Customize sesuai kebutuhan**: Modify services dan types sesuai business logic

## 🆘 Support

Jika mengalami masalah:
1. Check troubleshooting section di atas
2. Lihat contoh di folder `examples/`
3. Periksa log error untuk detail lebih lanjut
4. Pastikan semua dependencies terinstall dengan benar
