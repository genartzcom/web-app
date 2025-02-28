import * as zlib from 'zlib';

export function compress(originalCode: string, chunkSize: number): string[] {
  const compressed: Buffer = zlib.gzipSync(originalCode);
  const base64: string = compressed.toString('base64');
  const chunks: string[] = [];
  for (let i = 0; i < base64.length; i += chunkSize) {
    chunks.push(base64.substring(i, i + chunkSize));
  }
  return chunks;
}

export function decompress(chunks: string[]): string {
  const base64: string = chunks.join('');
  const compressed: Buffer = Buffer.from(base64, 'base64');
  return zlib.gunzipSync(compressed).toString();
}
