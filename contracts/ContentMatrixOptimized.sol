// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ContentMatrixOptimized {
    
    struct ContentItem {
        uint256 contentId;
        bytes32 encryptedTitle; // 需要加密：用户生成的内容标题
        bytes32 encryptedDescription; // 需要加密：用户生成的内容描述
        string contentType; // 不需要加密：系统预定义类型
        bytes32 encryptedContentHash; // 需要加密：内容哈希
        bytes32 encryptedAuthor; // 需要加密：作者信息
        string category; // 不需要加密：公开的类别名称
        string tags; // 不需要加密：标签可以公开
        string language; // 不需要加密：语言标识
        bytes32 encryptedContentData; // 需要加密：实际内容数据
        uint256 fileSize; // 不需要加密：文件大小
        uint256 viewCount; // 不需要加密：统计数字
        uint256 likeCount; // 不需要加密：统计数字
        uint256 shareCount; // 不需要加密：统计数字
        uint256 downloadCount; // 不需要加密：统计数字
        bytes32 encryptedContentMatrix; // 需要加密：内容矩阵数据
        bool isPublic;
        bool isActive;
        uint256 creationTime;
        uint256 lastUpdated;
    }
    
    struct ContentCategory {
        uint256 categoryId;
        string name; // 不需要加密：公开的类别名称
        string description; // 不需要加密：公开的类别描述
        string type; // 不需要加密：系统预定义类型
        string icon; // 不需要加密：图标标识
        string color; // 不需要加密：颜色值
        uint256 contentCount; // 不需要加密：统计数字
        uint256 subcategoryCount; // 不需要加密：统计数字
        bytes32 categoryHash; // 不需要加密：类别哈希
        bool isActive;
        uint256 creationTime;
        uint256 lastUpdated;
    }
    
    struct ContentAuthor {
        uint256 authorId;
        bytes32 encryptedName; // 需要加密：作者姓名
        bytes32 encryptedEmail; // 需要加密：作者邮箱
        bytes32 encryptedBio; // 需要加密：作者简介
        string avatar; // 不需要加密：头像URL
        string website; // 不需要加密：网站URL
        string socialMedia; // 不需要加密：社交媒体
        uint256 contentCount; // 不需要加密：统计数字
        uint256 followerCount; // 不需要加密：统计数字
        uint256 rating; // 不需要加密：评分
        bytes32 authorHash; // 不需要加密：作者哈希
        bool isVerified;
        bool isActive;
        uint256 creationTime;
        uint256 lastUpdated;
    }
    
    mapping(uint256 => ContentItem) public contentItems;
    mapping(uint256 => ContentCategory) public contentCategories;
    mapping(uint256 => ContentAuthor) public contentAuthors;
    mapping(address => uint256[]) public authorContent; // author => contentIds
    mapping(string => uint256[]) public categoryContent; // category => contentIds
    mapping(address => mapping(uint256 => bool)) public hasAccess; // user => contentId => hasAccess
    
    uint256 public contentCounter;
    uint256 public categoryCounter;
    uint256 public authorCounter;
    
    address public owner;
    address public contentManager;
    
    event ContentItemCreated(uint256 indexed contentId, address indexed author, string indexed contentType);
    event ContentCategoryCreated(uint256 indexed categoryId, string indexed categoryName);
    event ContentAuthorCreated(uint256 indexed authorId, address indexed author, bytes32 indexed authorName);
    
    constructor(address _contentManager) {
        owner = msg.sender;
        contentManager = _contentManager;
    }
    
    function createContentItem(
        bytes32 _encryptedTitle,
        bytes32 _encryptedDescription,
        string memory _contentType,
        bytes32 _encryptedContentHash,
        bytes32 _encryptedAuthor,
        string memory _category,
        string memory _tags,
        string memory _language,
        bytes32 _encryptedContentData,
        uint256 _fileSize,
        bytes32 _encryptedContentMatrix
    ) public returns (uint256) {
        uint256 contentId = contentCounter++;
        
        contentItems[contentId] = ContentItem({
            contentId: contentId,
            encryptedTitle: _encryptedTitle,
            encryptedDescription: _encryptedDescription,
            contentType: _contentType,
            encryptedContentHash: _encryptedContentHash,
            encryptedAuthor: _encryptedAuthor,
            category: _category,
            tags: _tags,
            language: _language,
            encryptedContentData: _encryptedContentData,
            fileSize: _fileSize,
            viewCount: 0,
            likeCount: 0,
            shareCount: 0,
            downloadCount: 0,
            encryptedContentMatrix: _encryptedContentMatrix,
            isPublic: true,
            isActive: true,
            creationTime: block.timestamp,
            lastUpdated: block.timestamp
        });
        
        authorContent[msg.sender].push(contentId);
        categoryContent[_category].push(contentId);
        
        emit ContentItemCreated(contentId, msg.sender, _contentType);
        return contentId;
    }
    
    function createContentCategory(
        string memory _name,
        string memory _description,
        string memory _type,
        string memory _icon,
        string memory _color,
        bytes32 _categoryHash
    ) public returns (uint256) {
        require(msg.sender == contentManager, "Only content manager can create categories");
        
        uint256 categoryId = categoryCounter++;
        
        contentCategories[categoryId] = ContentCategory({
            categoryId: categoryId,
            name: _name,
            description: _description,
            type: _type,
            icon: _icon,
            color: _color,
            contentCount: 0,
            subcategoryCount: 0,
            categoryHash: _categoryHash,
            isActive: true,
            creationTime: block.timestamp,
            lastUpdated: block.timestamp
        });
        
        emit ContentCategoryCreated(categoryId, _name);
        return categoryId;
    }
    
    function createContentAuthor(
        bytes32 _encryptedName,
        bytes32 _encryptedEmail,
        bytes32 _encryptedBio,
        string memory _avatar,
        string memory _website,
        string memory _socialMedia,
        bytes32 _authorHash
    ) public returns (uint256) {
        uint256 authorId = authorCounter++;
        
        contentAuthors[authorId] = ContentAuthor({
            authorId: authorId,
            encryptedName: _encryptedName,
            encryptedEmail: _encryptedEmail,
            encryptedBio: _encryptedBio,
            avatar: _avatar,
            website: _website,
            socialMedia: _socialMedia,
            contentCount: 0,
            followerCount: 0,
            rating: 0,
            authorHash: _authorHash,
            isVerified: false,
            isActive: true,
            creationTime: block.timestamp,
            lastUpdated: block.timestamp
        });
        
        emit ContentAuthorCreated(authorId, msg.sender, _encryptedName);
        return authorId;
    }
    
    function getContentItem(uint256 _contentId) public view returns (
        bytes32 encryptedTitle,
        bytes32 encryptedDescription,
        string memory contentType,
        bytes32 encryptedContentHash,
        bytes32 encryptedAuthor,
        string memory category,
        string memory tags,
        string memory language,
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
            content.contentType,
            content.encryptedContentHash,
            content.encryptedAuthor,
            content.category,
            content.tags,
            content.language,
            content.encryptedContentData,
            content.fileSize,
            content.viewCount,
            content.likeCount,
            content.shareCount,
            content.downloadCount,
            content.encryptedContentMatrix,
            content.isPublic,
            content.isActive,
            content.creationTime,
            content.lastUpdated
        );
    }
    
    function getContentCategory(uint256 _categoryId) public view returns (
        string memory name,
        string memory description,
        string memory type,
        string memory icon,
        string memory color,
        uint256 contentCount,
        uint256 subcategoryCount,
        bytes32 categoryHash,
        bool isActive,
        uint256 creationTime,
        uint256 lastUpdated
    ) {
        ContentCategory storage category = contentCategories[_categoryId];
        return (
            category.name,
            category.description,
            category.type,
            category.icon,
            category.color,
            category.contentCount,
            category.subcategoryCount,
            category.categoryHash,
            category.isActive,
            category.creationTime,
            category.lastUpdated
        );
    }
    
    function getContentAuthor(uint256 _authorId) public view returns (
        bytes32 encryptedName,
        bytes32 encryptedEmail,
        bytes32 encryptedBio,
        string memory avatar,
        string memory website,
        string memory socialMedia,
        uint256 contentCount,
        uint256 followerCount,
        uint256 rating,
        bytes32 authorHash,
        bool isVerified,
        bool isActive,
        uint256 creationTime,
        uint256 lastUpdated
    ) {
        ContentAuthor storage author = contentAuthors[_authorId];
        return (
            author.encryptedName,
            author.encryptedEmail,
            author.encryptedBio,
            author.avatar,
            author.website,
            author.socialMedia,
            author.contentCount,
            author.followerCount,
            author.rating,
            author.authorHash,
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
    
    // 更新统计数字的函数
    function incrementViewCount(uint256 _contentId) public {
        require(contentItems[_contentId].isActive, "Content not active");
        contentItems[_contentId].viewCount++;
        contentItems[_contentId].lastUpdated = block.timestamp;
    }
    
    function incrementLikeCount(uint256 _contentId) public {
        require(contentItems[_contentId].isActive, "Content not active");
        contentItems[_contentId].likeCount++;
        contentItems[_contentId].lastUpdated = block.timestamp;
    }
    
    function incrementShareCount(uint256 _contentId) public {
        require(contentItems[_contentId].isActive, "Content not active");
        contentItems[_contentId].shareCount++;
        contentItems[_contentId].lastUpdated = block.timestamp;
    }
    
    function incrementDownloadCount(uint256 _contentId) public {
        require(contentItems[_contentId].isActive, "Content not active");
        contentItems[_contentId].downloadCount++;
        contentItems[_contentId].lastUpdated = block.timestamp;
    }
}
