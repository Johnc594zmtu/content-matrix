const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Starting Content Matrix deployment...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());

  // Deploy ContentMatrix contract
  console.log("\n📝 Deploying ContentMatrix contract...");
  const ContentMatrix = await ethers.getContractFactory("ContentMatrix");
  const contentMatrix = await ContentMatrix.deploy(deployer.address); // Set deployer as content manager
  await contentMatrix.waitForDeployment();
  const contentMatrixAddress = await contentMatrix.getAddress();
  console.log("ContentMatrix deployed to:", contentMatrixAddress);

  // Deploy ContentProtection contract
  console.log("\n🔒 Deploying ContentProtection contract...");
  const ContentProtection = await ethers.getContractFactory("ContentProtection");
  const contentProtection = await ContentProtection.deploy();
  await contentProtection.waitForDeployment();
  const contentProtectionAddress = await contentProtection.getAddress();
  console.log("ContentProtection deployed to:", contentProtectionAddress);

  // Get network info
  const network = await ethers.provider.getNetwork();
  const chainId = network.chainId;

  // Create deployment info
  const deploymentInfo = {
    network: {
      name: network.name,
      chainId: chainId.toString(),
    },
    contracts: {
      ContentMatrix: {
        address: contentMatrixAddress,
        deployer: deployer.address,
        transactionHash: contentMatrix.deploymentTransaction().hash,
        blockNumber: contentMatrix.deploymentTransaction().blockNumber,
      },
      ContentProtection: {
        address: contentProtectionAddress,
        deployer: deployer.address,
        transactionHash: contentProtection.deploymentTransaction().hash,
        blockNumber: contentProtection.deploymentTransaction().blockNumber,
      },
    },
    deploymentTime: new Date().toISOString(),
    gasUsed: {
      ContentMatrix: (await contentMatrix.deploymentTransaction().wait()).gasUsed.toString(),
      ContentProtection: (await contentProtection.deploymentTransaction().wait()).gasUsed.toString(),
    },
  };

  // Save deployment info
  const deploymentPath = path.join(__dirname, "..", "deployment-info.json");
  fs.writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2));
  console.log("\n📄 Deployment info saved to:", deploymentPath);

  // Create environment file template
  const envTemplate = `# Content Matrix Environment Variables
# Copy this to .env.local and update with your deployed contract addresses

# Contract Addresses
NEXT_PUBLIC_CONTENT_MATRIX_ADDRESS=${contentMatrixAddress}
NEXT_PUBLIC_CONTENT_PROTECTION_ADDRESS=${contentProtectionAddress}

# Network Configuration
NEXT_PUBLIC_NETWORK_NAME=${network.name}
NEXT_PUBLIC_CHAIN_ID=${chainId}

# Wallet Connect (get from https://cloud.walletconnect.com/)
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here

# RPC URLs (for production)
SEPOLIA_URL=your_sepolia_rpc_url_here
PRIVATE_KEY=your_private_key_here
`;

  const envPath = path.join(__dirname, "..", ".env.local");
  fs.writeFileSync(envPath, envTemplate);
  console.log("📝 Environment file saved to:", envPath);

  console.log("\n🎉 Deployment completed successfully!");
  console.log("\n📋 Summary:");
  console.log(`Network: ${network.name} (${chainId})`);
  console.log(`ContentMatrix: ${contentMatrixAddress}`);
  console.log(`ContentProtection: ${contentProtectionAddress}`);
  console.log(`Deployer: ${deployer.address}`);
  
  console.log("\n🔧 Next steps:");
  console.log("1. Copy the contract addresses to your .env.local file");
  console.log("2. Update NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID");
  console.log("3. Run 'npm run dev' to start the frontend");
  console.log("4. Connect your wallet and start creating content!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
