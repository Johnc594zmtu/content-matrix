"use client";

import { useState } from 'react';
import { useContentMatrix } from '@/hooks/useContentMatrix';
import { FHEUtils } from '@/lib/fhe-utils';
import CreateAuthorModal from './CreateAuthorModal';

export default function ContentMatrixAuthors() {
  const {
    authors,
    platformStats,
    loading,
    error,
    isConnected,
  } = useContentMatrix();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter authors based on search term
  const filteredAuthors = authors.filter(author =>
    author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    author.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    author.bio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
        <span className="ml-3 text-gray-300">Loading authors...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 mb-4">⚠️ Error loading authors</div>
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">👥 Content Authors</h2>
          <p className="text-gray-400">
            Manage content creators and their profiles in the Content Matrix platform
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          disabled={!isConnected}
          className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + Create Author
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
          <div className="text-2xl font-bold text-white">{authors.length}</div>
          <div className="text-sm text-gray-400">Total Authors</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
          <div className="text-2xl font-bold text-green-400">
            {authors.filter(author => author.isActive).length}
          </div>
          <div className="text-sm text-gray-400">Active Authors</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
          <div className="text-2xl font-bold text-blue-400">
            {authors.filter(author => author.isVerified).length}
          </div>
          <div className="text-sm text-gray-400">Verified Authors</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
          <div className="text-2xl font-bold text-orange-400">
            {authors.reduce((sum, author) => sum + author.contentCount, 0)}
          </div>
          <div className="text-sm text-gray-400">Total Content</div>
        </div>
      </div>

      {/* Search */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search authors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>

      {/* Authors List */}
      <div className="space-y-4">
        {filteredAuthors.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-white mb-2">No authors found</h3>
            <p className="text-gray-400 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by creating your first author'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                disabled={!isConnected}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Your First Author
              </button>
            )}
          </div>
        ) : (
          filteredAuthors.map((author) => (
            <div key={author.id} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all">
              <div className="flex items-start space-x-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {author.avatar ? (
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-orange-600 flex items-center justify-center text-white text-xl font-bold">
                      {author.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Author Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{author.name}</h3>
                      <p className="text-gray-400">{author.email}</p>
                    </div>
                    <div className="flex space-x-2">
                      {author.isVerified && (
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">
                          ✓ Verified
                        </span>
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        author.isActive 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-red-500/20 text-red-300'
                      }`}>
                        {author.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4">{author.bio}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-400">Content</div>
                      <div className="text-white font-semibold">{author.contentCount}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Followers</div>
                      <div className="text-white font-semibold">{author.followerCount}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Rating</div>
                      <div className="text-white font-semibold">{author.rating}/5</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Status</div>
                      <div className="text-white font-semibold">{author.status}</div>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex space-x-4 mb-4">
                    {author.website && (
                      <a
                        href={author.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        🌐 Website
                      </a>
                    )}
                    {author.socialMedia && (
                      <a
                        href={author.socialMedia}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        📱 Social
                      </a>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-400">
                      Created: {FHEUtils.formatTimestamp(BigInt(author.creationTime))}
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
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Author Modal */}
      <CreateAuthorModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}