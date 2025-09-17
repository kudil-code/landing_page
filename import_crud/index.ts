/**
 * Tender CRUD Export Package - Main Entry Point
 * Complete CRUD implementation for Tender Management System
 */

// Export all services
export { TenderService, MetadataService } from './services';

// Export all types
export type {
  Tender,
  TenderCreate,
  TenderUpdate,
  TenderFilters,
  TenderStats,
  TenderWithHtml,
  TenderFormData,
  Metadata,
  TenderCategory,
  Organization,
  Location,
  User,
  AuditLog,
  ApiResponse,
  PaginationParams,
  HtmlContentInfo
} from './types';

// Export all utilities
export {
  HtmlProcessor,
  HtmlFileOperations,
  parseCurrency,
  formatCurrency,
  parseIndonesianDate,
  parseXMLTenderData,
  parseXMLTenderDataWithHtml,
  validateTenderData,
  sanitizeHtml,
  generateHtmlFilePath,
  extractTenderCodeFromFilename,
  tenderToCSV,
  findHtmlFileForTender,
  loadHtmlContent,
  batchLoadHtmlContent,
  generateHtmlFileMapping,
  validateHtmlContentIntegrity,
  parseXMLFile
} from './utils';

// Export database utilities
export {
  testConnection,
  executeQuery,
  executeTransaction,
  getSingleRow,
  getConnection,
  closePool
} from './database/database';

// Export examples
export { basicCrudExample } from './examples/basic-crud';
export { htmlOperationsExample } from './examples/html-operations';
export { dataImportExample } from './examples/data-import';

// Package information
export const PACKAGE_INFO = {
  name: 'tender-crud-export',
  version: '1.0.0',
  description: 'Complete CRUD package for Tender Management System',
  features: [
    'Complete CRUD operations',
    'HTML content management',
    'MySQL database integration',
    'Data import/export',
    'Advanced filtering and search',
    'Statistics and analytics',
    'TypeScript support',
    'Comprehensive examples'
  ]
};

// Quick start function
export async function quickStart() {
  console.log('🚀 Tender CRUD Export Package - Quick Start');
  console.log('==========================================');
  console.log('');
  console.log('📦 Package:', PACKAGE_INFO.name, 'v' + PACKAGE_INFO.version);
  console.log('📝 Description:', PACKAGE_INFO.description);
  console.log('');
  console.log('✨ Features:');
  PACKAGE_INFO.features.forEach(feature => {
    console.log('  •', feature);
  });
  console.log('');
  console.log('📚 Documentation:');
  console.log('  • README.md - Main documentation');
  console.log('  • INSTALLATION.md - Setup guide');
  console.log('  • examples/ - Usage examples');
  console.log('');
  console.log('🔧 Quick Setup:');
  console.log('  1. npm install mysql2');
  console.log('  2. Setup database: mysql -u root -p < database/schema.sql');
  console.log('  3. Configure environment variables');
  console.log('  4. Import and use: import { TenderService } from "./services"');
  console.log('');
  console.log('📖 Examples:');
  console.log('  • npx ts-node examples/basic-crud.ts');
  console.log('  • npx ts-node examples/html-operations.ts');
  console.log('  • npx ts-node examples/data-import.ts');
  console.log('');
  console.log('🎉 Ready to use!');
}

// Auto-run quick start if this file is executed directly
if (require.main === module) {
  quickStart();
}
