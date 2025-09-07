// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ContentMatrix {
    
    struct ContentItem {
        uint256 contentId;
        bytes32 encryptedTitle; // Encrypted content title
        bytes32 encryptedDescription; // Encrypted content description
        bytes32 encryptedContentType; // Encrypted content type (Text, Image, Video, Audio, Document)
        bytes32 encryptedContentHash; // Encrypted content hash
        bytes32 encryptedAuthor; // Encrypted author identifier
        bytes32 encryptedCategory; // Encrypted content category
        bytes32 encryptedTags; // Encrypted content tags
        bytes32 encryptedLanguage; // Encrypted content language
        bytes32 encryptedContentData; // Encrypted content data
        uint256 encryptedFileSize; // Encrypted file size in bytes
        uint256 encryptedViewCount; // Encrypted view count
        uint256 encryptedLikeCount; // Encrypted like count
        uint256 encryptedShareCount; // Encrypted share count
        uint256 encryptedDownloadCount; // Encrypted download count
        bytes32 encryptedContentMatrix; // Encrypted content matrix hash
        bool isPublic;
        bool isActive;
        uint256 creationTime;
        uint256 lastUpdated;
    }
    
    struct ContentCategory {
        uint256 categoryId;
        bytes32 encryptedCategoryName; // Encrypted category name
        bytes32 encryptedCategoryDescription; // Encrypted category description
        bytes32 encryptedCategoryType; // Encrypted category type
        bytes32 encryptedCategoryIcon; // Encrypted category icon
        bytes32 encryptedCategoryColor; // Encrypted category color
        uint256 encryptedContentCount; // Encrypted content count in category
        uint256 encryptedSubcategoryCount; // Encrypted subcategory count
        bytes32 encryptedCategoryHash; // Encrypted category hash
        bool isActive;
        uint256 creationTime;
        uint256 lastUpdated;
    }
    
    struct ContentAuthor {
        uint256 authorId;
        bytes32 encryptedAuthorName; // Encrypted author name
        bytes32 encryptedAuthorEmail; // Encrypted author email
        bytes32 encryptedAuthorBio; // Encrypted author biography
        bytes32 encryptedAuthorAvatar; // Encrypted author avatar
        bytes32 encryptedAuthorWebsite; // Encrypted author website
        bytes32 encryptedAuthorSocial; // Encrypted author social links
        uint256 encryptedContentCount; // Encrypted content count by author
        uint256 encryptedFollowerCount; // Encrypted follower count
        uint256 encryptedRating; // Encrypted author rating
        bytes32 encryptedAuthorHash; // Encrypted author hash
        bool isVerified;
        bool isActive;
        uint256 creationTime;
        uint256 lastUpdated;
    }
    
    mapping(uint256 => ContentItem) public contentItems;
    mapping(uint256 => ContentCategory) public contentCategories;
    mapping(uint256 => ContentAuthor) public contentAuthors;
    mapping(address => uint256[]) public authorContent; // author => contentIds
    mapping(bytes32 => uint256[]) public categoryContent; // category => contentIds
    mapping(address => mapping(uint256 => bool)) public hasAccess; // user => contentId => hasAccess
    
    uint256 public contentCounter;
    uint256 public categoryCounter;
    uint256 public authorCounter;
    
    address public owner;
    address public contentManager;
    
    event ContentItemCreated(uint256 indexed contentId, address indexed author, bytes32 indexed contentType);
    event ContentCategoryCreated(uint256 indexed categoryId, bytes32 indexed categoryName);
    event ContentAuthorCreated(uint256 indexed authorId, address indexed author, bytes32 indexed authorName);
    
    constructor(address _contentManager) {
        owner = msg.sender;
        contentManager = _contentManager;
    }
    
    function createContentItem(
        bytes32 _encryptedTitle,
        bytes32 _encryptedDescription,
        bytes32 _encryptedContentType,
        bytes32 _encryptedContentHash,
        bytes32 _encryptedAuthor,
        bytes32 _encryptedCategory,
        bytes32 _encryptedTags,
        bytes32 _encryptedLanguage,
        bytes32 _encryptedContentData,
        uint256 _encryptedFileSize,
        bytes32 _encryptedContentMatrix
    ) public returns (uint256) {
        uint256 contentId = contentCounter++;
        
        contentItems[contentId] = ContentItem({
            contentId: contentId,
            encryptedTitle: _encryptedTitle,
            encryptedDescription: _encryptedDescription,
            encryptedContentType: _encryptedContentType,
            encryptedContentHash: _encryptedContentHash,
            encryptedAuthor: _encryptedAuthor,
            encryptedCategory: _encryptedCategory,
            encryptedTags: _encryptedTags,
            encryptedLanguage: _encryptedLanguage,
            encryptedContentData: _encryptedContentData,
            encryptedFileSize: _encryptedFileSize,
            encryptedViewCount: 0,
            encryptedLikeCount: 0,
            encryptedShareCount: 0,
            encryptedDownloadCount: 0,
            encryptedContentMatrix: _encryptedContentMatrix,
            isPublic: true,
            isActive: true,
            creationTime: block.timestamp,
            lastUpdated: block.timestamp
        });
        
        authorContent[msg.sender].push(contentId);
        categoryContent[_encryptedCategory].push(contentId);
        
        emit ContentItemCreated(contentId, msg.sender, _encryptedContentType);
        return contentId;
    }
    
    function createContentCategory(
        bytes32 _encryptedCategoryName,
        bytes32 _encryptedCategoryDescription,
        bytes32 _encryptedCategoryType,
        bytes32 _encryptedCategoryIcon,
        bytes32 _encryptedCategoryColor,
        bytes32 _encryptedCategoryHash
    ) public returns (uint256) {
        require(msg.sender == contentManager, "Only content manager can create categories");
        
        uint256 categoryId = categoryCounter++;
        
        contentCategories[categoryId] = ContentCategory({
            categoryId: categoryId,
            encryptedCategoryName: _encryptedCategoryName,
            encryptedCategoryDescription: _encryptedCategoryDescription,
            encryptedCategoryType: _encryptedCategoryType,
            encryptedCategoryIcon: _encryptedCategoryIcon,
            encryptedCategoryColor: _encryptedCategoryColor,
            encryptedContentCount: 0,
            encryptedSubcategoryCount: 0,
            encryptedCategoryHash: _encryptedCategoryHash,
            isActive: true,
            creationTime: block.timestamp,
            lastUpdated: block.timestamp
        });
        
        emit ContentCategoryCreated(categoryId, _encryptedCategoryName);
        return categoryId;
    }
    
    function createContentAuthor(
        bytes32 _encryptedAuthorName,
        bytes32 _encryptedAuthorEmail,
        bytes32 _encryptedAuthorBio,
        bytes32 _encryptedAuthorAvatar,
        bytes32 _encryptedAuthorWebsite,
        bytes32 _encryptedAuthorSocial,
        bytes32 _encryptedAuthorHash
    ) public returns (uint256) {
        uint256 authorId = authorCounter++;
        
        contentAuthors[authorId] = ContentAuthor({
            authorId: authorId,
            encryptedAuthorName: _encryptedAuthorName,
            encryptedAuthorEmail: _encryptedAuthorEmail,
            encryptedAuthorBio: _encryptedAuthorBio,
            encryptedAuthorAvatar: _encryptedAuthorAvatar,
            encryptedAuthorWebsite: _encryptedAuthorWebsite,
            encryptedAuthorSocial: _encryptedAuthorSocial,
            encryptedContentCount: 0,
            encryptedFollowerCount: 0,
            encryptedRating: 0,
            encryptedAuthorHash: _encryptedAuthorHash,
            isVerified: false,
            isActive: true,
            creationTime: block.timestamp,
            lastUpdated: block.timestamp
        });
        
        emit ContentAuthorCreated(authorId, msg.sender, _encryptedAuthorName);
        return authorId;
    }
    
    function getContentItem(uint256 _contentId) public view returns (
        bytes32 encryptedTitle,
        bytes32 encryptedDescription,
        bytes32 encryptedContentType,
        bytes32 encryptedContentHash,
        bytes32 encryptedAuthor,
        bytes32 encryptedCategory,
        bytes32 encryptedTags,
        bytes32 encryptedLanguage,
        bytes32 encryptedContentData,
        uint256 fileSize,
        uint256 viewCount,
        uint256 likeCount,
        uint256 shareCount,
        uint256 downloadCount,
        bytes32 encryptedContentMatrix,
        bool isPublic,
        bool isActive,
        uint256 creationTime,
        uint256 lastUpdated
    ) {
        ContentItem storage content = contentItems[_contentId];
        return (
            content.encryptedTitle,
            content.encryptedDescription,
            content.encryptedContentType,
            content.encryptedContentHash,
            content.encryptedAuthor,
            content.encryptedCategory,
            content.encryptedTags,
            content.encryptedLanguage,
            content.encryptedContentData,
            content.encryptedFileSize,
            content.encryptedViewCount,
            content.encryptedLikeCount,
            content.encryptedShareCount,
            content.encryptedDownloadCount,
            content.encryptedContentMatrix,
            content.isPublic,
            content.isActive,
            content.creationTime,
            content.lastUpdated
        );
    }
    
    function getContentCategory(uint256 _categoryId) public view returns (
        bytes32 encryptedCategoryName,
        bytes32 encryptedCategoryDescription,
        bytes32 encryptedCategoryType,
        bytes32 encryptedCategoryIcon,
        bytes32 encryptedCategoryColor,
        uint256 contentCount,
        uint256 subcategoryCount,
        bytes32 encryptedCategoryHash,
        bool isActive,
        uint256 creationTime,
        uint256 lastUpdated
    ) {
        ContentCategory storage category = contentCategories[_categoryId];
        return (
            category.encryptedCategoryName,
            category.encryptedCategoryDescription,
            category.encryptedCategoryType,
            category.encryptedCategoryIcon,
            category.encryptedCategoryColor,
            category.encryptedContentCount,
            category.encryptedSubcategoryCount,
            category.encryptedCategoryHash,
            category.isActive,
            category.creationTime,
            category.lastUpdated
        );
    }
    
    function getContentAuthor(uint256 _authorId) public view returns (
        bytes32 encryptedAuthorName,
        bytes32 encryptedAuthorEmail,
        bytes32 encryptedAuthorBio,
        bytes32 encryptedAuthorAvatar,
        bytes32 encryptedAuthorWebsite,
        bytes32 encryptedAuthorSocial,
        uint256 contentCount,
        uint256 followerCount,
        uint256 rating,
        bytes32 encryptedAuthorHash,
        bool isVerified,
        bool isActive,
        uint256 creationTime,
        uint256 lastUpdated
    ) {
        ContentAuthor storage author = contentAuthors[_authorId];
        return (
            author.encryptedAuthorName,
            author.encryptedAuthorEmail,
            author.encryptedAuthorBio,
            author.encryptedAuthorAvatar,
            author.encryptedAuthorWebsite,
            author.encryptedAuthorSocial,
            author.encryptedContentCount,
            author.encryptedFollowerCount,
            author.encryptedRating,
            author.encryptedAuthorHash,
            author.isVerified,
            author.isActive,
            author.creationTime,
            author.lastUpdated
        );
    }
    
    function getContentMatrixStatistics() public view returns (
        uint256 totalContent,
        uint256 activeContent,
        uint256 totalCategories,
        uint256 totalAuthors
    ) {
        uint256 activeContentCount = 0;
        
        // Count active content
        for (uint256 i = 0; i < contentCounter; i++) {
            if (contentItems[i].isActive) {
                activeContentCount++;
            }
        }
        
        return (
            contentCounter,
            activeContentCount,
            categoryCounter,
            authorCounter
        );
    }
}