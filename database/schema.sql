-- Tender Information Database Schema
-- For MySQL/MariaDB (XAMPP)
-- Created for LPSE (Layanan Pengadaan Secara Elektronik) Tender Management

-- Create database
CREATE DATABASE IF NOT EXISTS tender_management 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE tender_management;

-- Create metadata table for tracking data extraction
CREATE TABLE IF NOT EXISTS metadata (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tanggal_ekstraksi DATE NOT NULL,
    sumber VARCHAR(255) NOT NULL,
    total_paket INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create main tenders/paket table
CREATE TABLE IF NOT EXISTS tenders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kode_paket VARCHAR(50) UNIQUE NOT NULL,
    nama_paket TEXT NOT NULL,
    nilai_paket DECIMAL(15,2) NOT NULL,
    nilai_paket_formatted VARCHAR(100) NOT NULL, -- Store original formatted value
    tanggal_pembuatan DATE NOT NULL,
    tanggal_pembuatan_original VARCHAR(100) NOT NULL, -- Store original date format
    lokasi_pekerjaan VARCHAR(500) NOT NULL,
    satuan_kerja VARCHAR(255) NOT NULL,
    jenis_pengadaan VARCHAR(255) NOT NULL,
    metadata_id INT,
    html_file_path VARCHAR(500), -- Path to original HTML file (for fallback)
    html_content LONGTEXT NULL, -- HTML content stored in database
    html_content_size INT NULL, -- Size of HTML content in bytes
    html_content_hash VARCHAR(64) NULL, -- SHA256 hash for integrity check
    html_content_updated_at TIMESTAMP NULL, -- When HTML content was last updated
    status ENUM('active', 'inactive', 'completed', 'cancelled') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_kode_paket (kode_paket),
    INDEX idx_satuan_kerja (satuan_kerja),
    INDEX idx_jenis_pengadaan (jenis_pengadaan),
    INDEX idx_tanggal_pembuatan (tanggal_pembuatan),
    INDEX idx_status (status),
    FOREIGN KEY (metadata_id) REFERENCES metadata(id) ON DELETE SET NULL
);

-- Create categories table for jenis_pengadaan
CREATE TABLE IF NOT EXISTS tender_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create organizations table for satuan_kerja
CREATE TABLE IF NOT EXISTS organizations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    organization_name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create locations table for lokasi_pekerjaan
CREATE TABLE IF NOT EXISTS locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    location_name VARCHAR(500) UNIQUE NOT NULL,
    district VARCHAR(255),
    city VARCHAR(255),
    province VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create audit log table for tracking changes
CREATE TABLE IF NOT EXISTS audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    table_name VARCHAR(100) NOT NULL,
    record_id INT NOT NULL,
    action ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
    old_values JSON,
    new_values JSON,
    user_id INT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_table_record (table_name, record_id),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at)
);

-- Create users table for system access
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user', 'viewer') DEFAULT 'user',
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- Insert sample data for categories
INSERT INTO tender_categories (category_name, description) VALUES
('Pekerjaan Konstruksi', 'Construction work and building projects'),
('Pengadaan Barang', 'Goods procurement'),
('Jasa Lainnya', 'Other services'),
('Jasa Konsultansi Badan Usaha Konstruksi', 'Construction consulting services');

-- Insert sample organizations based on XML data
INSERT INTO organizations (organization_name, description) VALUES
('DINAS PERHUBUNGAN', 'Transportation Department'),
('DINAS PEKERJAAN UMUM DAN PENATAAN RUANG', 'Public Works and Spatial Planning Department'),
('DINAS PARIWISATA, PEMUDA DAN OLAHRAGA', 'Tourism, Youth and Sports Department'),
('DINAS KETAHANAN PANGAN DAN PERTANIAN', 'Food Security and Agriculture Department'),
('BADAN KEUANGAN DAN ASET DAERAH', 'Regional Financial and Asset Agency');

