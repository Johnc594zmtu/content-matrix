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

  // Dynamic content items query based on stats
  const totalContent = statsData ? Number(statsData[0]) : 0;
  const totalCategories = statsData ? Number(statsData[2]) : 0;
  const totalAuthors = statsData ? Number(statsData[3]) : 0;

  // Generate dynamic queries for content items
  const contentQueries = Array.from({ length: totalContent }, (_, i) => 
    useReadContract({
      address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
      abi: CONTENT_MATRIX_ABI,
      functionName: 'getContentItem',
      args: [BigInt(i)],
      query: { enabled: !!statsData && totalContent > i }
    })
  );

  // Generate dynamic queries for categories
  const categoryQueries = Array.from({ length: totalCategories }, (_, i) => 
    useReadContract({
      address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
      abi: CONTENT_MATRIX_ABI,
      functionName: 'getContentCategory',
      args: [BigInt(i)],
      query: { enabled: !!statsData && totalCategories > i }
    })
  );

  // Generate dynamic queries for authors
  const authorQueries = Array.from({ length: totalAuthors }, (_, i) => 
    useReadContract({
      address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
      abi: CONTENT_MATRIX_ABI,
      functionName: 'getContentAuthor',
      args: [BigInt(i)],
      query: { enabled: !!statsData && totalAuthors > i }
    })
  );

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

  // Process content items dynamically
  useEffect(() => {
    const items: ContentItemData[] = [];
    
    contentQueries.forEach((query, index) => {
      if (query.data && Array.isArray(query.data)) {
        const contentData = query.data;
        items.push({
          id: index,
          title: FHEUtils.decryptString(String(contentData[0])),
          description: FHEUtils.decryptString(String(contentData[1])),
          contentType: FHEUtils.decryptString(String(contentData[2])),
          contentHash: contentData[3],
          author: FHEUtils.decryptString(String(contentData[4])),
          category: FHEUtils.decryptString(String(contentData[5])),
          tags: FHEUtils.decryptString(String(contentData[6])),
          language: FHEUtils.decryptString(String(contentData[7])),
          contentData: FHEUtils.decryptString(String(contentData[8])),
          fileSize: FHEUtils.decryptNumber(String(contentData[9])) || 0,
          viewCount: FHEUtils.decryptNumber(String(contentData[10])) || 0,
          likeCount: FHEUtils.decryptNumber(String(contentData[11])) || 0,
          shareCount: FHEUtils.decryptNumber(String(contentData[12])) || 0,
          downloadCount: FHEUtils.decryptNumber(String(contentData[13])) || 0,
          contentMatrix: String(contentData[14]),
          isPublic: Boolean(contentData[15]),
          isActive: Boolean(contentData[16]),
          creationTime: Number(contentData[17]),
          lastUpdated: Number(contentData[18]),
        });
      }
    });
    
    setContentItems(items);
  }, [contentQueries]);

  // Process categories dynamically
  useEffect(() => {
    const cats: ContentCategoryData[] = [];
    
    categoryQueries.forEach((query, index) => {
      if (query.data && Array.isArray(query.data)) {
        const categoryData = query.data;
        cats.push({
          id: index,
          name: FHEUtils.decryptString(String(categoryData[0])),
          description: FHEUtils.decryptString(String(categoryData[1])),
          type: FHEUtils.decryptString(String(categoryData[2])),
          icon: FHEUtils.decryptString(String(categoryData[3])),
          color: FHEUtils.decryptString(String(categoryData[4])),
          contentCount: FHEUtils.decryptNumber(String(categoryData[5])) || 0,
          subcategoryCount: FHEUtils.decryptNumber(String(categoryData[6])) || 0,
          hash: String(categoryData[7]),
          isActive: Boolean(categoryData[8]),
          creationTime: Number(categoryData[9]),
          lastUpdated: Number(categoryData[10]),
        });
      }
    });
    
    setCategories(cats);
  }, [categoryQueries]);

  // Process authors dynamically
  useEffect(() => {
    const auths: ContentAuthorData[] = [];
    
    authorQueries.forEach((query, index) => {
      if (query.data && Array.isArray(query.data)) {
        const authorData = query.data;
        auths.push({
          id: index,
          name: FHEUtils.decryptString(String(authorData[0])),
          email: FHEUtils.decryptString(String(authorData[1])),
          bio: FHEUtils.decryptString(String(authorData[2])),
          avatar: FHEUtils.decryptString(String(authorData[3])),
          website: FHEUtils.decryptString(String(authorData[4])),
          socialMedia: FHEUtils.decryptString(String(authorData[5])),
          contentCount: FHEUtils.decryptNumber(String(authorData[6])) || 0,
          followerCount: FHEUtils.decryptNumber(String(authorData[7])) || 0,
          rating: FHEUtils.decryptNumber(String(authorData[8])) || 0,
          status: FHEUtils.decryptString(String(authorData[9])),
          isVerified: Boolean(authorData[10]),
          isActive: Boolean(authorData[11]),
          creationTime: Number(authorData[12]),
          lastUpdated: Number(authorData[13]),
        });
      }
    });
    
    setAuthors(auths);
  }, [authorQueries]);

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