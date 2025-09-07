"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function SimpleHome() {
  return (
    <main className="min-h-screen content-matrix-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="content-matrix-sparkle">
            <h1 className="text-4xl font-bold text-white content-matrix-heartbeat">
              📝 Content Matrix
            </h1>
            <p className="text-red-200 mt-2 content-matrix-flow">
              Secure Content Management & Privacy-Preserving Analytics
            </p>
          </div>
          <ConnectButton />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Dashboard */}
          <div className="lg:col-span-2">
            <div className="content-matrix-card rounded-xl p-6 content-matrix-network">
              <h2 className="text-2xl font-bold text-white mb-4">📊 Dashboard</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-red-800/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white">0</div>
                  <div className="text-red-200 text-sm">Total Content</div>
                </div>
                <div className="bg-green-800/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white">0</div>
                  <div className="text-green-200 text-sm">Active Content</div>
                </div>
                <div className="bg-blue-800/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white">0</div>
                  <div className="text-blue-200 text-sm">Categories</div>
                </div>
                <div className="bg-purple-800/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white">0</div>
                  <div className="text-purple-200 text-sm">Authors</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="content-matrix-card rounded-xl p-6 content-matrix-content">
            <h2 className="text-2xl font-bold text-white mb-4">📝 Content</h2>
            <p className="text-red-200">Content management features will be here.</p>
          </div>

          {/* Categories */}
          <div className="content-matrix-card rounded-xl p-6 content-matrix-category">
            <h2 className="text-2xl font-bold text-white mb-4">🏷️ Categories</h2>
            <p className="text-red-200">Category management features will be here.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center content-matrix-connection">
          <div className="content-matrix-card rounded-xl p-6 content-matrix-wave">
            <h3 className="text-xl font-semibold text-white mb-2">🔒 Secure & Private</h3>
            <p className="text-red-200">
              Powered by FHE technology for privacy-preserving content management and analytics
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
