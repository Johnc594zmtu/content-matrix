/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    NEXT_PUBLIC_CONTENT_MATRIX_ADDRESS: '0x87eDC3c5A3Ec226426f2fB18b89b057C8cE8c73F',
    NEXT_PUBLIC_CONTENT_PROTECTION_ADDRESS: '0xF646b05b6281C030b00aaA23f288F92a5C520858',
    NEXT_PUBLIC_NETWORK_NAME: 'sepolia',
    NEXT_PUBLIC_CHAIN_ID: '11155111',
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: '2ec9743d0d0cd7fb94dee1a7e6d33475',
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};

export default nextConfig;
