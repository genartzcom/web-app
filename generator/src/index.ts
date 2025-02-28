import * as analyze from './analyze';
import * as processModule from './process';
import * as compress from './compress';
import * as solGenerator from './sol.generator';
import * as fs from 'fs';

const code: string = fs.readFileSync('test_p5.js', 'utf-8');

const p5Data = analyze.analyzeCode(code);

const solFields = solGenerator.solidity_generateCollectionFields(p5Data.collections);
const solCollectionIndexes = solGenerator.solidity_generateCollectionIndexes(p5Data.collections);
const solTraitFields = solGenerator.solidity_generateMetadataVariables(p5Data.traits);
const solRequireToken = solGenerator.solidity_generateRequireToken(p5Data.collections);
const solMintParams = solGenerator.solidity_generateMintParams(p5Data.collections);
const solCollectionIndexesIds = solGenerator.solidity_generateTokenIdIndexes(p5Data.collections);

const chunks = solGenerator.solidity_generateP5Chunks(compress.compress(code, 1000));

const list: string[] = [solFields, solCollectionIndexes, solTraitFields, solRequireToken, solMintParams, solCollectionIndexesIds];

console.log(solGenerator.solidity_generateTraitStuffs(p5Data.data));