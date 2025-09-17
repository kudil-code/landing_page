import { TenderCreate } from '../types/types';
import { HtmlProcessor } from './html-processor';

// Parse Indonesian currency format to number
export function parseCurrency(currencyString: string): number {
  if (!currencyString) return 0;
  
  // Remove "Rp." prefix and commas, then parse
  const cleaned = currencyString
    .replace(/Rp\.\s*/g, '')
    .replace(/\./g, '') // Remove thousand separators
    .replace(/,/g, '') // Remove decimal separators
    .trim();
  
  return parseFloat(cleaned) || 0;
}

// Format number to Indonesian currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

// Parse Indonesian date format to Date object
export function parseIndonesianDate(dateString: string): Date {
  if (!dateString) return new Date();
  
  // Map Indonesian month names to numbers
  const monthMap: { [key: string]: number } = {
    'januari': 0, 'februari': 1, 'maret': 2, 'april': 3,
    'mei': 4, 'juni': 5, 'juli': 6, 'agustus': 7,
    'september': 8, 'oktober': 9, 'november': 10, 'desember': 11
  };

  // Parse format like "15 Juli 2025"
  const parts = dateString.toLowerCase().trim().split(' ');
  if (parts.length === 3) {
    const day = parseInt(parts[0]);
    const monthName = parts[1];
    const year = parseInt(parts[2]);
    
    const month = monthMap[monthName];
    if (month !== undefined) {
      return new Date(year, month, day);
    }
  }
  
  // Fallback to standard date parsing
  return new Date(dateString);
}

// Parse XML tender data
export function parseXMLTenderData(xmlData: any): TenderCreate[] {
  const tenders: TenderCreate[] = [];
  
  if (xmlData.data_paket_lpse && xmlData.data_paket_lpse.paket) {
    const pakets = Array.isArray(xmlData.data_paket_lpse.paket) 
      ? xmlData.data_paket_lpse.paket 
      : [xmlData.data_paket_lpse.paket];

    for (const paket of pakets) {
      const tender: TenderCreate = {
        kode_paket: paket.kode_paket || '',
        nama_paket: paket.nama_paket || '',
        nilai_paket: parseCurrency(paket.nilai_paket || '0'),
        nilai_paket_formatted: paket.nilai_paket || 'Rp. 0,00',
        tanggal_pembuatan: parseIndonesianDate(paket.tanggal_pembuatan || ''),
        tanggal_pembuatan_original: paket.tanggal_pembuatan || '',
        lokasi_pekerjaan: paket.lokasi_pekerjaan || '',
        satuan_kerja: paket.satuan_kerja || '',
        jenis_pengadaan: paket.jenis_pengadaan || '',
        status: 'active'
      };
      
      tenders.push(tender);
    }
  }
  
  return tenders;
}

// Parse XML tender data with HTML content
export async function parseXMLTenderDataWithHtml(xmlData: any, htmlFilesPath?: string): Promise<TenderCreate[]> {
  const tenders: TenderCreate[] = [];
  
  if (xmlData.data_paket_lpse && xmlData.data_paket_lpse.paket) {
    const pakets = Array.isArray(xmlData.data_paket_lpse.paket) 
      ? xmlData.data_paket_lpse.paket 
      : [xmlData.data_paket_lpse.paket];

    for (const paket of pakets) {
      const tender: TenderCreate = {
        kode_paket: paket.kode_paket || '',
        nama_paket: paket.nama_paket || '',
        nilai_paket: parseCurrency(paket.nilai_paket || '0'),
        nilai_paket_formatted: paket.nilai_paket || 'Rp. 0,00',
        tanggal_pembuatan: parseIndonesianDate(paket.tanggal_pembuatan || ''),
        tanggal_pembuatan_original: paket.tanggal_pembuatan || '',
        lokasi_pekerjaan: paket.lokasi_pekerjaan || '',
        satuan_kerja: paket.satuan_kerja || '',
        jenis_pengadaan: paket.jenis_pengadaan || '',
        status: 'active'
      };

      // Try to load HTML content if file path is provided
      if (htmlFilesPath && paket.kode_paket) {
        try {
          const htmlFilePath = await findHtmlFileForTender(paket.kode_paket, htmlFilesPath);
          if (htmlFilePath) {
            tender.html_file_path = htmlFilePath;
            // Optionally load HTML content directly
            // tender.html_content = await loadHtmlContent(htmlFilePath);
          }
        } catch (error) {
          console.warn(`Failed to find HTML file for tender ${paket.kode_paket}:`, error);
        }
      }
      
      tenders.push(tender);
    }
  }
  
  return tenders;
}

