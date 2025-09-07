# Content Matrix - Project Structure

## Directory Overview

```
content-matrix/
├── app/                          # Next.js App Router
│   ├── authors/                  # Author management page
│   ├── categories/               # Category management page
│   ├── content/                  # Content management page
│   ├── dashboard/                # Main dashboard page
│   ├── protection/               # Content protection page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   ├── providers.tsx             # App providers
│   └── wagmi.ts                  # Wagmi configuration
├── components/                   # React components
│   ├── ContentMatrixAuthors.tsx  # Authors management
│   ├── ContentMatrixCategories.tsx # Categories management
│   ├── ContentMatrixContent.tsx  # Content management
│   ├── ContentMatrixDashboard.tsx # Dashboard overview
│   ├── CreateAuthorModal.tsx     # Author creation modal
│   ├── CreateCategoryModal.tsx   # Category creation modal
│   ├── CreateContentModal.tsx    # Content creation modal
│   ├── LicenseManagement.tsx     # License management
│   ├── Modal.tsx                 # Generic modal component
│   ├── ContentCreation.tsx       # Content creation form
│   └── ContentMarketplace.tsx    # Content marketplace
├── contracts/                    # Smart contracts
│   ├── ContentMatrix.sol         # Main content management contract
│   └── ContentProtection.sol     # Content protection contract
├── hooks/                        # Custom React hooks
│   ├── useContentMatrix.ts       # Content Matrix contract hook
│   └── useContentProtection.ts   # Content Protection contract hook
├── lib/                          # Utility libraries
│   ├── contracts.ts              # Contract ABIs and addresses
│   └── fhe-utils.ts              # FHE encryption utilities
├── scripts/                      # Deployment and utility scripts
│   ├── deploy-simple.js          # Simple deployment script
│   ├── deploy.ts                 # TypeScript deployment script
│   ├── generate-test-data.js     # Test data generation
│   ├── init-author.js            # Author initialization
│   └── query-contract-data.js    # Contract data querying
├── test/                         # Test files
│   ├── ContentMatrix.test.ts     # Content Matrix tests
│   └── ContentProtection.test.ts # Content Protection tests
├── config/                       # Configuration files
│   └── environment.ts            # Environment configuration
├── public/                       # Static assets
│   ├── favicon.ico               # Site favicon
│   └── icon.svg                  # Site icon
├── .gitignore                    # Git ignore rules
├── hardhat.config.ts             # Hardhat configuration
├── next.config.mjs               # Next.js configuration
├── package.json                  # Dependencies and scripts
├── postcss.config.js             # PostCSS configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── vercel.json                   # Vercel deployment configuration
├── deploy-config.example         # Environment variables example
├── README.md                     # Project documentation
├── IMPLEMENTATION_SUMMARY.md     # Implementation details
└── PROJECT_STRUCTURE.md          # This file
```

## Key Files

### Core Application
- **`app/page.tsx`**: Landing page with marketing content
- **`app/dashboard/page.tsx`**: Main functional dashboard
- **`app/layout.tsx`**: Root layout with providers
- **`app/providers.tsx`**: Wagmi and RainbowKit providers

### Smart Contracts
- **`contracts/ContentMatrix.sol`**: Main content management contract
- **`contracts/ContentProtection.sol`**: Content licensing and protection

### Custom Hooks
- **`hooks/useContentMatrix.ts`**: Contract interaction for content, categories, authors
- **`hooks/useContentProtection.ts`**: Contract interaction for licensing

### Components
- **Modal Components**: `CreateContentModal.tsx`, `CreateCategoryModal.tsx`, `CreateAuthorModal.tsx`
- **Management Components**: `ContentMatrixContent.tsx`, `ContentMatrixCategories.tsx`, `ContentMatrixAuthors.tsx`
- **Dashboard**: `ContentMatrixDashboard.tsx`

### Utilities
- **`lib/contracts.ts`**: Contract ABIs and addresses
- **`lib/fhe-utils.ts`**: FHE encryption/decryption utilities
- **`config/environment.ts`**: Environment variable management

### Deployment
- **`scripts/deploy-simple.js`**: Simple deployment script
- **`scripts/generate-test-data.js`**: Test data generation
- **`vercel.json`**: Vercel deployment configuration

## Build Outputs (Ignored by Git)
- **`node_modules/`**: Dependencies
- **`.next/`**: Next.js build output
- **`artifacts/`**: Hardhat compilation artifacts
- **`cache/`**: Hardhat cache
- **`typechain-types/`**: Generated TypeScript types

## Environment Variables
Copy `deploy-config.example` to `.env.local` and configure:
- Contract addresses
- Network configuration
- WalletConnect project ID
- RPC URLs
- Private keys (for deployment)
