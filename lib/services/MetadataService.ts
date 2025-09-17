import { executeQuery, getSingleRow } from '../database/database';
import { Metadata } from '../../types/types';

export class MetadataService {
  // Create metadata record
  static async create(metadata: Omit<Metadata, 'id' | 'created_at' | 'updated_at'>): Promise<Metadata> {
    const query = `
      INSERT INTO metadata (tanggal_ekstraksi, sumber, total_paket)
      VALUES (?, ?, ?)
    `;
    
    const params = [metadata.tanggal_ekstraksi, metadata.sumber, metadata.total_paket];
    const result = await executeQuery<{ insertId: number }>(query, params);
    
    const created = await this.getById(result.insertId);
    if (!created) {
      throw new Error('Failed to create metadata');
    }
    return created;
  }

  // Get metadata by ID
  static async getById(id: number): Promise<Metadata | null> {
    const query = 'SELECT * FROM metadata WHERE id = ?';
    return await getSingleRow<Metadata>(query, [id]);
  }

  // Get all metadata records
  static async getAll(): Promise<Metadata[]> {
    const query = 'SELECT * FROM metadata ORDER BY tanggal_ekstraksi DESC';
    return await executeQuery<Metadata[]>(query);
  }

  // Get latest metadata
  static async getLatest(): Promise<Metadata | null> {
    const query = 'SELECT * FROM metadata ORDER BY tanggal_ekstraksi DESC LIMIT 1';
    return await getSingleRow<Metadata>(query);
  }

  // Update metadata
  static async update(id: number, metadata: Partial<Omit<Metadata, 'id' | 'created_at' | 'updated_at'>>): Promise<Metadata | null> {
    const fields: string[] = [];
    const params: unknown[] = [];

    Object.entries(metadata).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = ?`);
        params.push(value);
      }
    });

    if (fields.length === 0) {
      const existing = await this.getById(id);
      if (!existing) {
        throw new Error('Metadata not found');
      }
      return existing;
    }

    params.push(id);
    const query = `UPDATE metadata SET ${fields.join(', ')} WHERE id = ?`;
    
    await executeQuery(query, params);
    const updated = await this.getById(id);
    if (!updated) {
      throw new Error('Failed to update metadata');
    }
    return updated;
  }

  // Delete metadata
  static async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM metadata WHERE id = ?';
    const result = await executeQuery<{ affectedRows: number }>(query, [id]);
    return result.affectedRows > 0;
  }
}