-- Insert sample locations
INSERT INTO locations (location_name, district, city, province) VALUES
('Kabupaten Indramayu - Indramayu (Kab.)', 'Indramayu', 'Indramayu', 'Jawa Barat'),
('Kec. Balongan - Indramayu (Kab.)', 'Balongan', 'Indramayu', 'Jawa Barat'),
('Desa Kroya - Indramayu (Kab.)', 'Kroya', 'Indramayu', 'Jawa Barat'),
('Desa Ujunggebang - Indramayu (Kab.)', 'Sukra', 'Indramayu', 'Jawa Barat'),
('Wilayah Kabupaten Indramayu - Indramayu (Kab.)', 'Indramayu', 'Indramayu', 'Jawa Barat'),
('DKPP Indramayu - Indramayu (Kab.)', 'Indramayu', 'Indramayu', 'Jawa Barat'),
('kec. Indramayu - Indramayu (Kab.)', 'Indramayu', 'Indramayu', 'Jawa Barat');

-- Create indexes for better performance
CREATE INDEX idx_tenders_metadata ON tenders(metadata_id);
CREATE INDEX idx_tenders_created_at ON tenders(created_at);
CREATE INDEX idx_tenders_updated_at ON tenders(updated_at);
CREATE INDEX idx_tenders_html_hash ON tenders(html_content_hash);
CREATE INDEX idx_tenders_html_updated ON tenders(html_content_updated_at);

-- Create views for common queries
CREATE VIEW tender_summary AS
SELECT 
    t.id,
    t.kode_paket,
    t.nama_paket,
    t.nilai_paket,
    t.nilai_paket_formatted,
    t.tanggal_pembuatan,
    t.lokasi_pekerjaan,
    t.satuan_kerja,
    t.jenis_pengadaan,
    t.html_file_path,
    t.html_content_size,
    t.html_content_hash,
    t.html_content_updated_at,
    t.status,
    t.created_at,
    t.updated_at,
    m.tanggal_ekstraksi,
    m.sumber as data_source
FROM tenders t
LEFT JOIN metadata m ON t.metadata_id = m.id;

-- Create stored procedures for common operations
DELIMITER //

CREATE PROCEDURE GetTendersByOrganization(IN org_name VARCHAR(255))
BEGIN
    SELECT * FROM tender_summary 
    WHERE satuan_kerja = org_name 
    ORDER BY tanggal_pembuatan DESC;
END //

CREATE PROCEDURE GetTendersByCategory(IN category VARCHAR(255))
BEGIN
    SELECT * FROM tender_summary 
    WHERE jenis_pengadaan = category 
    ORDER BY nilai_paket DESC;
END //

CREATE PROCEDURE GetTendersByDateRange(IN start_date DATE, IN end_date DATE)
BEGIN
    SELECT * FROM tender_summary 
    WHERE tanggal_pembuatan BETWEEN start_date AND end_date 
    ORDER BY tanggal_pembuatan DESC;
END //

CREATE PROCEDURE GetTenderWithHtmlContent(IN tender_id INT)
BEGIN
    SELECT 
        t.*,
        t.html_content,
        t.html_content_size,
        t.html_content_hash,
        t.html_content_updated_at
    FROM tenders t
    WHERE t.id = tender_id;
END //

CREATE PROCEDURE UpdateTenderHtmlContent(
    IN tender_id INT,
    IN html_content LONGTEXT,
    IN content_size INT,
    IN content_hash VARCHAR(64)
)
BEGIN
    UPDATE tenders 
    SET 
        html_content = html_content,
        html_content_size = content_size,
        html_content_hash = content_hash,
        html_content_updated_at = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = tender_id;
END //

DELIMITER ;

-- Insert sample metadata
INSERT INTO metadata (tanggal_ekstraksi, sumber, total_paket) VALUES
('2025-01-29', 'LPSE Kabupaten Indramayu', 9);

