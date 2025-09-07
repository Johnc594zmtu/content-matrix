import { Address } from 'viem';
import { getContractAddress } from '@/config/environment';

// Contract addresses - these should be set after deployment
export const CONTRACT_ADDRESSES = {
  CONTENT_MATRIX: (process.env.NEXT_PUBLIC_CONTENT_MATRIX_ADDRESS || '0x87eDC3c5A3Ec226426f2fB18b89b057C8cE8c73F') as Address,
  CONTENT_PROTECTION: (process.env.NEXT_PUBLIC_CONTENT_PROTECTION_ADDRESS || '0xF646b05b6281C030b00aaA23f288F92a5C520858') as Address,
} as const;

// Content Matrix Contract ABI
export const CONTENT_MATRIX_ABI = [
  // Content Item Management
  {
    "inputs": [
      {"name": "_encryptedTitle", "type": "bytes32"},
      {"name": "_encryptedDescription", "type": "bytes32"},
      {"name": "_encryptedContentType", "type": "bytes32"},
      {"name": "_encryptedContentHash", "type": "bytes32"},
      {"name": "_encryptedAuthor", "type": "bytes32"},
      {"name": "_encryptedCategory", "type": "bytes32"},
      {"name": "_encryptedTags", "type": "bytes32"},
      {"name": "_encryptedLanguage", "type": "bytes32"},
      {"name": "_encryptedContentData", "type": "bytes32"},
      {"name": "_encryptedFileSize", "type": "uint256"},
      {"name": "_encryptedContentMatrix", "type": "bytes32"}
    ],
    "name": "createContentItem",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "_contentId", "type": "uint256"}],
    "name": "getContentItem",
    "outputs": [
      {"name": "encryptedTitle", "type": "bytes32"},
      {"name": "encryptedDescription", "type": "bytes32"},
      {"name": "encryptedContentType", "type": "bytes32"},
      {"name": "encryptedContentHash", "type": "bytes32"},
      {"name": "encryptedAuthor", "type": "bytes32"},
      {"name": "encryptedCategory", "type": "bytes32"},
      {"name": "encryptedTags", "type": "bytes32"},
      {"name": "encryptedLanguage", "type": "bytes32"},
      {"name": "encryptedContentData", "type": "bytes32"},
      {"name": "fileSize", "type": "uint256"},
      {"name": "viewCount", "type": "uint256"},
      {"name": "likeCount", "type": "uint256"},
      {"name": "shareCount", "type": "uint256"},
      {"name": "downloadCount", "type": "uint256"},
      {"name": "encryptedContentMatrix", "type": "bytes32"},
      {"name": "isPublic", "type": "bool"},
      {"name": "isActive", "type": "bool"},
      {"name": "creationTime", "type": "uint256"},
      {"name": "lastUpdated", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  // Category Management
  {
    "inputs": [
      {"name": "_encryptedCategoryName", "type": "bytes32"},
      {"name": "_encryptedCategoryDescription", "type": "bytes32"},
      {"name": "_encryptedCategoryType", "type": "bytes32"},
      {"name": "_encryptedCategoryIcon", "type": "bytes32"},
      {"name": "_encryptedCategoryColor", "type": "bytes32"},
      {"name": "_encryptedCategoryHash", "type": "bytes32"}
    ],
    "name": "createContentCategory",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "_categoryId", "type": "uint256"}],
    "name": "getContentCategory",
    "outputs": [
      {"name": "encryptedCategoryName", "type": "bytes32"},
      {"name": "encryptedCategoryDescription", "type": "bytes32"},
      {"name": "encryptedCategoryType", "type": "bytes32"},
      {"name": "encryptedCategoryIcon", "type": "bytes32"},
      {"name": "encryptedCategoryColor", "type": "bytes32"},
      {"name": "contentCount", "type": "uint256"},
      {"name": "subcategoryCount", "type": "uint256"},
      {"name": "encryptedCategoryHash", "type": "bytes32"},
      {"name": "isActive", "type": "bool"},
      {"name": "creationTime", "type": "uint256"},
      {"name": "lastUpdated", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  // Author Management
  {
    "inputs": [
      {"name": "_encryptedAuthorName", "type": "bytes32"},
      {"name": "_encryptedAuthorEmail", "type": "bytes32"},
      {"name": "_encryptedAuthorBio", "type": "bytes32"},
      {"name": "_encryptedAuthorAvatar", "type": "bytes32"},
      {"name": "_encryptedAuthorWebsite", "type": "bytes32"},
      {"name": "_encryptedAuthorSocial", "type": "bytes32"},
      {"name": "_encryptedAuthorHash", "type": "bytes32"}
    ],
    "name": "createContentAuthor",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "_authorId", "type": "uint256"}],
    "name": "getContentAuthor",
    "outputs": [
      {"name": "encryptedAuthorName", "type": "bytes32"},
      {"name": "encryptedAuthorEmail", "type": "bytes32"},
      {"name": "encryptedAuthorBio", "type": "bytes32"},
      {"name": "encryptedAuthorAvatar", "type": "bytes32"},
      {"name": "encryptedAuthorWebsite", "type": "bytes32"},
      {"name": "encryptedAuthorSocial", "type": "bytes32"},
      {"name": "contentCount", "type": "uint256"},
      {"name": "followerCount", "type": "uint256"},
      {"name": "rating", "type": "uint256"},
      {"name": "encryptedAuthorHash", "type": "bytes32"},
      {"name": "isVerified", "type": "bool"},
      {"name": "isActive", "type": "bool"},
      {"name": "creationTime", "type": "uint256"},
      {"name": "lastUpdated", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  // Statistics
  {
    "inputs": [],
    "name": "getContentMatrixStatistics",
    "outputs": [
      {"name": "totalContent", "type": "uint256"},
      {"name": "activeContent", "type": "uint256"},
      {"name": "totalCategories", "type": "uint256"},
      {"name": "totalAuthors", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  // Events
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "name": "contentId", "type": "uint256"},
      {"indexed": true, "name": "author", "type": "address"},
      {"indexed": true, "name": "contentType", "type": "bytes32"}
    ],
    "name": "ContentItemCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "name": "categoryId", "type": "uint256"},
      {"indexed": true, "name": "categoryName", "type": "bytes32"}
    ],
    "name": "ContentCategoryCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "name": "authorId", "type": "uint256"},
      {"indexed": true, "name": "author", "type": "address"},
      {"indexed": true, "name": "authorName", "type": "bytes32"}
    ],
    "name": "ContentAuthorCreated",
    "type": "event"
  }
] as const;

// Content Protection Contract ABI
export const CONTENT_PROTECTION_ABI = [
  // Content Management
  {
    "inputs": [
      {"name": "encryptedPrice", "type": "uint256"},
      {"name": "contentType", "type": "uint8"},
      {"name": "contentHash", "type": "string"},
      {"name": "metadata", "type": "string"}
    ],
    "name": "createContent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "contentAddress", "type": "address"}],
    "name": "getContent",
    "outputs": [
      {"name": "creator", "type": "address"},
      {"name": "encryptedPrice", "type": "uint256"},
      {"name": "encryptedViews", "type": "uint256"},
      {"name": "encryptedRating", "type": "uint256"},
      {"name": "isActive", "type": "bool"},
      {"name": "isLicensed", "type": "bool"},
      {"name": "createdAt", "type": "uint256"},
      {"name": "lastAccessed", "type": "uint256"},
      {"name": "contentType", "type": "uint8"},
      {"name": "contentHash", "type": "string"},
      {"name": "metadata", "type": "string"},
      {"name": "totalRevenue", "type": "uint256"},
      {"name": "licenseCount", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  // License Management
  {
    "inputs": [
      {"name": "contentAddress", "type": "address"},
      {"name": "encryptedAccessLevel", "type": "uint256"},
      {"name": "encryptedDuration", "type": "uint256"}
    ],
    "name": "purchaseLicense",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  // Statistics
  {
    "inputs": [],
    "name": "getPlatformStats",
    "outputs": [
      {"name": "totalContentCount", "type": "uint256"},
      {"name": "totalLicenseCount", "type": "uint256"},
      {"name": "platformRevenueAmount", "type": "uint256"},
      {"name": "minimumPriceAmount", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  // Events
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "name": "creator", "type": "address"},
      {"indexed": false, "name": "contentHash", "type": "string"},
      {"indexed": false, "name": "createdAt", "type": "uint256"}
    ],
    "name": "ContentCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "name": "licenseId", "type": "string"},
      {"indexed": true, "name": "licensee", "type": "address"},
      {"indexed": false, "name": "issuedAt", "type": "uint256"}
    ],
    "name": "ContentLicensed",
    "type": "event"
  }
] as const;