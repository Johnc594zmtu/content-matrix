import { ethers } from "hardhat";
import { writeFileSync } from "fs";
import { join } from "path";

async function main() {
  console.log("🚀 Starting Content Matrix deployment...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy ContentMatrix contract
  console.log("\n📝 Deploying ContentMatrix contract...");
  const ContentMatrix = await ethers.getContractFactory("ContentMatrix");
  const contentMatrix = await ContentMatrix.deploy(deployer.address); // Set deployer as content manager
  await contentMatrix.deployed();
  console.log("ContentMatrix deployed to:", contentMatrix.address);

  // Deploy ContentProtection contract
  console.log("\n🔒 Deploying ContentProtection contract...");
  const ContentProtection = await ethers.getContractFactory("ContentProtection");
  const contentProtection = await ContentProtection.deploy();
  await contentProtection.deployed();
  console.log("ContentProtection deployed to:", contentProtection.address);

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
        address: contentMatrix.address,
        deployer: deployer.address,
        transactionHash: contentMatrix.deployTransaction.hash,
        blockNumber: contentMatrix.deployTransaction.blockNumber,
      },
      ContentProtection: {
        address: contentProtection.address,
        deployer: deployer.address,
        transactionHash: contentProtection.deployTransaction.hash,
        blockNumber: contentProtection.deployTransaction.blockNumber,
      },
    },
    deploymentTime: new Date().toISOString(),
    gasUsed: {
      ContentMatrix: (await contentMatrix.deployTransaction.wait()).gasUsed.toString(),
      ContentProtection: (await contentProtection.deployTransaction.wait()).gasUsed.toString(),
    },
  };

  // Save deployment info
  const deploymentPath = join(__dirname, "..", "deployment-info.json");
  writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2));
  console.log("\n📄 Deployment info saved to:", deploymentPath);

  // Create environment file template
  const envTemplate = `# Content Matrix Environment Variables
# Copy this to .env.local and update with your deployed contract addresses

# Contract Addresses
NEXT_PUBLIC_CONTENT_MATRIX_ADDRESS=${contentMatrix.address}
NEXT_PUBLIC_CONTENT_PROTECTION_ADDRESS=${contentProtection.address}

# Network Configuration
NEXT_PUBLIC_NETWORK_NAME=${network.name}
NEXT_PUBLIC_CHAIN_ID=${chainId}

# Wallet Connect (get from https://cloud.walletconnect.com/)
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here

# RPC URLs (for production)
SEPOLIA_URL=your_sepolia_rpc_url_here
PRIVATE_KEY=your_private_key_here
`;

  const envPath = join(__dirname, "..", ".env.example");
  writeFileSync(envPath, envTemplate);
  console.log("📝 Environment template saved to:", envPath);

  // Verify contracts (if on a supported network)
  if (chainId === 11155111n) { // Sepolia
    console.log("\n🔍 Verifying contracts on Sepolia...");
    try {
      await new Promise(resolve => setTimeout(resolve, 30000)); // Wait 30 seconds
      
      console.log("Verifying ContentMatrix...");
      await hre.run("verify:verify", {
        address: contentMatrix.address,
        constructorArguments: [deployer.address],
      });
      
      console.log("Verifying ContentProtection...");
      await hre.run("verify:verify", {
        address: contentProtection.address,
        constructorArguments: [],
      });
      
      console.log("✅ Contracts verified successfully!");
    } catch (error) {
      console.log("⚠️ Contract verification failed:", error.message);
    }
  }

  console.log("\n🎉 Deployment completed successfully!");
  console.log("\n📋 Summary:");
  console.log(`Network: ${network.name} (${chainId})`);
  console.log(`ContentMatrix: ${contentMatrix.address}`);
  console.log(`ContentProtection: ${contentProtection.address}`);
  console.log(`Deployer: ${deployer.address}`);
  
  console.log("\n🔧 Next steps:");
  console.log("1. Copy .env.example to .env.local");
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