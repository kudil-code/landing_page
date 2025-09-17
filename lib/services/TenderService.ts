import { executeQuery, getSingleRow } from '../database/database';
import { Tender, TenderCreate, TenderUpdate, TenderFilters, TenderStats, TenderWithHtml, HtmlContentInfo } from '../../types/types';
import { HtmlProcessor } from '../utils/html-processor';

export class TenderService {
  // Create a new tender
  static async create(tenderData: TenderCreate): Promise<Tender> {
    // Process HTML content if provided
    let htmlContentInfo: HtmlContentInfo | null = null;
    if (tenderData.html_content) {
      htmlContentInfo = HtmlProcessor.processHtmlContent(tenderData.html_content);
    }

    const query = `
      INSERT INTO tenders (
        kode_paket, nama_paket, nilai_paket, nilai_paket_formatted,
        tanggal_pembuatan, tanggal_pembuatan_original, lokasi_pekerjaan,
        satuan_kerja, jenis_pengadaan, metadata_id, html_file_path, 
        html_content, html_content_size, html_content_hash, html_content_updated_at, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const params = [
      tenderData.kode_paket,
      tenderData.nama_paket,
      tenderData.nilai_paket,
      tenderData.nilai_paket_formatted,
      tenderData.tanggal_pembuatan,
      tenderData.tanggal_pembuatan_original,
      tenderData.lokasi_pekerjaan,
      tenderData.satuan_kerja,
      tenderData.jenis_pengadaan,
      tenderData.metadata_id || null,
      tenderData.html_file_path || null,
      htmlContentInfo?.content || null,
      htmlContentInfo?.size || null,
      htmlContentInfo?.hash || null,
      htmlContentInfo?.updated_at || null,
      tenderData.status || 'active'
    ];

    const result = await executeQuery<{ insertId: number }>(query, params);
    const created = await this.getById(result.insertId);
    if (!created) {
      throw new Error('Failed to create tender');
    }
    return created;
  }

  // Get tender by ID
  static async getById(id: number): Promise<Tender | null> {
    const query = 'SELECT * FROM tender_summary WHERE id = ?';
    return await getSingleRow<Tender>(query, [id]);
  }

  // Get tender by kode_paket
  static async getByKodePaket(kode_paket: string): Promise<Tender | null> {
    const query = 'SELECT * FROM tender_summary WHERE kode_paket = ?';
    return await getSingleRow<Tender>(query, [kode_paket]);
  }

  // Get tender with HTML content
  static async getByIdWithHtml(id: number): Promise<TenderWithHtml | null> {
    const query = 'CALL GetTenderWithHtmlContent(?)';
    const result = await executeQuery<TenderWithHtml[]>(query, [id]);
    return result[0] || null;
  }

  // Get tender with HTML content by kode_paket
  static async getByKodePaketWithHtml(kode_paket: string): Promise<TenderWithHtml | null> {
    const query = `
      SELECT 
        t.*,
        t.html_content,
        t.html_content_size,
        t.html_content_hash,
        t.html_content_updated_at
      FROM tenders t
      WHERE t.kode_paket = ?
    `;
    return await getSingleRow<TenderWithHtml>(query, [kode_paket]);
  }

  // Get all tenders with filters and pagination
  static async getAll(filters: TenderFilters = {}): Promise<{
    tenders: Tender[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'created_at',
      sortOrder = 'desc',
      search,
      satuan_kerja,
      jenis_pengadaan,
      status,
      dateFrom,
      dateTo,
      minValue,
      maxValue
    } = filters;

    const offset = (page - 1) * limit;
    const whereConditions: string[] = [];
    const params: unknown[] = [];

    // Build WHERE conditions
    if (search) {
      whereConditions.push(`(nama_paket LIKE ? OR kode_paket LIKE ? OR lokasi_pekerjaan LIKE ?)`);
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (satuan_kerja) {
      whereConditions.push('satuan_kerja = ?');
      params.push(satuan_kerja);
    }

    if (jenis_pengadaan) {
      whereConditions.push('jenis_pengadaan = ?');
      params.push(jenis_pengadaan);
    }

    if (status) {
      whereConditions.push('status = ?');
      params.push(status);
    }

    if (dateFrom) {
      whereConditions.push('tanggal_pembuatan >= ?');
      params.push(dateFrom);
    }

    if (dateTo) {
      whereConditions.push('tanggal_pembuatan <= ?');
      params.push(dateTo);
    }

    if (minValue !== undefined) {
      whereConditions.push('nilai_paket >= ?');
      params.push(minValue);
    }

    if (maxValue !== undefined) {
      whereConditions.push('nilai_paket <= ?');
      params.push(maxValue);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM tender_summary ${whereClause}`;
    const countResult = await getSingleRow<{ total: number }>(countQuery, params);
    const total = countResult?.total || 0;

    // Get paginated results
    const query = `
      SELECT * FROM tender_summary 
      ${whereClause}
      ORDER BY ${sortBy} ${sortOrder.toUpperCase()}
      LIMIT ? OFFSET ?
    `;
    
    const tenders = await executeQuery<Tender[]>(query, [...params, limit, offset]);
    const totalPages = Math.ceil(total / limit);

    return {
      tenders,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    };
  }

