'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'

// Mock data for demonstration
const mockContent = [
  {
    id: '1',
    creator: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    contentType: 'ARTICLE',
    title: 'Advanced Blockchain Privacy Techniques',
    description: 'Comprehensive guide to privacy-preserving blockchain technologies including FHE, ZK proofs, and more.',
    contentHash: 'QmHash123456789',
    price: '0.05 ETH',
    views: '2.3k',
    rating: '4.8',
    isActive: true,
    isLicensed: false,
    createdAt: '2024-01-15',
    lastAccessed: '2024-01-20',
    licenseCount: 45,
    totalRevenue: '2.25 ETH'
  },
  {
    id: '2',
    creator: '0x8ba1f109551bD432803012645Hac136c772c3c7b',
    contentType: 'VIDEO',
    title: 'FHE Implementation Tutorial',
    description: 'Step-by-step tutorial on implementing Fully Homomorphic Encryption in smart contracts.',
    contentHash: 'QmHash987654321',
    price: '0.08 ETH',
    views: '1.8k',
    rating: '4.9',
    isActive: true,
    isLicensed: false,
    createdAt: '2024-01-10',
    lastAccessed: '2024-01-19',
    licenseCount: 32,
    totalRevenue: '2.56 ETH'
  },
  {
    id: '3',
    creator: '0x123f681646d4a755815f9cb19e1acc8565a0c2ac',
    contentType: 'SOFTWARE',
    title: 'Privacy-Preserving DApp Framework',
    description: 'Complete framework for building privacy-preserving decentralized applications with FHE integration.',
    contentHash: 'QmHash456789123',
    price: '0.15 ETH',
    views: '950',
    rating: '4.7',
    isActive: true,
    isLicensed: false,
    createdAt: '2024-01-05',
    lastAccessed: '2024-01-18',
    licenseCount: 28,
    totalRevenue: '4.2 ETH'
  },
  {
    id: '4',
    creator: '0x456a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4',
    contentType: 'DATASET',
    title: 'Encrypted Financial Data Sample',
    description: 'Sample dataset demonstrating encrypted financial data analysis using FHE techniques.',
    contentHash: 'QmHash789123456',
    price: '0.03 ETH',
    views: '1.2k',
    rating: '4.6',
    isActive: false,
    isLicensed: false,
    createdAt: '2024-01-01',
    lastAccessed: '2024-01-15',
    licenseCount: 15,
    totalRevenue: '0.45 ETH'
  }
]

const getContentTypeClass = (type: string) => {
  switch (type) {
    case 'ARTICLE': return 'content-type-article'
    case 'VIDEO': return 'content-type-video'
    case 'AUDIO': return 'content-type-audio'
    case 'DOCUMENT': return 'content-type-document'
    case 'SOFTWARE': return 'content-type-software'
    case 'DATASET': return 'content-type-dataset'
    default: return 'content-type-article'
  }
}

const getContentTypeLabel = (type: string) => {
  switch (type) {
    case 'ARTICLE': return 'Article'
    case 'VIDEO': return 'Video'
    case 'AUDIO': return 'Audio'
    case 'DOCUMENT': return 'Document'
    case 'SOFTWARE': return 'Software'
    case 'DATASET': return 'Dataset'
    default: return type
  }
}

const getStatusClass = (status: boolean) => {
  return status ? 'status-active' : 'status-inactive'
}

const getStatusLabel = (status: boolean) => {
  return status ? 'Active' : 'Inactive'
}

export default function ContentMarketplace() {
  const { address, isConnected } = useAccount()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('ALL')
  const [sortBy, setSortBy] = useState('newest')

  if (!isConnected) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Please connect your wallet to browse content</p>
      </div>
    )
  }

  // Filter and sort content
  const filteredContent = mockContent.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'ALL' || content.contentType === selectedType
    return matchesSearch && matchesType
  })

  const sortedContent = [...filteredContent].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'price-low':
        return parseFloat(a.price) - parseFloat(b.price)
      case 'price-high':
        return parseFloat(b.price) - parseFloat(a.price)
      case 'rating':
        return parseFloat(b.rating) - parseFloat(a.rating)
      case 'popularity':
        return b.licenseCount - a.licenseCount
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search content by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="input-field min-w-[150px]"
          >
            <option value="ALL">All Types</option>
            <option value="ARTICLE">Articles</option>
            <option value="VIDEO">Videos</option>
            <option value="AUDIO">Audio</option>
            <option value="DOCUMENT">Documents</option>
            <option value="SOFTWARE">Software</option>
            <option value="DATASET">Datasets</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field min-w-[150px]"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="popularity">Most Popular</option>
          </select>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedContent.map((content) => (
          <div key={content.id} className="content-card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {content.title}
                </h4>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                  {content.description}
                </p>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getContentTypeClass(content.contentType)}`}>
                  {getContentTypeLabel(content.contentType)}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(content.isActive)}`}>
                  {getStatusLabel(content.isActive)}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Price:</span>
                <span className="font-semibold text-gray-900">{content.price}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Views:</span>
                <span className="font-semibold text-gray-900">{content.views}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Rating:</span>
                <span className="font-semibold text-gray-900">{content.rating}/5.0</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Licenses:</span>
                <span className="font-semibold text-gray-900">{content.licenseCount}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Revenue:</span>
                <span className="font-semibold text-gray-900">{content.totalRevenue}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-200">
              <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                <span>Created: {content.createdAt}</span>
                <span>Last: {content.lastAccessed}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  Creator: {content.creator.substring(0, 8)}...{content.creator.substring(content.creator.length - 6)}
                </div>
                
                <button
                  className="btn-primary text-sm py-2 px-4"
                  disabled={!content.isActive}
                >
                  {content.isActive ? 'Purchase License' : 'Unavailable'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {sortedContent.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 text-gray-300 mb-4">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
        </div>
      )}

      {/* Marketplace Stats */}
      <div className="content-stats">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Marketplace Statistics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="metric-card">
            <div className="text-2xl font-bold text-emerald-600">{mockContent.length}</div>
            <div className="text-sm text-gray-600">Total Content</div>
          </div>
          
          <div className="metric-card">
            <div className="text-2xl font-bold text-green-600">
              {mockContent.reduce((sum, content) => sum + content.licenseCount, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Licenses</div>
          </div>
          
          <div className="metric-card">
            <div className="text-2xl font-bold text-blue-600">
              {mockContent.filter(content => content.isActive).length}
            </div>
            <div className="text-sm text-gray-600">Active Content</div>
          </div>
          
          <div className="metric-card">
            <div className="text-2xl font-bold text-purple-600">
              {mockContent.reduce((sum, content) => sum + parseFloat(content.totalRevenue), 0).toFixed(2)} ETH
            </div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </div>
        </div>
      </div>
    </div>
  )
}
