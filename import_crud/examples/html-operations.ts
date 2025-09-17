/**
 * HTML Operations Example
 * Demonstrates how to work with HTML content in tenders
 */

import { TenderService } from '../services/TenderService';
import { HtmlProcessor } from '../utils/html-processor';
import { TenderCreate } from '../types/types';

async function htmlOperationsExample() {
  try {
    console.log('🚀 Starting HTML Operations Example...\n');

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
                <li>Value: Rp. 100.000.000,00</li>
                <li>Location: Jakarta</li>
            </ul>
        </div>
    </body>
    </html>
    `;

    // 1. Create tender with HTML content
    console.log('1. Creating tender with HTML content...');
    const tenderWithHtml: TenderCreate = {
      kode_paket: 'HTML001',
      nama_paket: 'Test Tender with HTML Content',
      nilai_paket: 200000000,
      nilai_paket_formatted: 'Rp. 200.000.000,00',
      tanggal_pembuatan: new Date('2025-01-30'),
      tanggal_pembuatan_original: '30 Januari 2025',
      lokasi_pekerjaan: 'Jakarta Selatan',
      satuan_kerja: 'DINAS PERHUBUNGAN',
      jenis_pengadaan: 'Jasa Lainnya',
      html_content: sampleHtml,
      status: 'active'
    };

    const createdTender = await TenderService.create(tenderWithHtml);
    console.log('✅ Tender with HTML created:', {
      id: createdTender.id,
      kode_paket: createdTender.kode_paket,
      hasHtmlContent: !!createdTender.html_content
    });

    // 2. Get tender with HTML content
    console.log('\n2. Retrieving tender with HTML content...');
    const tenderWithHtmlContent = await TenderService.getByIdWithHtml(createdTender.id);
    console.log('✅ Tender with HTML retrieved:', {
      id: tenderWithHtmlContent?.id,
      htmlContentSize: tenderWithHtmlContent?.html_content_size,
      htmlContentHash: tenderWithHtmlContent?.html_content_hash?.substring(0, 16) + '...',
      hasTitle: tenderWithHtmlContent?.html_content?.includes('<title>')
    });

    // 3. HTML Processing Examples
    console.log('\n3. HTML Processing Examples...');
    
    // Process HTML content
    const htmlInfo = HtmlProcessor.processHtmlContent(sampleHtml);
    console.log('✅ HTML processed:', {
      size: htmlInfo.size,
      hash: htmlInfo.hash.substring(0, 16) + '...',
      updatedAt: htmlInfo.updated_at
    });

    // Get HTML statistics
    const htmlStats = HtmlProcessor.getContentStats(sampleHtml);
    console.log('✅ HTML statistics:', {
      size: htmlStats.size,
      lineCount: htmlStats.lineCount,
      wordCount: htmlStats.wordCount,
      tagCount: htmlStats.tagCount,
      hasTitle: htmlStats.hasTitle,
      hasMetaDescription: htmlStats.hasMetaDescription
    });

    // Extract title and meta description
    const title = HtmlProcessor.extractTitle(sampleHtml);
    const metaDescription = HtmlProcessor.extractMetaDescription(sampleHtml);
    console.log('✅ Extracted content:', {
      title,
      metaDescription
    });

    // 4. Update HTML content
    console.log('\n4. Updating HTML content...');
    const updatedHtml = sampleHtml.replace('Test Project', 'Updated Test Project');
    const updatedTender = await TenderService.updateHtmlContent(createdTender.id, updatedHtml);
    console.log('✅ HTML content updated:', {
      id: updatedTender?.id,
      newSize: updatedTender?.html_content_size
    });

    // 5. HTML Content Validation
    console.log('\n5. HTML Content Validation...');
    
    // Validate HTML content
    const validation = HtmlProcessor.validateHtmlContent(updatedHtml);
    console.log('✅ HTML validation:', {
      isValid: validation.isValid,
      errors: validation.errors
    });

    // Compare HTML contents
    const comparison = HtmlProcessor.compareContents(sampleHtml, updatedHtml);
    console.log('✅ HTML comparison:', {
      isIdentical: comparison.isIdentical,
      sizeDiff: comparison.sizeDiff
    });

    // 6. HTML Content Statistics
    console.log('\n6. Getting HTML content statistics...');
    const htmlContentStats = await TenderService.getHtmlContentStats();
    console.log('✅ HTML content statistics:', {
      totalTenders: htmlContentStats.totalTenders,
      withHtmlContent: htmlContentStats.withHtmlContent,
      withFilePathOnly: htmlContentStats.withFilePathOnly,
      withoutHtml: htmlContentStats.withoutHtml,
      totalHtmlSize: htmlContentStats.totalHtmlSize,
      averageHtmlSize: htmlContentStats.averageHtmlSize
    });

    // 7. HTML Content Integrity Check
    console.log('\n7. Validating HTML content integrity...');
    const integrityCheck = await TenderService.validateHtmlIntegrity();
    console.log('✅ HTML integrity check:', {
      valid: integrityCheck.valid,
      invalid: integrityCheck.invalid,
      errorsCount: integrityCheck.errors.length
    });

    // 8. HTML Sanitization
    console.log('\n8. HTML Sanitization...');
    const maliciousHtml = `
    <html>
    <head><title>Malicious Content</title></head>
    <body>
        <h1>Safe Content</h1>
        <script>alert('XSS Attack!');</script>
        <p onclick="alert('Click Attack!')">Click me</p>
        <a href="javascript:alert('Link Attack!')">Dangerous Link</a>
    </body>
    </html>
    `;

    const sanitizedHtml = HtmlProcessor.sanitizeHtmlContent(maliciousHtml);
    console.log('✅ HTML sanitized:', {
      originalSize: maliciousHtml.length,
      sanitizedSize: sanitizedHtml.length,
      hasScript: sanitizedHtml.includes('<script>'),
      hasOnclick: sanitizedHtml.includes('onclick'),
      hasJavascript: sanitizedHtml.includes('javascript:')
    });

    // 9. HTML Compression
    console.log('\n9. HTML Compression...');
    const compressedHtml = HtmlProcessor.compressHtml(sampleHtml);
    console.log('✅ HTML compressed:', {
      originalSize: sampleHtml.length,
      compressedSize: compressedHtml.length,
      compressionRatio: ((sampleHtml.length - compressedHtml.length) / sampleHtml.length * 100).toFixed(2) + '%'
    });

    // 10. Cleanup - Delete test tender
    console.log('\n10. Cleaning up...');
    const deleted = await TenderService.delete(createdTender.id);
    console.log('✅ Test tender deleted:', deleted);

    console.log('\n🎉 HTML operations example completed successfully!');

  } catch (error) {
    console.error('❌ Error in HTML operations example:', error);
  }
}

// Run the example
if (require.main === module) {
  htmlOperationsExample();
}

export { htmlOperationsExample };
