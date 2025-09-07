"use client";

import { useState } from 'react';
import { useContentMatrix } from '@/hooks/useContentMatrix';
import { FHEUtils } from '@/lib/fhe-utils';
import CreateCategoryModal from './CreateCategoryModal';

export default function ContentMatrixCategories() {
  const {
    categories,
    platformStats,
    loading,
    error,
    isConnected,
  } = useContentMatrix();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
        <span className="ml-3 text-gray-300">Loading categories...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 mb-4">⚠️ Error loading categories</div>
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">📁 Content Categories</h2>
          <p className="text-gray-400">
            Organize and manage content categories for better content discovery
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          disabled={!isConnected}
          className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + Create Category
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
          <div className="text-2xl font-bold text-white">{categories.length}</div>
          <div className="text-sm text-gray-400">Total Categories</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
          <div className="text-2xl font-bold text-green-400">
            {categories.filter(cat => cat.isActive).length}
          </div>
          <div className="text-sm text-gray-400">Active Categories</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
          <div className="text-2xl font-bold text-blue-400">
            {categories.reduce((sum, cat) => sum + cat.contentCount, 0)}
          </div>
          <div className="text-sm text-gray-400">Total Content</div>
        </div>
      </div>

      {/* Search */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold text-white mb-2">No categories found</h3>
            <p className="text-gray-400 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by creating your first category'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                disabled={!isConnected}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Your First Category
              </button>
            )}
          </div>
        ) : (
          filteredCategories.map((category) => (
            <div key={category.id} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all">
              {/* Header with icon and status */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: category.color + '20' }}
                  >
                    {category.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-white truncate">{category.name}</h3>
                    <p className="text-sm text-gray-400 truncate">{category.type}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${
                  category.isActive 
                    ? 'bg-green-500/20 text-green-300' 
                    : 'bg-red-500/20 text-red-300'
                }`}>
                  {category.isActive ? 'Active' : 'Inactive'}
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">{category.description}</p>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-700/30 rounded-lg">
                  <div className="text-2xl font-bold text-white">{category.contentCount}</div>
                  <div className="text-xs text-gray-400 mt-1">Content</div>
                </div>
                <div className="text-center p-3 bg-gray-700/30 rounded-lg">
                  <div className="text-2xl font-bold text-white">{category.subcategoryCount}</div>
                  <div className="text-xs text-gray-400 mt-1">Subcategories</div>
                </div>
              </div>

              {/* Progress and timestamps */}
              <div className="mb-4">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm text-gray-400 mb-3">
                  <span className="truncate">Created: {FHEUtils.formatTimestamp(BigInt(category.creationTime))}</span>
                  <span className="truncate">Updated: {FHEUtils.formatTimestamp(BigInt(category.lastUpdated))}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      backgroundColor: category.color,
                      width: `${Math.min((category.contentCount / 100) * 100, 100)}%` 
                    }}
                  />
                </div>
              </div>

              {/* Footer with ID and actions */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pt-4 border-t border-gray-700/50">
                <div className="text-sm text-gray-400 truncate">
                  ID: {category.id}
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors flex-shrink-0">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 text-sm rounded-lg transition-colors flex-shrink-0">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Category Modal */}
      <CreateCategoryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}