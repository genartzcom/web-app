import * as acorn from 'acorn';
/**
 * Core entity interfaces
 */
export interface Collection {
    name: string;
    address: string | null;
    sourceLocation?: SourceLocation;
}
export interface Trait {
    collection: string;
    key: string | null;
    type: TraitType;
    sourceLocation?: SourceLocation;
}
export interface TraitData {
    collection: string;
    traits: Trait[];
}
export interface SourceLocation {
    line: number;
    column: number;
    source?: string;
}
export interface AnalysisResult {
    collections: Collection[];
    traits: Trait[];
    data: TraitData[];
    issues: AnalysisIssue[];
}
export interface AnalysisIssue {
    type: 'warning' | 'error';
    message: string;
    location?: SourceLocation;
}
/**
 * Type definitions
 */
export type TraitType = 'asInt' | 'asString' | 'asFloat';
export type NodeVisitor = (node: acorn.Node) => void;
/**
 * NFT Code Analyzer - Parses and analyzes JavaScript/TypeScript code
 * to extract NFT collections and their traits
 */
export declare class NFTCodeAnalyzer {
    private collections;
    private traits;
    private issues;
    /**
     * Analyzes JavaScript/TypeScript code to extract NFT-related structures
     */
    analyze(code: string): AnalysisResult;
    /**
     * Reset the analyzer state
     */
    private reset;
    /**
     * Parse the code into an Abstract Syntax Tree
     */
    private parseCode;
    /**
     * Extract collection declarations from the AST
     */
    private extractCollections;
    /**
     * Extract trait references from the AST
     */
    private extractTraits;
    /**
     * Check if a node represents a FormaCollection call
     */
    private isFormaCollectionCall;
    /**
     * Create a Collection object from a node
     */
    private createCollection;
    /**
     * Extract trait information from a node
     */
    private extractTrait;
    /**
     * Check if a node is a trait type method call (asInt, asString, asFloat)
     */
    private isTraitTypeCall;
    /**
     * Check if a node is a collection.metadata() call
     */
    private isMetadataCall;
    /**
     * Check if a trait already exists in the traits list
     */
    private isDuplicateTrait;
    /**
     * Group traits by collection
     */
    private groupTraitsByCollection;
    /**
     * Validate the extracted data for consistency
     */
    private validateData;
    /**
     * Add an issue to the issues list
     */
    private addIssue;
}
/**
 * Main analysis function - uses the NFTCodeAnalyzer class
 */
export declare function analyzeCode(code: string): AnalysisResult;
