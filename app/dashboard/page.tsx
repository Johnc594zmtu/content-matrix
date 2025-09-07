"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import ContentMatrixDashboard from "@/components/ContentMatrixDashboard";
import ContentMatrixContent from "@/components/ContentMatrixContent";
import ContentMatrixCategories from "@/components/ContentMatrixCategories";
import ContentMatrixAuthors from "@/components/ContentMatrixAuthors";
import LicenseManagement from "@/components/LicenseManagement";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

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
                  <p className="text-sm text-gray-400">Dashboard</p>
                </div>
              </Link>
            </div>
            <ConnectButton />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-1 shadow-lg border border-gray-700/50">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === "overview"
                  ? "bg-red-500 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              📊 Overview
            </button>
            <button
              onClick={() => setActiveTab("content")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === "content"
                  ? "bg-red-500 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              📝 Content
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === "categories"
                  ? "bg-red-500 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              📁 Categories
            </button>
            <button
              onClick={() => setActiveTab("authors")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === "authors"
                  ? "bg-red-500 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              👥 Authors
            </button>
            <button
              onClick={() => setActiveTab("protection")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === "protection"
                  ? "bg-red-500 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              🛡️ Protection
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === "overview" && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 p-6">
              <ContentMatrixDashboard />
            </div>
          )}
          
          {activeTab === "content" && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 p-6">
              <ContentMatrixContent />
            </div>
          )}
          
          {activeTab === "categories" && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 p-6">
              <ContentMatrixCategories />
            </div>
          )}
          
          {activeTab === "authors" && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 p-6">
              <ContentMatrixAuthors />
            </div>
          )}
          
          {activeTab === "protection" && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 p-6">
              <LicenseManagement />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