// Validate tender data
export function validateTenderData(data: Partial<TenderCreate>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.kode_paket || data.kode_paket.trim() === '') {
    errors.push('Kode paket is required');
  }

  if (!data.nama_paket || data.nama_paket.trim() === '') {
    errors.push('Nama paket is required');
  }

  if (!data.nilai_paket || data.nilai_paket <= 0) {
    errors.push('Nilai paket must be greater than 0');
  }

  if (!data.tanggal_pembuatan) {
    errors.push('Tanggal pembuatan is required');
  }

  if (!data.lokasi_pekerjaan || data.lokasi_pekerjaan.trim() === '') {
    errors.push('Lokasi pekerjaan is required');
  }

  if (!data.satuan_kerja || data.satuan_kerja.trim() === '') {
    errors.push('Satuan kerja is required');
  }

  if (!data.jenis_pengadaan || data.jenis_pengadaan.trim() === '') {
    errors.push('Jenis pengadaan is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Sanitize HTML content
export function sanitizeHtml(html: string): string {
  // Basic HTML sanitization - remove potentially dangerous tags and attributes
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/javascript:/gi, '');
}

// Generate HTML file path from tender data
export function generateHtmlFilePath(tender: TenderCreate): string {
  const sanitizedKode = tender.kode_paket.replace(/[^a-zA-Z0-9]/g, '_');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '');
  return `data_test/${sanitizedKode}_${timestamp}.html`;
}

// Extract tender code from HTML filename
export function extractTenderCodeFromFilename(filename: string): string | null {
  // Pattern: indramayukab_nontender_10261077000_pengumumanpl_20250729_163102.html
  const match = filename.match(/indramayukab_nontender_(\d+)_/);
  return match ? match[1] : null;
}

// Convert tender data to CSV format
export function tenderToCSV(tenders: any[]): string {
  if (tenders.length === 0) return '';
  
  const headers = [
    'Kode Paket', 'Nama Paket', 'Nilai Paket', 'Tanggal Pembuatan',
    'Lokasi Pekerjaan', 'Satuan Kerja', 'Jenis Pengadaan', 'Status'
  ];
  
  const rows = tenders.map(tender => [
    tender.kode_paket,
    `"${tender.nama_paket}"`,
    tender.nilai_paket_formatted,
    tender.tanggal_pembuatan_original,
    `"${tender.lokasi_pekerjaan}"`,
    `"${tender.satuan_kerja}"`,
    `"${tender.jenis_pengadaan}"`,
    tender.status
  ]);
  
  return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
}

// Find HTML file for a specific tender
export async function findHtmlFileForTender(kodePaket: string, htmlFilesPath: string): Promise<string | null> {
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const files = await fs.readdir(htmlFilesPath);
    const htmlFiles = files.filter(file => file.endsWith('.html'));
    
    // Look for file that contains the tender code
    for (const file of htmlFiles) {
      if (file.includes(kodePaket)) {
        return path.join(htmlFilesPath, file);
      }
    }
    
    return null;
  } catch (error) {
    throw new Error(`Failed to find HTML file for tender ${kodePaket}: ${error}`);
  }
}

// Load HTML content from file
export async function loadHtmlContent(filePath: string): Promise<string> {
  try {
    const fs = await import('fs/promises');
    const content = await fs.readFile(filePath, 'utf-8');
    return HtmlProcessor.sanitizeHtmlContent(content);
  } catch (error) {
    throw new Error(`Failed to load HTML content from ${filePath}: ${error}`);
  }
}

// Batch load HTML content for multiple tenders
export async function batchLoadHtmlContent(tenders: TenderCreate[], htmlFilesPath: string): Promise<{
  success: TenderCreate[];
  failed: { tender: TenderCreate; error: string }[];
}> {
  const success: TenderCreate[] = [];
  const failed: { tender: TenderCreate; error: string }[] = [];

  for (const tender of tenders) {
    try {
      if (tender.kode_paket) {
        const htmlFilePath = await findHtmlFileForTender(tender.kode_paket, htmlFilesPath);
        if (htmlFilePath) {
          tender.html_file_path = htmlFilePath;
          // Optionally load HTML content directly
          // tender.html_content = await loadHtmlContent(htmlFilePath);
          success.push(tender);
        } else {
          failed.push({
            tender,
            error: 'HTML file not found'
          });
        }
      }
    } catch (error) {
      failed.push({
        tender,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  return { success, failed };
}

// Generate HTML file mapping from directory
export async function generateHtmlFileMapping(htmlFilesPath: string): Promise<Map<string, string>> {
  const mapping = new Map<string, string>();
  
  try {
    const fs = await import('fs/promises');
    const files = await fs.readdir(htmlFilesPath);
    const htmlFiles = files.filter(file => file.endsWith('.html'));
    
    for (const file of htmlFiles) {
      const tenderCode = extractTenderCodeFromFilename(file);
      if (tenderCode) {
        mapping.set(tenderCode, file);
      }
    }
  } catch (error) {
    console.error('Failed to generate HTML file mapping:', error);
  }
  
  return mapping;
}

// Validate HTML content integrity
export function validateHtmlContentIntegrity(content: string, expectedHash?: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  try {
    const validation = HtmlProcessor.validateHtmlContent(content);
    if (!validation.isValid) {
      errors.push(...validation.errors);
    }
    
    if (expectedHash) {
      const actualHash = HtmlProcessor.calculateHash(content);
      if (actualHash !== expectedHash) {
        errors.push('HTML content hash mismatch');
      }
    }
  } catch (error) {
    errors.push(`Validation error: ${error}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
