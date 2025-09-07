"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import ContentMatrixContent from "@/components/ContentMatrixContent";
import Link from "next/link";

export default function ContentPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      
      {/* Fixed Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm shadow-lg border-b border-red-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">📝</span>
                </div>
                <div className="ml-3">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                    Content Matrix
                  </h1>
                  <p className="text-sm text-gray-400">/ Content</p>
                </div>
              </Link>
            </div>
            <ConnectButton />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            📝 Content Management
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Create, manage, and organize your encrypted content with FHE technology
          </p>
        </div>

        {/* Content Management Component */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 p-6">
          <ContentMatrixContent />
        </div>
      </div>
    </main>
  );
}
