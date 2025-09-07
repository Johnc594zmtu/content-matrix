import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';
import { 
  CONTRACT_ADDRESSES, 
  CONTENT_MATRIX_ABI
} from '@/lib/contracts';
import { FHEUtils } from '@/lib/fhe-utils';

// Types
export interface ContentItemData {
  id: number;
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
  viewCount: number;
  likeCount: number;
  shareCount: number;
  downloadCount: number;
  contentMatrix: string;
  isPublic: boolean;
  isActive: boolean;
  creationTime: number;
  lastUpdated: number;
}

export interface ContentCategoryData {
  id: number;
  name: string;
  description: string;
  type: string;
  icon: string;
  color: string;
  contentCount: number;
  subcategoryCount: number;
  hash: string;
  isActive: boolean;
  creationTime: number;
  lastUpdated: number;
}

export interface ContentAuthorData {
  id: number;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  website: string;
  socialMedia: string;
  contentCount: number;
  followerCount: number;
  rating: number;
  status: string;
  isVerified: boolean;
  isActive: boolean;
  creationTime: number;
  lastUpdated: number;
}

export interface PlatformStats {
  totalContent: number;
  activeContent: number;
  totalCategories: number;
  totalAuthors: number;
}

export function useContentMatrix() {
  const { address, isConnected } = useAccount();
  const [contentItems, setContentItems] = useState<ContentItemData[]>([]);
  const [categories, setCategories] = useState<ContentCategoryData[]>([]);
  const [authors, setAuthors] = useState<ContentAuthorData[]>([]);
  const [platformStats, setPlatformStats] = useState<PlatformStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get platform statistics
  const { data: statsData, refetch: refetchStats, isLoading: statsLoading } = useReadContract({
    address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
    abi: CONTENT_MATRIX_ABI,
    functionName: 'getContentMatrixStatistics',
  });

  // Get individual content items
  const { data: content0, isLoading: content0Loading } = useReadContract({
    address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
    abi: CONTENT_MATRIX_ABI,
    functionName: 'getContentItem',
    args: [BigInt(0)],
    query: { enabled: !!statsData && Number(statsData[0]) > 0 }
  });

  const { data: content1, isLoading: content1Loading } = useReadContract({
    address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
    abi: CONTENT_MATRIX_ABI,
    functionName: 'getContentItem',
    args: [BigInt(1)],
    query: { enabled: !!statsData && Number(statsData[0]) > 1 }
  });

  // Get individual categories
  const { data: category0, isLoading: category0Loading } = useReadContract({
    address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
    abi: CONTENT_MATRIX_ABI,
    functionName: 'getContentCategory',
    args: [BigInt(0)],
    query: { enabled: !!statsData && Number(statsData[2]) > 0 }
  });

  const { data: category1, isLoading: category1Loading } = useReadContract({
    address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
    abi: CONTENT_MATRIX_ABI,
    functionName: 'getContentCategory',
    args: [BigInt(1)],
    query: { enabled: !!statsData && Number(statsData[2]) > 1 }
  });

  const { data: category2, isLoading: category2Loading } = useReadContract({
    address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
    abi: CONTENT_MATRIX_ABI,
    functionName: 'getContentCategory',
    args: [BigInt(2)],
    query: { enabled: !!statsData && Number(statsData[2]) > 2 }
  });

  // Get individual authors
  const { data: author0, isLoading: author0Loading } = useReadContract({
    address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
    abi: CONTENT_MATRIX_ABI,
    functionName: 'getContentAuthor',
    args: [BigInt(0)],
    query: { enabled: !!statsData && Number(statsData[3]) > 0 }
  });

  // Create content item
  const { writeContract: writeCreateContent, data: createContentHash, isPending: isCreatingContent } = useWriteContract();
  const { isLoading: isConfirmingCreate, isSuccess: isContentCreated } = useWaitForTransactionReceipt({ 
    hash: createContentHash 
  });

  // Create content category
  const { writeContract: writeCreateCategory, data: createCategoryHash, isPending: isCreatingCategory } = useWriteContract();
  const { isLoading: isConfirmingCategory, isSuccess: isCategoryCreated } = useWaitForTransactionReceipt({ 
    hash: createCategoryHash 
  });

  // Create content author
  const { writeContract: writeCreateAuthor, data: createAuthorHash, isPending: isCreatingAuthor } = useWriteContract();
  const { isLoading: isConfirmingAuthor, isSuccess: isAuthorCreated } = useWaitForTransactionReceipt({ 
    hash: createAuthorHash 
  });

  // Process platform statistics
  useEffect(() => {
    if (statsData && Array.isArray(statsData) && statsData.length >= 4) {
      setPlatformStats({
        totalContent: Number(statsData[0]),
        activeContent: Number(statsData[1]),
        totalCategories: Number(statsData[2]),
        totalAuthors: Number(statsData[3]),
      });
    }
  }, [statsData]);

  // Process content items
  useEffect(() => {
    const items: ContentItemData[] = [];
    
    if (content0 && Array.isArray(content0)) {
      items.push({
        id: 0,
        title: FHEUtils.decryptString(String(content0[0])),
        description: FHEUtils.decryptString(String(content0[1])),
        contentType: FHEUtils.decryptString(String(content0[2])),
        contentHash: content0[3],
        author: FHEUtils.decryptString(String(content0[4])),
        category: FHEUtils.decryptString(String(content0[5])),
        tags: FHEUtils.decryptString(String(content0[6])),
        language: FHEUtils.decryptString(String(content0[7])),
        contentData: FHEUtils.decryptString(String(content0[8])),
        fileSize: FHEUtils.decryptNumber(String(content0[9])) || 0,
        viewCount: FHEUtils.decryptNumber(String(content0[10])) || 0,
        likeCount: FHEUtils.decryptNumber(String(content0[11])) || 0,
        shareCount: FHEUtils.decryptNumber(String(content0[12])) || 0,
        downloadCount: FHEUtils.decryptNumber(String(content0[13])) || 0,
        contentMatrix: String(content0[14]),
        isPublic: Boolean(content0[15]),
        isActive: Boolean(content0[16]),
        creationTime: Number(content0[17]),
        lastUpdated: Number(content0[18]),
      });
    }
    
    if (content1 && Array.isArray(content1)) {
      items.push({
        id: 1,
        title: FHEUtils.decryptString(String(content1[0])),
        description: FHEUtils.decryptString(String(content1[1])),
        contentType: FHEUtils.decryptString(String(content1[2])),
        contentHash: content1[3],
        author: FHEUtils.decryptString(String(content1[4])),
        category: FHEUtils.decryptString(String(content1[5])),
        tags: FHEUtils.decryptString(String(content1[6])),
        language: FHEUtils.decryptString(String(content1[7])),
        contentData: FHEUtils.decryptString(String(content1[8])),
        fileSize: FHEUtils.decryptNumber(String(content1[9])) || 0,
        viewCount: FHEUtils.decryptNumber(String(content1[10])) || 0,
        likeCount: FHEUtils.decryptNumber(String(content1[11])) || 0,
        shareCount: FHEUtils.decryptNumber(String(content1[12])) || 0,
        downloadCount: FHEUtils.decryptNumber(String(content1[13])) || 0,
        contentMatrix: String(content1[14]),
        isPublic: Boolean(content1[15]),
        isActive: Boolean(content1[16]),
        creationTime: Number(content1[17]),
        lastUpdated: Number(content1[18]),
      });
    }
    
    setContentItems(items);
  }, [content0, content1]);

  // Process categories
  useEffect(() => {
    const cats: ContentCategoryData[] = [];
    
    // For demo purposes, create sample categories since FHE decryption is not implemented
    const sampleCategories = [
      {
        id: 0,
        name: 'Technology',
        description: 'Technology related content and innovations',
        type: 'General',
        icon: '💻',
        color: '#3B82F6',
        contentCount: 0,
        subcategoryCount: 0,
        hash: '0x0000000000000000000000000000000000000000000000000000000000000000',
        isActive: true,
        creationTime: Date.now() - 86400000, // 1 day ago
        lastUpdated: Date.now() - 3600000, // 1 hour ago
      },
      {
        id: 1,
        name: 'Education',
        description: 'Educational content and learning resources',
        type: 'General',
        icon: '📚',
        color: '#10B981',
        contentCount: 0,
        subcategoryCount: 0,
        hash: '0x0000000000000000000000000000000000000000000000000000000000000000',
        isActive: true,
        creationTime: Date.now() - 172800000, // 2 days ago
        lastUpdated: Date.now() - 7200000, // 2 hours ago
      },
      {
        id: 2,
        name: 'Entertainment',
        description: 'Entertainment and media content',
        type: 'General',
        icon: '🎬',
        color: '#F59E0B',
        contentCount: 0,
        subcategoryCount: 0,
        hash: '0x0000000000000000000000000000000000000000000000000000000000000000',
        isActive: true,
        creationTime: Date.now() - 259200000, // 3 days ago
        lastUpdated: Date.now() - 10800000, // 3 hours ago
      }
    ];
    
    // If we have real data from contract, use it; otherwise use sample data
    if (category0 && Array.isArray(category0) && category0.length > 0) {
      cats.push({
        id: 0,
        name: FHEUtils.decryptString(String(category0[1])) || 'Technology',
        description: FHEUtils.decryptString(String(category0[2])) || 'Technology related content and innovations',
        type: FHEUtils.decryptString(String(category0[3])) || 'General',
        icon: FHEUtils.decryptString(String(category0[4])) || '💻',
        color: FHEUtils.decryptString(String(category0[5])) || '#3B82F6',
        contentCount: FHEUtils.decryptNumber(String(category0[6])) || 0,
        subcategoryCount: FHEUtils.decryptNumber(String(category0[7])) || 0,
        hash: String(category0[8]) || '0x0000000000000000000000000000000000000000000000000000000000000000',
        isActive: Boolean(category0[9]) || true,
        creationTime: Number(category0[10]) || Math.floor((Date.now() - 86400000) / 1000),
        lastUpdated: Number(category0[11]) || Math.floor((Date.now() - 3600000) / 1000),
      });
    } else {
      cats.push(sampleCategories[0]);
    }
    
    if (category1 && Array.isArray(category1) && category1.length > 0) {
      cats.push({
        id: 1,
        name: FHEUtils.decryptString(String(category1[1])) || 'Education',
        description: FHEUtils.decryptString(String(category1[2])) || 'Educational content and learning resources',
        type: FHEUtils.decryptString(String(category1[3])) || 'General',
        icon: FHEUtils.decryptString(String(category1[4])) || '📚',
        color: FHEUtils.decryptString(String(category1[5])) || '#10B981',
        contentCount: FHEUtils.decryptNumber(String(category1[6])) || 0,
        subcategoryCount: FHEUtils.decryptNumber(String(category1[7])) || 0,
        hash: String(category1[8]) || '0x0000000000000000000000000000000000000000000000000000000000000000',
        isActive: Boolean(category1[9]) || true,
        creationTime: Number(category1[10]) || Math.floor((Date.now() - 172800000) / 1000),
        lastUpdated: Number(category1[11]) || Math.floor((Date.now() - 7200000) / 1000),
      });
    } else {
      cats.push(sampleCategories[1]);
    }
    
    if (category2 && Array.isArray(category2) && category2.length > 0) {
      cats.push({
        id: 2,
        name: FHEUtils.decryptString(String(category2[1])) || 'Entertainment',
        description: FHEUtils.decryptString(String(category2[2])) || 'Entertainment and media content',
        type: FHEUtils.decryptString(String(category2[3])) || 'General',
        icon: FHEUtils.decryptString(String(category2[4])) || '🎬',
        color: FHEUtils.decryptString(String(category2[5])) || '#F59E0B',
        contentCount: FHEUtils.decryptNumber(String(category2[6])) || 0,
        subcategoryCount: FHEUtils.decryptNumber(String(category2[7])) || 0,
        hash: String(category2[8]) || '0x0000000000000000000000000000000000000000000000000000000000000000',
        isActive: Boolean(category2[9]) || true,
        creationTime: Number(category2[10]) || Math.floor((Date.now() - 259200000) / 1000),
        lastUpdated: Number(category2[11]) || Math.floor((Date.now() - 10800000) / 1000),
      });
    } else {
      cats.push(sampleCategories[2]);
    }
    
    setCategories(cats);
  }, [category0, category1, category2]);

  // Process authors
  useEffect(() => {
    const auths: ContentAuthorData[] = [];
    
    if (author0 && Array.isArray(author0)) {
      auths.push({
        id: 0,
        name: FHEUtils.decryptString(String(author0[0])),
        email: FHEUtils.decryptString(String(author0[1])),
        bio: FHEUtils.decryptString(String(author0[2])),
        avatar: FHEUtils.decryptString(String(author0[3])),
        website: FHEUtils.decryptString(String(author0[4])),
        socialMedia: FHEUtils.decryptString(String(author0[5])),
        contentCount: FHEUtils.decryptNumber(String(author0[6])) || 0,
        followerCount: FHEUtils.decryptNumber(String(author0[7])) || 0,
        rating: FHEUtils.decryptNumber(String(author0[8])) || 0,
        status: FHEUtils.decryptString(String(author0[9])),
        isVerified: Boolean(author0[10]),
        isActive: Boolean(author0[11]),
        creationTime: Number(author0[12]),
        lastUpdated: Number(author0[13]),
      });
    }
    
    setAuthors(auths);
  }, [author0]);

  // Create content function
  const createContent = async (contentData: any) => {
    if (!isConnected) {
      throw new Error('Please connect your wallet first');
    }

    try {
      writeCreateContent({
        address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
        abi: CONTENT_MATRIX_ABI,
        functionName: 'createContentItem',
        args: [
          FHEUtils.encryptString(contentData.title) as `0x${string}`,
          FHEUtils.encryptString(contentData.description) as `0x${string}`,
          FHEUtils.encryptString(contentData.contentType) as `0x${string}`,
          FHEUtils.encryptString(contentData.contentHash) as `0x${string}`,
          FHEUtils.encryptString(contentData.author) as `0x${string}`,
          FHEUtils.encryptString(contentData.category) as `0x${string}`,
          FHEUtils.encryptString(contentData.tags) as `0x${string}`,
          FHEUtils.encryptString(contentData.language) as `0x${string}`,
          FHEUtils.encryptString(contentData.contentData) as `0x${string}`,
          BigInt(contentData.fileSize),
          FHEUtils.encryptString(contentData.contentMatrix) as `0x${string}`,
        ],
      });
    } catch (err) {
      console.error('Error creating content:', err);
      throw err;
    }
  };

  // Create category function
  const createCategory = async (categoryData: any) => {
    if (!isConnected) {
      throw new Error('Please connect your wallet first');
    }

    try {
      writeCreateCategory({
        address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
        abi: CONTENT_MATRIX_ABI,
        functionName: 'createContentCategory',
        args: [
          FHEUtils.encryptString(categoryData.name) as `0x${string}`,
          FHEUtils.encryptString(categoryData.description) as `0x${string}`,
          FHEUtils.encryptString(categoryData.type) as `0x${string}`,
          FHEUtils.encryptString(categoryData.icon) as `0x${string}`,
          FHEUtils.encryptString(categoryData.color) as `0x${string}`,
          FHEUtils.encryptString(categoryData.hash) as `0x${string}`,
        ],
      });
    } catch (err) {
      console.error('Error creating category:', err);
      throw err;
    }
  };

  // Create author function
  const createAuthor = async (authorData: any) => {
    if (!isConnected) {
      throw new Error('Please connect your wallet first');
    }

    try {
      writeCreateAuthor({
        address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
        abi: CONTENT_MATRIX_ABI,
        functionName: 'createContentAuthor',
        args: [
          FHEUtils.encryptString(authorData.name) as `0x${string}`,
          FHEUtils.encryptString(authorData.email) as `0x${string}`,
          FHEUtils.encryptString(authorData.bio) as `0x${string}`,
          FHEUtils.encryptString(authorData.avatar) as `0x${string}`,
          FHEUtils.encryptString(authorData.website) as `0x${string}`,
          FHEUtils.encryptString(authorData.socialMedia) as `0x${string}`,
          FHEUtils.encryptString(authorData.status) as `0x${string}`,
        ],
      });
    } catch (err) {
      console.error('Error creating author:', err);
      throw err;
    }
  };

  // Refresh all data
  const refreshData = async () => {
    await refetchStats();
  };

  return {
    // Data
    contentItems,
    categories,
    authors,
    platformStats,
    
    // Loading states
    loading: loading || statsLoading || content0Loading || content1Loading || category0Loading || category1Loading || category2Loading || author0Loading,
    error,
    
    // Connection state
    isConnected,
    
    // Actions
    createContent,
    createCategory,
    createAuthor,
    refreshData,
    
    // Transaction states
    isCreatingContent: isCreatingContent || isConfirmingCreate,
    isCreatingCategory: isCreatingCategory || isConfirmingCategory,
    isCreatingAuthor: isCreatingAuthor || isConfirmingAuthor,
    isContentCreated,
    isCategoryCreated,
    isAuthorCreated,
  };
}