-- Insert sample tender data from XML
INSERT INTO tenders (
    kode_paket, nama_paket, nilai_paket, nilai_paket_formatted, 
    tanggal_pembuatan, tanggal_pembuatan_original, lokasi_pekerjaan, 
    satuan_kerja, jenis_pengadaan, metadata_id, html_file_path
) VALUES
('10261077000', 'Pemeliharaan Alat Bengkel dan Alat Ukur- Alat Penguji Kendaraan Bermotor', 150000000.00, 'Rp. 150.000.000,00', '2025-07-15', '15 Juli 2025', 'Kabupaten Indramayu - Indramayu (Kab.)', 'DINAS PERHUBUNGAN', 'Jasa Lainnya', 1, 'data_test/indramayukab_nontender_10261077000_pengumumanpl_20250729_163102.html'),

('10282259000', 'Rehabilitasi Jalan Desa Sudimampir Lor 2 Kec. Balongan', 192212700.00, 'Rp. 192.212.700,00', '2025-07-24', '24 Juli 2025', 'Kec. Balongan - Indramayu (Kab.)', 'DINAS PEKERJAAN UMUM DAN PENATAAN RUANG', 'Pekerjaan Konstruksi', 1, 'data_test/indramayukab_nontender_10282259000_pengumumanpl_20250729_163100.html'),

('10283844000', 'Pengembangan Penerangan Jaringan Umum (PJU) di Desa Kroya Kec. Kroya (Musrenbang)', 124700800.00, 'Rp. 124.700.800,00', '2025-07-25', '25 Juli 2025', 'Desa Kroya - Indramayu (Kab.)', 'DINAS PERHUBUNGAN', 'Pekerjaan Konstruksi', 1, 'data_test/indramayukab_nontender_10283844000_pengumumanpl_20250729_163058.html'),

('10283849000', 'Pengembangan Penerangan Jaringan Umum (PJU) di Desa Ujunggebang Kec. Sukra (Musrenbang)', 124700800.00, 'Rp. 124.700.800,00', '2025-07-25', '25 Juli 2025', 'Desa Ujunggebang - Indramayu (Kab.)', 'DINAS PERHUBUNGAN', 'Pekerjaan Konstruksi', 1, 'data_test/indramayukab_nontender_10283849000_pengumumanpl_20250729_163055.html'),

('10283854000', 'Pengembangan Penerangan Jaringan Umum (PJU) di Kelurahan Karanganyar Kec. Indramayu (Musrenbang)', 124700800.00, 'Rp. 124.700.800,00', '2025-07-25', '25 Juli 2025', 'Kabupaten Indramayu - Indramayu (Kab.)', 'DINAS PERHUBUNGAN', 'Pekerjaan Konstruksi', 1, 'data_test/indramayukab_nontender_10283854000_pengumumanpl_20250729_163053.html'),

('10287549000', 'Pengawasan Teknis Fisik Konstruksi Pembangunan/Peningkatan Lapangan Voli Desa Rancasari Kec. Bangodua', 4660800.00, 'Rp. 4.660.800,00', '2025-07-28', '28 Juli 2025', 'Wilayah Kabupaten Indramayu - Indramayu (Kab.)', 'DINAS PARIWISATA, PEMUDA DAN OLAHRAGA', 'Jasa Konsultansi Badan Usaha Konstruksi', 1, 'data_test/indramayukab_nontender_10287549000_pengumumanpl_20250729_163106.html'),

('10287671000', 'Belanja Jasa Konsultansi Pengawasan Pemeliharaan Bangunan Gedung Kantor', 9000000.00, 'Rp. 9.000.000,00', '2025-07-28', '28 Juli 2025', 'DKPP Indramayu - Indramayu (Kab.)', 'DINAS KETAHANAN PANGAN DAN PERTANIAN', 'Jasa Konsultansi Badan Usaha Konstruksi', 1, 'data_test/indramayukab_nontender_10287671000_pengumumanpl_20250729_163104.html'),

('10287802000', 'Pembangunan/Peningkatan Lapangan Voli Desa Rancasari Kec. Bangodua', 90000000.00, 'Rp. 90.000.000,00', '2025-07-28', '28 Juli 2025', 'Wilayah Kabupaten Indramayu - Indramayu (Kab.)', 'DINAS PARIWISATA, PEMUDA DAN OLAHRAGA', 'Pekerjaan Konstruksi', 1, 'data_test/indramayukab_nontender_10287802000_pengumumanpl_20250729_163051.html'),

