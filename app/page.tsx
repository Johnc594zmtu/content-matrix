"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Fixed Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm shadow-lg border-b border-red-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">📝</span>
              </div>
              <div className="ml-3">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  Content Matrix
                </h1>
                <p className="text-sm text-gray-400">Secure Content Management</p>
              </div>
            </div>
            <ConnectButton />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="content-matrix-gradient text-white py-20 px-4 mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Content Matrix
          </h1>
          <p className="text-2xl md:text-3xl mb-8 opacity-90 font-light">
            The Future of Privacy-Preserving Content Management
          </p>
          <p className="text-lg md:text-xl mb-12 opacity-80 max-w-4xl mx-auto">
            Revolutionize how you create, manage, and protect content with Fully Homomorphic Encryption (FHE) technology. 
            Experience true privacy while maintaining full functionality.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link 
              href="/dashboard"
              className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              🚀 Launch Dashboard
            </Link>
            <button className="bg-transparent border-2 border-white/30 hover:border-white/60 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:bg-white/10">
              📖 Learn More
            </button>
          </div>

          {/* Feature Tags */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">🔒 FHE Encrypted</span>
            <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">📝 Content Management</span>
            <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">📊 Analytics</span>
            <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">🔐 Privacy First</span>
            <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">🌐 Decentralized</span>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Content Matrix?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the next generation of content management with cutting-edge privacy technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 p-8 text-center hover:shadow-xl transition-all duration-300">
            <div className="text-6xl mb-6">🔐</div>
            <h3 className="text-2xl font-bold text-white mb-4">FHE Encryption</h3>
            <p className="text-gray-300">
              All content is encrypted using Fully Homomorphic Encryption, allowing computations on encrypted data without ever decrypting it.
            </p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 p-8 text-center hover:shadow-xl transition-all duration-300">
            <div className="text-6xl mb-6">⚡</div>
            <h3 className="text-2xl font-bold text-white mb-4">Real-time Analytics</h3>
            <p className="text-gray-300">
              Track content performance, engagement metrics, and user behavior while maintaining complete privacy through encrypted analytics.
            </p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 p-8 text-center hover:shadow-xl transition-all duration-300">
            <div className="text-6xl mb-6">🌐</div>
            <h3 className="text-2xl font-bold text-white mb-4">Decentralized</h3>
            <p className="text-gray-300">
              Built on blockchain technology for transparency, censorship resistance, and true ownership of your content and data.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 p-8 mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl text-white">1️⃣</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Upload</h3>
              <p className="text-gray-300 text-sm">Upload your content and it's automatically encrypted using FHE technology</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl text-white">2️⃣</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Organize</h3>
              <p className="text-gray-300 text-sm">Categorize and tag your content while maintaining encryption</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl text-white">3️⃣</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Analyze</h3>
              <p className="text-gray-300 text-sm">Generate insights and analytics without compromising privacy</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl text-white">4️⃣</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Share</h3>
              <p className="text-gray-300 text-sm">Distribute content securely with granular access controls</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience the Future?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the revolution in privacy-preserving content management. 
            Start creating, organizing, and protecting your content today.
          </p>
          <Link 
            href="/dashboard"
            className="inline-block bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-bold py-4 px-12 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            🚀 Get Started Now
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Content Matrix Platform</h3>
            <p className="text-gray-400 mb-6">
              Secure, private, and transparent content management powered by FHE technology
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Documentation
              </a>
            </div>
            <p className="text-gray-500 mt-6">
              &copy; 2024 Content Matrix Platform. Built with FHE technology.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}