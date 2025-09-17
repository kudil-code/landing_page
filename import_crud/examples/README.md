# Examples - CRUD Export Package

Folder ini berisi contoh-contoh penggunaan lengkap untuk semua fitur CRUD yang tersedia.

## 📁 File Examples

### 1. `basic-crud.ts`
**Contoh operasi CRUD dasar**
- ✅ Create - Membuat tender baru
- ✅ Read - Membaca tender (by ID, by kode_paket, dengan pagination)
- ✅ Update - Mengupdate data tender
- ✅ Delete - Menghapus tender
- ✅ Search dan filtering
- ✅ Statistics dan filter options

**Cara menjalankan:**
```bash
npx ts-node examples/basic-crud.ts
```

### 2. `html-operations.ts`
**Contoh operasi HTML content**
- ✅ Create tender dengan HTML content
- ✅ Update HTML content
- ✅ HTML processing dan validation
- ✅ HTML sanitization dan compression
- ✅ HTML content statistics
- ✅ Integrity checking

**Cara menjalankan:**
```bash
npx ts-node examples/html-operations.ts
```

### 3. `data-import.ts`
**Contoh import data dari XML**
- ✅ Parse XML data
- ✅ Validate tender data
- ✅ Bulk import operations
- ✅ XML file parsing
- ✅ Error handling dan validation
- ✅ Import dengan HTML content

**Cara menjalankan:**
```bash
npx ts-node examples/data-import.ts
```

## 🚀 Quick Start Examples

### Basic Usage
```typescript
import { TenderService } from '../services/TenderService';

// Create tender
const tender = await TenderService.create({
  kode_paket: 'TEST001',
  nama_paket: 'Test Tender',
  nilai_paket: 100000000,
  // ... other fields
});

// Get tender
const retrieved = await TenderService.getById(tender.id);

// Update tender
const updated = await TenderService.update(tender.id, {
  nama_paket: 'Updated Tender Name'
});

// Delete tender
await TenderService.delete(tender.id);
```

### HTML Operations
```typescript
import { HtmlProcessor } from '../utils/html-processor';

// Process HTML content
const htmlInfo = HtmlProcessor.processHtmlContent(htmlString);

// Validate HTML
const validation = HtmlProcessor.validateHtmlContent(htmlString);

// Sanitize HTML
const sanitized = HtmlProcessor.sanitizeHtmlContent(htmlString);
```

### Data Import
```typescript
import { parseXMLTenderData } from '../utils/data-parser';

// Parse XML data
const tenders = parseXMLTenderData(xmlData);

// Bulk import
const result = await TenderService.bulkImport(tenders);
```

## 📋 Prerequisites

Sebelum menjalankan examples, pastikan:

1. **Database sudah setup**:
   ```bash
   mysql -u root -p < database/schema.sql
   ```

2. **Environment variables sudah dikonfigurasi**:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=tender_management
   ```

3. **Dependencies sudah terinstall**:
   ```bash
   npm install mysql2 typescript ts-node
   ```

## 🔧 Running Examples

### Option 1: Individual Examples
```bash
# Basic CRUD
npx ts-node examples/basic-crud.ts

# HTML Operations
npx ts-node examples/html-operations.ts

# Data Import
npx ts-node examples/data-import.ts
```

### Option 2: All Examples
```bash
# Run all examples sequentially
npx ts-node examples/basic-crud.ts && \
npx ts-node examples/html-operations.ts && \
npx ts-node examples/data-import.ts
```

### Option 3: Import in Your Code
```typescript
import { basicCrudExample } from './examples/basic-crud';
import { htmlOperationsExample } from './examples/html-operations';
import { dataImportExample } from './examples/data-import';

// Run examples
await basicCrudExample();
await htmlOperationsExample();
await dataImportExample();
```

## 📊 Expected Output

Setiap example akan menampilkan output seperti:

```
🚀 Starting Basic CRUD Example...

1. Creating a new tender...
✅ Tender created successfully: { id: 1, kode_paket: 'TEST001', nama_paket: 'Test Tender' }

2. Reading tender by ID...
✅ Tender retrieved: { id: 1, nama_paket: 'Test Tender', nilai_paket: 'Rp. 100.000.000,00' }

...

🎉 Basic CRUD example completed successfully!
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**:
   ```
   ❌ Database connection failed: Error: connect ECONNREFUSED
   ```
   **Solution**: Pastikan MySQL service berjalan dan credentials benar.

2. **Module Not Found**:
   ```
   Error: Cannot find module '../services/TenderService'
   ```
   **Solution**: Pastikan path import sesuai dengan struktur folder.

3. **TypeScript Errors**:
   ```
   Property 'kode_paket' does not exist on type
   ```
   **Solution**: Import types yang diperlukan dari `../types/types`.

### Debug Mode

Aktifkan debug mode untuk melihat detail error:
```typescript
// Set environment variable
process.env.NODE_ENV = 'development';

// Or enable debug in database config
const dbConfig = {
  // ... other config
  debug: true
};
```

## 📚 Next Steps

Setelah menjalankan examples:

1. **Modify examples** sesuai kebutuhan Anda
2. **Integrate** ke dalam aplikasi Anda
3. **Extend functionality** berdasarkan business logic
4. **Add error handling** yang lebih robust
5. **Implement logging** untuk production use

## 🆘 Support

Jika mengalami masalah:
1. Check troubleshooting section di atas
2. Periksa database connection
3. Verify environment variables
4. Check console output untuk detail error
