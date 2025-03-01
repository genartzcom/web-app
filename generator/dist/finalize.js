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
exports.generateP5 = generateP5;
exports.generateSolidityContract = generateSolidityContract;
const analyzer = __importStar(require("./analyze"));
const p5process = __importStar(require("./process"));
const solGen = __importStar(require("./sol.generator"));
const compress_1 = require("./compress");
function generateP5(str) {
    return p5process.process(str);
}
function generateSolidityContract(code, templateSolidity) {
    const nftContractGenerator = new solGen.NFTContractGenerator();
    const analysis = analyzer.analyzeCode(code);
    const processedCode = p5process.process(code);
    const p5slot = (0, compress_1.compress)(processedCode, 512);
    return templateSolidity
        .replace('%CONTRACT_NAME%', 'NFTCollection')
        .replace('%COLLECTION_CONTRACTS%', nftContractGenerator.generateCollectionAddresses(analysis.collections))
        .replace('%COLLECTION_CODE%', nftContractGenerator.generateCollectionIndexes(analysis.collections))
        .replace('%CHUNKS%', nftContractGenerator.generateP5Storage(p5slot))
        .replace('%COLLECTION_TRAITS%', nftContractGenerator.generateTraitRegistration(analysis.data))
        .replace('%ID_MAPPING%', nftContractGenerator.generateTokenIdMapping(analysis.collections))
        .replace('%REQUIRED_MINT_CODE%', nftContractGenerator.generateOwnershipChecks(analysis.collections))
        .replace('%METADATA_EXP%', nftContractGenerator.generateMetadataExtraction(analysis.traits))
        .replace('%TRAIT_JS%', nftContractGenerator.generateSolidityJsField(analysis.collections))
        .replace('%TRAIT_BASE64%', nftContractGenerator.generateSolidityBase64EncodedField(analysis.collections))
        .replace('%P5_LS%', nftContractGenerator.generateP5Ls(p5slot))
        .replace('%ATTRIBUTES%', nftContractGenerator.generateMetadataSettings(analysis.traits))
        .replace('%CEMENT_METADATA_CODE%', nftContractGenerator.generateMetadataCementing());
}
