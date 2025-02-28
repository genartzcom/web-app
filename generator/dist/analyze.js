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
exports.analyzeCode = analyzeCode;
const acorn = __importStar(require("acorn"));
const walk = __importStar(require("acorn-walk"));
function analyzeCode(code) {
    const ast = acorn.parse(code, { ecmaVersion: 2020 });
    const found_collections = [];
    const found_traits = [];
    walk.simple(ast, {
        VariableDeclarator(node) {
            if (node.init && node.init.type === 'CallExpression' && node.init.callee.name === 'FormaCollection') {
                const variableName = node.id.name;
                const firstArg = node.init.arguments[0];
                const stringParam = firstArg && firstArg.type === 'Literal' ? firstArg.value : null;
                found_collections.push({
                    name: variableName,
                    address: stringParam,
                });
            }
        },
    });
    walk.simple(ast, {
        CallExpression(node) {
            if (node.callee.type === 'MemberExpression' && ['asInt', 'asString', 'asFloat'].includes(node.callee.property.name)) {
                const traitType = node.callee.property.name;
                const innerNode = node.callee.object;
                if (innerNode.type === 'CallExpression' && innerNode.callee.type === 'MemberExpression' && innerNode.callee.property.name === 'metadata') {
                    const collectionName = innerNode.callee.object.name;
                    const keyArg = innerNode.arguments[0];
                    const keyValue = keyArg && keyArg.type === 'Literal' ? keyArg.value : null;
                    if (!found_traits.some((t) => t.collection === collectionName && t.key === keyValue)) {
                        found_traits.push({
                            collection: collectionName,
                            key: keyValue,
                            type: traitType,
                        });
                    }
                }
            }
        },
    });
    return {
        collections: found_collections,
        traits: found_traits,
    };
}
