import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { compileContract } from './contract.compiler';
import { analyzeCode } from './analyze';
import { generateSolidityContract } from './finalize';

import * as p5process from './process';
import fs from 'fs';
import { generateFormaCollectionCodes } from './trait.generator';

const templateSolidity = fs.readFileSync('Example.sol', 'utf-8');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1337;

app.use(express.json());
app.use(cors());

async function precompile(p5: string) {
  const decodedP5 = Buffer.from(p5, 'base64').toString('utf-8');
  const analyze = analyzeCode(decodedP5);
  const contract = generateSolidityContract(decodedP5, templateSolidity);
  const compiledContract = await compileContract(contract, 'NFTCollection');
  return {
    analyze,
    contract,
    compiledContract,
  };
}

app.post('/precompile', async (req: Request, res: Response) => {
  const { p5 } = req.body;
  const { analyze, contract, compiledContract } = await precompile(p5);
  res.status(200).json({
    analyze,
    contract,
    compiledContract,
  });
});

app.post('/p5compile', async (req: Request, res: Response) => {
  const { code } = req.body;

  const decodedP5 = Buffer.from(code, 'base64').toString('utf-8');

  const analyze = analyzeCode(decodedP5);

  const processedP5 = p5process.process(decodedP5);

  const header = generateFormaCollectionCodes(analyze.data);

  const toBase64 = Buffer.from(header + processedP5).toString('base64');

  res.status(200).json({
    code: toBase64,
  });
});

app.post('/deploy', async (req: Request, res: Response) => {
  const { address, title, description, price, supply, code } = req.body;

  const { analyze, contract, compiledContract } = await precompile(code);

  const contractBase64 = Buffer.from(contract).toString('base64');

  res.status(200).json({
    analyze,
    contract: contractBase64,
    compiledContract,
  });
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor...`);
});
