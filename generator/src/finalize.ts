import * as analyzer from './analyze';
import * as solGen from './sol.generator';
import fs from 'fs';
import * as console from 'node:console';

// NFT Contract Generator instance
const nftContractGenerator = new solGen.NFTContractGenerator();

// p5.js kodunu oku
const code: string = fs.readFileSync('test_p5.js', 'utf-8');
const templateSolidity: string = fs.readFileSync('Example.sol', 'utf-8');

// Kodu analiz et
const analysis = analyzer.analyzeCode(code);

// Çıktıları sırayla görmek için hepsini çağır
console.log('===== Collection Addresses =====');
console.log(nftContractGenerator.generateCollectionAddresses(analysis.collections));

console.log('\n===== Collection Indexes =====');
console.log(nftContractGenerator.generateCollectionIndexes(analysis.collections));

console.log('\n===== Metadata Extraction =====');
console.log(nftContractGenerator.generateMetadataExtraction(analysis.traits));

console.log('\n===== Token ID Mapping =====');
console.log(nftContractGenerator.generateTokenIdMapping(analysis.collections));

console.log('\n===== Ownership Checks =====');
console.log(nftContractGenerator.generateOwnershipChecks(analysis.collections));

console.log('\n===== Function Parameters =====');
console.log(nftContractGenerator.generateFunctionParameters(analysis.collections));

console.log('\n===== Trait Registration =====');
console.log(nftContractGenerator.generateTraitRegistration(analysis.data));

console.log('\n===== Js Field =====');
console.log(nftContractGenerator.generateSolidityJsField(analysis.collections));

console.log('\n===== Mint Function Sections =====');
const mintFunction = nftContractGenerator.generateMintFunction(analysis.collections, analysis.traits);
console.log('Parameters:\n', mintFunction.parameters);
console.log('Token Mapping:\n', mintFunction.tokenMapping);
console.log('Ownership Checks:\n', mintFunction.ownershipChecks);
console.log('Metadata Extraction:\n', mintFunction.metadataExtraction);

console.log('\n===== Metadata Settings =====');
console.log(nftContractGenerator.generateMetadataSettings(analysis.traits));

console.log('\n===== Metadata Cementing =====');
console.log(nftContractGenerator.generateMetadataCementing());

console.log('\n===== Complete Contract Generation =====');
const templateCode = `
// Solidity contract template
contract NFTCollection {

    %COLLECTION_CONTRACTS%
    
    %COLLECTION_CODEB%
    
    %COLLECTION_TRAITS%

    function mint() external {
    
        %REQUIRED_MINT_CODE%
    
        %FETCH_METADATA_CODE%
        
        %GENERATE_TOKEN_IMAGE_CODE%
        
        %SET_METADATA_CODE%
        
        %CEMENT_METADATA_CODE%
    }
}
`;
console.log(nftContractGenerator.generateCompleteContract(templateCode, analysis, [code]));


fs.writeFileSync('output.sol', templateCode, 'utf8');