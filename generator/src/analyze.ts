import * as acorn from 'acorn';
import * as walk from 'acorn-walk';

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
export class NFTCodeAnalyzer {
  private collections: Collection[] = [];
  private traits: Trait[] = [];
  private issues: AnalysisIssue[] = [];

  /**
   * Analyzes JavaScript/TypeScript code to extract NFT-related structures
   */
  public analyze(code: string): AnalysisResult {
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
    } catch (error) {
      // Handle unexpected errors
      this.addIssue({
        type: 'error',
        message: `Analysis failed: ${(error as Error).message}`
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
  private reset(): void {
    this.collections = [];
    this.traits = [];
    this.issues = [];
  }

  /**
   * Parse the code into an Abstract Syntax Tree
   */
  private parseCode(code: string): acorn.Node {
    try {
      return acorn.parse(code, {
        ecmaVersion: 2020,
        sourceType: 'module',
        locations: true
      }) as acorn.Node;
    } catch (error) {
      throw new Error(`Failed to parse code: ${(error as Error).message}`);
    }
  }

  /**
   * Extract collection declarations from the AST
   */
  private extractCollections(ast: acorn.Node): void {
    walk.simple(ast, {
      VariableDeclarator: (node: any) => {
        if (this.isFormaCollectionCall(node)) {
          this.collections.push(this.createCollection(node));
        }
      }
    });
  }

  /**
   * Extract trait references from the AST
   */
  private extractTraits(ast: acorn.Node): void {
    walk.simple(ast, {
      CallExpression: (node: any) => {
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
  private isFormaCollectionCall(node: any): boolean {
    return node.init &&
      node.init.type === 'CallExpression' &&
      node.init.callee.name === 'FormaCollection';
  }

  /**
   * Create a Collection object from a node
   */
  private createCollection(node: any): Collection {
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
  private extractTrait(node: any): Trait | null {
    // Check if this is a trait type method call
    if (!this.isTraitTypeCall(node)) {
      return null;
    }

    const traitType = node.callee.property.name as TraitType;
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
  private isTraitTypeCall(node: any): boolean {
    return node.callee?.type === 'MemberExpression' &&
      ['asInt', 'asString', 'asFloat'].includes(node.callee.property.name);
  }

  /**
   * Check if a node is a collection.metadata() call
   */
  private isMetadataCall(node: any): boolean {
    return node?.type === 'CallExpression' &&
      node.callee?.type === 'MemberExpression' &&
      node.callee.property.name === 'metadata';
  }

  /**
   * Check if a trait already exists in the traits list
   */
  private isDuplicateTrait(trait: Trait): boolean {
    return this.traits.some(t =>
      t.collection === trait.collection &&
      t.key === trait.key &&
      t.type === trait.type
    );
  }

  /**
   * Group traits by collection
   */
  private groupTraitsByCollection(): TraitData[] {
    const traitDataMap = new Map<string, TraitData>();

    this.traits.forEach(trait => {
      if (!traitDataMap.has(trait.collection)) {
        traitDataMap.set(trait.collection, {
          collection: trait.collection,
          traits: []
        });
      }

      traitDataMap.get(trait.collection)!.traits.push(trait);
    });

    return Array.from(traitDataMap.values());
  }

  /**
   * Validate the extracted data for consistency
   */
  private validateData(): void {
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
  private addIssue(issue: AnalysisIssue): void {
    this.issues.push(issue);
  }
}

/**
 * Main analysis function - uses the NFTCodeAnalyzer class
 */
export function analyzeCode(code: string): AnalysisResult {
  const analyzer = new NFTCodeAnalyzer();
  return analyzer.analyze(code);
}