import { keccak256, toHex, toBytes } from 'viem';

// FHE utility functions for Content Matrix
// Note: In a real implementation, these would use actual FHE libraries
// For now, we'll use deterministic hashing as a placeholder

export class FHEUtils {
  /**
   * Encrypt a string value using FHE (placeholder implementation)
   * In real implementation, this would use actual FHE encryption
   */
  static encryptString(value: string): string {
    if (!value) return '0x0000000000000000000000000000000000000000000000000000000000000000';
    
    // Create a deterministic hash of the string
    const hash = keccak256(toBytes(value));
    return hash;
  }

  /**
   * Encrypt a number value using FHE (placeholder implementation)
   * In real implementation, this would use actual FHE encryption
   */
  static encryptNumber(value: number): string {
    if (value === 0) return '0x0000000000000000000000000000000000000000000000000000000000000000';
    
    // Convert number to bytes and hash
    const valueBytes = toBytes(value);
    const hash = keccak256(valueBytes);
    return hash;
  }

  /**
   * Decrypt a string value (demo implementation)
   * In real implementation, this would use actual FHE decryption
   * For demo purposes, we'll return realistic sample data based on hash patterns
   */
  static decryptString(encryptedValue: string): string {
    // This is a demo implementation - in real FHE, you'd need the private key
    if (encryptedValue === '0x0000000000000000000000000000000000000000000000000000000000000000') {
      return '';
    }
    
    // Check if this is a hex-encoded string (starts with 0x and has even length)
    if (encryptedValue.startsWith('0x') && encryptedValue.length > 2) {
      try {
        // Convert hex to bytes
        const bytes = toBytes(encryptedValue);
        // Convert bytes to string, removing null bytes
        const decoded = new TextDecoder('utf-8').decode(bytes).replace(/\0/g, '');
        // Return the decoded string if it's not empty and contains printable characters or emojis
        if (decoded.trim().length > 0 && /^[\x20-\x7E\s\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]*$/u.test(decoded)) {
          return decoded.trim();
        }
      } catch (error) {
        // If decoding fails, fall back to pattern matching
      }
    }
    
    // For demo purposes, return realistic sample data based on hash patterns
    // This simulates what the real FHE decryption would return
    const hash = encryptedValue.toLowerCase();
    
    // Category names - return realistic category names
    const categoryNames = ['Technology', 'Education', 'Business', 'Health & Wellness', 'Entertainment', 'Science'];
    const categoryIndex = parseInt(hash.slice(2, 4), 16) % categoryNames.length;
    
    // Author names - return realistic author names
    const authorNames = ['Alex Chen', 'Dr. Sarah Johnson', 'Mike Rodriguez', 'Dr. Lisa Wang', 'James Thompson'];
    const authorIndex = parseInt(hash.slice(4, 6), 16) % authorNames.length;
    
    // Content titles - return realistic content titles
    const contentTitles = [
      'Building Scalable Web Applications with React and Node.js',
      'Introduction to Machine Learning and AI',
      'Digital Marketing Strategies for 2024',
      'Healthy Living: Nutrition and Exercise Guide',
      'Blockchain Technology: A Comprehensive Overview',
      'Advanced Data Structures and Algorithms',
      'Sustainable Business Practices',
      'Mental Health and Wellness in the Digital Age'
    ];
    const contentIndex = parseInt(hash.slice(6, 8), 16) % contentTitles.length;
    
    // Content types
    const contentTypes = ['Article', 'Video', 'Audio', 'Document', 'Software', 'Dataset'];
    const typeIndex = parseInt(hash.slice(8, 10), 16) % contentTypes.length;
    
    // Icons
    const icons = ['💻', '📚', '💼', '🏥', '🎬', '🔬'];
    const iconIndex = parseInt(hash.slice(10, 12), 16) % icons.length;
    
    // Colors
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
    const colorIndex = parseInt(hash.slice(12, 14), 16) % colors.length;
    
    // Languages
    const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'];
    const languageIndex = parseInt(hash.slice(14, 16), 16) % languages.length;
    
    // Return appropriate data based on context (we'll use a simple heuristic)
    if (hash.includes('3169ce6442acdc8192ea935cfc09f6110dc31899379717f3b43c3b9045a27dd2') || 
        hash.includes('512ab3c6b9869577bd4474c56b88f9e3f1c40c54d18e8e5a2329821254d362d2') ||
        hash.includes('76f68a75f01ed76f5a02ada71a3765a38ef2c45ba99106ee5a4bd5678d7bbdd0') ||
        hash.includes('5756dcd3488f836cb709605e23fe6821352c823ebfc2b276b1f315700fbe1273') ||
        hash.includes('ceaa553e838fb9f12e3e473ec6a8fe0c53329041cdee871874a3e4b2769e36ea')) {
      return categoryNames[categoryIndex];
    }
    
    if (hash.includes('a3e78e27395b9976174d9324d064b3f65e1ebba5b412f2b635eded2de7f5a1c2') ||
        hash.includes('8ba347f3a18e17c1ad571310a0a4396670130810875f2b4cd93181e0fb3889bc') ||
        hash.includes('863b045709b57065d2e13b94e08052a00dd140617ad85a5811ea3234341c4450') ||
        hash.includes('deefb489a6a0026d5090194a129a739b772a32ee63d11883f66c1b6a25c14bc8') ||
        hash.includes('26645de9306b15b27d6d56689aa33540d201eb2f3f1aa5f034eb01c69d794379')) {
      return authorNames[authorIndex];
    }
    
    if (hash.includes('87c26fc7473d2aee7b32bcec9a7c1b6b25dccc4b69ee126c4f51a013a5f11287') ||
        hash.includes('e05c0d0f3fbba67919fb8e5e5aa74616452a65d6fd41e12cb53dc24e435a9eba') ||
        hash.includes('4d5821ca5ca31184af8c3e8367961b4f25c9f415a3b5c2e233370e0248dcec9d') ||
        hash.includes('4f873bf8bc60853e57b43767f8923f3bdc2b5535437271a633c9605454e1ebba') ||
        hash.includes('8b2407b2b2a6bef96d1e1f066f808015e2e5aa40b72d0a3f247b47ec7ebecfa9')) {
      return contentTitles[contentIndex];
    }
    
    // Default to category names for most cases
    return categoryNames[categoryIndex];
  }

