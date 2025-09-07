const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Generating test data for Content Matrix...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Using account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());

  // Get contract instances
  const ContentMatrix = await ethers.getContractFactory("ContentMatrix");
  const ContentProtection = await ethers.getContractFactory("ContentProtection");

  // Load deployed addresses from deployment info
  const deploymentPath = path.join(__dirname, "..", "deployment-info.json");
  const deploymentInfo = JSON.parse(fs.readFileSync(deploymentPath, "utf8"));
  
  const contentMatrixAddress = deploymentInfo.contracts.ContentMatrix.address;
  const contentProtectionAddress = deploymentInfo.contracts.ContentProtection.address;

  console.log("\n📝 Connecting to ContentMatrix:", contentMatrixAddress);
  console.log("🔒 Connecting to ContentProtection:", contentProtectionAddress);

  const contentMatrix = ContentMatrix.attach(contentMatrixAddress);
  const contentProtection = ContentProtection.attach(contentProtectionAddress);

  // Helper function to convert string to bytes32
  function stringToBytes32(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hash = new Uint8Array(32);
    for (let i = 0; i < Math.min(data.length, 32); i++) {
      hash[i] = data[i];
    }
    return '0x' + Array.from(hash).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  try {
    // 1. Create a content category
    console.log("\n🏷️ Creating content category...");
    const categoryTx = await contentMatrix.createContentCategory(
      stringToBytes32("Technology"), // category name
      stringToBytes32("Technology and innovation content"), // description
      stringToBytes32("Tech"), // type
      stringToBytes32("💻"), // icon
      stringToBytes32("#3B82F6"), // color
      stringToBytes32("tech-category-hash") // hash
    );
    await categoryTx.wait();
    console.log("✅ Category created successfully!");

    // 2. Create a content author
    console.log("\n👤 Creating content author...");
    const authorTx = await contentMatrix.createContentAuthor(
      stringToBytes32("Alice Developer"), // name
      stringToBytes32("alice@example.com"), // email
      stringToBytes32("Blockchain developer and content creator"), // bio
      stringToBytes32("https://example.com/avatar.jpg"), // avatar
      stringToBytes32("https://alice.dev"), // website
      stringToBytes32("https://twitter.com/alice"), // social
      stringToBytes32("alice-author-hash") // hash
    );
    await authorTx.wait();
    console.log("✅ Author created successfully!");

    // 3. Create content items
    console.log("\n📝 Creating content items...");
    
    const contentItems = [
      {
        title: "Introduction to FHE",
        description: "A comprehensive guide to Fully Homomorphic Encryption",
        contentType: "Article",
        contentHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
        author: "Alice Developer",
        category: "Technology",
        tags: "FHE, Encryption, Privacy",
        language: "English",
        contentData: "This is the encrypted content data...",
        fileSize: 1024,
        contentMatrix: "content-matrix-hash-1"
      },
      {
        title: "Smart Contract Security",
        description: "Best practices for secure smart contract development",
        contentType: "Article",
        contentHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
        author: "Alice Developer",
        category: "Technology",
        tags: "Smart Contracts, Security, Blockchain",
        language: "English",
        contentData: "This is another encrypted content data...",
        fileSize: 2048,
        contentMatrix: "content-matrix-hash-2"
      }
    ];

    for (let i = 0; i < contentItems.length; i++) {
      const item = contentItems[i];
      console.log(`Creating content item ${i + 1}: ${item.title}`);
      
      const contentTx = await contentMatrix.createContentItem(
        stringToBytes32(item.title),
        stringToBytes32(item.description),
        stringToBytes32(item.contentType),
        item.contentHash,
        stringToBytes32(item.author),
        stringToBytes32(item.category),
        stringToBytes32(item.tags),
        stringToBytes32(item.language),
        stringToBytes32(item.contentData),
        item.fileSize,
        stringToBytes32(item.contentMatrix)
      );
      await contentTx.wait();
      console.log(`✅ Content item ${i + 1} created successfully!`);
    }

    // 4. Create content in ContentProtection contract
    console.log("\n🔒 Creating protected content...");
    const protectedContentTx = await contentProtection.createContent(
      ethers.parseEther("0.01"), // price: 0.01 ETH
      0, // ContentType.ARTICLE
      "protected-content-hash-123",
      JSON.stringify({
        title: "Premium FHE Tutorial",
        description: "Advanced Fully Homomorphic Encryption tutorial",
        author: "Alice Developer",
        tags: ["FHE", "Advanced", "Tutorial"]
      })
    );
    await protectedContentTx.wait();
    console.log("✅ Protected content created successfully!");

    // 5. Get and display statistics
    console.log("\n📊 Getting platform statistics...");
    
    const matrixStats = await contentMatrix.getContentMatrixStatistics();
    console.log("ContentMatrix Stats:", {
      totalContent: matrixStats[0].toString(),
      activeContent: matrixStats[1].toString(),
      totalCategories: matrixStats[2].toString(),
      totalAuthors: matrixStats[3].toString()
    });

    const protectionStats = await contentProtection.getPlatformStats();
    console.log("ContentProtection Stats:", {
      totalContent: protectionStats[0].toString(),
      totalLicenses: protectionStats[1].toString(),
      platformRevenue: ethers.formatEther(protectionStats[2]),
      minimumPrice: ethers.formatEther(protectionStats[3])
    });

    console.log("\n🎉 Test data generation completed successfully!");
    console.log("\n📋 Summary:");
    console.log("- 1 content category created");
    console.log("- 1 content author created");
    console.log("- 2 content items created");
    console.log("- 1 protected content created");
    console.log("\n🔗 You can now test the frontend with real data!");

  } catch (error) {
    console.error("❌ Error generating test data:", error);
    throw error;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Test data generation failed:", error);
    process.exit(1);
  });
