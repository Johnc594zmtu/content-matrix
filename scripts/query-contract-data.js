const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  console.log("🔍 Querying contract data...");
  
  // Get the contract addresses
  const contentMatrixAddress = "0x87eDC3c5A3Ec226426f2fB18b89b057C8cE8c73F";
  const contentProtectionAddress = "0xF646b05b6281C030b00aaA23f288F92a5C520858";
  
  // Get the contract factory
  const ContentMatrix = await ethers.getContractFactory("ContentMatrix");
  const ContentProtection = await ethers.getContractFactory("ContentProtection");
  
  // Connect to the deployed contracts
  const contentMatrix = ContentMatrix.attach(contentMatrixAddress);
  const contentProtection = ContentProtection.attach(contentProtectionAddress);
  
  console.log("📊 Getting platform statistics...");
  
  try {
    // Get platform statistics
    const stats = await contentMatrix.getContentMatrixStatistics();
    console.log("Platform Statistics:");
    console.log(`  Total Content: ${stats[0]}`);
    console.log(`  Active Content: ${stats[1]}`);
    console.log(`  Total Categories: ${stats[2]}`);
    console.log(`  Total Authors: ${stats[3]}`);
    
    // If there are categories, try to fetch them
    if (stats[2] > 0) {
      console.log("\n📁 Fetching categories...");
      for (let i = 0; i < Math.min(Number(stats[2]), 5); i++) {
        try {
          const category = await contentMatrix.getContentCategory(i);
          console.log(`Category ${i}:`, {
            name: category[0], // encrypted name
            description: category[1], // encrypted description
            type: category[2], // encrypted type
            icon: category[3], // encrypted icon
            color: category[4], // encrypted color
            contentCount: category[5],
            subcategoryCount: category[6],
            hash: category[7],
            isActive: category[8],
            creationTime: category[9],
            lastUpdated: category[10]
          });
        } catch (err) {
          console.log(`Failed to fetch category ${i}:`, err.message);
        }
      }
    }
    
    // If there are authors, try to fetch them
    if (stats[3] > 0) {
      console.log("\n👥 Fetching authors...");
      for (let i = 0; i < Math.min(Number(stats[3]), 5); i++) {
        try {
          const author = await contentMatrix.getContentAuthor(i);
          console.log(`Author ${i}:`, {
            name: author[0], // encrypted name
            email: author[1], // encrypted email
            bio: author[2], // encrypted bio
            avatar: author[3], // encrypted avatar
            website: author[4], // encrypted website
            social: author[5], // encrypted social
            contentCount: author[6],
            followerCount: author[7],
            rating: author[8],
            hash: author[9],
            isVerified: author[10],
            isActive: author[11],
            creationTime: author[12],
            lastUpdated: author[13]
          });
        } catch (err) {
          console.log(`Failed to fetch author ${i}:`, err.message);
        }
      }
    }
    
    // If there are content items, try to fetch them
    if (stats[0] > 0) {
      console.log("\n📝 Fetching content items...");
      for (let i = 0; i < Math.min(Number(stats[0]), 5); i++) {
        try {
          const content = await contentMatrix.getContentItem(i);
          console.log(`Content ${i}:`, {
            title: content[0], // encrypted title
            description: content[1], // encrypted description
            contentType: content[2], // encrypted type
            contentHash: content[3],
            author: content[4], // encrypted author
            category: content[5], // encrypted category
            tags: content[6], // encrypted tags
            language: content[7], // encrypted language
            contentData: content[8], // encrypted data
            fileSize: content[9],
            viewCount: content[10],
            likeCount: content[11],
            shareCount: content[12],
            downloadCount: content[13],
            contentMatrix: content[14],
            isPublic: content[15],
            isActive: content[16],
            creationTime: content[17],
            lastUpdated: content[18]
          });
        } catch (err) {
          console.log(`Failed to fetch content ${i}:`, err.message);
        }
      }
    }
    
  } catch (error) {
    console.error("Error querying contract:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
