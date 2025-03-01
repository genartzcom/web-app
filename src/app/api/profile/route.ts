import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const wallet = searchParams.get('wallet');

    if (!wallet) {
      return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
    }

    const nftData = [
      {
        code: 'function setup() { createCanvas(400, 400); } function draw() { background(0); }',
        title: 'NFT Art #1',
        description: 'This is a sample NFT art piece.',
      },
      {
        code: 'function setup() { createCanvas(500, 500); } function draw() { background(100); }',
        title: 'NFT Art #2',
        description: 'Another unique NFT artwork.',
      },
    ];

    return NextResponse.json(nftData);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
