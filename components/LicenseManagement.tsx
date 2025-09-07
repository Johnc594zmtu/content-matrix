'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'

// Mock contract ABI - in real app, this would come from the compiled contract
const CONTRACT_ABI = [
  {
    "inputs": [
      {"name": "contentAddress", "type": "address"},
      {"name": "encryptedAccessLevel", "type": "uint256"},
      {"name": "encryptedDuration", "type": "uint256"}
    ],
    "name": "purchaseLicense",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  // Note: revokeLicense function not available in current contract
]

const CONTRACT_ADDRESS = '0x...' // Replace with actual deployed contract address

// Mock data for demonstration
const mockLicenses = [
  {
    licenseId: 'license_0x742d35_0x8ba1f109_1703123456',
    contentTitle: 'Advanced Blockchain Privacy Techniques',
    contentCreator: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    accessLevel: 'PREMIUM',
    duration: '30 days',
    status: 'ACTIVE',
    issuedAt: '2024-01-15',
    expiresAt: '2024-02-14',
    usageCount: 12,
    price: '0.05 ETH'
  },
  {
    licenseId: 'license_0x123f681_0x456a7b8c_1703123000',
    contentTitle: 'Privacy-Preserving DApp Framework',
    contentCreator: '0x123f681646d4a755815f9cb19e1acc8565a0c2ac',
    accessLevel: 'ENTERPRISE',
    duration: '90 days',
    status: 'ACTIVE',
    issuedAt: '2024-01-10',
    expiresAt: '2024-04-09',
    usageCount: 8,
    price: '0.15 ETH'
  },
  {
    licenseId: 'license_0x8ba1f109_0x123f681_1703122500',
    contentTitle: 'FHE Implementation Tutorial',
    contentCreator: '0x8ba1f109551bD432803012645Hac136c772c3c7b',
    accessLevel: 'BASIC',
    duration: '30 days',
    status: 'EXPIRED',
    issuedAt: '2023-12-15',
    expiresAt: '2024-01-14',
    usageCount: 25,
    price: '0.08 ETH'
  }
]

const getAccessLevelClass = (level: string) => {
  switch (level) {
    case 'BASIC': return 'access-level-basic'
    case 'PREMIUM': return 'access-level-premium'
    case 'ENTERPRISE': return 'access-level-enterprise'
    case 'CUSTOM': return 'access-level-custom'
    default: return 'access-level-basic'
  }
}

const getAccessLevelLabel = (level: string) => {
  switch (level) {
    case 'BASIC': return 'Basic'
    case 'PREMIUM': return 'Premium'
    case 'ENTERPRISE': return 'Enterprise'
    case 'CUSTOM': return 'Custom'
    default: return level
  }
}

const getStatusClass = (status: string) => {
  switch (status) {
    case 'ACTIVE': return 'status-licensed'
    case 'EXPIRED': return 'status-unlicensed'
    case 'REVOKED': return 'status-rejected'
    default: return 'status-unlicensed'
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'ACTIVE': return 'Active'
    case 'EXPIRED': return 'Expired'
    case 'REVOKED': return 'Revoked'
    default: return status
  }
}

export default function LicenseManagement() {
  const { address, isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState('my-licenses')
  const [selectedContent, setSelectedContent] = useState('')
  const [accessLevel, setAccessLevel] = useState('BASIC')
  const [duration, setDuration] = useState('30')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { writeContract: purchaseLicense, data: purchaseHash } = useWriteContract()

  const { isLoading: isPurchasing, isSuccess: isLicensePurchased } = useWaitForTransactionReceipt({
    hash: purchaseHash,
  })

  // Note: revokeLicense function not available in current contract ABI

  const handlePurchaseLicense = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isConnected || !selectedContent) return

    setIsSubmitting(true)
    try {
      // In a real FHE implementation, these values would be encrypted client-side
      const encryptedAccessLevel = parseEther(accessLevel === 'BASIC' ? '1' : accessLevel === 'PREMIUM' ? '2' : accessLevel === 'ENTERPRISE' ? '3' : '4')
      const encryptedDuration = parseEther(duration)
      
      purchaseLicense({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'purchaseLicense',
        args: [selectedContent as `0x${string}`, encryptedAccessLevel, encryptedDuration],
        value: parseEther('0.1'), // Mock price
      })
    } catch (error) {
      console.error('Error purchasing license:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Note: revokeLicense function not available in current contract ABI

  const handleReset = () => {
    setSelectedContent('')
    setAccessLevel('BASIC')
    setDuration('30')
  }

  if (!isConnected) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Please connect your wallet to manage licenses</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('my-licenses')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'my-licenses'
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            My Licenses
          </button>
          <button
            onClick={() => setActiveTab('purchase-license')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'purchase-license'
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Purchase License
          </button>
        </nav>
      </div>

      {/* Purchase License Form */}
      {activeTab === 'purchase-license' && (
        <div className="card">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Purchase New License</h4>
          <form onSubmit={handlePurchaseLicense} className="space-y-4">
            <div>
              <label htmlFor="selectedContent" className="block text-sm font-medium text-gray-700 mb-2">
                Content Creator Address
              </label>
              <input
                type="text"
                id="selectedContent"
                value={selectedContent}
                onChange={(e) => setSelectedContent(e.target.value)}
                placeholder="0x..."
                className="input-field"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Address of the content creator you want to license from
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="accessLevel" className="block text-sm font-medium text-gray-700 mb-2">
                  Access Level
                </label>
                <select
                  id="accessLevel"
                  value={accessLevel}
                  onChange={(e) => setAccessLevel(e.target.value)}
                  className="input-field"
                  required
                >
                  <option value="BASIC">Basic Access</option>
                  <option value="PREMIUM">Premium Access</option>
                  <option value="ENTERPRISE">Enterprise Access</option>
                  <option value="CUSTOM">Custom Access</option>
                </select>
                <p className="mt-1 text-sm text-gray-500">
                  Will be encrypted using FHE
                </p>
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (days)
                </label>
                <input
                  type="number"
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="30"
                  min="1"
                  max="365"
                  className="input-field"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  Will be encrypted using FHE
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleReset}
                className="btn-secondary"
                disabled={isSubmitting || isPurchasing}
              >
                Reset
              </button>
              
              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting || isPurchasing || !selectedContent}
              >
                {isSubmitting || isPurchasing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isSubmitting ? 'Purchasing...' : 'Processing...'}
                  </div>
                ) : (
                  'Purchase License'
                )}
              </button>
            </div>
          </form>

          {/* Success Message */}
          {isLicensePurchased && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800">
                License purchased successfully! The transaction has been confirmed on the blockchain.
              </p>
            </div>
          )}
        </div>
      )}

      {/* My Licenses */}
      {activeTab === 'my-licenses' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold text-gray-900">
              My Licenses
            </h4>
            <span className="text-sm text-gray-500">
              {mockLicenses.length} licenses
            </span>
          </div>

          <div className="space-y-4">
            {mockLicenses.map((license) => (
              <div key={license.licenseId} className="license-card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h5 className="text-lg font-semibold text-gray-900 mb-2">
                      {license.contentTitle}
                    </h5>
                    <p className="text-sm text-gray-600">
                      License ID: {license.licenseId.substring(0, 25)}...
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAccessLevelClass(license.accessLevel)}`}>
                      {getAccessLevelLabel(license.accessLevel)}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(license.status)}`}>
                      {getStatusLabel(license.status)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-gray-600">Price:</span>
                    <p className="font-medium text-gray-900">{license.price}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-gray-600">Duration:</span>
                    <p className="font-medium text-gray-900">{license.duration}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-gray-600">Usage Count:</span>
                    <p className="font-medium text-gray-900">{license.usageCount}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-gray-600">Issued:</span>
                    <p className="font-medium text-gray-900">{license.issuedAt}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-green-200">
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                    <span>Expires: {license.expiresAt}</span>
                    <span>Creator: {license.contentCreator.substring(0, 8)}...{license.contentCreator.substring(license.contentCreator.length - 6)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      License ID: {license.licenseId.substring(0, 30)}...
                    </div>
                    
                    {/* Note: Revoke License functionality not available in current contract */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {mockLicenses.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 text-gray-300 mb-4">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No licenses found</h3>
              <p className="text-gray-600">
                You haven't purchased any content licenses yet.
              </p>
            </div>
          )}

          {/* Success Message for License Revocation */}
          {isLicenseRevoked && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800">
                License revoked successfully! The transaction has been confirmed on the blockchain.
              </p>
            </div>
          )}
        </div>
      )}

      {/* License Statistics */}
      <div className="license-metrics">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">License Statistics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="metric-card">
            <div className="text-2xl font-bold text-emerald-600">{mockLicenses.length}</div>
            <div className="text-sm text-gray-600">Total Licenses</div>
          </div>
          
          <div className="metric-card">
            <div className="text-2xl font-bold text-green-600">
              {mockLicenses.filter(l => l.status === 'ACTIVE').length}
            </div>
            <div className="text-sm text-gray-600">Active Licenses</div>
          </div>
          
          <div className="metric-card">
            <div className="text-2xl font-bold text-blue-600">
              {mockLicenses.reduce((sum, license) => sum + license.usageCount, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Usage</div>
          </div>
          
          <div className="metric-card">
            <div className="text-2xl font-bold text-purple-600">
              {mockLicenses.filter(l => l.accessLevel === 'PREMIUM' || l.accessLevel === 'ENTERPRISE').length}
            </div>
            <div className="text-sm text-gray-600">Premium Licenses</div>
          </div>
        </div>
      </div>
    </div>
  )
}
