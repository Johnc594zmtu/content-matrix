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

      {/* Categories List */}
      <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 overflow-hidden">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12">
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
          <>
            {/* Table Header */}
            <div className="bg-gray-700/50 px-6 py-4 border-b border-gray-600/50">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-300">
                <div className="col-span-3">Category</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-3">Description</div>
                <div className="col-span-1 text-center">Content</div>
                <div className="col-span-1 text-center">Sub</div>
                <div className="col-span-1 text-center">Status</div>
                <div className="col-span-1 text-center">Actions</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-700/30">
              {filteredCategories.map((category) => (
                <div key={category.id} className="px-6 py-4 hover:bg-gray-700/20 transition-colors">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Category Name & Icon */}
                    <div className="col-span-3 flex items-center space-x-3">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                        style={{ backgroundColor: category.color + '20' }}
                      >
                        {category.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-medium truncate">{category.name}</div>
                        <div className="text-xs text-gray-400">ID: {category.id}</div>
                      </div>
                    </div>

                    {/* Type */}
                    <div className="col-span-2">
                      <span className="text-gray-300 text-sm">{category.type}</span>
                    </div>

                    {/* Description */}
                    <div className="col-span-3">
                      <p className="text-gray-400 text-sm line-clamp-2">{category.description}</p>
                    </div>

                    {/* Content Count */}
                    <div className="col-span-1 text-center">
                      <span className="text-white font-semibold">{category.contentCount}</span>
                    </div>

                    {/* Subcategory Count */}
                    <div className="col-span-1 text-center">
                      <span className="text-white font-semibold">{category.subcategoryCount}</span>
                    </div>

                    {/* Status */}
                    <div className="col-span-1 text-center">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        category.isActive 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-red-500/20 text-red-300'
                      }`}>
                        {category.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 text-center">
                      <div className="flex justify-center space-x-1">
                        <button className="px-2 py-1 text-xs bg-gray-600 hover:bg-gray-500 text-white rounded transition-colors">
                          Edit
                        </button>
                        <button className="px-2 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded transition-colors">
                          Del
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Timestamps (collapsed by default, can be expanded) */}
                  <div className="mt-2 pt-2 border-t border-gray-700/30">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Created: {FHEUtils.formatTimestamp(BigInt(category.creationTime))}</span>
                      <span>Updated: {FHEUtils.formatTimestamp(BigInt(category.lastUpdated))}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
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