  /**
   * Decrypt a number value (demo implementation)
   * In real implementation, this would use actual FHE decryption
   */
  static decryptNumber(encryptedValue: string): number {
    // This is a demo implementation - in real FHE, you'd need the private key
    if (encryptedValue === '0x0000000000000000000000000000000000000000000000000000000000000000') {
      return 0;
    }
    
    // For demo purposes, return sample numbers based on hash patterns
    const hash = encryptedValue.toLowerCase();
    
    // Sample content counts
    if (hash.includes('636f6e74656e74') || hash.includes('636f756e74')) {
      return Math.floor(Math.random() * 10); // Random 0-9
    }
    
    // Sample subcategory counts
    if (hash.includes('737562') || hash.includes('63617465676f7279')) {
      return Math.floor(Math.random() * 5); // Random 0-4
    }
    
    // Default fallback
    return 0;
  }

  /**
   * Create encrypted content data structure
   */
  static createEncryptedContentData(data: {
    title: string;
    description: string;
    contentType: string;
    contentHash: string;
    author: string;
    category: string;
    tags: string;
    language: string;
    contentData: string;
    fileSize: number;
    contentMatrix: string;
  }) {
    return {
      encryptedTitle: this.encryptString(data.title),
      encryptedDescription: this.encryptString(data.description),
      encryptedContentType: this.encryptString(data.contentType),
      encryptedContentHash: this.encryptString(data.contentHash),
      encryptedAuthor: this.encryptString(data.author),
      encryptedCategory: this.encryptString(data.category),
      encryptedTags: this.encryptString(data.tags),
      encryptedLanguage: this.encryptString(data.language),
      encryptedContentData: this.encryptString(data.contentData),
      encryptedFileSize: data.fileSize, // This would be euint32 in contract
      encryptedContentMatrix: this.encryptString(data.contentMatrix),
    };
  }

  /**
   * Create encrypted category data structure
   */
  static createEncryptedCategoryData(data: {
    name: string;
    description: string;
    type: string;
    icon: string;
    color: string;
    hash: string;
  }) {
    return {
      encryptedCategoryName: this.encryptString(data.name),
      encryptedCategoryDescription: this.encryptString(data.description),
      encryptedCategoryType: this.encryptString(data.type),
      encryptedCategoryIcon: this.encryptString(data.icon),
      encryptedCategoryColor: this.encryptString(data.color),
      encryptedCategoryHash: this.encryptString(data.hash),
    };
  }

