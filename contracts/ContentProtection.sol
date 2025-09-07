// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title ContentProtection
 * @dev A confidential content platform for secure content licensing and access control
 * @notice This contract enables content creators to protect and license their work while maintaining privacy
 */
contract ContentProtection {
    // Structs
    struct Content {
        address creator;
        uint256 encryptedPrice;
        uint256 encryptedViews;
        uint256 encryptedRating;
        bool isActive;
        bool isLicensed;
        uint256 createdAt;
        uint256 lastAccessed;
        ContentType contentType;
        string contentHash;
        string metadata;
        uint256 totalRevenue;
        uint256 licenseCount;
    }

    struct License {
        address licensee;
        address contentAddress;
        uint256 encryptedAccessLevel;
        uint256 encryptedDuration;
        bool isActive;
        bool isRevoked;
        uint256 issuedAt;
        uint256 expiresAt;
        string licenseId;
        uint256 usageCount;
    }

    struct AccessControl {
        uint256 encryptedUserScore;
        uint256 encryptedAccessRights;
        bool isWhitelisted;
        bool isBlacklisted;
        uint256 lastVerified;
        uint256 totalAccess;
        AccessLevel accessLevel;
    }

    enum ContentType { ARTICLE, VIDEO, AUDIO, DOCUMENT, SOFTWARE, DATASET }
    enum AccessLevel { BASIC, PREMIUM, ENTERPRISE, CUSTOM }

    // State variables
    mapping(address => Content) public contents;
    mapping(string => License) public licenses;
    mapping(address => AccessControl) public accessControls;
    mapping(address => string[]) public userLicenses;
    mapping(address => bool) public contentModerators;
    mapping(address => uint256) public creatorEarnings;
    
    // Platform state
    uint256 public totalContent;
    uint256 public totalLicenses;
    uint256 public platformRevenue;
    uint256 public minimumPrice;
    
    // Events
    event ContentCreated(address indexed creator, string contentHash, uint256 createdAt);
    event ContentLicensed(string indexed licenseId, address licensee, uint256 issuedAt);
    event LicenseRevoked(string indexed licenseId, uint256 revokedAt);
    event AccessGranted(address indexed user, AccessLevel level, uint256 timestamp);
    event AccessRevoked(address indexed user, uint256 timestamp);
    event RevenueDistributed(address indexed creator, uint256 amount, uint256 timestamp);
    event ContentModerated(address indexed content, bool approved, uint256 timestamp);

    // Modifiers
    modifier onlyContentModerator() {
        require(contentModerators[msg.sender], "Not authorized moderator");
        _;
    }

    modifier onlyContentCreator(address contentAddress) {
        require(contents[contentAddress].creator == msg.sender, "Not content creator");
        _;
    }

    modifier contentExists(address contentAddress) {
        require(contents[contentAddress].creator != address(0), "Content does not exist");
        _;
    }

    modifier contentActive(address contentAddress) {
        require(contents[contentAddress].isActive, "Content is not active");
        _;
    }

    modifier licenseExists(string memory licenseId) {
        require(licenses[licenseId].licensee != address(0), "License does not exist");
        _;
    }

    modifier licenseActive(string memory licenseId) {
        require(licenses[licenseId].isActive, "License is not active");
        _;
    }

    constructor() {
        minimumPrice = 0.001 ether;
        contentModerators[msg.sender] = true;
    }

    /**
     * @dev Create new content
     * @param encryptedPrice Encrypted price for the content
     * @param contentType Type of content
     * @param contentHash Hash of the content
     * @param metadata Additional metadata
     */
    function createContent(
        uint256 encryptedPrice,
        ContentType contentType,
        string memory contentHash,
        string memory metadata
    ) external {
        require(contents[msg.sender].creator == address(0), "Creator already has content");
        require(bytes(contentHash).length > 0, "Content hash cannot be empty");
        
        contents[msg.sender] = Content({
            creator: msg.sender,
            encryptedPrice: encryptedPrice,
            encryptedViews: 0,
            encryptedRating: 0,
            isActive: true,
            isLicensed: false,
            createdAt: block.timestamp,
            lastAccessed: block.timestamp,
            contentType: contentType,
            contentHash: contentHash,
            metadata: metadata,
            totalRevenue: 0,
            licenseCount: 0
        });
        
        totalContent++;
        
        emit ContentCreated(msg.sender, contentHash, block.timestamp);
    }

    /**
     * @dev Purchase license for content
     * @param contentAddress Address of the content creator
     * @param encryptedAccessLevel Encrypted access level
     * @param encryptedDuration Encrypted duration in days
     */
    function purchaseLicense(
        address contentAddress,
        uint256 encryptedAccessLevel,
        uint256 encryptedDuration
    ) external payable contentExists(contentAddress) contentActive(contentAddress) {
        Content storage content = contents[contentAddress];
        require(msg.value >= minimumPrice, "Insufficient payment amount");
        
        string memory licenseId = _generateLicenseId(msg.sender, contentAddress);
        
        // Calculate duration (in real app, this would be decrypted)
        uint256 duration = 30; // Default 30 days
        
        licenses[licenseId] = License({
            licensee: msg.sender,
            contentAddress: contentAddress,
            encryptedAccessLevel: encryptedAccessLevel,
            encryptedDuration: encryptedDuration,
            isActive: true,
            isRevoked: false,
            issuedAt: block.timestamp,
            expiresAt: block.timestamp + (duration * 1 days),
            licenseId: licenseId,
            usageCount: 0
        });
        
        userLicenses[msg.sender].push(licenseId);
        content.licenseCount++;
        totalLicenses++;
        
        // Distribute revenue (90% to creator, 10% to platform)
        uint256 creatorShare = (msg.value * 90) / 100;
        uint256 platformShare = msg.value - creatorShare;
        
        creatorEarnings[contentAddress] += creatorShare;
        platformRevenue += platformShare;
        content.totalRevenue += creatorShare;
        
        payable(contentAddress).transfer(creatorShare);
        
        emit ContentLicensed(licenseId, msg.sender, block.timestamp);
        emit RevenueDistributed(contentAddress, creatorShare, block.timestamp);
    }

    /**
     * @dev Get content information
     */
    function getContent(address contentAddress) external view returns (
        address creator,
        uint256 encryptedPrice,
        uint256 encryptedViews,
        uint256 encryptedRating,
        bool isActive,
        bool isLicensed,
        uint256 createdAt,
        uint256 lastAccessed,
        ContentType contentType,
        string memory contentHash,
        string memory metadata,
        uint256 totalRevenue,
        uint256 licenseCount
    ) {
        Content memory content = contents[contentAddress];
        return (
            content.creator,
            content.encryptedPrice,
            content.encryptedViews,
            content.encryptedRating,
            content.isActive,
            content.isLicensed,
            content.createdAt,
            content.lastAccessed,
            content.contentType,
            content.contentHash,
            content.metadata,
            content.totalRevenue,
            content.licenseCount
        );
    }

    /**
     * @dev Get platform statistics
     */
    function getPlatformStats() external view returns (
        uint256 totalContentCount,
        uint256 totalLicenseCount,
        uint256 platformRevenueAmount,
        uint256 minimumPriceAmount
    ) {
        return (
            totalContent,
            totalLicenses,
            platformRevenue,
            minimumPrice
        );
    }

    /**
     * @dev Generate unique license ID
     */
    function _generateLicenseId(address licensee, address contentAddress) internal view returns (string memory) {
        return string(abi.encodePacked(
            "license_",
            _addressToString(licensee),
            "_",
            _addressToString(contentAddress),
            "_",
            _uintToString(block.timestamp)
        ));
    }

    /**
     * @dev Convert address to string
     */
    function _addressToString(address addr) internal pure returns (string memory) {
        return _toHexString(abi.encodePacked(addr));
    }

    /**
     * @dev Convert uint to string
     */
    function _uintToString(uint256 value) internal pure returns (string memory) {
        if (value == 0) return "0";
        
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        
        return string(buffer);
    }

    /**
     * @dev Convert bytes to hex string
     */
    function _toHexString(bytes memory data) internal pure returns (string memory) {
        bytes memory alphabet = "0123456789abcdef";
        bytes memory str = new bytes(2 + data.length * 2);
        str[0] = "0";
        str[1] = "x";
        for (uint256 i = 0; i < data.length; i++) {
            str[2 + i * 2] = alphabet[uint8(data[i] >> 4)];
            str[3 + i * 2] = alphabet[uint8(data[i] & 0x0f)];
        }
        return string(str);
    }
}