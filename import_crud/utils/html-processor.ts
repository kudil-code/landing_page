import crypto from 'crypto';
import { HtmlContentInfo } from '../types/types';

/**
 * HTML Content Processing Utilities
 * Handles HTML content validation, hashing, and processing
 */

export class HtmlProcessor {
  /**
   * Calculate SHA256 hash of HTML content
   */
  static calculateHash(content: string): string {
    return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
  }

  /**
   * Calculate size of HTML content in bytes
   */
  static calculateSize(content: string): number {
    return Buffer.byteLength(content, 'utf8');
  }

  /**
   * Validate HTML content
   */
  static validateHtmlContent(content: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!content || content.trim().length === 0) {
      errors.push('HTML content cannot be empty');
    }

    if (content.length > 10 * 1024 * 1024) { // 10MB limit
      errors.push('HTML content exceeds maximum size limit (10MB)');
    }

    // Basic HTML structure validation
    if (!content.includes('<html') && !content.includes('<HTML')) {
      errors.push('Content does not appear to be valid HTML');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Process HTML content and return structured info
   */
  static processHtmlContent(content: string): HtmlContentInfo {
    const validation = this.validateHtmlContent(content);
    
    if (!validation.isValid) {
      throw new Error(`Invalid HTML content: ${validation.errors.join(', ')}`);
    }

    const size = this.calculateSize(content);
    const hash = this.calculateHash(content);

    return {
      content,
      size,
      hash,
      updated_at: new Date()
    };
  }

  /**
   * Sanitize HTML content (basic cleaning)
   */
  static sanitizeHtmlContent(content: string): string {
    // Remove potential security risks
    let sanitized = content
      // Remove script tags
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      // Remove javascript: protocols
      .replace(/javascript:/gi, '')
      // Remove on* event handlers
      .replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '')
      // Remove data: URLs that might contain scripts
      .replace(/data:text\/html/gi, 'data:text/plain');

    return sanitized;
  }

  /**
   * Extract title from HTML content
   */
  static extractTitle(content: string): string | null {
    const titleMatch = content.match(/<title[^>]*>([^<]*)<\/title>/i);
    return titleMatch ? titleMatch[1].trim() : null;
  }

  /**
   * Extract meta description from HTML content
   */
  static extractMetaDescription(content: string): string | null {
    const metaMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
    return metaMatch ? metaMatch[1].trim() : null;
  }

  /**
   * Get HTML content statistics
   */
  static getContentStats(content: string): {
    size: number;
    lineCount: number;
    wordCount: number;
    tagCount: number;
    hasTitle: boolean;
    hasMetaDescription: boolean;
  } {
    const lines = content.split('\n');
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0);
    const tags = content.match(/<[^>]+>/g) || [];

    return {
      size: this.calculateSize(content),
      lineCount: lines.length,
      wordCount: words.length,
      tagCount: tags.length,
      hasTitle: this.extractTitle(content) !== null,
      hasMetaDescription: this.extractMetaDescription(content) !== null
    };
  }

  /**
   * Compare two HTML contents for changes
   */
  static compareContents(content1: string, content2: string): {
    isIdentical: boolean;
    hash1: string;
    hash2: string;
    sizeDiff: number;
  } {
    const hash1 = this.calculateHash(content1);
    const hash2 = this.calculateHash(content2);
    const size1 = this.calculateSize(content1);
    const size2 = this.calculateSize(content2);

    return {
      isIdentical: hash1 === hash2,
      hash1,
      hash2,
      sizeDiff: size2 - size1
    };
  }

  /**
   * Compress HTML content (basic minification)
   */
  static compressHtml(content: string): string {
    return content
      // Remove comments
      .replace(/<!--[\s\S]*?-->/g, '')
      // Remove extra whitespace
      .replace(/\s+/g, ' ')
      // Remove whitespace around tags
      .replace(/>\s+</g, '><')
      .trim();
  }

  /**
   * Check if HTML content needs to be updated
   */
  static needsUpdate(currentContent: string, newContent: string): boolean {
    const currentHash = this.calculateHash(currentContent);
    const newHash = this.calculateHash(newContent);
    return currentHash !== newHash;
  }
}

/**
 * HTML File Operations
 */
export class HtmlFileOperations {
  /**
   * Read HTML file and process it
   */
  static async readAndProcessHtmlFile(filePath: string): Promise<HtmlContentInfo> {
    try {
      const fs = await import('fs/promises');
      const content = await fs.readFile(filePath, 'utf-8');
      return HtmlProcessor.processHtmlContent(content);
    } catch (error) {
      throw new Error(`Failed to read HTML file: ${error}`);
    }
  }

  /**
   * Batch process multiple HTML files
   */
  static async batchProcessHtmlFiles(filePaths: string[]): Promise<{
    success: HtmlContentInfo[];
    failed: { filePath: string; error: string }[];
  }> {
    const success: HtmlContentInfo[] = [];
    const failed: { filePath: string; error: string }[] = [];

    for (const filePath of filePaths) {
      try {
        const result = await this.readAndProcessHtmlFile(filePath);
        success.push(result);
      } catch (error) {
        failed.push({
          filePath,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return { success, failed };
  }
}
