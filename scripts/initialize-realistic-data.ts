import { ethers } from "hardhat";
import { FHEUtils } from "../lib/fhe-utils";

async function main() {
  console.log("🚀 Initializing realistic data for Content Matrix...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Using account:", deployer.address);

  // Get contract addresses from deployment info
  const fs = require('fs');
  const path = require('path');
  const deploymentPath = path.join(__dirname, "..", "deployment-info.json");
  
  let deploymentInfo;
  try {
    deploymentInfo = JSON.parse(fs.readFileSync(deploymentPath, 'utf8'));
  } catch (error) {
    console.error("❌ Could not read deployment-info.json. Please deploy contracts first.");
    return;
  }

  const contentMatrixAddress = deploymentInfo.contracts.ContentMatrix.address;
  const contentProtectionAddress = deploymentInfo.contracts.ContentProtection.address;

  console.log("ContentMatrix address:", contentMatrixAddress);
  console.log("ContentProtection address:", contentProtectionAddress);

  // Get contract instances
  const ContentMatrix = await ethers.getContractFactory("ContentMatrix");
  const contentMatrix = ContentMatrix.attach(contentMatrixAddress);

  const ContentProtection = await ethers.getContractFactory("ContentProtection");
  const contentProtection = ContentProtection.attach(contentProtectionAddress);

  // Realistic categories data
  const categories = [
    {
      name: "Technology",
      description: "Cutting-edge technology, software development, and digital innovation",
      type: "Technical",
      icon: "💻",
      color: "#3B82F6"
    },
    {
      name: "Education",
      description: "Learning resources, tutorials, and educational content",
      type: "Academic",
      icon: "📚",
      color: "#10B981"
    },
    {
      name: "Business",
      description: "Business strategies, entrepreneurship, and market insights",
      type: "Professional",
      icon: "💼",
      color: "#8B5CF6"
    },
    {
      name: "Health & Wellness",
      description: "Health tips, fitness guides, and wellness practices",
      type: "Lifestyle",
      icon: "🏥",
      color: "#EF4444"
    },
    {
      name: "Entertainment",
      description: "Movies, music, games, and entertainment content",
      type: "Media",
      icon: "🎬",
      color: "#F59E0B"
    }
  ];

  // Realistic authors data
  const authors = [
    {
      name: "Alex Chen",
      email: "alex.chen@techcorp.com",
      bio: "Senior Software Engineer with 8+ years experience in full-stack development",
      avatar: "👨‍💻",
      website: "https://alexchen.dev",
      socialMedia: "@alexchen_tech"
    },
    {
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@university.edu",
      bio: "Professor of Computer Science specializing in AI and machine learning",
      avatar: "👩‍🏫",
      website: "https://sarahjohnson.academia.edu",
      socialMedia: "@dr_sarah_j"
    },
    {
      name: "Mike Rodriguez",
      email: "mike@startupventures.com",
      bio: "Serial entrepreneur and startup advisor with 3 successful exits",
      avatar: "👨‍💼",
      website: "https://mikerodriguez.com",
      socialMedia: "@mike_rodriguez"
    },
    {
      name: "Dr. Lisa Wang",
      email: "lisa.wang@healthcenter.org",
      bio: "Board-certified physician and wellness advocate",
      avatar: "👩‍⚕️",
      website: "https://drlisawang.com",
      socialMedia: "@dr_lisa_wang"
    },
    {
      name: "James Thompson",
      email: "james@entertainment.com",
      bio: "Film director and content creator with 15+ years in the industry",
      avatar: "🎭",
      website: "https://jamesthompson.film",
      socialMedia: "@james_thompson_film"
    }
  ];

  // Realistic content data
  const contentItems = [
    {
      title: "Building Scalable Web Applications with React and Node.js",
      description: "A comprehensive guide to building modern, scalable web applications using React for the frontend and Node.js for the backend",
      contentType: "Article",
      author: "Alex Chen",
      category: "Technology",
      tags: "React, Node.js, Web Development, JavaScript",
      language: "English",
      contentData: "In this comprehensive guide, we'll explore the best practices for building scalable web applications...",
      fileSize: 2048000 // 2MB
    },
    {
      title: "Introduction to Machine Learning Algorithms",
      description: "Learn the fundamentals of machine learning algorithms and their practical applications",
      contentType: "Video",
      author: "Dr. Sarah Johnson",
      category: "Education",
      tags: "Machine Learning, AI, Algorithms, Data Science",
      language: "English",
      contentData: "Machine learning algorithms are the backbone of artificial intelligence systems...",
      fileSize: 15728640 // 15MB
    },
    {
      title: "Startup Funding Strategies: From Seed to Series A",
      description: "Essential strategies for securing funding at different stages of your startup journey",
      contentType: "Article",
      author: "Mike Rodriguez",
      category: "Business",
      tags: "Startup, Funding, Entrepreneurship, Investment",
      language: "English",
      contentData: "Securing funding is one of the most critical challenges facing entrepreneurs...",
      fileSize: 1024000 // 1MB
    },
    {
      title: "Healthy Living: Nutrition and Exercise for Busy Professionals",
      description: "Practical tips for maintaining a healthy lifestyle while managing a demanding career",
      contentType: "Article",
      author: "Dr. Lisa Wang",
      category: "Health & Wellness",
      tags: "Health, Nutrition, Exercise, Wellness, Lifestyle",
      language: "English",
      contentData: "Maintaining a healthy lifestyle in today's fast-paced world can be challenging...",
      fileSize: 1536000 // 1.5MB
    },
    {
      title: "The Art of Cinematic Storytelling",
      description: "Exploring the techniques and principles behind compelling visual storytelling in film",
      contentType: "Video",
      author: "James Thompson",
      category: "Entertainment",
      tags: "Film, Storytelling, Cinematography, Directing",
      language: "English",
      contentData: "Cinematic storytelling is an art form that combines visual elements with narrative structure...",
      fileSize: 52428800 // 50MB
    },
    {
      title: "Advanced React Patterns and Performance Optimization",
      description: "Deep dive into advanced React patterns and techniques for optimizing application performance",
      contentType: "Article",
      author: "Alex Chen",
      category: "Technology",
      tags: "React, Performance, Optimization, JavaScript",
      language: "English",
      contentData: "As React applications grow in complexity, understanding advanced patterns becomes crucial...",
      fileSize: 3072000 // 3MB
    },
    {
      title: "Data Science Career Path: From Beginner to Expert",
      description: "A roadmap for building a successful career in data science",
      contentType: "Article",
      author: "Dr. Sarah Johnson",
      category: "Education",
      tags: "Data Science, Career, Education, Skills",
      language: "English",
      contentData: "The field of data science offers numerous opportunities for career growth...",
      fileSize: 2048000 // 2MB
    },
    {
      title: "Digital Marketing Strategies for Modern Businesses",
      description: "Effective digital marketing strategies to grow your business in the digital age",
      contentType: "Article",
      author: "Mike Rodriguez",
      category: "Business",
      tags: "Marketing, Digital, Business, Growth",
      language: "English",
      contentData: "Digital marketing has revolutionized how businesses reach and engage with customers...",
      fileSize: 1792000 // 1.75MB
    }
  ];

  try {
    // Create categories
    console.log("\n📁 Creating categories...");
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      console.log(`Creating category: ${category.name}`);
      
      const tx = await contentMatrix.createContentCategory(
        FHEUtils.encryptString(category.name),
        FHEUtils.encryptString(category.description),
        FHEUtils.encryptString(category.type),
        FHEUtils.encryptString(category.icon),
        FHEUtils.encryptString(category.color),
        FHEUtils.generateCategoryHash(category.name, category.description)
      );
      
      await tx.wait();
      console.log(`✅ Category "${category.name}" created`);
    }

    // Create authors
    console.log("\n👥 Creating authors...");
    for (let i = 0; i < authors.length; i++) {
      const author = authors[i];
      console.log(`Creating author: ${author.name}`);
      
      const tx = await contentMatrix.createContentAuthor(
        FHEUtils.encryptString(author.name),
        FHEUtils.encryptString(author.email),
        FHEUtils.encryptString(author.bio),
        FHEUtils.encryptString(author.avatar),
        FHEUtils.encryptString(author.website),
        FHEUtils.encryptString(author.socialMedia),
        FHEUtils.generateAuthorHash(author.name, author.email)
      );
      
      await tx.wait();
      console.log(`✅ Author "${author.name}" created`);
    }

    // Create content items
    console.log("\n📄 Creating content items...");
    for (let i = 0; i < contentItems.length; i++) {
      const content = contentItems[i];
      console.log(`Creating content: ${content.title}`);
      
      const tx = await contentMatrix.createContentItem(
        FHEUtils.encryptString(content.title),
        FHEUtils.encryptString(content.description),
        FHEUtils.encryptString(content.contentType),
        FHEUtils.generateContentHash(content.contentData, content.title),
        FHEUtils.encryptString(content.author),
        FHEUtils.encryptString(content.category),
        FHEUtils.encryptString(content.tags),
        FHEUtils.encryptString(content.language),
        FHEUtils.encryptString(content.contentData),
        content.fileSize,
        FHEUtils.generateContentHash(content.contentData, content.title)
      );
      
      await tx.wait();
      console.log(`✅ Content "${content.title}" created`);
    }

    console.log("\n🎉 Realistic data initialization completed successfully!");
    console.log(`📊 Created ${categories.length} categories, ${authors.length} authors, and ${contentItems.length} content items`);

  } catch (error) {
    console.error("❌ Error during data initialization:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
