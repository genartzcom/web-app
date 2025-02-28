const zlib = require('zlib');

export function compress(originalCode, chunkSize) {
  const compressed = zlib.gzipSync(originalCode);
  const base64 = compressed.toString('base64');
  const chunks = [];
  for (let i = 0; i < base64.length; i += chunkSize) {
    chunks.push(base64.substring(i, i + chunkSize));
  }
  return chunks;
}

export function decompress(chunks) {
  const base64 = chunks.join('');
  const compressed = Buffer.from(base64, 'base64');
  return zlib.gunzipSync(compressed).toString();
}