('10290336000', 'Belanja Alat/Bahan untuk Kegiatan Kantor- Bahan Cetak', 53669500.00, 'Rp. 53.669.500,00', '2025-07-29', '29 Juli 2025', 'kec. Indramayu - Indramayu (Kab.)', 'BADAN KEUANGAN DAN ASET DAERAH', 'Pengadaan Barang', 1, 'data_test/indramayukab_nontender_10290336000_pengumumanpl_20250729_163049.html');

-- Create default admin user (password: admin123 - change this in production!)
INSERT INTO users (username, email, password_hash, full_name, role) VALUES
('admin', 'admin@tender.local', '$2b$10$rOZ8Q8Q8Q8Q8Q8Q8Q8Q8QO8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q', 'System Administrator', 'admin');

-- Create triggers for audit logging
DELIMITER //

CREATE TRIGGER tender_audit_insert
    AFTER INSERT ON tenders
    FOR EACH ROW
BEGIN
    INSERT INTO audit_logs (table_name, record_id, action, new_values)
    VALUES ('tenders', NEW.id, 'INSERT', JSON_OBJECT(
        'kode_paket', NEW.kode_paket,
        'nama_paket', NEW.nama_paket,
        'nilai_paket', NEW.nilai_paket,
        'tanggal_pembuatan', NEW.tanggal_pembuatan,
        'lokasi_pekerjaan', NEW.lokasi_pekerjaan,
        'satuan_kerja', NEW.satuan_kerja,
        'jenis_pengadaan', NEW.jenis_pengadaan
    ));
END //

CREATE TRIGGER tender_audit_update
    AFTER UPDATE ON tenders
    FOR EACH ROW
BEGIN
    INSERT INTO audit_logs (table_name, record_id, action, old_values, new_values)
    VALUES ('tenders', NEW.id, 'UPDATE', 
        JSON_OBJECT(
            'kode_paket', OLD.kode_paket,
            'nama_paket', OLD.nama_paket,
            'nilai_paket', OLD.nilai_paket,
            'tanggal_pembuatan', OLD.tanggal_pembuatan,
            'lokasi_pekerjaan', OLD.lokasi_pekerjaan,
            'satuan_kerja', OLD.satuan_kerja,
            'jenis_pengadaan', OLD.jenis_pengadaan
        ),
        JSON_OBJECT(
            'kode_paket', NEW.kode_paket,
            'nama_paket', NEW.nama_paket,
            'nilai_paket', NEW.nilai_paket,
            'tanggal_pembuatan', NEW.tanggal_pembuatan,
            'lokasi_pekerjaan', NEW.lokasi_pekerjaan,
            'satuan_kerja', NEW.satuan_kerja,
            'jenis_pengadaan', NEW.jenis_pengadaan
        )
    );
END //

CREATE TRIGGER tender_audit_delete
    AFTER DELETE ON tenders
    FOR EACH ROW
BEGIN
    INSERT INTO audit_logs (table_name, record_id, action, old_values)
    VALUES ('tenders', OLD.id, 'DELETE', JSON_OBJECT(
        'kode_paket', OLD.kode_paket,
        'nama_paket', OLD.nama_paket,
        'nilai_paket', OLD.nilai_paket,
        'tanggal_pembuatan', OLD.tanggal_pembuatan,
        'lokasi_pekerjaan', OLD.lokasi_pekerjaan,
        'satuan_kerja', OLD.satuan_kerja,
        'jenis_pengadaan', OLD.jenis_pengadaan
    ));
END //

DELIMITER ;

-- Grant permissions (adjust as needed for your setup)
-- GRANT ALL PRIVILEGES ON tender_management.* TO 'tender_user'@'localhost' IDENTIFIED BY 'tender_password';
-- FLUSH PRIVILEGES;

COMMIT;
