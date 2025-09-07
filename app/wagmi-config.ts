import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { sepolia } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'Confidential Content Platform',
  projectId: 'your-project-id',
  chains: [sepolia],
  ssr: true,
})
