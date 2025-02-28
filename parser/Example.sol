// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { ContractMetadata } from "@forma-dev/sdk/contracts/metadata/ContractMetadata.sol";
import { ERC721Cementable } from "@forma-dev/sdk/contracts/token/ERC721/ERC721Cementable.sol";
import { Ownable, Ownable2Step } from "@openzeppelin/contracts/access/Ownable2Step.sol";
import { ERC721 as ERC721OpenZeppelin } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { IERC721 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import { TokenMetadataReader } from "@forma-dev/sdk/contracts/metadata/TokenMetadataReader.sol";
import { TokenMetadataEditor } from "@forma-dev/sdk/contracts/metadata/TokenMetadataEditor.sol";
import { Strings } from "@forma-dev/sdk/contracts/utils/Strings.sol";
import { Base64 } from "@forma-dev/sdk/contracts/utils/Base64.sol";
import { Counters } from "@openzeppelin/contracts/utils/Counters.sol";

contract %CONTRACT_NAME% is Ownable2Step, ContractMetadata, ERC721Cementable {

    struct TraitRegistry {
        string jtype; // asString asInt etc.
        string key; // metadata key
    }

    using TokenMetadataReader for address;
    using TokenMetadataEditor for string;
    using Strings for string;

    Counters.Counter private _counter;

    //address private constant MAMMOTH_COLLECTION = 0xe2d085f8c89A6360bfD04Ff1f87564D0Dd55B005;
    %COLLECTION_CONTRACTS%

    %COLLECTION_CODE%

    mapping(uint256 => TraitRegistry[]) private _traitRegistry;
    mapping(uint256 => uint256) private _traitRegistrySize;

    constructor(
        string memory _name,
        string memory _symbol,
        address _initialOwner,
        address _defaultRoyaltyReceiver,
        uint96 _defaultRoyaltyFeeNumerator
    ) ERC721OpenZeppelin(_name, _symbol) Ownable(_initialOwner) {
        _setDefaultRoyalty(_defaultRoyaltyReceiver, _defaultRoyaltyFeeNumerator);

        %COLLECTION_TRAITS%
    }

    function mint(address _to, uint256[] _tokenIds) external {
    /*
        uint256 memory _tokenId = _tokenIds[0];

        require(IERC721(MAMMOTH_COLLECTION).ownerOf(_tokenId) == _msgSender(), "Not mammoth owner");

        string memory mammothName = MAMMOTH_COLLECTION.getTokenMetadata(_tokenId, "name");
        string memory image = MAMMOTH_COLLECTION.getTokenMetadata(_tokenId, "image");
        string memory eyes = MAMMOTH_COLLECTION.getTokenAttribute(_tokenId, "Eyes");
        string memory tusks = MAMMOTH_COLLECTION.getTokenAttribute(_tokenId, "Tusks");

        // replace ipfs:// with https://ipfs.forma.art/ipfs/
        image = image.replace("ipfs://", "https://ipfs.forma.art/ipfs/", 1);

        // generate the token image
        string memory imageUri = _generateTokenImage(mammothName, image, eyes.toUpperCase(), tusks.toUpperCase());

        // build the token metadata
        string memory tokenMetadata = "{}";
        tokenMetadata = tokenMetadata
            .setTokenMetadata("name", mammothName)
            .setTokenMetadata("description", "Mammoth Security ID")
            .setTokenMetadata("image", imageUri)
            .setTokenAttribute("Eyes", eyes)
            .setTokenAttribute("Tusks", tusks);

        // set the token metadata
        _setTokenMetadata(_tokenId, tokenMetadata);

        // cement the token metadata
        _cementTokenMetadata(_tokenId);

        // mint the token
        _safeMint(_to, _tokenId);
        */

        %REQUIRED_MINT_CODE%

        %FETCH_METADATA_CODE%

        %GENERATE_TOKEN_IMAGE_CODE%

        %SET_METADATA_CODE%

        %CEMENT_METADATA_CODE%

        _counter.increment();
        uint256 newTokenId = _counter.current();

        _safeMint(_to, newTokenId);
    }


    function _generateTrait(string memory collection, string[] memory types, string[] memory keys, string[] memory values) internal pure returns (string memory) {
        string memory code = string(abi.encodePacked("const ", collection, " = { traits: { "));
        for(uint i = 0; i < keys.length; i++) {
            code = string(abi.encodePacked(code, "\"", keys[i], "\": { ", types[i], "() { return ", values[i], "; } }", i < keys.length - 1 ? ", " : ""));
        }
        code = string(abi.encodePacked(code, " }, metadata(key) { return this.traits[key]; } };"));
        return code;
    }

    function generateCollectionTraitJS(string memory collectionName, address collectionAddress, uint256 collectionIndex, uint256 tokenId) public view returns (string memory) {
        (string[] memory types, string[] memory keys) = getTraitsFromRegistry(collectionIndex);

        string[] memory values = getTraitValuesFromContract(collectionAddress, tokenId, keys);

        return _generateTrait(collectionName, types, keys, values);
    }

    function getTraitValuesFromContract(address collectionAddress, uint256 tokenId, string[] memory keys) internal view returns (string[] memory) {
        string[] memory values = new string[](keys.length);

        for (uint i = 0; i < keys.length; i++) {
            values[i] = IERC721(collectionAddress).getTokenAttribute(tokenId, keys[i]);
        }

        return values;
    }

    function getTraitsFromRegistry(uint256 collectionIndex) internal view returns (string[] memory, string[] memory) {
        uint256 size = _traitRegistrySize[collectionIndex];
        require(size > 0, "No traits found for this collection");

        string[] memory types = new string[](size);
        string[] memory keys = new string[](size);

        for (uint i = 0; i < size; i++) {
            types[i] = _traitRegistry[collectionIndex][i].jtype;
            keys[i] = _traitRegistry[collectionIndex][i].key;
        }

        return (types, keys);
    }

    function _generateTokenImage(
        string memory _mammothName,
        string memory _image,
        string memory _eyes,
        string memory _tusks
    ) internal pure returns (string memory) {
        string memory svg = MAMMOTH_ID_SVG
            .replace("{{name}}", _mammothName, 1)
            .replace("{{eyes}}", _eyes, 1)
            .replace("{{tusks}}", _tusks, 1)
            .replace("{{image}}", _image, 2);

        return string.concat("data:image/svg+xml;base64,", Base64.encode(bytes(svg)));
    }



    /**
     * @dev Sets the royalty information that all ids in this contract will default to.
     *
     * Requirements:
     *
     * - `receiver` cannot be the zero address.
     * - `feeNumerator` is the number of basis points (1/10000).
     */
    function setDefaultRoyalty(address _receiver, uint96 _feeNumerator) external onlyOwner {
        _setDefaultRoyalty(_receiver, _feeNumerator);
    }

    function setTokenRoyalty(uint256 _tokenId, address _receiver, uint96 _feeNumerator) external onlyOwner {
        _setTokenRoyalty(_tokenId, _receiver, _feeNumerator);
    }

    function name() public view override(ERC721OpenZeppelin, ContractMetadata) returns (string memory) {
        return ContractMetadata.name();
    }

    function _canSetContractMetadata() internal view override returns (bool) {
        return owner() == _msgSender();
    }

    function _canSetTokenMetadata(uint256) internal view override returns (bool) {
        return owner() == _msgSender();
    }
}
