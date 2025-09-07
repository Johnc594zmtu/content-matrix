# Content Matrix - Secure Content Management Platform

Content Matrix is a privacy-preserving content management platform built with FHE (Fully Homomorphic Encryption) technology. It provides secure content creation, organization, analytics, and distribution while maintaining user privacy and data protection.

## 🚀 Live Demo

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Now-blue?style=for-the-badge&logo=vercel)](https://content-matrix-navy.vercel.app/)

**Experience Content Matrix in action**: [https://content-matrix-navy.vercel.app/](https://content-matrix-navy.vercel.app/)

The live demo showcases:
- 🔒 **FHE-encrypted content management** with real blockchain data
- 📊 **Real-time analytics** and content statistics  
- 👥 **Author management** with encrypted profiles
- 📁 **Category organization** with emoji icons and colors
- 🎯 **Content creation** with privacy-preserving features
- 🌐 **Web3 wallet integration** for secure transactions

> **Note**: Connect your Web3 wallet (MetaMask, WalletConnect) to interact with the live demo on Sepolia testnet.

## Features

### 📝 Content Management
- FHE-encrypted content storage and retrieval
- Support for multiple content types (Articles, Videos, Documents, Images, Audio)
- Encrypted content metadata and file information
- Content versioning and change tracking
- Privacy-preserving content organization

### 📁 Category & Tag System
- Encrypted content categorization
- Hierarchical category structure
- Smart content tagging with FHE encryption
- Category-based content organization
- Tag-based content discovery

### 👥 Author Management
- Encrypted author profiles and information
- Author verification and rating system
- Content attribution and ownership tracking
- Author analytics and performance metrics
- Privacy-preserving author collaboration

### 📄 License Management
- Encrypted license information and terms
- License compliance tracking
- Usage rights and restrictions management
- Automated license validation
- Privacy-preserving license analytics

### 🔄 Version Control
- Encrypted content versioning
- Version history and change tracking
- Content update management
- Version comparison and rollback
- Privacy-preserving version analytics

### 🔒 Access Control
- Encrypted access permissions and restrictions
- Role-based access control (RBAC)
- Time-based access management
- Content sharing and distribution control
- Privacy-preserving access analytics

### 📊 Content Analytics
- Encrypted engagement metrics (views, likes, shares, downloads)
- Privacy-preserving content performance analysis
- User behavior analytics with FHE protection
- Content recommendation algorithms
- Real-time analytics dashboard

### 🎯 Content Recommendations
- Encrypted recommendation algorithms
- Privacy-preserving content discovery
- Personalized content suggestions
- Collaborative filtering with FHE
- Recommendation confidence scoring

## Architecture

### Smart Contract Components

#### ContentItem
- Encrypted content information (title, description, type, hash)
- Encrypted content metadata (author, category, tags, language)
- Encrypted content statistics (views, likes, shares, downloads)
- Content lifecycle management
- Privacy-preserving content storage

#### ContentCategory
- Encrypted category information and hierarchy
- Category-based content organization
- Encrypted category metadata and styling
- Category analytics and statistics
- Privacy-preserving category management

#### ContentTag
- Encrypted tag information and categorization
- Tag-based content discovery
- Encrypted tag usage statistics
- Tag analytics and trending
- Privacy-preserving tag management

#### ContentAuthor
- Encrypted author profiles and information
- Author verification and rating system
- Encrypted author statistics and performance
- Author collaboration and attribution
- Privacy-preserving author management

#### ContentLicense
- Encrypted license information and terms
- License compliance and validation
- Encrypted license usage tracking
- License analytics and reporting
- Privacy-preserving license management

#### ContentVersion
- Encrypted content versioning and history
- Version comparison and rollback
- Encrypted version metadata and changes
- Version analytics and tracking
- Privacy-preserving version management

#### ContentAccess
- Encrypted access permissions and restrictions
- Role-based and time-based access control
- Access analytics and monitoring
- Content sharing and distribution
- Privacy-preserving access management

#### ContentAnalytics
- Encrypted engagement metrics and statistics
- Privacy-preserving content performance analysis
- User behavior analytics with FHE protection
- Real-time analytics and reporting
- Content optimization insights

#### ContentRecommendation
- Encrypted recommendation algorithms and scoring
- Privacy-preserving content discovery
- Personalized content suggestions
- Collaborative filtering with FHE
- Recommendation confidence and accuracy

### Key Functions

#### Content Management
- `createContentItem()` - Create encrypted content item
- `updateContentItem()` - Update content information
- `updateContentStats()` - Update content statistics
- `deactivateContentItem()` - Deactivate content

#### Category Management
- `createContentCategory()` - Create encrypted category
- `updateContentCategory()` - Update category information
- `deactivateContentCategory()` - Deactivate category

#### Tag Management
- `createContentTag()` - Create encrypted tag
- `updateContentTag()` - Update tag information
- `deactivateContentTag()` - Deactivate tag

#### Author Management
- `createContentAuthor()` - Create encrypted author profile
- `updateContentAuthor()` - Update author information
- `deactivateContentAuthor()` - Deactivate author

#### License Management
- `createContentLicense()` - Create encrypted license
- `deactivateContentLicense()` - Deactivate license

#### Version Management
- `createContentVersion()` - Create content version
- `deactivateContentVersion()` - Deactivate version

#### Access Management
- `grantContentAccess()` - Grant content access
- `deactivateContentAccess()` - Deactivate access

#### Analytics Management
- `calculateContentAnalytics()` - Calculate content analytics
- `deactivateContentAnalytics()` - Deactivate analytics

#### Recommendation Management
- `generateContentRecommendation()` - Generate content recommendation
- `deactivateContentRecommendation()` - Deactivate recommendation

## Installation

### Prerequisites
- Node.js 18+
- Hardhat
- FHEVM
- Git

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd content-matrix

# Install dependencies
npm install

# Compile contracts
npm run compile

# Run tests
npm run test

# Deploy to local network
npm run deploy:local

# Deploy to Sepolia
npm run deploy:sepolia
```

### Environment Configuration
1. Copy the environment template:
```bash
cp .env.example .env.local
```

2. Update the environment variables in `.env.local`:
```env
# Contract addresses (set after deployment)
NEXT_PUBLIC_CONTENT_MATRIX_ADDRESS=0x...
NEXT_PUBLIC_CONTENT_PROTECTION_ADDRESS=0x...

# Wallet Connect Project ID
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here

# Network configuration
NEXT_PUBLIC_NETWORK_NAME=hardhat
NEXT_PUBLIC_CHAIN_ID=1337
```

### Frontend Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

### Contract Deployment
```bash
# Deploy to local Hardhat network
npm run deploy:local

# Deploy to Sepolia testnet
npm run deploy:sepolia
```

## Usage

### Getting Started
1. **Deploy Contracts**: Run the deployment script to deploy both ContentMatrix and ContentProtection contracts
2. **Configure Environment**: Update `.env.local` with deployed contract addresses
3. **Start Frontend**: Run `npm run dev` to start the development server
4. **Connect Wallet**: Use the Connect Wallet button to connect your MetaMask or other Web3 wallet

### Content Creation
1. Connect your wallet to the application
2. Navigate to the "Content" section
3. Click "Create Content" button
4. Fill in the content form with:
   - Content title and description
   - Content type (Article, Video, Audio, Document, etc.)
   - Content hash (IPFS/Arweave hash)
   - Author information
   - Category and tags
   - Language and file size
5. Submit the form to create encrypted content on the blockchain

### Category Management
1. Navigate to the "Categories" section
2. Click "Create Category" button
3. Fill in category information:
   - Category name and description
   - Category type and icon
   - Category color
4. Submit to create an encrypted category

### Author Registration
1. Navigate to the "Authors" section
2. Click "Add Author" button
3. Fill in author information:
   - Author name and email
   - Author bio and website
   - Social media links
   - Avatar information
4. Submit to register as a content author

### Content Analytics
1. Navigate to the "Analytics" section in the dashboard
2. View real-time platform statistics:
   - Total content and active content
   - Total categories and authors
   - Total licenses and revenue
3. Monitor content performance metrics
4. Track platform growth and usage

### Content Protection & Licensing
1. Use the ContentProtection contract for:
   - Creating protected content with pricing
   - Purchasing content licenses
   - Managing access levels and durations
2. View license statistics and revenue
3. Monitor content usage and analytics

## Security Features

### FHE Encryption
- All sensitive content data encrypted with FHE
- Computations on encrypted content
- Privacy-preserving content analytics
- Zero-knowledge content proofs

### Content Security
- Encrypted content storage and retrieval
- Privacy-preserving content sharing
- Secure content access control
- Content integrity verification

### Access Control
- Role-based access control (RBAC)
- Time-based access restrictions
- Encrypted permission management
- Content sharing and distribution control

### Analytics Privacy
- Encrypted engagement metrics
- Privacy-preserving user behavior analysis
- FHE-protected content recommendations
- Anonymous content performance tracking

## UI Design

### Content Matrix Theme
- **Color Scheme**: Red-based content theme
- **Animations**: Content-specific animations (upload, download, share, like, category, tag, author, license, version, access, analytics, recommendation)
- **Visual Elements**: Content icons, file types, category symbols, author avatars, license badges
- **Layout**: Clean, content-focused management interface

### Key UI Components
- Dashboard with content statistics
- Content management and organization
- Category and tag management
- Author profiles and collaboration
- Analytics and recommendation engine

## Testing

### Contract Tests
```bash
npm run test
```

### Test Coverage
- Content item creation and management
- Category and tag management
- Author profile management
- License and version control
- Access control and permissions
- Analytics and recommendations
- Content security and privacy

## Deployment

### Local Development
```bash
npm run deploy:local
```

### Sepolia Testnet
```bash
npm run deploy:sepolia
```

### Environment Variables
```env
# Contract addresses (set after deployment)
NEXT_PUBLIC_CONTENT_MATRIX_ADDRESS=0x...
NEXT_PUBLIC_CONTENT_PROTECTION_ADDRESS=0x...

# Network configuration
NEXT_PUBLIC_NETWORK_NAME=hardhat
NEXT_PUBLIC_CHAIN_ID=1337

# Wallet Connect
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id

# Deployment (for scripts)
SEPOLIA_URL=your_sepolia_rpc_url
PRIVATE_KEY=your_private_key
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions:
- Create an issue on GitHub
- Join our community discussions
- Check the documentation

## Implementation Details

### Real Contract Integration
- ✅ **No Hardcoded Data**: All frontend components now use real contract data
- ✅ **Parameter Consistency**: Frontend and contract parameters are fully aligned
- ✅ **FHE Encryption**: Proper encryption/decryption utilities for sensitive data
- ✅ **Real-time Updates**: Live data from blockchain contracts
- ✅ **Error Handling**: Comprehensive error handling and user feedback

### Contract Architecture
- **ContentMatrix Contract**: Manages content items, categories, authors, and analytics
- **ContentProtection Contract**: Handles content licensing, access control, and revenue
- **FHE Integration**: All sensitive data encrypted using Fully Homomorphic Encryption
- **Event-driven**: Real-time updates through blockchain events

### Frontend Architecture
- **Custom Hooks**: `useContentMatrix` and `useContentProtection` for contract interactions
- **Type Safety**: Full TypeScript integration with contract types
- **State Management**: React hooks for managing contract state
- **Form Validation**: Client-side validation with contract parameter alignment

### Data Flow
1. **User Input** → Form validation → FHE encryption
2. **Contract Call** → Transaction submission → Event emission
3. **State Update** → Real-time UI refresh → User feedback
4. **Data Persistence** → Blockchain storage → Encrypted retrieval

## Roadmap

### Phase 1: Core Content Management ✅
- ✅ Basic content creation and storage
- ✅ FHE encryption integration
- ✅ Category and tag system
- ✅ Author management
- ✅ Real contract integration
- ✅ End-to-end data flow

### Phase 2: Advanced Features 🔄
- 🔄 Content versioning and history
- 🔄 Advanced analytics and insights
- 🔄 Content recommendation engine
- 🔄 License management system
- 🔄 Event indexing and subgraphs

### Phase 3: Enterprise Features 🔄
- 🔄 Enterprise content collaboration
- 🔄 Advanced access control
- 🔄 Content workflow automation
- 🔄 Business intelligence integration
- 🔄 Multi-chain support

---

**Content Matrix** - Secure, Private, Intelligent Content Management for the Privacy-First Era