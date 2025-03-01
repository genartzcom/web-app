


const solc = require('solc');
const { ethers } = require('ethers');


function compile(sourceCode, contractName, options = {}) {
  
  const input = {
    language: 'Solidity',
    sources: {
      'contract.sol': {
        content: sourceCode
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['abi', 'evm.bytecode', 'evm.deployedBytecode', 'metadata']
        }
      },
      optimizer: {
        enabled: options.optimize || false,
        runs: options.optimizerRuns || 200
      },
      evmVersion: options.evmVersion || 'paris',
      ...options.compilerSettings
    }
  };

  
  const inputJSON = JSON.stringify(input);

  
  const output = JSON.parse(solc.compile(inputJSON));

  
  if (output.errors) {
    const errors = output.errors.filter(error => error.severity === 'error');
    if (errors.length > 0) {
      throw new Error(`Compilation errors: ${JSON.stringify(errors, null, 2)}`);
    }
  }

  
  const contractOutput = output.contracts['contract.sol'][contractName];

  if (!contractOutput) {
    throw new Error(`Contract ${contractName} not found in compilation output`);
  }

  
  return {
    abi: contractOutput.abi,
    bytecode: contractOutput.evm.bytecode.object,
    deployedBytecode: contractOutput.evm.deployedBytecode.object,
    metadata: contractOutput.metadata
  };
}


async function deploy(compiledContract, constructorArgs = [], deployOptions = {}) {
  
  const { abi, bytecode } = compiledContract;

  if (!bytecode) {
    throw new Error('No bytecode provided for deployment');
  }

  if (!abi) {
    throw new Error('No ABI provided for deployment');
  }

  
  let provider;
  if (deployOptions.provider) {
    provider = deployOptions.provider;
  } else if (deployOptions.providerUrl) {
    provider = new ethers.JsonRpcProvider(deployOptions.providerUrl);
  } else {
    throw new Error('No provider or providerUrl specified for deployment');
  }

  
  let signer;
  if (deployOptions.signer) {
    signer = deployOptions.signer;
  } else if (deployOptions.privateKey) {
    signer = new ethers.Wallet(deployOptions.privateKey, provider);
  } else {
    throw new Error('No signer or privateKey specified for deployment');
  }

  try {
    
    const factory = new ethers.ContractFactory(abi, bytecode, signer);

    
    const overrides = {};

    
    if (deployOptions.gasLimit !== undefined) overrides.gasLimit = deployOptions.gasLimit;
    if (deployOptions.gasPrice !== undefined) overrides.gasPrice = deployOptions.gasPrice;
    if (deployOptions.value !== undefined) overrides.value = deployOptions.value;
    if (deployOptions.nonce !== undefined) overrides.nonce = deployOptions.nonce;

    console.log("Deploy opsiyon objesi:", JSON.stringify(overrides));

    
    
    let contract;

    if (constructorArgs.length === 0) {
      
      contract = await factory.deploy(overrides);
    } else {
      
      contract = await factory.deploy(...constructorArgs, overrides);
    }

    
    const receipt = await contract.deploymentTransaction().wait();

    return {
      contract,
      receipt,
      address: contract.target,  
      deployTransaction: contract.deploymentTransaction()
    };
  } catch (error) {
    console.error("Deploy hatası:", error);
    if (error.code === "INVALID_ARGUMENT") {
      console.error("Argüman hatası detayları:", {
        argument: error.argument,
        value: error.value,
        shortMessage: error.shortMessage
      });
    }
    throw error;
  }
}


module.exports = {
  compile,
  deploy
};


exports.compile = compile;
exports.deploy = deploy;