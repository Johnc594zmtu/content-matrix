// Environment configuration for Content Matrix
export const config = {
  // Contract addresses - these will be set after deployment
  contracts: {
    contentMatrix: process.env.NEXT_PUBLIC_CONTENT_MATRIX_ADDRESS || '',
    contentProtection: process.env.NEXT_PUBLIC_CONTENT_PROTECTION_ADDRESS || '',
  },
  
  // Network configuration
  network: {
    name: process.env.NEXT_PUBLIC_NETWORK_NAME || 'hardhat',
    chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '1337'),
  },
  
  // Wallet Connect configuration
  walletConnect: {
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'your_project_id_here',
  },
  
  // Development settings
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  
  // API endpoints (if needed for future features)
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  },
  
  // Feature flags
  features: {
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    enableNotifications: process.env.NEXT_PUBLIC_ENABLE_NOTIFICATIONS === 'true',
    enableAdvancedSearch: process.env.NEXT_PUBLIC_ENABLE_ADVANCED_SEARCH === 'true',
  },
  
  // Content settings
  content: {
    maxFileSize: parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '10485760'), // 10MB
    supportedTypes: ['Article', 'Video', 'Audio', 'Document', 'Image', 'Software', 'Dataset'],
    supportedLanguages: ['English', 'Chinese', 'Spanish', 'French', 'German'],
  },
  
  // Security settings
  security: {
    minPasswordLength: 8,
    sessionTimeout: parseInt(process.env.NEXT_PUBLIC_SESSION_TIMEOUT || '3600'), // 1 hour
  },
} as const;

// Validation function to check if required environment variables are set
export function validateConfig(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!config.contracts.contentMatrix) {
    errors.push('NEXT_PUBLIC_CONTENT_MATRIX_ADDRESS is required');
  }
  
  if (!config.contracts.contentProtection) {
    errors.push('NEXT_PUBLIC_CONTENT_PROTECTION_ADDRESS is required');
  }
  
  if (!config.walletConnect.projectId || config.walletConnect.projectId === 'your_project_id_here') {
    errors.push('NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Helper function to get contract address with validation
export function getContractAddress(contractName: 'contentMatrix' | 'contentProtection'): string {
  const address = config.contracts[contractName];
  if (!address) {
    throw new Error(`Contract address for ${contractName} is not configured. Please set the environment variable.`);
  }
  return address;
}

// Helper function to check if running on supported network
export function isSupportedNetwork(chainId: number): boolean {
  const supportedNetworks = [1, 11155111, 1337]; // Mainnet, Sepolia, Hardhat
  return supportedNetworks.includes(chainId);
}

// Helper function to get network display name
export function getNetworkDisplayName(chainId: number): string {
  const networkNames: Record<number, string> = {
    1: 'Ethereum Mainnet',
    11155111: 'Sepolia Testnet',
    1337: 'Hardhat Local',
  };
  return networkNames[chainId] || `Unknown Network (${chainId})`;
}
