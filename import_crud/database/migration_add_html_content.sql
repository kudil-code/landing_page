-- Migration Script: Add HTML Content Support to Existing Database
-- Run this script on your existing database to add HTML content columns

USE tender_management;

-- Add new columns to tenders table
ALTER TABLE tenders 
ADD COLUMN html_content LONGTEXT NULL COMMENT 'HTML content stored in database',
ADD COLUMN html_content_size INT NULL COMMENT 'Size of HTML content in bytes',
ADD COLUMN html_content_hash VARCHAR(64) NULL COMMENT 'SHA256 hash for integrity check',
ADD COLUMN html_content_updated_at TIMESTAMP NULL COMMENT 'When HTML content was last updated';

-- Add indexes for better performance
CREATE INDEX idx_tenders_html_hash ON tenders(html_content_hash);
CREATE INDEX idx_tenders_html_updated ON tenders(html_content_updated_at);

-- Update the tender_summary view to include new columns
DROP VIEW IF EXISTS tender_summary;

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

-- Add new stored procedures for HTML content management
DELIMITER //

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

CREATE PROCEDURE GetHtmlContentStats()
BEGIN
    SELECT 
        COUNT(*) as total_tenders,
        COUNT(html_content) as with_html_content,
        COUNT(CASE WHEN html_file_path IS NOT NULL AND html_content IS NULL THEN 1 END) as with_file_path_only,
        COUNT(CASE WHEN html_file_path IS NULL AND html_content IS NULL THEN 1 END) as without_html,
        COALESCE(SUM(html_content_size), 0) as total_html_size,
        COALESCE(AVG(html_content_size), 0) as average_html_size
    FROM tenders;
END //

CREATE PROCEDURE ValidateHtmlIntegrity()
BEGIN
    SELECT 
        t.id,
        t.kode_paket,
        t.html_content_hash,
        SHA2(t.html_content, 256) as calculated_hash,
        CASE 
            WHEN t.html_content_hash = SHA2(t.html_content, 256) THEN 'VALID'
            ELSE 'INVALID'
        END as integrity_status
    FROM tenders t
    WHERE t.html_content IS NOT NULL;
END //

DELIMITER ;

-- Update audit triggers to include HTML content fields
DELIMITER //

DROP TRIGGER IF EXISTS tender_audit_update //

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
            'jenis_pengadaan', OLD.jenis_pengadaan,
            'html_content_size', OLD.html_content_size,
            'html_content_hash', OLD.html_content_hash
        ),
        JSON_OBJECT(
            'kode_paket', NEW.kode_paket,
            'nama_paket', NEW.nama_paket,
            'nilai_paket', NEW.nilai_paket,
            'tanggal_pembuatan', NEW.tanggal_pembuatan,
            'lokasi_pekerjaan', NEW.lokasi_pekerjaan,
            'satuan_kerja', NEW.satuan_kerja,
            'jenis_pengadaan', NEW.jenis_pengadaan,
            'html_content_size', NEW.html_content_size,
            'html_content_hash', NEW.html_content_hash
        )
    );
END //

DELIMITER ;

-- Create a function to calculate HTML content hash
DELIMITER //

CREATE FUNCTION CalculateHtmlHash(html_content LONGTEXT) 
RETURNS VARCHAR(64)
READS SQL DATA
DETERMINISTIC
BEGIN
    RETURN SHA2(html_content, 256);
END //

DELIMITER ;

-- Create a function to get HTML content size
DELIMITER //

CREATE FUNCTION GetHtmlContentSize(html_content LONGTEXT) 
RETURNS INT
READS SQL DATA
DETERMINISTIC
BEGIN
    RETURN CHAR_LENGTH(html_content);
END //

DELIMITER ;

-- Add comments to the new columns
ALTER TABLE tenders 
MODIFY COLUMN html_content LONGTEXT NULL COMMENT 'HTML content stored in database - supports up to 4GB',
MODIFY COLUMN html_content_size INT NULL COMMENT 'Size of HTML content in bytes - calculated automatically',
MODIFY COLUMN html_content_hash VARCHAR(64) NULL COMMENT 'SHA256 hash for integrity check - calculated automatically',
MODIFY COLUMN html_content_updated_at TIMESTAMP NULL COMMENT 'When HTML content was last updated - set automatically';

-- Create a view for HTML content statistics
CREATE VIEW html_content_stats AS
SELECT 
    COUNT(*) as total_tenders,
    COUNT(html_content) as with_html_content,
    COUNT(CASE WHEN html_file_path IS NOT NULL AND html_content IS NULL THEN 1 END) as with_file_path_only,
    COUNT(CASE WHEN html_file_path IS NULL AND html_content IS NULL THEN 1 END) as without_html,
    COALESCE(SUM(html_content_size), 0) as total_html_size_bytes,
    ROUND(COALESCE(SUM(html_content_size), 0) / 1024, 2) as total_html_size_kb,
    ROUND(COALESCE(SUM(html_content_size), 0) / 1024 / 1024, 2) as total_html_size_mb,
    ROUND(COALESCE(AVG(html_content_size), 0), 2) as average_html_size_bytes,
    ROUND(COALESCE(AVG(html_content_size), 0) / 1024, 2) as average_html_size_kb
FROM tenders;

-- Create a view for tenders with HTML content issues
CREATE VIEW html_content_issues AS
SELECT 
    t.id,
    t.kode_paket,
    t.nama_paket,
    t.html_file_path,
    t.html_content_size,
    t.html_content_hash,
    CASE 
        WHEN t.html_file_path IS NOT NULL AND t.html_content IS NULL THEN 'FILE_EXISTS_NO_CONTENT'
        WHEN t.html_file_path IS NULL AND t.html_content IS NULL THEN 'NO_HTML_DATA'
        WHEN t.html_content IS NOT NULL AND t.html_content_hash != SHA2(t.html_content, 256) THEN 'HASH_MISMATCH'
        ELSE 'OK'
    END as issue_type,
    t.created_at,
    t.updated_at
FROM tenders t
WHERE 
    (t.html_file_path IS NOT NULL AND t.html_content IS NULL) OR
    (t.html_file_path IS NULL AND t.html_content IS NULL) OR
    (t.html_content IS NOT NULL AND t.html_content_hash != SHA2(t.html_content, 256));

-- Grant permissions (adjust as needed for your setup)
-- GRANT EXECUTE ON PROCEDURE GetTenderWithHtmlContent TO 'tender_user'@'localhost';
-- GRANT EXECUTE ON PROCEDURE UpdateTenderHtmlContent TO 'tender_user'@'localhost';
-- GRANT EXECUTE ON PROCEDURE GetHtmlContentStats TO 'tender_user'@'localhost';
-- GRANT EXECUTE ON PROCEDURE ValidateHtmlIntegrity TO 'tender_user'@'localhost';
-- GRANT EXECUTE ON FUNCTION CalculateHtmlHash TO 'tender_user'@'localhost';
-- GRANT EXECUTE ON FUNCTION GetHtmlContentSize TO 'tender_user'@'localhost';

COMMIT;

-- Display migration summary
SELECT 
    'Migration completed successfully!' as status,
    NOW() as completed_at,
    (SELECT COUNT(*) FROM tenders) as total_tenders,
    (SELECT COUNT(*) FROM tenders WHERE html_content IS NOT NULL) as tenders_with_html_content;
