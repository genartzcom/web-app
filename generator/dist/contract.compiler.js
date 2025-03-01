"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileContract = compileContract;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const contract_1 = require("./contract/contract");
async function compileContract(contractCode, contractName) {
    try {
        console.log('Compiling the contract...');
        // Define node_modules dependencies
        const nodeModulesDir = path_1.default.resolve(process.cwd(), 'node_modules');
        const nodeModules = {
            '@openzeppelin/contracts': path_1.default.join(nodeModulesDir, '@openzeppelin', 'contracts'),
            '@forma-dev/sdk': path_1.default.join(nodeModulesDir, '@forma-dev', 'sdk'),
        };
        const remappings = [
            '@openzeppelin/contracts/=node_modules/@openzeppelin/contracts/',
            '@forma-dev/sdk/contracts/=node_modules/@forma-dev/sdk/contracts/',
        ];
        // Check if dependencies exist
        for (const [pkg, pkgPath] of Object.entries(nodeModules)) {
            if (!fs_1.default.existsSync(pkgPath)) {
                console.warn(`Warning: Path not found for ${pkg}: ${pkgPath}`);
            }
            else {
                console.log(`${pkg} path verified: ${pkgPath}`);
            }
        }
        // Compile the contract
        const compiledContract = (0, contract_1.compile)(contractCode, contractName, {
            optimize: true,
            nodeModules,
            remappings,
            evmVersion: 'paris',
            optimizerRuns: 900,
            compilerSettings: {
                outputSelection: {
                    '*': {
                        '*': ['abi', 'evm.bytecode', 'evm.deployedBytecode', 'metadata', 'storageLayout'],
                    },
                },
            },
        });
        console.log('Contract compiled successfully.');
        console.log('ABI Length:', compiledContract.abi.length);
        console.log('Bytecode Length:', compiledContract.bytecode.length);
        return compiledContract;
    }
    catch (error) {
        console.error('An error occurred during compilation:');
        console.error(error);
        throw error;
    }
}
