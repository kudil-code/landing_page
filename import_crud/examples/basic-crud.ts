/**
 * Basic CRUD Operations Example
 * Demonstrates how to use the TenderService for basic CRUD operations
 */

import { TenderService } from '../services/TenderService';
import { TenderCreate } from '../types/types';

async function basicCrudExample() {
  try {
    console.log('🚀 Starting Basic CRUD Example...\n');

    // 1. CREATE - Add a new tender
    console.log('1. Creating a new tender...');
    const newTender: TenderCreate = {
      kode_paket: 'TEST001',
      nama_paket: 'Test Tender - Development Example',
      nilai_paket: 100000000,
      nilai_paket_formatted: 'Rp. 100.000.000,00',
      tanggal_pembuatan: new Date('2025-01-30'),
      tanggal_pembuatan_original: '30 Januari 2025',
      lokasi_pekerjaan: 'Jakarta Pusat',
      satuan_kerja: 'DINAS PERHUBUNGAN',
      jenis_pengadaan: 'Jasa Lainnya',
      status: 'active'
    };

    const createdTender = await TenderService.create(newTender);
    console.log('✅ Tender created successfully:', {
      id: createdTender.id,
      kode_paket: createdTender.kode_paket,
      nama_paket: createdTender.nama_paket
    });

    // 2. READ - Get tender by ID
    console.log('\n2. Reading tender by ID...');
    const retrievedTender = await TenderService.getById(createdTender.id);
    console.log('✅ Tender retrieved:', {
      id: retrievedTender?.id,
      nama_paket: retrievedTender?.nama_paket,
      nilai_paket: retrievedTender?.nilai_paket_formatted
    });

    // 3. READ - Get tender by kode_paket
    console.log('\n3. Reading tender by kode_paket...');
    const tenderByCode = await TenderService.getByKodePaket('TEST001');
    console.log('✅ Tender found by code:', tenderByCode?.nama_paket);

    // 4. READ - Get all tenders with pagination
    console.log('\n4. Reading all tenders with pagination...');
    const allTenders = await TenderService.getAll({
      page: 1,
      limit: 5,
      sortBy: 'created_at',
      sortOrder: 'desc'
    });
    console.log('✅ Tenders retrieved:', {
      total: allTenders.pagination.total,
      currentPage: allTenders.pagination.page,
      totalPages: allTenders.pagination.totalPages,
      tendersCount: allTenders.tenders.length
    });

    // 5. READ - Search tenders
    console.log('\n5. Searching tenders...');
    const searchResults = await TenderService.getAll({
      search: 'Test',
      page: 1,
      limit: 10
    });
    console.log('✅ Search results:', {
      query: 'Test',
      found: searchResults.tenders.length,
      results: searchResults.tenders.map(t => t.nama_paket)
    });

    // 6. UPDATE - Update tender
    console.log('\n6. Updating tender...');
    const updatedTender = await TenderService.update(createdTender.id, {
      nama_paket: 'Updated Test Tender - Development Example',
      nilai_paket: 150000000,
      nilai_paket_formatted: 'Rp. 150.000.000,00'
    });
    console.log('✅ Tender updated:', {
      id: updatedTender?.id,
      nama_paket: updatedTender?.nama_paket,
      nilai_paket: updatedTender?.nilai_paket_formatted
    });

    // 7. READ - Get filter options
    console.log('\n7. Getting filter options...');
    const filterOptions = await TenderService.getFilterOptions();
    console.log('✅ Filter options:', {
      organizations: filterOptions.organizations.slice(0, 3),
      categories: filterOptions.categories,
      statuses: filterOptions.statuses
    });

    // 8. READ - Get statistics
    console.log('\n8. Getting statistics...');
    const stats = await TenderService.getStats();
    console.log('✅ Statistics:', {
      totalTenders: stats.total,
      totalValue: stats.totalValue,
      categoriesCount: stats.byCategory.length,
      organizationsCount: stats.byOrganization.length
    });

    // 9. DELETE - Delete tender
    console.log('\n9. Deleting tender...');
    const deleted = await TenderService.delete(createdTender.id);
    console.log('✅ Tender deleted:', deleted);

    console.log('\n🎉 Basic CRUD example completed successfully!');

  } catch (error) {
    console.error('❌ Error in basic CRUD example:', error);
  }
}

// Run the example
if (require.main === module) {
  basicCrudExample();
}

export { basicCrudExample };
