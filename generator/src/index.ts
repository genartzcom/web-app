import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

import { compile, deploy } from './contract/contract';

export async function compileContract(
  contractCode: string,
  contractName: string
) {
  try {
    console.log('Compiling the contract...');

    // Define node_modules dependencies
    const nodeModulesDir = path.resolve(process.cwd(), 'node_modules');
    const nodeModules = {
      '@openzeppelin/contracts': path.join(nodeModulesDir, '@openzeppelin', 'contracts'),
      '@forma-dev/sdk': path.join(nodeModulesDir, '@forma-dev', 'sdk'),
    };

    const remappings = [
      '@openzeppelin/contracts/=node_modules/@openzeppelin/contracts/',
      '@forma-dev/sdk/contracts/=node_modules/@forma-dev/sdk/contracts/',
    ];

    // Check if dependencies exist
    for (const [pkg, pkgPath] of Object.entries(nodeModules)) {
      if (!fs.existsSync(pkgPath)) {
        console.warn(`Warning: Path not found for ${pkg}: ${pkgPath}`);
      } else {
        console.log(`${pkg} path verified: ${pkgPath}`);
      }
    }

    // Compile the contract
    const compiledContract = compile(contractCode, contractName, {
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
  } catch (error) {
    console.error('An error occurred during compilation:');
    console.error(error);
    throw error;
  }
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/compile', (req: Request, res: Response) => {
  res.send({ message: 'TypeScript ile Express API çalışıyor!' });
});

app.post('/deploy', (req: Request, res: Response) => {
  const { name } = req.body;
  res.send({ message: `Merhaba, ${name}!` });
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor...`);
});
