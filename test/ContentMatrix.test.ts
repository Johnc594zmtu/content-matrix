import { expect } from "chai";
import { ethers } from "hardhat";
import { FhevmInstance } from "fhevmjs";

describe("ContentMatrix", function () {
  let contentMatrix: any;
  let owner: any;
  let contentManager: any;
  let author: any;
  let fhevm: FhevmInstance;

  beforeEach(async function () {
    [owner, contentManager, author] = await ethers.getSigners();
    
    const ContentMatrix = await ethers.getContractFactory("ContentMatrix");
    contentMatrix = await ContentMatrix.deploy(contentManager.address);
    await contentMatrix.waitForDeployment();

    // Initialize FHEVM instance
    fhevm = new FhevmInstance();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await contentMatrix.owner()).to.equal(owner.address);
    });

    it("Should set the right content manager", async function () {
      expect(await contentMatrix.contentManager()).to.equal(contentManager.address);
    });

    it("Should initialize counters to zero", async function () {
      expect(await contentMatrix.contentCounter()).to.equal(0);
      expect(await contentMatrix.categoryCounter()).to.equal(0);
      expect(await contentMatrix.authorCounter()).to.equal(0);
    });
  });

  describe("Content Item Management", function () {
    it("Should create content item", async function () {
      const encryptedTitle = ethers.keccak256(ethers.toUtf8Bytes("Introduction to FHE"));
      const encryptedDescription = ethers.keccak256(ethers.toUtf8Bytes("A comprehensive guide to FHE"));
      const encryptedContentType = ethers.keccak256(ethers.toUtf8Bytes("Article"));
      const encryptedContentHash = ethers.keccak256(ethers.toUtf8Bytes("content-hash"));
      const encryptedAuthor = ethers.keccak256(ethers.toUtf8Bytes("John Doe"));
      const encryptedCategory = ethers.keccak256(ethers.toUtf8Bytes("Technology"));
      const encryptedTags = ethers.keccak256(ethers.toUtf8Bytes("FHE, Privacy, Cryptography"));
      const encryptedLanguage = ethers.keccak256(ethers.toUtf8Bytes("English"));
      const encryptedContentData = ethers.keccak256(ethers.toUtf8Bytes("content-data"));
      const encryptedFileSize = fhevm.encrypt32(2500000); // 2.5 MB
      const encryptedContentMatrix = ethers.keccak256(ethers.toUtf8Bytes("content-matrix"));

      const tx = await contentMatrix.connect(author).createContentItem(
        encryptedTitle,
        encryptedDescription,
        encryptedContentType,
        encryptedContentHash,
        encryptedAuthor,
        encryptedCategory,
        encryptedTags,
        encryptedLanguage,
        encryptedContentData,
        encryptedFileSize,
        encryptedContentMatrix
      );

      await expect(tx)
        .to.emit(contentMatrix, "ContentItemCreated")
        .withArgs(0, author.address, encryptedContentType);

      const content = await contentMatrix.getContentItem(0);
      expect(content.isActive).to.be.true;
      expect(content.isPublic).to.be.true;
      expect(content.fileSize).to.equal(2500000);
    });

    it("Should update content item", async function () {
      // First create a content item
      const encryptedTitle = ethers.keccak256(ethers.toUtf8Bytes("Introduction to FHE"));
      const encryptedDescription = ethers.keccak256(ethers.toUtf8Bytes("A comprehensive guide to FHE"));
      const encryptedContentType = ethers.keccak256(ethers.toUtf8Bytes("Article"));
      const encryptedContentHash = ethers.keccak256(ethers.toUtf8Bytes("content-hash"));
      const encryptedAuthor = ethers.keccak256(ethers.toUtf8Bytes("John Doe"));
      const encryptedCategory = ethers.keccak256(ethers.toUtf8Bytes("Technology"));
      const encryptedTags = ethers.keccak256(ethers.toUtf8Bytes("FHE, Privacy, Cryptography"));
      const encryptedLanguage = ethers.keccak256(ethers.toUtf8Bytes("English"));
      const encryptedContentData = ethers.keccak256(ethers.toUtf8Bytes("content-data"));
      const encryptedFileSize = fhevm.encrypt32(2500000);
      const encryptedContentMatrix = ethers.keccak256(ethers.toUtf8Bytes("content-matrix"));

      await contentMatrix.connect(author).createContentItem(
        encryptedTitle,
        encryptedDescription,
        encryptedContentType,
        encryptedContentHash,
        encryptedAuthor,
        encryptedCategory,
        encryptedTags,
        encryptedLanguage,
        encryptedContentData,
        encryptedFileSize,
        encryptedContentMatrix
      );

      // Update the content item
      const newEncryptedTitle = ethers.keccak256(ethers.toUtf8Bytes("Advanced FHE Concepts"));
      const newEncryptedDescription = ethers.keccak256(ethers.toUtf8Bytes("Advanced guide to FHE"));
      const newEncryptedTags = ethers.keccak256(ethers.toUtf8Bytes("FHE, Advanced, Privacy"));
      const newEncryptedContentData = ethers.keccak256(ethers.toUtf8Bytes("updated-content-data"));

      await contentMatrix.connect(author).updateContentItem(
        0,
        newEncryptedTitle,
        newEncryptedDescription,
        newEncryptedTags,
        newEncryptedContentData
      );

      const content = await contentMatrix.getContentItem(0);
      expect(content.encryptedTitle).to.equal(newEncryptedTitle);
      expect(content.encryptedDescription).to.equal(newEncryptedDescription);
    });

    it("Should update content stats", async function () {
      // First create a content item
      const encryptedTitle = ethers.keccak256(ethers.toUtf8Bytes("Introduction to FHE"));
      const encryptedDescription = ethers.keccak256(ethers.toUtf8Bytes("A comprehensive guide to FHE"));
      const encryptedContentType = ethers.keccak256(ethers.toUtf8Bytes("Article"));
      const encryptedContentHash = ethers.keccak256(ethers.toUtf8Bytes("content-hash"));
      const encryptedAuthor = ethers.keccak256(ethers.toUtf8Bytes("John Doe"));
      const encryptedCategory = ethers.keccak256(ethers.toUtf8Bytes("Technology"));
      const encryptedTags = ethers.keccak256(ethers.toUtf8Bytes("FHE, Privacy, Cryptography"));
      const encryptedLanguage = ethers.keccak256(ethers.toUtf8Bytes("English"));
      const encryptedContentData = ethers.keccak256(ethers.toUtf8Bytes("content-data"));
      const encryptedFileSize = fhevm.encrypt32(2500000);
      const encryptedContentMatrix = ethers.keccak256(ethers.toUtf8Bytes("content-matrix"));

      await contentMatrix.connect(author).createContentItem(
        encryptedTitle,
        encryptedDescription,
        encryptedContentType,
        encryptedContentHash,
        encryptedAuthor,
        encryptedCategory,
        encryptedTags,
        encryptedLanguage,
        encryptedContentData,
        encryptedFileSize,
        encryptedContentMatrix
      );

      // Update content stats
      const encryptedViewCount = fhevm.encrypt32(1234);
      const encryptedLikeCount = fhevm.encrypt32(89);
      const encryptedShareCount = fhevm.encrypt32(23);
      const encryptedDownloadCount = fhevm.encrypt32(45);

      await contentMatrix.connect(author).updateContentStats(
        0,
        encryptedViewCount,
        encryptedLikeCount,
        encryptedShareCount,
        encryptedDownloadCount
      );

      const content = await contentMatrix.getContentItem(0);
      expect(content.viewCount).to.equal(1234);
      expect(content.likeCount).to.equal(89);
      expect(content.shareCount).to.equal(23);
      expect(content.downloadCount).to.equal(45);
    });

    it("Should deactivate content item", async function () {
      // First create a content item
      const encryptedTitle = ethers.keccak256(ethers.toUtf8Bytes("Introduction to FHE"));
      const encryptedDescription = ethers.keccak256(ethers.toUtf8Bytes("A comprehensive guide to FHE"));
      const encryptedContentType = ethers.keccak256(ethers.toUtf8Bytes("Article"));
      const encryptedContentHash = ethers.keccak256(ethers.toUtf8Bytes("content-hash"));
      const encryptedAuthor = ethers.keccak256(ethers.toUtf8Bytes("John Doe"));
      const encryptedCategory = ethers.keccak256(ethers.toUtf8Bytes("Technology"));
      const encryptedTags = ethers.keccak256(ethers.toUtf8Bytes("FHE, Privacy, Cryptography"));
      const encryptedLanguage = ethers.keccak256(ethers.toUtf8Bytes("English"));
      const encryptedContentData = ethers.keccak256(ethers.toUtf8Bytes("content-data"));
      const encryptedFileSize = fhevm.encrypt32(2500000);
      const encryptedContentMatrix = ethers.keccak256(ethers.toUtf8Bytes("content-matrix"));

      await contentMatrix.connect(author).createContentItem(
        encryptedTitle,
        encryptedDescription,
        encryptedContentType,
        encryptedContentHash,
        encryptedAuthor,
        encryptedCategory,
        encryptedTags,
        encryptedLanguage,
        encryptedContentData,
        encryptedFileSize,
        encryptedContentMatrix
      );

      // Deactivate the content item
      await contentMatrix.connect(author).deactivateContentItem(0);

      const content = await contentMatrix.getContentItem(0);
      expect(content.isActive).to.be.false;
    });
  });

  describe("Content Category Management", function () {
    it("Should create content category", async function () {
      const encryptedCategoryName = ethers.keccak256(ethers.toUtf8Bytes("Technology"));
      const encryptedCategoryDescription = ethers.keccak256(ethers.toUtf8Bytes("Technology-related content"));
      const encryptedCategoryType = ethers.keccak256(ethers.toUtf8Bytes("Main Category"));
      const encryptedCategoryIcon = ethers.keccak256(ethers.toUtf8Bytes("💻"));
      const encryptedCategoryColor = ethers.keccak256(ethers.toUtf8Bytes("#3B82F6"));
      const encryptedCategoryHash = ethers.keccak256(ethers.toUtf8Bytes("category-hash"));

      const tx = await contentMatrix.connect(contentManager).createContentCategory(
        encryptedCategoryName,
        encryptedCategoryDescription,
        encryptedCategoryType,
        encryptedCategoryIcon,
        encryptedCategoryColor,
        encryptedCategoryHash
      );

      await expect(tx)
        .to.emit(contentMatrix, "ContentCategoryCreated")
        .withArgs(0, encryptedCategoryName);

      const category = await contentMatrix.getContentCategory(0);
      expect(category.isActive).to.be.true;
    });

    it("Should not allow non-content manager to create categories", async function () {
      const encryptedCategoryName = ethers.keccak256(ethers.toUtf8Bytes("Technology"));
      const encryptedCategoryDescription = ethers.keccak256(ethers.toUtf8Bytes("Technology-related content"));
      const encryptedCategoryType = ethers.keccak256(ethers.toUtf8Bytes("Main Category"));
      const encryptedCategoryIcon = ethers.keccak256(ethers.toUtf8Bytes("💻"));
      const encryptedCategoryColor = ethers.keccak256(ethers.toUtf8Bytes("#3B82F6"));
      const encryptedCategoryHash = ethers.keccak256(ethers.toUtf8Bytes("category-hash"));

      await expect(
        contentMatrix.connect(author).createContentCategory(
          encryptedCategoryName,
          encryptedCategoryDescription,
          encryptedCategoryType,
          encryptedCategoryIcon,
          encryptedCategoryColor,
          encryptedCategoryHash
        )
      ).to.be.revertedWith("Only content manager can create categories");
    });
  });

  describe("Content Tag Management", function () {
    it("Should create content tag", async function () {
      const encryptedTagName = ethers.keccak256(ethers.toUtf8Bytes("FHE"));
      const encryptedTagDescription = ethers.keccak256(ethers.toUtf8Bytes("Fully Homomorphic Encryption"));
      const encryptedTagCategory = ethers.keccak256(ethers.toUtf8Bytes("Technology"));
      const encryptedTagColor = ethers.keccak256(ethers.toUtf8Bytes("#3B82F6"));
      const encryptedTagHash = ethers.keccak256(ethers.toUtf8Bytes("tag-hash"));

      const tx = await contentMatrix.connect(author).createContentTag(
        encryptedTagName,
        encryptedTagDescription,
        encryptedTagCategory,
        encryptedTagColor,
        encryptedTagHash
      );

      await expect(tx)
        .to.emit(contentMatrix, "ContentTagCreated")
        .withArgs(0, encryptedTagName);

      const tag = await contentMatrix.getContentTag(0);
      expect(tag.isActive).to.be.true;
    });
  });

  describe("Content Author Management", function () {
    it("Should create content author", async function () {
      const encryptedAuthorName = ethers.keccak256(ethers.toUtf8Bytes("John Doe"));
      const encryptedAuthorEmail = ethers.keccak256(ethers.toUtf8Bytes("john@example.com"));
      const encryptedAuthorBio = ethers.keccak256(ethers.toUtf8Bytes("Technology enthusiast"));
      const encryptedAuthorAvatar = ethers.keccak256(ethers.toUtf8Bytes("👨‍💻"));
      const encryptedAuthorWebsite = ethers.keccak256(ethers.toUtf8Bytes("https://johndoe.com"));
      const encryptedAuthorSocial = ethers.keccak256(ethers.toUtf8Bytes("@johndoe"));
      const encryptedAuthorHash = ethers.keccak256(ethers.toUtf8Bytes("author-hash"));

      const tx = await contentMatrix.connect(author).createContentAuthor(
        encryptedAuthorName,
        encryptedAuthorEmail,
        encryptedAuthorBio,
        encryptedAuthorAvatar,
        encryptedAuthorWebsite,
        encryptedAuthorSocial,
        encryptedAuthorHash
      );

      await expect(tx)
        .to.emit(contentMatrix, "ContentAuthorCreated")
        .withArgs(0, author.address, encryptedAuthorName);

      const authorData = await contentMatrix.getContentAuthor(0);
      expect(authorData.isActive).to.be.true;
      expect(authorData.isVerified).to.be.false;
    });
  });

  describe("Content License Management", function () {
    it("Should create content license", async function () {
      const encryptedLicenseName = ethers.keccak256(ethers.toUtf8Bytes("CC BY 4.0"));
      const encryptedLicenseType = ethers.keccak256(ethers.toUtf8Bytes("Creative Commons"));
      const encryptedLicenseDescription = ethers.keccak256(ethers.toUtf8Bytes("Creative Commons Attribution 4.0"));
      const encryptedLicenseTerms = ethers.keccak256(ethers.toUtf8Bytes("Attribution required"));
      const encryptedLicenseUrl = ethers.keccak256(ethers.toUtf8Bytes("https://creativecommons.org/licenses/by/4.0/"));
      const encryptedLicenseHash = ethers.keccak256(ethers.toUtf8Bytes("license-hash"));

      const tx = await contentMatrix.connect(contentManager).createContentLicense(
        encryptedLicenseName,
        encryptedLicenseType,
        encryptedLicenseDescription,
        encryptedLicenseTerms,
        encryptedLicenseUrl,
        encryptedLicenseHash
      );

      await expect(tx)
        .to.emit(contentMatrix, "ContentLicenseCreated")
        .withArgs(0, encryptedLicenseName);

      const license = await contentMatrix.getContentLicense(0);
      expect(license.isActive).to.be.true;
    });

    it("Should not allow non-content manager to create licenses", async function () {
      const encryptedLicenseName = ethers.keccak256(ethers.toUtf8Bytes("CC BY 4.0"));
      const encryptedLicenseType = ethers.keccak256(ethers.toUtf8Bytes("Creative Commons"));
      const encryptedLicenseDescription = ethers.keccak256(ethers.toUtf8Bytes("Creative Commons Attribution 4.0"));
      const encryptedLicenseTerms = ethers.keccak256(ethers.toUtf8Bytes("Attribution required"));
      const encryptedLicenseUrl = ethers.keccak256(ethers.toUtf8Bytes("https://creativecommons.org/licenses/by/4.0/"));
      const encryptedLicenseHash = ethers.keccak256(ethers.toUtf8Bytes("license-hash"));

      await expect(
        contentMatrix.connect(author).createContentLicense(
          encryptedLicenseName,
          encryptedLicenseType,
          encryptedLicenseDescription,
          encryptedLicenseTerms,
          encryptedLicenseUrl,
          encryptedLicenseHash
        )
      ).to.be.revertedWith("Only content manager can create licenses");
    });
  });

  describe("Content Version Management", function () {
    it("Should create content version", async function () {
      // First create a content item
      const encryptedTitle = ethers.keccak256(ethers.toUtf8Bytes("Introduction to FHE"));
      const encryptedDescription = ethers.keccak256(ethers.toUtf8Bytes("A comprehensive guide to FHE"));
      const encryptedContentType = ethers.keccak256(ethers.toUtf8Bytes("Article"));
      const encryptedContentHash = ethers.keccak256(ethers.toUtf8Bytes("content-hash"));
      const encryptedAuthor = ethers.keccak256(ethers.toUtf8Bytes("John Doe"));
      const encryptedCategory = ethers.keccak256(ethers.toUtf8Bytes("Technology"));
      const encryptedTags = ethers.keccak256(ethers.toUtf8Bytes("FHE, Privacy, Cryptography"));
      const encryptedLanguage = ethers.keccak256(ethers.toUtf8Bytes("English"));
      const encryptedContentData = ethers.keccak256(ethers.toUtf8Bytes("content-data"));
      const encryptedFileSize = fhevm.encrypt32(2500000);
      const encryptedContentMatrix = ethers.keccak256(ethers.toUtf8Bytes("content-matrix"));

      await contentMatrix.connect(author).createContentItem(
        encryptedTitle,
        encryptedDescription,
        encryptedContentType,
        encryptedContentHash,
        encryptedAuthor,
        encryptedCategory,
        encryptedTags,
        encryptedLanguage,
        encryptedContentData,
        encryptedFileSize,
        encryptedContentMatrix
      );

      // Create a version
      const encryptedVersionNumber = ethers.keccak256(ethers.toUtf8Bytes("1.1"));
      const encryptedVersionDescription = ethers.keccak256(ethers.toUtf8Bytes("Updated with new examples"));
      const encryptedVersionChanges = ethers.keccak256(ethers.toUtf8Bytes("Added new examples and improved clarity"));
      const encryptedVersionHash = ethers.keccak256(ethers.toUtf8Bytes("version-hash"));
      const encryptedVersionFileSize = fhevm.encrypt32(2600000);

      const tx = await contentMatrix.connect(author).createContentVersion(
        0,
        encryptedVersionNumber,
        encryptedVersionDescription,
        encryptedVersionChanges,
        encryptedVersionHash,
        encryptedVersionFileSize
      );

      await expect(tx)
        .to.emit(contentMatrix, "ContentVersionCreated")
        .withArgs(0, 0, encryptedVersionNumber);

      const version = await contentMatrix.getContentVersion(0);
      expect(version.contentId).to.equal(0);
      expect(version.isActive).to.be.true;
      expect(version.fileSize).to.equal(2600000);
    });
  });

  describe("Content Access Management", function () {
    it("Should grant content access", async function () {
      // First create a content item
      const encryptedTitle = ethers.keccak256(ethers.toUtf8Bytes("Introduction to FHE"));
      const encryptedDescription = ethers.keccak256(ethers.toUtf8Bytes("A comprehensive guide to FHE"));
      const encryptedContentType = ethers.keccak256(ethers.toUtf8Bytes("Article"));
      const encryptedContentHash = ethers.keccak256(ethers.toUtf8Bytes("content-hash"));
      const encryptedAuthor = ethers.keccak256(ethers.toUtf8Bytes("John Doe"));
      const encryptedCategory = ethers.keccak256(ethers.toUtf8Bytes("Technology"));
      const encryptedTags = ethers.keccak256(ethers.toUtf8Bytes("FHE, Privacy, Cryptography"));
      const encryptedLanguage = ethers.keccak256(ethers.toUtf8Bytes("English"));
      const encryptedContentData = ethers.keccak256(ethers.toUtf8Bytes("content-data"));
      const encryptedFileSize = fhevm.encrypt32(2500000);
      const encryptedContentMatrix = ethers.keccak256(ethers.toUtf8Bytes("content-matrix"));

      await contentMatrix.connect(author).createContentItem(
        encryptedTitle,
        encryptedDescription,
        encryptedContentType,
        encryptedContentHash,
        encryptedAuthor,
        encryptedCategory,
        encryptedTags,
        encryptedLanguage,
        encryptedContentData,
        encryptedFileSize,
        encryptedContentMatrix
      );

      // Grant access
      const encryptedAccessType = ethers.keccak256(ethers.toUtf8Bytes("View"));
      const encryptedAccessLevel = ethers.keccak256(ethers.toUtf8Bytes("Public"));
      const encryptedAccessConditions = ethers.keccak256(ethers.toUtf8Bytes("No conditions"));
      const encryptedAccessHash = ethers.keccak256(ethers.toUtf8Bytes("access-hash"));

      const tx = await contentMatrix.connect(author).grantContentAccess(
        0,
        encryptedAccessType,
        encryptedAccessLevel,
        encryptedAccessConditions,
        encryptedAccessHash
      );

      await expect(tx)
        .to.emit(contentMatrix, "ContentAccessGranted")
        .withArgs(0, 0, encryptedAccessType);

      const access = await contentMatrix.getContentAccess(0);
      expect(access.contentId).to.equal(0);
      expect(access.isActive).to.be.true;
      expect(access.isGranted).to.be.true;
    });
  });

  describe("Content Analytics", function () {
    it("Should calculate content analytics", async function () {
      // First create a content item
      const encryptedTitle = ethers.keccak256(ethers.toUtf8Bytes("Introduction to FHE"));
      const encryptedDescription = ethers.keccak256(ethers.toUtf8Bytes("A comprehensive guide to FHE"));
      const encryptedContentType = ethers.keccak256(ethers.toUtf8Bytes("Article"));
      const encryptedContentHash = ethers.keccak256(ethers.toUtf8Bytes("content-hash"));
      const encryptedAuthor = ethers.keccak256(ethers.toUtf8Bytes("John Doe"));
      const encryptedCategory = ethers.keccak256(ethers.toUtf8Bytes("Technology"));
      const encryptedTags = ethers.keccak256(ethers.toUtf8Bytes("FHE, Privacy, Cryptography"));
      const encryptedLanguage = ethers.keccak256(ethers.toUtf8Bytes("English"));
      const encryptedContentData = ethers.keccak256(ethers.toUtf8Bytes("content-data"));
      const encryptedFileSize = fhevm.encrypt32(2500000);
      const encryptedContentMatrix = ethers.keccak256(ethers.toUtf8Bytes("content-matrix"));

      await contentMatrix.connect(author).createContentItem(
        encryptedTitle,
        encryptedDescription,
        encryptedContentType,
        encryptedContentHash,
        encryptedAuthor,
        encryptedCategory,
        encryptedTags,
        encryptedLanguage,
        encryptedContentData,
        encryptedFileSize,
        encryptedContentMatrix
      );

      // Calculate analytics
      const encryptedAnalyticsType = ethers.keccak256(ethers.toUtf8Bytes("Weekly"));
      const encryptedAnalyticsPeriod = ethers.keccak256(ethers.toUtf8Bytes("2024-01-01 to 2024-01-07"));
      const encryptedViewCount = fhevm.encrypt32(1234);
      const encryptedLikeCount = fhevm.encrypt32(89);
      const encryptedShareCount = fhevm.encrypt32(23);
      const encryptedDownloadCount = fhevm.encrypt32(45);
      const encryptedEngagementRate = fhevm.encrypt32(1960); // 19.6% scaled by 100
      const encryptedAnalyticsHash = ethers.keccak256(ethers.toUtf8Bytes("analytics-hash"));

      const tx = await contentMatrix.connect(contentManager).calculateContentAnalytics(
        0,
        encryptedAnalyticsType,
        encryptedAnalyticsPeriod,
        encryptedViewCount,
        encryptedLikeCount,
        encryptedShareCount,
        encryptedDownloadCount,
        encryptedEngagementRate,
        encryptedAnalyticsHash
      );

      await expect(tx)
        .to.emit(contentMatrix, "ContentAnalyticsCalculated")
        .withArgs(0, 0, encryptedAnalyticsType);

      const analytics = await contentMatrix.getContentAnalytics(0);
      expect(analytics.contentId).to.equal(0);
      expect(analytics.isActive).to.be.true;
      expect(analytics.viewCount).to.equal(1234);
      expect(analytics.likeCount).to.equal(89);
      expect(analytics.shareCount).to.equal(23);
      expect(analytics.downloadCount).to.equal(45);
      expect(analytics.engagementRate).to.equal(1960);
    });

    it("Should not allow non-content manager to calculate analytics", async function () {
      // First create a content item
      const encryptedTitle = ethers.keccak256(ethers.toUtf8Bytes("Introduction to FHE"));
      const encryptedDescription = ethers.keccak256(ethers.toUtf8Bytes("A comprehensive guide to FHE"));
      const encryptedContentType = ethers.keccak256(ethers.toUtf8Bytes("Article"));
      const encryptedContentHash = ethers.keccak256(ethers.toUtf8Bytes("content-hash"));
      const encryptedAuthor = ethers.keccak256(ethers.toUtf8Bytes("John Doe"));
      const encryptedCategory = ethers.keccak256(ethers.toUtf8Bytes("Technology"));
      const encryptedTags = ethers.keccak256(ethers.toUtf8Bytes("FHE, Privacy, Cryptography"));
      const encryptedLanguage = ethers.keccak256(ethers.toUtf8Bytes("English"));
      const encryptedContentData = ethers.keccak256(ethers.toUtf8Bytes("content-data"));
      const encryptedFileSize = fhevm.encrypt32(2500000);
      const encryptedContentMatrix = ethers.keccak256(ethers.toUtf8Bytes("content-matrix"));

      await contentMatrix.connect(author).createContentItem(
        encryptedTitle,
        encryptedDescription,
        encryptedContentType,
        encryptedContentHash,
        encryptedAuthor,
        encryptedCategory,
        encryptedTags,
        encryptedLanguage,
        encryptedContentData,
        encryptedFileSize,
        encryptedContentMatrix
      );

      // Try to calculate analytics
      const encryptedAnalyticsType = ethers.keccak256(ethers.toUtf8Bytes("Weekly"));
      const encryptedAnalyticsPeriod = ethers.keccak256(ethers.toUtf8Bytes("2024-01-01 to 2024-01-07"));
      const encryptedViewCount = fhevm.encrypt32(1234);
      const encryptedLikeCount = fhevm.encrypt32(89);
      const encryptedShareCount = fhevm.encrypt32(23);
      const encryptedDownloadCount = fhevm.encrypt32(45);
      const encryptedEngagementRate = fhevm.encrypt32(1960);
      const encryptedAnalyticsHash = ethers.keccak256(ethers.toUtf8Bytes("analytics-hash"));

      await expect(
        contentMatrix.connect(author).calculateContentAnalytics(
          0,
          encryptedAnalyticsType,
          encryptedAnalyticsPeriod,
          encryptedViewCount,
          encryptedLikeCount,
          encryptedShareCount,
          encryptedDownloadCount,
          encryptedEngagementRate,
          encryptedAnalyticsHash
        )
      ).to.be.revertedWith("Only content manager can calculate analytics");
    });
  });

  describe("Content Recommendations", function () {
    it("Should generate content recommendation", async function () {
      // First create a content item
      const encryptedTitle = ethers.keccak256(ethers.toUtf8Bytes("Introduction to FHE"));
      const encryptedDescription = ethers.keccak256(ethers.toUtf8Bytes("A comprehensive guide to FHE"));
      const encryptedContentType = ethers.keccak256(ethers.toUtf8Bytes("Article"));
      const encryptedContentHash = ethers.keccak256(ethers.toUtf8Bytes("content-hash"));
      const encryptedAuthor = ethers.keccak256(ethers.toUtf8Bytes("John Doe"));
      const encryptedCategory = ethers.keccak256(ethers.toUtf8Bytes("Technology"));
      const encryptedTags = ethers.keccak256(ethers.toUtf8Bytes("FHE, Privacy, Cryptography"));
      const encryptedLanguage = ethers.keccak256(ethers.toUtf8Bytes("English"));
      const encryptedContentData = ethers.keccak256(ethers.toUtf8Bytes("content-data"));
      const encryptedFileSize = fhevm.encrypt32(2500000);
      const encryptedContentMatrix = ethers.keccak256(ethers.toUtf8Bytes("content-matrix"));

      await contentMatrix.connect(author).createContentItem(
        encryptedTitle,
        encryptedDescription,
        encryptedContentType,
        encryptedContentHash,
        encryptedAuthor,
        encryptedCategory,
        encryptedTags,
        encryptedLanguage,
        encryptedContentData,
        encryptedFileSize,
        encryptedContentMatrix
      );

      // Generate recommendation
      const encryptedRecommendationType = ethers.keccak256(ethers.toUtf8Bytes("Similar Content"));
      const encryptedRecommendationAlgorithm = ethers.keccak256(ethers.toUtf8Bytes("Content-Based Filtering"));
      const encryptedRecommendationScore = fhevm.encrypt32(85);
      const encryptedRecommendationConfidence = fhevm.encrypt32(92);
      const encryptedRecommendationHash = ethers.keccak256(ethers.toUtf8Bytes("recommendation-hash"));

      const tx = await contentMatrix.connect(contentManager).generateContentRecommendation(
        0,
        encryptedRecommendationType,
        encryptedRecommendationAlgorithm,
        encryptedRecommendationScore,
        encryptedRecommendationConfidence,
        encryptedRecommendationHash
      );

      await expect(tx)
        .to.emit(contentMatrix, "ContentRecommendationGenerated")
        .withArgs(0, 0, encryptedRecommendationType);

      const recommendation = await contentMatrix.getContentRecommendation(0);
      expect(recommendation.contentId).to.equal(0);
      expect(recommendation.isActive).to.be.true;
      expect(recommendation.recommendationScore).to.equal(85);
      expect(recommendation.recommendationConfidence).to.equal(92);
    });

    it("Should not allow non-content manager to generate recommendations", async function () {
      // First create a content item
      const encryptedTitle = ethers.keccak256(ethers.toUtf8Bytes("Introduction to FHE"));
      const encryptedDescription = ethers.keccak256(ethers.toUtf8Bytes("A comprehensive guide to FHE"));
      const encryptedContentType = ethers.keccak256(ethers.toUtf8Bytes("Article"));
      const encryptedContentHash = ethers.keccak256(ethers.toUtf8Bytes("content-hash"));
      const encryptedAuthor = ethers.keccak256(ethers.toUtf8Bytes("John Doe"));
      const encryptedCategory = ethers.keccak256(ethers.toUtf8Bytes("Technology"));
      const encryptedTags = ethers.keccak256(ethers.toUtf8Bytes("FHE, Privacy, Cryptography"));
      const encryptedLanguage = ethers.keccak256(ethers.toUtf8Bytes("English"));
      const encryptedContentData = ethers.keccak256(ethers.toUtf8Bytes("content-data"));
      const encryptedFileSize = fhevm.encrypt32(2500000);
      const encryptedContentMatrix = ethers.keccak256(ethers.toUtf8Bytes("content-matrix"));

      await contentMatrix.connect(author).createContentItem(
        encryptedTitle,
        encryptedDescription,
        encryptedContentType,
        encryptedContentHash,
        encryptedAuthor,
        encryptedCategory,
        encryptedTags,
        encryptedLanguage,
        encryptedContentData,
        encryptedFileSize,
        encryptedContentMatrix
      );

      // Try to generate recommendation
      const encryptedRecommendationType = ethers.keccak256(ethers.toUtf8Bytes("Similar Content"));
      const encryptedRecommendationAlgorithm = ethers.keccak256(ethers.toUtf8Bytes("Content-Based Filtering"));
      const encryptedRecommendationScore = fhevm.encrypt32(85);
      const encryptedRecommendationConfidence = fhevm.encrypt32(92);
      const encryptedRecommendationHash = ethers.keccak256(ethers.toUtf8Bytes("recommendation-hash"));

      await expect(
        contentMatrix.connect(author).generateContentRecommendation(
          0,
          encryptedRecommendationType,
          encryptedRecommendationAlgorithm,
          encryptedRecommendationScore,
          encryptedRecommendationConfidence,
          encryptedRecommendationHash
        )
      ).to.be.revertedWith("Only content manager can generate recommendations");
    });
  });

  describe("Statistics", function () {
    it("Should return correct statistics", async function () {
      const stats = await contentMatrix.getContentMatrixStatistics();
      expect(stats.totalContent).to.equal(0);
      expect(stats.activeContent).to.equal(0);
      expect(stats.totalCategories).to.equal(0);
      expect(stats.totalTags).to.equal(0);
      expect(stats.totalAuthors).to.equal(0);
      expect(stats.totalLicenses).to.equal(0);
      expect(stats.totalVersions).to.equal(0);
      expect(stats.totalAccess).to.equal(0);
      expect(stats.totalAnalytics).to.equal(0);
      expect(stats.totalRecommendations).to.equal(0);
    });
  });

  describe("Access Control", function () {
    it("Should only allow content manager to create categories", async function () {
      const encryptedCategoryName = ethers.keccak256(ethers.toUtf8Bytes("Technology"));
      const encryptedCategoryDescription = ethers.keccak256(ethers.toUtf8Bytes("Technology-related content"));
      const encryptedCategoryType = ethers.keccak256(ethers.toUtf8Bytes("Main Category"));
      const encryptedCategoryIcon = ethers.keccak256(ethers.toUtf8Bytes("💻"));
      const encryptedCategoryColor = ethers.keccak256(ethers.toUtf8Bytes("#3B82F6"));
      const encryptedCategoryHash = ethers.keccak256(ethers.toUtf8Bytes("category-hash"));

      await expect(
        contentMatrix.connect(author).createContentCategory(
          encryptedCategoryName,
          encryptedCategoryDescription,
          encryptedCategoryType,
          encryptedCategoryIcon,
          encryptedCategoryColor,
          encryptedCategoryHash
        )
      ).to.be.revertedWith("Only content manager can create categories");
    });

    it("Should only allow content manager to create licenses", async function () {
      const encryptedLicenseName = ethers.keccak256(ethers.toUtf8Bytes("CC BY 4.0"));
      const encryptedLicenseType = ethers.keccak256(ethers.toUtf8Bytes("Creative Commons"));
      const encryptedLicenseDescription = ethers.keccak256(ethers.toUtf8Bytes("Creative Commons Attribution 4.0"));
      const encryptedLicenseTerms = ethers.keccak256(ethers.toUtf8Bytes("Attribution required"));
      const encryptedLicenseUrl = ethers.keccak256(ethers.toUtf8Bytes("https://creativecommons.org/licenses/by/4.0/"));
      const encryptedLicenseHash = ethers.keccak256(ethers.toUtf8Bytes("license-hash"));

      await expect(
        contentMatrix.connect(author).createContentLicense(
          encryptedLicenseName,
          encryptedLicenseType,
          encryptedLicenseDescription,
          encryptedLicenseTerms,
          encryptedLicenseUrl,
          encryptedLicenseHash
        )
      ).to.be.revertedWith("Only content manager can create licenses");
    });
  });
});
