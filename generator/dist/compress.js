"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compress = compress;
exports.decompress = decompress;
function compress(originalCode, chunkSize) {
    const base64 = Buffer.from(originalCode, 'utf-8').toString('base64');
    const chunks = [];
    for (let i = 0; i < base64.length; i += chunkSize) {
        chunks.push(base64.substring(i, i + chunkSize));
    }
    return chunks;
}
function decompress(chunks) {
    const base64 = chunks.join('');
    return Buffer.from(base64, 'base64').toString('utf-8');
}
