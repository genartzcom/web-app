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
exports.process = process;
const acorn = __importStar(require("acorn"));
const walk = __importStar(require("acorn-walk"));
function process(code) {
    const ast = acorn.parse(code, { ecmaVersion: 2020 });
    const removalRanges = [];
    walk.simple(ast, {
        VariableDeclaration(node) {
            if (node.declarations.some((dec) => dec.init && dec.init.type === 'CallExpression' && dec.init.callee.name === 'FormaCollection')) {
                removalRanges.push({ start: node.start, end: node.end });
            }
        },
    });
    removalRanges.sort((a, b) => b.start - a.start);
    let modifiedCode = code;
    removalRanges.forEach((range) => {
        modifiedCode = modifiedCode.slice(0, range.start) + modifiedCode.slice(range.end);
    });
    return modifiedCode;
}
