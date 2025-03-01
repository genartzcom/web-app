"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTCodeAnalyzer = void 0;
exports.analyzeCode = analyzeCode;
const acorn = __importStar(require("acorn"));
const walk = __importStar(require("acorn-walk"));
/**
 * NFT Code Analyzer - Parses and analyzes JavaScript/TypeScript code
 * to extract NFT collections and their traits
 */
class NFTCodeAnalyzer {
    constructor() {
        this.collections = [];
        this.traits = [];
        this.issues = [];
    }
    /**
     * Analyzes JavaScript/TypeScript code to extract NFT-related structures
     */
    analyze(code) {
        try {
            // Reset state before each analysis
            this.reset();
            // Parse the code into an AST
            const ast = this.parseCode(code);
            // Extract collections and traits
            this.extractCollections(ast);
            this.extractTraits(ast);
            // Validate the extracted data
            this.validateData();
            // Return the analysis result
            return {
                collections: this.collections,
                traits: this.traits,
                data: this.groupTraitsByCollection(),
                issues: this.issues
            };
        }
        catch (error) {
            // Handle unexpected errors
            this.addIssue({
                type: 'error',
                message: `Analysis failed: ${error.message}`
            });
            // Return whatever we managed to extract before the error
            return {
                collections: this.collections,
                traits: this.traits,
                data: this.groupTraitsByCollection(),
                issues: this.issues
            };
        }
    }
    /**
     * Reset the analyzer state
     */
    reset() {
        this.collections = [];
        this.traits = [];
        this.issues = [];
    }
    /**
     * Parse the code into an Abstract Syntax Tree
     */
    parseCode(code) {
        try {
            return acorn.parse(code, {
                ecmaVersion: 2020,
                sourceType: 'module',
                locations: true
            });
        }
        catch (error) {
            throw new Error(`Failed to parse code: ${error.message}`);
        }
    }
    /**
     * Extract collection declarations from the AST
     */
    extractCollections(ast) {
        walk.simple(ast, {
            VariableDeclarator: (node) => {
                if (this.isFormaCollectionCall(node)) {
                    this.collections.push(this.createCollection(node));
                }
            }
        });
    }
    /**
     * Extract trait references from the AST
     */
    extractTraits(ast) {
        walk.simple(ast, {
            CallExpression: (node) => {
                const trait = this.extractTrait(node);
                if (trait && !this.isDuplicateTrait(trait)) {
                    this.traits.push(trait);
                }
            }
        });
    }
    /**
     * Check if a node represents a FormaCollection call
     */
    isFormaCollectionCall(node) {
        return node.init &&
            node.init.type === 'CallExpression' &&
            node.init.callee.name === 'FormaCollection';
    }
    /**
     * Create a Collection object from a node
     */
    createCollection(node) {
        const name = node.id.name;
        const firstArg = node.init.arguments[0];
        const address = firstArg && firstArg.type === 'Literal' ? firstArg.value : null;
        // Create source location if available
        const sourceLocation = node.loc ? {
            line: node.loc.start.line,
            column: node.loc.start.column
        } : undefined;
        // Validate collection address
        if (address === null) {
            this.addIssue({
                type: 'warning',
                message: `Collection '${name}' is missing an address`,
                location: sourceLocation
            });
        }
        return { name, address, sourceLocation };
    }
    /**
     * Extract trait information from a node
     */
    extractTrait(node) {
        // Check if this is a trait type method call
        if (!this.isTraitTypeCall(node)) {
            return null;
        }
        const traitType = node.callee.property.name;
        const innerNode = node.callee.object;
        // Check if this is a metadata method call
        if (!this.isMetadataCall(innerNode)) {
            return null;
        }
        const collectionName = innerNode.callee.object.name;
        const keyArg = innerNode.arguments[0];
        const key = keyArg && keyArg.type === 'Literal' ? keyArg.value : null;
        // Create source location if available
        const sourceLocation = node.loc ? {
            line: node.loc.start.line,
            column: node.loc.start.column
        } : undefined;
        // Validate trait key
        if (key === null) {
            this.addIssue({
                type: 'warning',
                message: `Trait in collection '${collectionName}' is missing a key`,
                location: sourceLocation
            });
        }
        return {
            collection: collectionName,
            key,
            type: traitType,
            sourceLocation
        };
    }
    /**
     * Check if a node is a trait type method call (asInt, asString, asFloat)
     */
    isTraitTypeCall(node) {
        return node.callee?.type === 'MemberExpression' &&
            ['asInt', 'asString', 'asFloat'].includes(node.callee.property.name);
    }
    /**
     * Check if a node is a collection.metadata() call
     */
    isMetadataCall(node) {
        return node?.type === 'CallExpression' &&
            node.callee?.type === 'MemberExpression' &&
            node.callee.property.name === 'metadata';
    }
    /**
     * Check if a trait already exists in the traits list
     */
    isDuplicateTrait(trait) {
        return this.traits.some(t => t.collection === trait.collection &&
            t.key === trait.key &&
            t.type === trait.type);
    }
    /**
     * Group traits by collection
     */
    groupTraitsByCollection() {
        const traitDataMap = new Map();
        this.traits.forEach(trait => {
            if (!traitDataMap.has(trait.collection)) {
                traitDataMap.set(trait.collection, {
                    collection: trait.collection,
                    traits: []
                });
            }
            traitDataMap.get(trait.collection).traits.push(trait);
        });
        return Array.from(traitDataMap.values());
    }
    /**
     * Validate the extracted data for consistency
     */
    validateData() {
        // Check for traits referencing non-existent collections
        this.traits.forEach(trait => {
            const collectionExists = this.collections.some(c => c.name === trait.collection);
            if (!collectionExists) {
                this.addIssue({
                    type: 'warning',
                    message: `Trait references non-existent collection '${trait.collection}'`,
                    location: trait.sourceLocation
                });
            }
        });
    }
    /**
     * Add an issue to the issues list
     */
    addIssue(issue) {
        this.issues.push(issue);
    }
}
exports.NFTCodeAnalyzer = NFTCodeAnalyzer;
/**
 * Main analysis function - uses the NFTCodeAnalyzer class
 */
function analyzeCode(code) {
    const analyzer = new NFTCodeAnalyzer();
    return analyzer.analyze(code);
}
