import { parseXMLTenderData } from './data-parser';
import { TenderCreate } from '../../types/types';

// Parse XML file content
export async function parseXMLFile(fileContent: string): Promise<TenderCreate[]> {
  try {
    // Simple XML parsing - in production, you might want to use a proper XML parser
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(fileContent, 'text/xml');
    
    // Check for parsing errors
    const parseError = xmlDoc.querySelector('parsererror');
    if (parseError) {
      throw new Error('Invalid XML format');
    }

    // Extract paket elements
    const pakets = xmlDoc.querySelectorAll('paket');
    const tenders: TenderCreate[] = [];

    pakets.forEach((paket) => {
      const tender: TenderCreate = {
        kode_paket: paket.querySelector('kode_paket')?.textContent || '',
        nama_paket: paket.querySelector('nama_paket')?.textContent || '',
        nilai_paket: parseCurrency(paket.querySelector('nilai_paket')?.textContent || '0'),
        nilai_paket_formatted: paket.querySelector('nilai_paket')?.textContent || 'Rp. 0,00',
        tanggal_pembuatan: parseIndonesianDate(paket.querySelector('tanggal_pembuatan')?.textContent || ''),
        tanggal_pembuatan_original: paket.querySelector('tanggal_pembuatan')?.textContent || '',
        lokasi_pekerjaan: paket.querySelector('lokasi_pekerjaan')?.textContent || '',
        satuan_kerja: paket.querySelector('satuan_kerja')?.textContent || '',
        jenis_pengadaan: paket.querySelector('jenis_pengadaan')?.textContent || '',
        status: 'active'
      };

      tenders.push(tender);
    });

    return tenders;
  } catch (error) {
    console.error('Error parsing XML:', error);
    throw new Error('Failed to parse XML file');
  }
}

// Helper function to parse currency (moved from data-parser for browser compatibility)
function parseCurrency(currencyString: string): number {
  if (!currencyString) return 0;
  
  const cleaned = currencyString
    .replace(/Rp\.\s*/g, '')
    .replace(/\./g, '')
    .replace(/,/g, '')
    .trim();
  
  return parseFloat(cleaned) || 0;
}

// Helper function to parse Indonesian date (moved from data-parser for browser compatibility)
function parseIndonesianDate(dateString: string): Date {
  if (!dateString) return new Date();
  
  const monthMap: { [key: string]: number } = {
    'januari': 0, 'februari': 1, 'maret': 2, 'april': 3,
    'mei': 4, 'juni': 5, 'juli': 6, 'agustus': 7,
    'september': 8, 'oktober': 9, 'november': 10, 'desember': 11
  };

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
  
  return new Date(dateString);
}
