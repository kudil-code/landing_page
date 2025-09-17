const { TenderService } = require('./services/TenderService.js');

// Simple HTML processor for testing
class HtmlProcessor {
  static calculateHash(content) {
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
  }

  static calculateSize(content) {
    return Buffer.byteLength(content, 'utf8');
  }

  static processHtmlContent(content) {
    const size = this.calculateSize(content);
    const hash = this.calculateHash(content);
    return {
      content,
      size,
      hash,
      updated_at: new Date()
    };
  }
}

async function testHtmlOperations() {
  try {
    console.log('🚀 Testing HTML Operations...\n');

    // Sample HTML content
    const sampleHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Test Tender Document</title>
        <meta name="description" content="This is a test tender document">
    </head>
    <body>
        <h1>Test Tender Document</h1>
        <p>This is a sample HTML document for testing purposes.</p>
        <div class="content">
            <h2>Tender Details</h2>
            <ul>
                <li>Project: Test Project</li>
                <li>Value: Rp. 200.000.000,00</li>
                <li>Location: Jakarta</li>
            </ul>
        </div>
    </body>
    </html>
    `;

    // 1. Create tender with HTML content
    console.log('1. Creating tender with HTML content...');
    const tenderWithHtml = {
      kode_paket: 'HTML001',
      nama_paket: 'Test Tender with HTML Content',
      nilai_paket: 200000000,
      nilai_paket_formatted: 'Rp. 200.000.000,00',
      tanggal_pembuatan: new Date('2025-01-30'),
      tanggal_pembuatan_original: '30 Januari 2025',
      lokasi_pekerjaan: 'Jakarta Selatan',
      satuan_kerja: 'DINAS PERHUBUNGAN',
      jenis_pengadaan: 'Jasa Lainnya',
      status: 'active'
    };

    const createdTender = await TenderService.create(tenderWithHtml);
    console.log('✅ Tender with HTML created:', {
      id: createdTender.id,
      kode_paket: createdTender.kode_paket,
      hasHtmlContent: !!createdTender.html_content
    });

    // 2. HTML Processing Examples
    console.log('\n2. HTML Processing Examples...');
    
    // Process HTML content
    const htmlInfo = HtmlProcessor.processHtmlContent(sampleHtml);
    console.log('✅ HTML processed:', {
      size: htmlInfo.size,
      hash: htmlInfo.hash.substring(0, 16) + '...',
      updatedAt: htmlInfo.updated_at
    });

    // 3. Update tender with HTML content
    console.log('\n3. Updating tender with HTML content...');
    const updatedTender = await TenderService.update(createdTender.id, {
      html_content: sampleHtml,
      html_content_size: htmlInfo.size,
      html_content_hash: htmlInfo.hash
    });
    console.log('✅ Tender updated with HTML:', {
      id: updatedTender?.id,
      hasHtmlContent: !!updatedTender?.html_content,
      htmlContentSize: updatedTender?.html_content_size
    });

    // 4. Get tender with HTML content
    console.log('\n4. Retrieving tender with HTML content...');
    const tenderWithHtmlContent = await TenderService.getById(createdTender.id);
    console.log('✅ Tender with HTML retrieved:', {
      id: tenderWithHtmlContent?.id,
      htmlContentSize: tenderWithHtmlContent?.html_content_size,
      htmlContentHash: tenderWithHtmlContent?.html_content_hash?.substring(0, 16) + '...',
      hasTitle: tenderWithHtmlContent?.html_content?.includes('<title>')
    });

    // 5. HTML Content Statistics
    console.log('\n5. Getting HTML content statistics...');
    const stats = await TenderService.getStats();
    console.log('✅ Current statistics:', {
      totalTenders: stats.total,
      totalValue: stats.totalValue,
      categoriesCount: stats.byCategory.length
    });

    // 6. Cleanup - Delete test tender
    console.log('\n6. Cleaning up...');
    const deleted = await TenderService.delete(createdTender.id);
    console.log('✅ Test tender deleted:', deleted);

    console.log('\n🎉 HTML operations test completed successfully!');

  } catch (error) {
    console.error('❌ Error in HTML operations test:', error);
  }
}

// Run the test
testHtmlOperations();
