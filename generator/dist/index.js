"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const contract_compiler_1 = require("./contract.compiler");
const analyze_1 = require("./analyze");
const finalize_1 = require("./finalize");
const fs_1 = __importDefault(require("fs"));
const templateSolidity = fs_1.default.readFileSync('Example.sol', 'utf-8');
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 1337;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
async function precompile(p5) {
    const decodedP5 = Buffer.from(p5, 'base64').toString('utf-8');
    const analyze = (0, analyze_1.analyzeCode)(decodedP5);
    const contract = (0, finalize_1.generateSolidityContract)(decodedP5, templateSolidity);
    const compiledContract = await (0, contract_compiler_1.compileContract)(contract, 'NFTCollection');
    return {
        analyze,
        contract,
        compiledContract,
    };
}
app.post('/precompile', async (req, res) => {
    const { p5 } = req.body;
    const { analyze, contract, compiledContract } = await precompile(p5);
    res.status(200).json({
        analyze,
        contract,
        compiledContract,
    });
});
app.post('/deploy', async (req, res) => {
    const { p5 } = req.body;
});
app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor...`);
});
