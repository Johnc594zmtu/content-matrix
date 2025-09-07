const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Starting Content Matrix deployment...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");

  // Deploy ContentMatrix contract
  console.log("\n📝 Deploying ContentMatrix contract...");
  const ContentMatrix = await ethers.getContractFactory("ContentMatrix");
  const contentMatrix = await ContentMatrix.deploy(deployer.address); // Set deployer as content manager
  await contentMatrix.waitForDeployment();
  console.log("ContentMatrix deployed to:", await contentMatrix.getAddress());

  // Deploy ContentProtection contract
  console.log("\n🔒 Deploying ContentProtection contract...");
  const ContentProtection = await ethers.getContractFactory("ContentProtection");
  const contentProtection = await ContentProtection.deploy();
  await contentProtection.waitForDeployment();
  console.log("ContentProtection deployed to:", await contentProtection.getAddress());

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
        address: await contentMatrix.getAddress(),
        deployer: deployer.address,
        transactionHash: contentMatrix.deploymentTransaction()?.hash,
        blockNumber: contentMatrix.deploymentTransaction()?.blockNumber,
      },
      ContentProtection: {
        address: await contentProtection.getAddress(),
        deployer: deployer.address,
        transactionHash: contentProtection.deploymentTransaction()?.hash,
        blockNumber: contentProtection.deploymentTransaction()?.blockNumber,
      },
    },
    deploymentTime: new Date().toISOString(),
    gasUsed: {
      ContentMatrix: contentMatrix.deploymentTransaction()?.gasLimit?.toString() || "0",
      ContentProtection: contentProtection.deploymentTransaction()?.gasLimit?.toString() || "0",
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
NEXT_PUBLIC_CONTENT_MATRIX_ADDRESS=${await contentMatrix.getAddress()}
NEXT_PUBLIC_CONTENT_PROTECTION_ADDRESS=${await contentProtection.getAddress()}

# Network Configuration
NEXT_PUBLIC_NETWORK_NAME=${network.name}
NEXT_PUBLIC_CHAIN_ID=${chainId}

# Wallet Connect (get from https://cloud.walletconnect.com/)
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here

# RPC URLs (for production)
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/your_infura_key_here

# Private Key (for server-side operations only - NEVER commit this!)
PRIVATE_KEY=your_private_key_here
`;

  const envPath = path.join(__dirname, "..", ".env.example");
  fs.writeFileSync(envPath, envTemplate);
  console.log("📄 Environment template saved to:", envPath);

  // Verify contracts on Sepolia
  if (chainId === 11155111n) { // Sepolia
    console.log("\n🔍 Verifying contracts on Sepolia...");
    try {
      await new Promise(resolve => setTimeout(resolve, 30000)); // Wait 30 seconds
      
      console.log("Verifying ContentMatrix...");
      await hre.run("verify:verify", {
        address: await contentMatrix.getAddress(),
        constructorArguments: [deployer.address],
      });
      
      console.log("Verifying ContentProtection...");
      await hre.run("verify:verify", {
        address: await contentProtection.getAddress(),
        constructorArguments: [],
      });
      
      console.log("✅ Contracts verified successfully!");
    } catch (error) {
      console.log("⚠️ Contract verification failed:", error instanceof Error ? error.message : String(error));
    }
  }

  console.log("\n🎉 Deployment completed successfully!");
  console.log("\n📋 Next steps:");
  console.log("1. Copy .env.example to .env.local");
  console.log("2. Update environment variables with your actual values");
  console.log("3. Run 'npm run dev' to start the development server");
  console.log("4. Visit http://localhost:3000 to see your application");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