  /**
   * Create encrypted author data structure
   */
  static createEncryptedAuthorData(data: {
    name: string;
    email: string;
    bio: string;
    avatar: string;
    website: string;
    social: string;
    hash: string;
  }) {
    return {
      encryptedAuthorName: this.encryptString(data.name),
      encryptedAuthorEmail: this.encryptString(data.email),
      encryptedAuthorBio: this.encryptString(data.bio),
      encryptedAuthorAvatar: this.encryptString(data.avatar),
      encryptedAuthorWebsite: this.encryptString(data.website),
      encryptedAuthorSocial: this.encryptString(data.social),
      encryptedAuthorHash: this.encryptString(data.hash),
    };
  }

  /**
   * Generate a unique hash for content
   */
  static generateContentHash(content: string, metadata: string): string {
    const combined = content + metadata + Date.now().toString();
    return keccak256(toBytes(combined));
  }

  /**
   * Generate a unique hash for category
   */
  static generateCategoryHash(name: string, description: string): string {
    const combined = name + description + Date.now().toString();
    return keccak256(toBytes(combined));
  }

  /**
   * Generate a unique hash for author
   */
  static generateAuthorHash(name: string, email: string): string {
    const combined = name + email + Date.now().toString();
    return keccak256(toBytes(combined));
  }

  /**
   * Convert content type enum to string
   */
  static getContentTypeString(type: number): string {
    const types = ['Article', 'Video', 'Audio', 'Document', 'Software', 'Dataset'];
    return types[type] || 'Unknown';
  }

  /**
   * Convert access level enum to string
   */
  static getAccessLevelString(level: number): string {
    const levels = ['', 'Basic', 'Premium', 'Enterprise', 'Custom'];
    return levels[level] || 'Unknown';
  }

  /**
   * Format timestamp to readable date
   */
  static formatTimestamp(timestamp: bigint): string {
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleString();
  }

  /**
   * Format file size to human readable format
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Validate content data before encryption
   */
  static validateContentData(data: {
    title: string;
    description: string;
    contentType: string;
    contentHash: string;
    author: string;
    category: string;
    tags: string;
    language: string;
    contentData: string;
    fileSize: number;
  }): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.title || data.title.trim().length === 0) {
      errors.push('Title is required');
    }

    if (!data.description || data.description.trim().length === 0) {
      errors.push('Description is required');
    }

    if (!data.contentType || data.contentType.trim().length === 0) {
      errors.push('Content type is required');
    }

    if (!data.contentHash || data.contentHash.trim().length === 0) {
      errors.push('Content hash is required');
    }

    if (!data.author || data.author.trim().length === 0) {
      errors.push('Author is required');
    }

    if (!data.category || data.category.trim().length === 0) {
      errors.push('Category is required');
    }

    if (!data.language || data.language.trim().length === 0) {
      errors.push('Language is required');
    }

    if (data.fileSize <= 0) {
      errors.push('File size must be greater than 0');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate category data before encryption
   */
  static validateCategoryData(data: {
    name: string;
    description: string;
    type: string;
    icon: string;
    color: string;
  }): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.name || data.name.trim().length === 0) {
      errors.push('Category name is required');
    }

    if (!data.description || data.description.trim().length === 0) {
      errors.push('Category description is required');
    }

    if (!data.type || data.type.trim().length === 0) {
      errors.push('Category type is required');
    }

    if (!data.icon || data.icon.trim().length === 0) {
      errors.push('Category icon is required');
    }

    if (!data.color || data.color.trim().length === 0) {
      errors.push('Category color is required');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate author data before encryption
   */
  static validateAuthorData(data: {
    name: string;
    email: string;
    bio: string;
    avatar: string;
    website: string;
    social: string;
  }): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.name || data.name.trim().length === 0) {
      errors.push('Author name is required');
    }

    if (!data.email || data.email.trim().length === 0) {
      errors.push('Author email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push('Invalid email format');
    }

    if (!data.bio || data.bio.trim().length === 0) {
      errors.push('Author bio is required');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
