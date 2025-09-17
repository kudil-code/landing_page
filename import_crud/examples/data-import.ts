/**
 * Data Import Example
 * Demonstrates how to import data from XML and process HTML files
 */

import { TenderService } from '../services/TenderService';
import { parseXMLTenderData, parseXMLTenderDataWithHtml, validateTenderData } from '../utils/data-parser';
import { parseXMLFile } from '../utils/xml-parser';
import { TenderCreate } from '../types/types';

async function dataImportExample() {
  try {
    console.log('🚀 Starting Data Import Example...\n');

    // 1. Sample XML data (simulating parsed XML)
    console.log('1. Processing XML data...');
    const sampleXmlData = {
      data_paket_lpse: {
        paket: [
          {
            kode_paket: 'IMPORT001',
            nama_paket: 'Import Test Tender 1',
            nilai_paket: 'Rp. 50.000.000,00',
            tanggal_pembuatan: '15 Januari 2025',
            lokasi_pekerjaan: 'Jakarta Pusat',
            satuan_kerja: 'DINAS PERHUBUNGAN',
            jenis_pengadaan: 'Jasa Lainnya'
          },
          {
            kode_paket: 'IMPORT002',
            nama_paket: 'Import Test Tender 2',
            nilai_paket: 'Rp. 75.000.000,00',
            tanggal_pembuatan: '16 Januari 2025',
            lokasi_pekerjaan: 'Jakarta Selatan',
            satuan_kerja: 'DINAS PEKERJAAN UMUM DAN PENATAAN RUANG',
            jenis_pengadaan: 'Pekerjaan Konstruksi'
          }
        ]
      }
    };

    // Parse XML data
    const parsedTenders = parseXMLTenderData(sampleXmlData);
    console.log('✅ XML data parsed:', {
      tendersCount: parsedTenders.length,
      tenders: parsedTenders.map(t => ({
        kode_paket: t.kode_paket,
        nama_paket: t.nama_paket,
        nilai_paket: t.nilai_paket_formatted
      }))
    });

    // 2. Validate tender data
    console.log('\n2. Validating tender data...');
    for (const tender of parsedTenders) {
      const validation = validateTenderData(tender);
      console.log(`✅ Validation for ${tender.kode_paket}:`, {
        isValid: validation.isValid,
        errors: validation.errors
      });
    }

    // 3. Bulk import tenders
    console.log('\n3. Bulk importing tenders...');
    const importResult = await TenderService.bulkImport(parsedTenders);
    console.log('✅ Bulk import result:', {
      success: importResult.success,
      failed: importResult.failed
    });

    // 4. Get imported tenders
    console.log('\n4. Retrieving imported tenders...');
    const importedTenders = await TenderService.getAll({
      search: 'Import Test',
      page: 1,
      limit: 10
    });
    console.log('✅ Imported tenders:', {
      found: importedTenders.tenders.length,
      tenders: importedTenders.tenders.map(t => ({
        id: t.id,
        kode_paket: t.kode_paket,
        nama_paket: t.nama_paket
      }))
    });

    // 5. XML file parsing example (simulated)
    console.log('\n5. XML file parsing example...');
    const sampleXmlContent = `
    <?xml version="1.0" encoding="UTF-8"?>
    <data_paket_lpse>
        <paket>
            <kode_paket>FILE001</kode_paket>
            <nama_paket>File Import Test Tender</nama_paket>
            <nilai_paket>Rp. 100.000.000,00</nilai_paket>
            <tanggal_pembuatan>20 Januari 2025</tanggal_pembuatan>
            <lokasi_pekerjaan>Jakarta Barat</lokasi_pekerjaan>
            <satuan_kerja>DINAS PARIWISATA, PEMUDA DAN OLAHRAGA</satuan_kerja>
            <jenis_pengadaan>Pengadaan Barang</jenis_pengadaan>
        </paket>
    </data_paket_lpse>
    `;

    try {
      const fileParsedTenders = await parseXMLFile(sampleXmlContent);
      console.log('✅ XML file parsed:', {
        tendersCount: fileParsedTenders.length,
        firstTender: fileParsedTenders[0]?.nama_paket
      });

      // Import from file
      if (fileParsedTenders.length > 0) {
        const fileImportResult = await TenderService.bulkImport(fileParsedTenders);
        console.log('✅ File import result:', {
          success: fileImportResult.success,
          failed: fileImportResult.failed
        });
      }
    } catch (error) {
      console.log('⚠️ XML file parsing (browser environment):', error);
    }

    // 6. Data validation and error handling
    console.log('\n6. Data validation and error handling...');
    
    // Test with invalid data
    const invalidTender: TenderCreate = {
      kode_paket: '', // Invalid: empty
      nama_paket: 'Invalid Tender',
      nilai_paket: -1000, // Invalid: negative
      nilai_paket_formatted: 'Rp. -1.000,00',
      tanggal_pembuatan: new Date(),
      tanggal_pembuatan_original: 'Invalid Date',
      lokasi_pekerjaan: '', // Invalid: empty
      satuan_kerja: '', // Invalid: empty
      jenis_pengadaan: '' // Invalid: empty
    };

    const invalidValidation = validateTenderData(invalidTender);
    console.log('✅ Invalid data validation:', {
      isValid: invalidValidation.isValid,
      errors: invalidValidation.errors
    });

    // 7. Import with HTML content (simulated)
    console.log('\n7. Import with HTML content...');
    const tenderWithHtml: TenderCreate = {
      kode_paket: 'HTML_IMPORT001',
      nama_paket: 'Import Tender with HTML',
      nilai_paket: 125000000,
      nilai_paket_formatted: 'Rp. 125.000.000,00',
      tanggal_pembuatan: new Date('2025-01-30'),
      tanggal_pembuatan_original: '30 Januari 2025',
      lokasi_pekerjaan: 'Jakarta Timur',
      satuan_kerja: 'DINAS KETAHANAN PANGAN DAN PERTANIAN',
      jenis_pengadaan: 'Jasa Konsultansi Badan Usaha Konstruksi',
      html_content: `
        <html>
        <head><title>Import Tender Document</title></head>
        <body>
            <h1>Import Tender Document</h1>
            <p>This tender was imported with HTML content.</p>
        </body>
        </html>
      `,
      status: 'active'
    };

    const htmlTender = await TenderService.create(tenderWithHtml);
    console.log('✅ Tender with HTML imported:', {
      id: htmlTender.id,
      kode_paket: htmlTender.kode_paket,
      hasHtmlContent: !!htmlTender.html_content,
      htmlContentSize: htmlTender.html_content_size
    });

    // 8. Bulk operations statistics
    console.log('\n8. Getting import statistics...');
    const stats = await TenderService.getStats();
    console.log('✅ Current statistics:', {
      totalTenders: stats.total,
      totalValue: stats.totalValue,
      byCategory: stats.byCategory.slice(0, 3)
    });

    // 9. Cleanup - Delete test tenders
    console.log('\n9. Cleaning up test data...');
    const allTestTenders = await TenderService.getAll({
      search: 'Test',
      page: 1,
      limit: 100
    });

    let deletedCount = 0;
    for (const tender of allTestTenders.tenders) {
      if (tender.kode_paket.startsWith('IMPORT') || 
          tender.kode_paket.startsWith('FILE') || 
          tender.kode_paket.startsWith('HTML_IMPORT')) {
        await TenderService.delete(tender.id);
        deletedCount++;
      }
    }

    console.log('✅ Cleanup completed:', {
      deletedTenders: deletedCount
    });

    console.log('\n🎉 Data import example completed successfully!');

  } catch (error) {
    console.error('❌ Error in data import example:', error);
  }
}

// Run the example
if (require.main === module) {
  dataImportExample();
}

export { dataImportExample };
