import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia, hardhat } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Content Matrix",
  projectId: process.env['NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID'] || "2ec9743d0d0cd7fb94dee1a7e6d33475",
  chains: [sepolia, hardhat],
  ssr: false, // If your dApp uses server side rendering (SSR)
});

export const chains = [sepolia, hardhat];
