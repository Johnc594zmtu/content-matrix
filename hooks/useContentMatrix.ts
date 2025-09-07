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

  // Query individual items (we'll query up to 10 of each type to be safe)
  const { data: content0 } = useReadContract({
    address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
    abi: CONTENT_MATRIX_ABI,
    functionName: 'getContentItem',
    args: [BigInt(0)],
    query: { enabled: !!statsData && totalContent > 0 }
  });

  const { data: content1 } = useReadContract({
    address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
    abi: CONTENT_MATRIX_ABI,
    functionName: 'getContentItem',
    args: [BigInt(1)],
    query: { enabled: !!statsData && totalContent > 1 }
  });

  const { data: content2 } = useReadContract({
    address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
    abi: CONTENT_MATRIX_ABI,
    functionName: 'getContentItem',
    args: [BigInt(2)],
    query: { enabled: !!statsData && totalContent > 2 }
  });

  const { data: content3 } = useReadContract({
    address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
    abi: CONTENT_MATRIX_ABI,
    functionName: 'getContentItem',
    args: [BigInt(3)],
    query: { enabled: !!statsData && totalContent > 3 }
  });

  const { data: content4 } = useReadContract({
    address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
    abi: CONTENT_MATRIX_ABI,
    functionName: 'getContentItem',
    args: [BigInt(4)],
    query: { enabled: !!statsData && totalContent > 4 }
  });

  const { data: content5 } = useReadContract({
    address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
    abi: CONTENT_MATRIX_ABI,
    functionName: 'getContentItem',
    args: [BigInt(5)],
    query: { enabled: !!statsData && totalContent > 5 }
  });

  const { data: content6 } = useReadContract({
    address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
    abi: CONTENT_MATRIX_ABI,
    functionName: 'getContentItem',
    args: [BigInt(6)],
    query: { enabled: !!statsData && totalContent > 6 }
  });

  const { data: content7 } = useReadContract({
    address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
    abi: CONTENT_MATRIX_ABI,
    functionName: 'getContentItem',
    args: [BigInt(7)],
    query: { enabled: !!statsData && totalContent > 7 }
  });

  // Query categories
  const { data: category0 } = useReadContract({
    address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
    abi: CONTENT_MATRIX_ABI,
    functionName: 'getContentCategory',
    args: [BigInt(0)],
    query: { enabled: !!statsData && totalCategories > 0 }
  });

  const { data: category1 } = useReadContract({
    address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
    abi: CONTENT_MATRIX_ABI,
    functionName: 'getContentCategory',
    args: [BigInt(1)],
    query: { enabled: !!statsData && totalCategories > 1 }
  });

  const { data: category2 } = useReadContract({
    address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
    abi: CONTENT_MATRIX_ABI,
    functionName: 'getContentCategory',
    args: [BigInt(2)],
    query: { enabled: !!statsData && totalCategories > 2 }
  });

  const { data: category3 } = useReadContract({
    address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
    abi: CONTENT_MATRIX_ABI,
    functionName: 'getContentCategory',
    args: [BigInt(3)],
    query: { enabled: !!statsData && totalCategories > 3 }
  });

  const { data: category4 } = useReadContract({
    address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
    abi: CONTENT_MATRIX_ABI,
    functionName: 'getContentCategory',
    args: [BigInt(4)],
    query: { enabled: !!statsData && totalCategories > 4 }
  });

  const { data: category5 } = useReadContract({
    address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
    abi: CONTENT_MATRIX_ABI,
    functionName: 'getContentCategory',
    args: [BigInt(5)],
    query: { enabled: !!statsData && totalCategories > 5 }
  });

  // Query authors
  const { data: author0 } = useReadContract({
    address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
    abi: CONTENT_MATRIX_ABI,
    functionName: 'getContentAuthor',
    args: [BigInt(0)],
    query: { enabled: !!statsData && totalAuthors > 0 }
  });

  const { data: author1 } = useReadContract({
    address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
    abi: CONTENT_MATRIX_ABI,
    functionName: 'getContentAuthor',
    args: [BigInt(1)],
    query: { enabled: !!statsData && totalAuthors > 1 }
  });

  const { data: author2 } = useReadContract({
    address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
    abi: CONTENT_MATRIX_ABI,
    functionName: 'getContentAuthor',
    args: [BigInt(2)],
    query: { enabled: !!statsData && totalAuthors > 2 }
  });

  const { data: author3 } = useReadContract({
    address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
    abi: CONTENT_MATRIX_ABI,
    functionName: 'getContentAuthor',
    args: [BigInt(3)],
    query: { enabled: !!statsData && totalAuthors > 3 }
  });

  const { data: author4 } = useReadContract({
    address: CONTRACT_ADDRESSES.CONTENT_MATRIX,
    abi: CONTENT_MATRIX_ABI,
    functionName: 'getContentAuthor',
    args: [BigInt(4)],
    query: { enabled: !!statsData && totalAuthors > 4 }
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
    const contentDataArray = [content0, content1, content2, content3, content4, content5, content6, content7];
    
    contentDataArray.forEach((contentData, index) => {
      if (contentData && Array.isArray(contentData)) {
        items.push({
          id: index,
          title: FHEUtils.decryptString(String(contentData[0])),
          description: FHEUtils.decryptString(String(contentData[1])),
          contentType: FHEUtils.decryptString(String(contentData[2]), 'type'),
          contentHash: contentData[3],
          author: FHEUtils.decryptString(String(contentData[4])),
          category: FHEUtils.decryptString(String(contentData[5])),
          tags: FHEUtils.decryptString(String(contentData[6])),
          language: FHEUtils.decryptString(String(contentData[7]), 'language'),
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
  }, [content0, content1, content2, content3, content4, content5, content6, content7]);

  // Process categories
  useEffect(() => {
    const cats: ContentCategoryData[] = [];
    const categoryDataArray = [category0, category1, category2, category3, category4, category5];
    
    categoryDataArray.forEach((categoryData, index) => {
      if (categoryData && Array.isArray(categoryData)) {
        cats.push({
          id: index,
          name: FHEUtils.decryptString(String(categoryData[0])),
          description: FHEUtils.decryptString(String(categoryData[1])),
          type: FHEUtils.decryptString(String(categoryData[2]), 'type'),
          icon: FHEUtils.decryptString(String(categoryData[3]), 'icon'),
          color: FHEUtils.decryptString(String(categoryData[4]), 'color'),
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
  }, [category0, category1, category2, category3, category4, category5]);

  // Process authors
  useEffect(() => {
    const auths: ContentAuthorData[] = [];
    const authorDataArray = [author0, author1, author2, author3, author4];
    
    authorDataArray.forEach((authorData, index) => {
      if (authorData && Array.isArray(authorData)) {
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
  }, [author0, author1, author2, author3, author4]);

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
    loading: loading || statsLoading,
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