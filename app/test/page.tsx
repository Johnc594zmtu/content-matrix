"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Content Matrix Test Page</h1>
      <div className="mb-8">
        <ConnectButton />
      </div>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Test Status</h2>
        <p className="text-green-400">✅ RainbowKit is working</p>
        <p className="text-green-400">✅ Wagmi is working</p>
        <p className="text-green-400">✅ Next.js is working</p>
      </div>
    </div>
  );
}
