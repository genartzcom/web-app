export function compile(sourceCodeOrPath: any, contractName: any, options?: {}): {
    abi: any;
    bytecode: any;
    deployedBytecode: any;
    metadata: any;
};
export function deploy(compiledContract: any, constructorArgs?: any[], deployOptions?: {}): Promise<{
    contract: ethers.BaseContract & {
        deploymentTransaction(): ethers.ContractTransactionResponse;
    } & Omit<ethers.BaseContract, keyof ethers.BaseContract>;
    receipt: ethers.ContractTransactionReceipt | null;
    address: string | ethers.Addressable;
    deployTransaction: ethers.ContractTransactionResponse | null;
}>;
import { ethers } from "ethers";
