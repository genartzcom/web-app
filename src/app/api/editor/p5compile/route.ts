import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

export async function POST(req: Request) {
  const body = await req.json();

  const { code } = body;

  const codeBase64 = Buffer.from(code).toString('base64');

  const response = await fetch(`${process.env.API_URL}/p5compile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: codeBase64 }),
  });

  const data = await response.json();

  return NextResponse.json({
    code: data.code
  });
}
