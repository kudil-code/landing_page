const { executeQuery, getSingleRow } = require('../database/database.js');

class TenderService {
  // Create a new tender
  static async create(tenderData) {
    const query = `
      INSERT INTO tenders (
        kode_paket, nama_paket, nilai_paket, nilai_paket_formatted,
        tanggal_pembuatan, tanggal_pembuatan_original, lokasi_pekerjaan,
        satuan_kerja, jenis_pengadaan, metadata_id, html_file_path, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      tenderData.status || 'active'
    ];

    const result = await executeQuery(query, params);
    return await this.getById(result.insertId);
  }

  // Get tender by ID
  static async getById(id) {
    const query = 'SELECT * FROM tender_summary WHERE id = ?';
    return await getSingleRow(query, [id]);
  }

  // Get tender by kode_paket
  static async getByKodePaket(kode_paket) {
    const query = 'SELECT * FROM tender_summary WHERE kode_paket = ?';
    return await getSingleRow(query, [kode_paket]);
  }

  // Get all tenders with filters and pagination
  static async getAll(filters = {}) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'created_at',
      sortOrder = 'desc',
      search,
      satuan_kerja,
      jenis_pengadaan,
      status
    } = filters;

    const offset = (page - 1) * limit;
    let whereConditions = [];
    let params = [];

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

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM tender_summary ${whereClause}`;
    const countResult = await getSingleRow(countQuery, params);
    const total = countResult?.total || 0;

    // Get paginated results
    const query = `
      SELECT * FROM tender_summary 
      ${whereClause}
      ORDER BY ${sortBy} ${sortOrder.toUpperCase()}
      LIMIT ? OFFSET ?
    `;
    
    const tenders = await executeQuery(query, [...params, limit, offset]);
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
  static async update(id, tenderData) {
    const fields = [];
    const params = [];

    // Build dynamic update query
    Object.entries(tenderData).forEach(([key, value]) => {
      if (key !== 'id' && value !== undefined) {
        fields.push(`${key} = ?`);
        params.push(value);
      }
    });

    if (fields.length === 0) {
      return await this.getById(id);
    }

    fields.push('updated_at = CURRENT_TIMESTAMP');
    params.push(id);
    const query = `UPDATE tenders SET ${fields.join(', ')} WHERE id = ?`;
    
    await executeQuery(query, params);
    return await this.getById(id);
  }

  // Delete tender
  static async delete(id) {
    const query = 'DELETE FROM tenders WHERE id = ?';
    const result = await executeQuery(query, [id]);
    return result.affectedRows > 0;
  }

  // Get statistics
  static async getStats() {
    // Total count and value
    const totalQuery = 'SELECT COUNT(*) as total, SUM(nilai_paket) as totalValue FROM tenders WHERE status = "active"';
    const totalResult = await getSingleRow(totalQuery);

    // By category
    const categoryQuery = `
      SELECT jenis_pengadaan as category, COUNT(*) as count, SUM(nilai_paket) as totalValue
      FROM tenders 
      WHERE status = "active"
      GROUP BY jenis_pengadaan
      ORDER BY totalValue DESC
    `;
    const byCategory = await executeQuery(categoryQuery);

    // By organization
    const organizationQuery = `
      SELECT satuan_kerja as organization, COUNT(*) as count, SUM(nilai_paket) as totalValue
      FROM tenders 
      WHERE status = "active"
      GROUP BY satuan_kerja
      ORDER BY totalValue DESC
    `;
    const byOrganization = await executeQuery(organizationQuery);

    return {
      total: totalResult?.total || 0,
      totalValue: totalResult?.totalValue || 0,
      byCategory,
      byOrganization
    };
  }

  // Get unique values for filters
  static async getFilterOptions() {
    const orgQuery = 'SELECT DISTINCT satuan_kerja FROM tenders ORDER BY satuan_kerja';
    const categoryQuery = 'SELECT DISTINCT jenis_pengadaan FROM tenders ORDER BY jenis_pengadaan';
    const statusQuery = 'SELECT DISTINCT status FROM tenders ORDER BY status';

    const [organizations, categories, statuses] = await Promise.all([
      executeQuery(orgQuery),
      executeQuery(categoryQuery),
      executeQuery(statusQuery)
    ]);

    return {
      organizations: organizations.map(org => org.satuan_kerja),
      categories: categories.map(cat => cat.jenis_pengadaan),
      statuses: statuses.map(stat => stat.status)
    };
  }
}

module.exports = { TenderService };
