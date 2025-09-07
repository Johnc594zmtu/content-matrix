"use client";

import { useState, useEffect } from "react";
import { useContentMatrix } from "@/hooks/useContentMatrix";
import { useContentProtection } from "@/hooks/useContentProtection";
import { FHEUtils } from "@/lib/fhe-utils";

export default function ContentMatrixDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  
  const {
    platformStats: matrixStats,
    loading: matrixLoading,
    error: matrixError,
    refreshData: refreshMatrixData,
  } = useContentMatrix();

  const {
    platformStats: protectionStats,
    loading: protectionLoading,
    error: protectionError,
    refreshData: refreshProtectionData,
  } = useContentProtection();

  // Combined stats from both contracts
  const stats = {
    totalContent: matrixStats?.totalContent || 0,
    activeContent: matrixStats?.activeContent || 0,
    totalCategories: matrixStats?.totalCategories || 0,
    totalAuthors: matrixStats?.totalAuthors || 0,
    totalLicenses: protectionStats?.totalLicenses || 0,
    platformRevenue: protectionStats?.platformRevenue || "0 ETH",
    minimumPrice: protectionStats?.minimumPrice || "0.001 ETH",
  };

  // Load data on component mount
  useEffect(() => {
    refreshMatrixData();
    refreshProtectionData();
  }, []);

  return (
    <div className="content-matrix-dashboard">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white content-matrix-heartbeat">
          📊 Dashboard
        </h2>
        <div className="flex space-x-2">
          {["overview", "content", "categories", "analytics"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-red-600 text-white content-matrix-glow"
                  : "bg-red-900/30 text-red-200 hover:bg-red-800/50"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="content-matrix-card rounded-lg p-6 content-matrix-content">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Total Content</h3>
                <p className="text-3xl font-bold text-red-400">{stats.totalContent.toLocaleString()}</p>
              </div>
              <div className="text-3xl">📝</div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-red-200">
                <span>Active: {stats.activeContent}</span>
                <span>Inactive: {stats.totalContent - stats.activeContent}</span>
              </div>
            </div>
          </div>

          <div className="content-matrix-card rounded-lg p-6 content-matrix-category">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Categories</h3>
                <p className="text-3xl font-bold text-red-400">{stats.totalCategories}</p>
              </div>
              <div className="text-3xl">📁</div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-red-200">
                <span>Categories: {stats.totalCategories}</span>
                <span>Authors: {stats.totalAuthors}</span>
              </div>
            </div>
          </div>

          <div className="content-matrix-card rounded-lg p-6 content-matrix-analytics">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Total Licenses</h3>
                <p className="text-3xl font-bold text-red-400">{stats.totalLicenses.toLocaleString()}</p>
              </div>
              <div className="text-3xl">🔐</div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-red-200">
                <span>Revenue: {stats.platformRevenue}</span>
                <span>Min Price: {stats.minimumPrice}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "content" && (
        <div className="space-y-4">
          <div className="content-matrix-card rounded-lg p-6 content-matrix-content">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Recent Content</h3>
              <button 
                onClick={refreshMatrixData}
                className="text-red-200 hover:text-white text-sm"
                disabled={matrixLoading}
              >
                {matrixLoading ? "Loading..." : "Refresh"}
              </button>
            </div>
            
            {matrixError && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg">
                <p className="text-red-200 text-sm">Error: {matrixError}</p>
              </div>
            )}
            
            <div className="space-y-3">
              {matrixLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-400 mx-auto"></div>
                  <p className="text-red-200 mt-2">Loading content...</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📝</div>
                  <h4 className="text-lg font-semibold text-white mb-2">No Content Available</h4>
                  <p className="text-red-200">Content will appear here once created through the contract.</p>
                  <p className="text-red-300 text-sm mt-2">
                    Use the Content Creation form to add new content items.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "categories" && (
        <div className="space-y-4">
          <div className="content-matrix-card rounded-lg p-6 content-matrix-category">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Content Categories</h3>
              <button 
                onClick={refreshMatrixData}
                className="text-red-200 hover:text-white text-sm"
                disabled={matrixLoading}
              >
                {matrixLoading ? "Loading..." : "Refresh"}
              </button>
            </div>
            
            {matrixError && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg">
                <p className="text-red-200 text-sm">Error: {matrixError}</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {matrixLoading ? (
                <div className="col-span-2 text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-400 mx-auto"></div>
                  <p className="text-red-200 mt-2">Loading categories...</p>
                </div>
              ) : (
                <div className="col-span-2 text-center py-8">
                  <div className="text-4xl mb-4">📁</div>
                  <h4 className="text-lg font-semibold text-white mb-2">No Categories Available</h4>
                  <p className="text-red-200">Categories will appear here once created through the contract.</p>
                  <p className="text-red-300 text-sm mt-2">
                    Use the Category Creation form to add new categories.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="space-y-4">
          <div className="content-matrix-card rounded-lg p-6 content-matrix-analytics">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Platform Analytics</h3>
              <button 
                onClick={() => {
                  refreshMatrixData();
                  refreshProtectionData();
                }}
                className="text-red-200 hover:text-white text-sm"
                disabled={matrixLoading || protectionLoading}
              >
                {(matrixLoading || protectionLoading) ? "Loading..." : "Refresh"}
              </button>
            </div>
            
            {(matrixError || protectionError) && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg">
                <p className="text-red-200 text-sm">
                  Error: {matrixError || protectionError}
                </p>
              </div>
            )}
            
            <div className="space-y-4">
              {[
                { 
                  metric: "Total Content", 
                  value: stats.totalContent.toLocaleString(), 
                  description: "Content items in the matrix" 
                },
                { 
                  metric: "Active Content", 
                  value: stats.activeContent.toLocaleString(), 
                  description: "Currently active content items" 
                },
                { 
                  metric: "Total Categories", 
                  value: stats.totalCategories.toLocaleString(), 
                  description: "Content categories available" 
                },
                { 
                  metric: "Total Authors", 
                  value: stats.totalAuthors.toLocaleString(), 
                  description: "Registered content authors" 
                },
                { 
                  metric: "Total Licenses", 
                  value: stats.totalLicenses.toLocaleString(), 
                  description: "Content licenses purchased" 
                },
                { 
                  metric: "Platform Revenue", 
                  value: stats.platformRevenue, 
                  description: "Total revenue generated" 
                }
              ].map((metric) => (
                <div key={metric.metric} className="bg-red-900/20 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-white font-medium">{metric.metric}</h4>
                    <span className="text-sm text-red-300">{metric.description}</span>
                  </div>
                  <p className="text-2xl font-bold text-red-400">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
