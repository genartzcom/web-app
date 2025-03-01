import { Collection, Trait, TraitData } from './analyze';
/**
 * Return type for the mint function generator
 */
interface MintFunctionCode {
    /** Function parameter declarations */
    parameters: string;
    /** Token ID mapping code */
    tokenMapping: string;
    /** Ownership verification code */
    ownershipChecks: string;
    /** Metadata extraction code */
    metadataExtraction: string;
}
/**
 * NFT Contract Generator
 * Generates Solidity code for NFT contracts that leverage traits from existing NFTs.
 */
export declare class NFTContractGenerator {
    private static templates;
    generateSolidityTraitJSField(collection: Collection): string;
    /**
     * Creates Solidity code for storing p5.js chunks on-chain
     *
     * @param chunks - Array of p5.js code fragments to store on-chain
     * @returns Solidity code declaring constant strings
     */
    generateP5Storage(chunks: string[]): string;
    generateP5Ls(chunks: string[]): string;
    /**
     * Creates Solidity code for collection address constants
     *
     * @param collections - Array of NFT collections
     * @returns Solidity code defining collection address constants
     */
    generateCollectionAddresses(collections: Collection[]): string;
    /**
     * Creates Solidity code for collection index constants
     *
     * @param collections - Array of NFT collections
     * @returns Solidity code defining collection index constants
     */
    generateCollectionIndexes(collections: Collection[]): string;
    generateSolidityJsField(collections: Collection[]): string;
    /**
     * Creates code that extracts metadata from source NFTs
     *
     * @param traits - Array of traits to extract
     * @returns Solidity code for extracting metadata from NFTs
     */
    generateMetadataExtraction(traits: Trait[]): string;
    /**
     * Creates code for mapping token IDs from input parameters
     *
     * @param collections - Array of NFT collections
     * @returns Solidity code for token ID mapping
     */
    generateTokenIdMapping(collections: Collection[]): string;
    /**
     * Creates ownership verification checks
     *
     * @param collections - Array of NFT collections
     * @returns Solidity code for ownership verification
     */
    generateOwnershipChecks(collections: Collection[]): string;
    /**
     * Creates function parameter list for the mint function
     *
     * @param collections - Array of NFT collections
     * @returns Solidity code for function parameters
     */
    generateFunctionParameters(collections: Collection[]): string;
    /**
     * Creates trait registration code for the constructor
     *
     * @param traitData - Array of trait data objects
     * @returns Solidity code for trait registration
     */
    generateTraitRegistration(traitData: TraitData[]): string;
    /**
     * Generates the complete mint function code
     *
     * @param collections - Array of NFT collections
     * @param traits - Array of traits to extract
     * @returns Object containing different sections of the mint function
     */
    generateMintFunction(collections: Collection[], traits: Trait[]): MintFunctionCode;
    /**
     * Generates code for setting metadata on the new token
     *
     * @param traits - Array of traits to use in metadata
     * @returns Solidity code for setting token metadata
     */
    generateMetadataSettings(traits: Trait[]): string;
    generateSolidityBase64EncodedField(collections: Collection[]): string;
    /**
     * Generates code for cementing metadata for the new token
     *
     * @returns Solidity code for cementing token metadata
     */
    generateMetadataCementing(): string;
    /**
     * Generates complete Solidity contract with all necessary sections
     *
     * @param templateCode - Base template contract code
     * @param result - Analysis result from NFTCodeAnalyzer
     * @param p5Chunks - Array of p5.js code chunks
     * @returns Complete Solidity contract code
     */
    generateCompleteContract(templateCode: string, result: {
        collections: Collection[];
        traits: Trait[];
        data: TraitData[];
    }, p5Chunks: string[]): string;
    /**
     * Maps TraitType to Solidity string representation
     *
     * @param type - TraitType to map
     * @returns String representation for Solidity code
     */
    private _mapTraitTypeToSolidity;
    /**
     * Filters out collections with null addresses
     *
     * @param collections - Array of NFT collections
     * @returns Filtered array of valid collections
     */
    private _filterValidCollections;
    /**
     * Formats a name for use in Solidity code
     *
     * @param name - Raw name string
     * @returns Formatted name
     */
    private _formatName;
    /**
     * Capitalizes the first letter of a string
     *
     * @param text - Input string
     * @returns String with first letter capitalized
     */
    private _capitalize;
    /**
     * Escapes special characters in strings for Solidity
     *
     * @param str - Raw string
     * @returns Escaped string
     */
    private _escapeString;
}
export {};
