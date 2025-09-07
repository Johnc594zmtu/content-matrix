const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  console.log("👤 Initializing author data...");
  
  // Get the contract address
  const contentMatrixAddress = "0x3CAc5884cBd786A987cc4F53D061B63B4896F988";
  
  // Get the contract factory
  const ContentMatrix = await ethers.getContractFactory("ContentMatrix");
  
  // Connect to the deployed contract
  const contentMatrix = ContentMatrix.attach(contentMatrixAddress);
  
  console.log("📊 Current platform statistics:");
  const stats = await contentMatrix.getContentMatrixStatistics();
  console.log(`  Total Content: ${stats[0]}`);
  console.log(`  Active Content: ${stats[1]}`);
  console.log(`  Total Categories: ${stats[2]}`);
  console.log(`  Total Authors: ${stats[3]}`);
  
  // If no authors exist, create one
  if (stats[3] == 0) {
    console.log("\n👤 Creating initial author...");
    
    // Simple hash function for "encryption"
    function simpleHash(str) {
      return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(str));
    }
    
    try {
      const tx = await contentMatrix.createContentAuthor(
        simpleHash("John Doe"),           // name
        simpleHash("john@example.com"),   // email
        simpleHash("Technology enthusiast and FHE researcher"), // bio
        simpleHash("👨‍💻"),              // avatar
        simpleHash("https://johndoe.com"), // website
        simpleHash("@johndoe"),           // social
        simpleHash("0x1234567890abcdef")  // hash
      );
      
      console.log("Transaction hash:", tx.hash);
      await tx.wait();
      console.log("✅ Author created successfully!");
      
      // Check updated stats
      const newStats = await contentMatrix.getContentMatrixStatistics();
      console.log("\n📊 Updated platform statistics:");
      console.log(`  Total Authors: ${newStats[3]}`);
      
    } catch (error) {
      console.error("❌ Error creating author:", error.message);
    }
  } else {
    console.log("✅ Authors already exist in the contract");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
