"use client";

import { useState } from 'react';
import { useContentMatrix } from '@/hooks/useContentMatrix';
import { FHEUtils } from '@/lib/fhe-utils';
import CreateContentModal from './CreateContentModal';

export default function ContentMatrixContent() {
  const {
    contentItems,
    platformStats,
    loading,
    error,
    isConnected,
  } = useContentMatrix();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter content based on active tab and search term
  const filteredContent = contentItems.filter(item => {
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'public' && item.isPublic) ||
      (activeTab === 'private' && !item.isPublic) ||
      (activeTab === 'active' && item.isActive);
    
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  // Calculate statistics
  const stats = {
    total: contentItems.length,
    public: contentItems.filter(item => item.isPublic).length,
    private: contentItems.filter(item => !item.isPublic).length,
    active: contentItems.filter(item => item.isActive).length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
        <span className="ml-3 text-gray-300">Loading content...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 mb-4">⚠️ Error loading content</div>
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">📝 Content Management</h2>
          <p className="text-gray-400">
            Manage and organize your encrypted content with FHE technology
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          disabled={!isConnected}
          className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + Create Content
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
          <div className="text-2xl font-bold text-white">{stats.total}</div>
          <div className="text-sm text-gray-400">Total Content</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
          <div className="text-2xl font-bold text-green-400">{stats.public}</div>
          <div className="text-sm text-gray-400">Public</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
          <div className="text-2xl font-bold text-blue-400">{stats.private}</div>
          <div className="text-sm text-gray-400">Private</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
          <div className="text-2xl font-bold text-orange-400">{stats.active}</div>
          <div className="text-sm text-gray-400">Active</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        <div className="flex space-x-2">
          {[
            { key: 'all', label: 'All' },
            { key: 'public', label: 'Public' },
            { key: 'private', label: 'Private' },
            { key: 'active', label: 'Active' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content List */}
      <div className="space-y-4">
        {filteredContent.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-white mb-2">No content found</h3>
            <p className="text-gray-400 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by creating your first content'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                disabled={!isConnected}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Your First Content
              </button>
            )}
          </div>
        ) : (
          filteredContent.map((item) => (
            <div key={item.id} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300 mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded-full text-xs">
                      {item.contentType}
                    </span>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                      {item.category}
                    </span>
                    <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">
                      {item.language}
                    </span>
                    {item.isPublic ? (
                      <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">
                        Public
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded-full text-xs">
                        Private
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400 mb-1">Author</div>
                  <div className="text-white font-medium">{item.author}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-400">Views</div>
                  <div className="text-white font-semibold">{item.viewCount.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Likes</div>
                  <div className="text-white font-semibold">{item.likeCount.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Shares</div>
                  <div className="text-white font-semibold">{item.shareCount.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Downloads</div>
                  <div className="text-white font-semibold">{item.downloadCount.toLocaleString()}</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Created: {FHEUtils.formatTimestamp(BigInt(item.creationTime))}</span>
                  <span>Updated: {FHEUtils.formatTimestamp(BigInt(item.lastUpdated))}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((item.viewCount / 1000) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  File Size: {FHEUtils.formatFileSize(item.fileSize)}
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 text-sm rounded-lg transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Content Modal */}
      <CreateContentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}