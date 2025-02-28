"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSolFields = generateSolFields;
const SOL_COLLECTION_FIELD = 'address private constant %FIELD% = %ADDRESS%;';
function generateSolFields(collections) {
    let code = '';
    for (let i = 0; i < collections.length; i++) {
        const collection = collections[i];
        code += SOL_COLLECTION_FIELD.replace('%FIELD%', collection.name).replace('%ADDRESS%', collection.address);
    }
    return code;
}
