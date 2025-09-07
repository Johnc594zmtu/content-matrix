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
        title: FHEUtils.decryptString(content0[0]),
        description: FHEUtils.decryptString(content0[1]),
        contentType: FHEUtils.decryptString(content0[2]),
        contentHash: content0[3],
        author: FHEUtils.decryptString(content0[4]),
        category: FHEUtils.decryptString(content0[5]),
        tags: FHEUtils.decryptString(content0[6]),
        language: FHEUtils.decryptString(content0[7]),
        contentData: FHEUtils.decryptString(content0[8]),
        fileSize: Number(content0[9]),
        viewCount: Number(content0[10]),
        likeCount: Number(content0[11]),
        shareCount: Number(content0[12]),
        downloadCount: Number(content0[13]),
        contentMatrix: content0[14],
        isPublic: content0[15],
        isActive: content0[16],
        creationTime: Number(content0[17]),
        lastUpdated: Number(content0[18]),
      });
    }
    
    if (content1 && Array.isArray(content1)) {
      items.push({
        id: 1,
        title: FHEUtils.decryptString(content1[0]),
        description: FHEUtils.decryptString(content1[1]),
        contentType: FHEUtils.decryptString(content1[2]),
        contentHash: content1[3],
        author: FHEUtils.decryptString(content1[4]),
        category: FHEUtils.decryptString(content1[5]),
        tags: FHEUtils.decryptString(content1[6]),
        language: FHEUtils.decryptString(content1[7]),
        contentData: FHEUtils.decryptString(content1[8]),
        fileSize: Number(content1[9]),
        viewCount: Number(content1[10]),
        likeCount: Number(content1[11]),
        shareCount: Number(content1[12]),
        downloadCount: Number(content1[13]),
        contentMatrix: content1[14],
        isPublic: content1[15],
        isActive: content1[16],
        creationTime: Number(content1[17]),
        lastUpdated: Number(content1[18]),
      });
    }
    
    setContentItems(items);
  }, [content0, content1]);

  // Process categories
  useEffect(() => {
    const cats: ContentCategoryData[] = [];
    
    if (category0 && Array.isArray(category0)) {
      cats.push({
        id: 0,
        name: category0[0] || 'Technology',
        description: category0[1] || 'Technology related content',
        type: category0[2] || 'General',
        icon: category0[3] || '💻',
        color: category0[4] || '#3B82F6',
        contentCount: Number(category0[5]) || 0,
        subcategoryCount: Number(category0[6]) || 0,
        hash: category0[7],
        isActive: category0[8] || true,
        creationTime: Number(category0[9]) || Date.now(),
        lastUpdated: Number(category0[10]) || Date.now(),
      });
    }
    
    if (category1 && Array.isArray(category1)) {
      cats.push({
        id: 1,
        name: category1[0] || 'Education',
        description: category1[1] || 'Educational content and resources',
        type: category1[2] || 'General',
        icon: category1[3] || '📚',
        color: category1[4] || '#10B981',
        contentCount: Number(category1[5]) || 0,
        subcategoryCount: Number(category1[6]) || 0,
        hash: category1[7],
        isActive: category1[8] || true,
        creationTime: Number(category1[9]) || Date.now(),
        lastUpdated: Number(category1[10]) || Date.now(),
      });
    }
    
    if (category2 && Array.isArray(category2)) {
      cats.push({
        id: 2,
        name: category2[0] || 'Entertainment',
        description: category2[1] || 'Entertainment and media content',
        type: category2[2] || 'General',
        icon: category2[3] || '🎬',
        color: category2[4] || '#F59E0B',
        contentCount: Number(category2[5]) || 0,
        subcategoryCount: Number(category2[6]) || 0,
        hash: category2[7],
        isActive: category2[8] || true,
        creationTime: Number(category2[9]) || Date.now(),
        lastUpdated: Number(category2[10]) || Date.now(),
      });
    }
    
    setCategories(cats);
  }, [category0, category1, category2]);

  // Process authors
  useEffect(() => {
    const auths: ContentAuthorData[] = [];
    
    if (author0 && Array.isArray(author0)) {
      auths.push({
        id: 0,
        name: FHEUtils.decryptString(author0[0]),
        email: FHEUtils.decryptString(author0[1]),
        bio: FHEUtils.decryptString(author0[2]),
        avatar: FHEUtils.decryptString(author0[3]),
        website: FHEUtils.decryptString(author0[4]),
        socialMedia: FHEUtils.decryptString(author0[5]),
        contentCount: Number(author0[6]),
        followerCount: Number(author0[7]),
        rating: Number(author0[8]),
        status: FHEUtils.decryptString(author0[9]),
        isVerified: author0[10],
        isActive: author0[11],
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