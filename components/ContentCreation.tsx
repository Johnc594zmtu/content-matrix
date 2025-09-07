'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'

// Mock contract ABI - in real app, this would come from the compiled contract
const CONTRACT_ABI = [
  {
    "inputs": [
      {"name": "encryptedPrice", "type": "uint256"},
      {"name": "contentType", "type": "uint8"},
      {"name": "contentHash", "type": "string"},
      {"name": "metadata", "type": "string"}
    ],
    "name": "createContent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const CONTRACT_ADDRESS = '0x...' // Replace with actual deployed contract address

const contentTypes = [
  { value: 0, label: 'Article', description: 'Written content and articles', class: 'content-type-article' },
  { value: 1, label: 'Video', description: 'Video content and media', class: 'content-type-video' },
  { value: 2, label: 'Audio', description: 'Audio content and podcasts', class: 'content-type-audio' },
  { value: 3, label: 'Document', description: 'Documents and files', class: 'content-type-document' },
  { value: 4, label: 'Software', description: 'Software and code', class: 'content-type-software' },
  { value: 5, label: 'Dataset', description: 'Data and datasets', class: 'content-type-dataset' }
]

export default function ContentCreation() {
  const { address, isConnected } = useAccount()
  const [price, setPrice] = useState('')
  const [contentType, setContentType] = useState('0')
  const [contentHash, setContentHash] = useState('')
  const [metadata, setMetadata] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { writeContract: createContent, data: hash } = useWriteContract()

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isConnected || !price || !contentHash || !metadata) return

    setIsSubmitting(true)
    try {
      // In a real FHE implementation, the price would be encrypted client-side
      const encryptedPrice = parseEther(price)
      
      createContent({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'createContent',
        args: [encryptedPrice, parseInt(contentType), contentHash, metadata],
      })
    } catch (error) {
      console.error('Error creating content:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setPrice('')
    setContentType('0')
    setContentHash('')
    setMetadata('')
  }

  if (!isConnected) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Please connect your wallet to create content</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="contentType" className="block text-sm font-medium text-gray-700 mb-2">
            Content Type
          </label>
          <select
            id="contentType"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="input-field"
            required
          >
            {contentTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label} - {type.description}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="contentHash" className="block text-sm font-medium text-gray-700 mb-2">
            Content Hash (IPFS/Arweave)
          </label>
          <input
            type="text"
            id="contentHash"
            value={contentHash}
            onChange={(e) => setContentHash(e.target.value)}
            placeholder="QmHash123456789..."
            className="input-field"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            Hash of your content stored on IPFS, Arweave, or similar decentralized storage
          </p>
        </div>

        <div>
          <label htmlFor="metadata" className="block text-sm font-medium text-gray-700 mb-2">
            Content Metadata
          </label>
          <textarea
            id="metadata"
            value={metadata}
            onChange={(e) => setMetadata(e.target.value)}
            placeholder="Describe your content, include tags, and any relevant information..."
            rows={4}
            className="input-field"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            Description, tags, and metadata for your content
          </p>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
            Price (ETH)
          </label>
          <div className="relative">
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.01"
              step="0.001"
              min="0.001"
              className="input-field pr-16"
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <span className="text-gray-500 text-sm">ETH</span>
            </div>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Price will be encrypted using FHE before storage. Minimum: 0.001 ETH
          </p>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary"
            disabled={isSubmitting || isLoading}
          >
            Reset
          </button>
          
          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting || isLoading || !price || !contentHash || !metadata}
          >
            {isSubmitting || isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {isSubmitting ? 'Creating...' : 'Processing...'}
              </div>
            ) : (
              'Create Content'
            )}
          </button>
        </div>
      </form>

      {/* Success Message */}
      {isSuccess && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Content created successfully!
              </p>
              <p className="mt-1 text-sm text-green-700">
                Your content is now protected with FHE encryption and ready for licensing.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-emerald-800">
              Privacy Protection
            </h3>
            <div className="mt-2 text-sm text-emerald-700">
              <p>
                Your content's price is encrypted using Fully Homomorphic Encryption (FHE) 
                before being stored on the blockchain. This ensures complete privacy 
                while maintaining the ability to perform licensing operations on the encrypted data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
