import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { compileContract } from './contract.compiler';
import { analyzeCode } from './analyze';
import { generateSolidityContract } from './finalize';

import fs from 'fs';

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

app.post('/deploy', async (req: Request, res: Response) => {
  const { address, title, description, price, supply, code } = req.body;


  const { analyze, contract, compiledContract } = await precompile(code);

  res.status(200).json({
    analyze,
    contract,
    compiledContract,
  });
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor...`);
});
