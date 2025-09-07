import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';
import { 
  CONTRACT_ADDRESSES, 
  CONTENT_PROTECTION_ABI
} from '@/lib/contracts';
import { FHEUtils } from '@/lib/fhe-utils';

// Types
export interface ContentData {
  creator: string;
  encryptedPrice: string;
  encryptedViews: string;
  encryptedRating: string;
  isActive: boolean;
  isLicensed: boolean;
  createdAt: number;
  lastAccessed: number;
  contentType: number;
  contentHash: string;
  metadata: string;
  totalRevenue: string;
  licenseCount: number;
}

export interface LicenseData {
  licensee: string;
  contentAddress: string;
  encryptedAccessLevel: string;
  encryptedDuration: string;
  isActive: boolean;
  isRevoked: boolean;
  issuedAt: number;
  expiresAt: number;
  licenseId: string;
  usageCount: number;
}

export interface AccessControlData {
  encryptedUserScore: string;
  encryptedAccessRights: string;
  isWhitelisted: boolean;
  isBlacklisted: boolean;
  lastVerified: number;
  totalAccess: number;
  accessLevel: number;
}

export interface PlatformStats {
  totalContent: number;
  totalLicenses: number;
  platformRevenue: string;
  minimumPrice: string;
}

export interface CreateContentProtectionFormData {
  encryptedPrice: string;
  contentType: number;
  contentHash: string;
  metadata: string;
}

export interface PurchaseLicenseFormData {
  contentAddress: string;
  encryptedAccessLevel: string;
  encryptedDuration: string;
  value: string; // ETH amount
}

export function useContentProtection() {
  const { address, isConnected } = useAccount();
  const [contents, setContents] = useState<ContentData[]>([]);
  const [licenses, setLicenses] = useState<LicenseData[]>([]);
  const [accessControls, setAccessControls] = useState<AccessControlData[]>([]);
  const [platformStats, setPlatformStats] = useState<PlatformStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get platform statistics
  const { data: statsData, refetch: refetchStats, isLoading: statsLoading } = useReadContract({
    address: CONTRACT_ADDRESSES.CONTENT_PROTECTION,
    abi: CONTENT_PROTECTION_ABI,
    functionName: 'getPlatformStats',
  });

  // Create content
  const { writeContract: writeCreateContent, data: createContentHash, isPending: isCreatingContent } = useWriteContract();
  const { isLoading: isConfirmingCreate, isSuccess: isContentCreated } = useWaitForTransactionReceipt({ 
    hash: createContentHash 
  });

  // Purchase license
  const { writeContract: writePurchaseLicense, data: purchaseLicenseHash, isPending: isPurchasingLicense } = useWriteContract();
  const { isLoading: isConfirmingPurchase, isSuccess: isLicensePurchased } = useWaitForTransactionReceipt({ 
    hash: purchaseLicenseHash 
  });

  // Note: revokeLicense function not available in current contract ABI

  // Process platform statistics
  useEffect(() => {
    if (statsData && Array.isArray(statsData) && statsData.length >= 4) {
      setPlatformStats({
        totalContent: Number(statsData[0]),
        totalLicenses: Number(statsData[1]),
        platformRevenue: statsData[2].toString(),
        minimumPrice: statsData[3].toString(),
      });
    }
  }, [statsData]);

  // Fetch content data
  const fetchContents = async () => {
    if (!platformStats) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const contentItems: ContentData[] = [];
      
      // Note: In a real implementation, you would need to track content addresses
      // For now, we'll just fetch the platform stats
      setContents(contentItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch contents');
    } finally {
      setLoading(false);
    }
  };

  // Create content function
  const createContent = async (formData: CreateContentProtectionFormData) => {
    if (!address) {
      throw new Error('Wallet not connected');
    }

    try {
      await writeCreateContent({
        address: CONTRACT_ADDRESSES.CONTENT_PROTECTION,
        abi: CONTENT_PROTECTION_ABI,
        functionName: 'createContent',
        args: [
          BigInt(formData.encryptedPrice),
          formData.contentType,
          formData.contentHash,
          formData.metadata,
        ],
      });
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create content');
    }
  };

  // Purchase license function
  const purchaseLicense = async (formData: PurchaseLicenseFormData) => {
    if (!address) {
      throw new Error('Wallet not connected');
    }

    try {
      await writePurchaseLicense({
        address: CONTRACT_ADDRESSES.CONTENT_PROTECTION,
        abi: CONTENT_PROTECTION_ABI,
        functionName: 'purchaseLicense',
        args: [
          formData.contentAddress as `0x${string}`,
          BigInt(formData.encryptedAccessLevel),
          BigInt(formData.encryptedDuration),
        ],
        value: BigInt(formData.value),
      });
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to purchase license');
    }
  };

  // Note: revokeLicense function not available in current contract ABI

  // Refresh all data
  const refreshData = async () => {
    await refetchStats();
    if (platformStats) {
      await fetchContents();
    }
  };

  // Auto-refresh when stats change
  useEffect(() => {
    if (platformStats) {
      fetchContents();
    }
  }, [platformStats]);

  // Auto-refresh when connected
  useEffect(() => {
    if (isConnected) {
      refreshData();
    }
  }, [isConnected]);

  return {
    // Data
    contents,
    licenses,
    accessControls,
    platformStats,
    
    // Loading states
    loading: loading || statsLoading || isCreatingContent || isConfirmingCreate || isPurchasingLicense || isConfirmingPurchase,
    error,
    isConnected,
    
    // Actions
    createContent,
    purchaseLicense,
    refreshData,
    
    // Transaction states
    isCreatingContent: isCreatingContent || isConfirmingCreate,
    isContentCreated,
    isPurchasingLicense: isPurchasingLicense || isConfirmingPurchase,
    isLicensePurchased,
  };
}