  // Update tender
  static async update(id: number, tenderData: Partial<TenderUpdate>): Promise<Tender | null> {
    const fields: string[] = [];
    const params: unknown[] = [];

    // Process HTML content if provided
    if (tenderData.html_content) {
      const htmlContentInfo = HtmlProcessor.processHtmlContent(tenderData.html_content);
      fields.push('html_content = ?', 'html_content_size = ?', 'html_content_hash = ?', 'html_content_updated_at = ?');
      params.push(htmlContentInfo.content, htmlContentInfo.size, htmlContentInfo.hash, htmlContentInfo.updated_at);
    }

    // Build dynamic update query for other fields
    Object.entries(tenderData).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'html_content' && value !== undefined) {
        fields.push(`${key} = ?`);
        params.push(value);
      }
    });

    if (fields.length === 0) {
      const existing = await this.getById(id);
      if (!existing) {
        throw new Error('Tender not found');
      }
      return existing;
    }

    fields.push('updated_at = CURRENT_TIMESTAMP');
    params.push(id);
    const query = `UPDATE tenders SET ${fields.join(', ')} WHERE id = ?`;
    
    await executeQuery(query, params);
    const updated = await this.getById(id);
    if (!updated) {
      throw new Error('Failed to update tender');
    }
    return updated;
  }

  // Update HTML content only
  static async updateHtmlContent(id: number, htmlContent: string): Promise<Tender | null> {
    const htmlContentInfo = HtmlProcessor.processHtmlContent(htmlContent);
    
    const query = 'CALL UpdateTenderHtmlContent(?, ?, ?, ?)';
    await executeQuery(query, [id, htmlContentInfo.content, htmlContentInfo.size, htmlContentInfo.hash]);
    
    const updated = await this.getById(id);
    if (!updated) {
      throw new Error('Failed to update tender HTML content');
    }
    return updated;
  }

  // Save HTML content from file path
  static async saveHtmlFromFile(id: number, filePath: string): Promise<Tender | null> {
    try {
      const fs = await import('fs/promises');
      const content = await fs.readFile(filePath, 'utf-8');
      return await this.updateHtmlContent(id, content);
    } catch (error) {
      throw new Error(`Failed to read HTML file: ${error}`);
    }
  }

  // Delete tender
  static async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM tenders WHERE id = ?';
    const result = await executeQuery<{ affectedRows: number }>(query, [id]);
    return result.affectedRows > 0;
  }

  // Get statistics
  static async getStats(): Promise<TenderStats> {
    // Total count and value
    const totalQuery = 'SELECT COUNT(*) as total, SUM(nilai_paket) as totalValue FROM tenders WHERE status = "active"';
    const totalResult = await getSingleRow<{ total: number; totalValue: number }>(totalQuery);

    // By category
    const categoryQuery = `
      SELECT jenis_pengadaan as category, COUNT(*) as count, SUM(nilai_paket) as totalValue
      FROM tenders 
      WHERE status = "active"
      GROUP BY jenis_pengadaan
      ORDER BY totalValue DESC
    `;
    const byCategory = await executeQuery<{ category: string; count: number; totalValue: number }[]>(categoryQuery);

    // By organization
    const organizationQuery = `
      SELECT satuan_kerja as organization, COUNT(*) as count, SUM(nilai_paket) as totalValue
      FROM tenders 
      WHERE status = "active"
      GROUP BY satuan_kerja
      ORDER BY totalValue DESC
    `;
    const byOrganization = await executeQuery<{ organization: string; count: number; totalValue: number }[]>(organizationQuery);

    // By month
    const monthQuery = `
      SELECT 
        DATE_FORMAT(tanggal_pembuatan, '%Y-%m') as month,
        COUNT(*) as count,
        SUM(nilai_paket) as totalValue
      FROM tenders 
      WHERE status = "active"
      GROUP BY DATE_FORMAT(tanggal_pembuatan, '%Y-%m')
      ORDER BY month DESC
      LIMIT 12
    `;
    const byMonth = await executeQuery<{ month: string; count: number; totalValue: number }[]>(monthQuery);

    return {
      total: totalResult?.total || 0,
      totalValue: totalResult?.totalValue || 0,
      byCategory,
      byOrganization,
      byMonth
    };
  }

  // Get unique values for filters
  static async getFilterOptions(): Promise<{
    organizations: string[];
    categories: string[];
    statuses: string[];
  }> {
    const orgQuery = 'SELECT DISTINCT satuan_kerja FROM tenders ORDER BY satuan_kerja';
    const categoryQuery = 'SELECT DISTINCT jenis_pengadaan FROM tenders ORDER BY jenis_pengadaan';
    const statusQuery = 'SELECT DISTINCT status FROM tenders ORDER BY status';

    const [organizations, categories, statuses] = await Promise.all([
      executeQuery<{ satuan_kerja: string }[]>(orgQuery),
      executeQuery<{ jenis_pengadaan: string }[]>(categoryQuery),
      executeQuery<{ status: string }[]>(statusQuery)
    ]);

    return {
      organizations: organizations.map(org => org.satuan_kerja),
      categories: categories.map(cat => cat.jenis_pengadaan),
      statuses: statuses.map(stat => stat.status)
    };
  }

  // Bulk import from XML data
  static async bulkImport(tendersData: TenderCreate[]): Promise<{ success: number; failed: number }> {
    let success = 0;
    let failed = 0;

    for (const tenderData of tendersData) {
      try {
        await this.create(tenderData);
        success++;
      } catch (error) {
        console.error('Failed to import tender:', tenderData.kode_paket, error);
        failed++;
      }
    }

    return { success, failed };
  }

  // Bulk update HTML content from file paths
  static async bulkUpdateHtmlFromFiles(): Promise<{
    success: number;
    failed: number;
    errors: { tenderId: number; error: string }[];
  }> {
    const tenders = await executeQuery<Tender[]>(
      'SELECT id, html_file_path FROM tenders WHERE html_file_path IS NOT NULL AND html_content IS NULL'
    );

    let success = 0;
    let failed = 0;
    const errors: { tenderId: number; error: string }[] = [];

    for (const tender of tenders) {
      try {
        if (tender.html_file_path) {
          await this.saveHtmlFromFile(tender.id, tender.html_file_path);
          success++;
        }
      } catch (error) {
        failed++;
        errors.push({
          tenderId: tender.id,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return { success, failed, errors };
  }

  // Get HTML content statistics
  static async getHtmlContentStats(): Promise<{
    totalTenders: number;
    withHtmlContent: number;
    withFilePathOnly: number;
    withoutHtml: number;
    totalHtmlSize: number;
    averageHtmlSize: number;
  }> {
    const statsQuery = `
      SELECT 
        COUNT(*) as total_tenders,
        COUNT(html_content) as with_html_content,
        COUNT(CASE WHEN html_file_path IS NOT NULL AND html_content IS NULL THEN 1 END) as with_file_path_only,
        COUNT(CASE WHEN html_file_path IS NULL AND html_content IS NULL THEN 1 END) as without_html,
        COALESCE(SUM(html_content_size), 0) as total_html_size,
        COALESCE(AVG(html_content_size), 0) as average_html_size
      FROM tenders
    `;

    const result = await getSingleRow<{
      total_tenders: number;
      with_html_content: number;
      with_file_path_only: number;
      without_html: number;
      total_html_size: number;
      average_html_size: number;
    }>(statsQuery);

    return {
      totalTenders: result?.total_tenders || 0,
      withHtmlContent: result?.with_html_content || 0,
      withFilePathOnly: result?.with_file_path_only || 0,
      withoutHtml: result?.without_html || 0,
      totalHtmlSize: result?.total_html_size || 0,
      averageHtmlSize: Math.round(result?.average_html_size || 0)
    };
  }

  // Validate HTML content integrity
  static async validateHtmlIntegrity(): Promise<{
    valid: number;
    invalid: number;
    errors: { tenderId: number; error: string }[];
  }> {
    const tenders = await executeQuery<Tender[]>(
      'SELECT id, html_content, html_content_hash FROM tenders WHERE html_content IS NOT NULL'
    );

    let valid = 0;
    let invalid = 0;
    const errors: { tenderId: number; error: string }[] = [];

    for (const tender of tenders) {
      try {
        if (tender.html_content && tender.html_content_hash) {
          const calculatedHash = HtmlProcessor.calculateHash(tender.html_content);
          if (calculatedHash === tender.html_content_hash) {
            valid++;
          } else {
            invalid++;
            errors.push({
              tenderId: tender.id,
              error: 'HTML content hash mismatch'
            });
          }
        }
      } catch (error) {
        invalid++;
        errors.push({
          tenderId: tender.id,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return { valid, invalid, errors };
  }
}
