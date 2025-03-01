import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

export async function GET() {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(encoder.encode('data: deploying...\n\n'));

      await new Promise((resolve) => setTimeout(resolve, 3000));
      controller.enqueue(encoder.encode('data: deploying...\n\n'));

      await new Promise((resolve) => setTimeout(resolve, 3000));
      controller.enqueue(encoder.encode('data: deploying...\n\n'));

      await new Promise((resolve) => setTimeout(resolve, 3000));
      controller.enqueue(encoder.encode('data: deployed!\n\n'));

      controller.close();
    },
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}

export async function POST(req: Request) {
  const body = await req.json();

  const { code } = body;

  console.log('Deploy Başlatıldı:', body);

  const codeBase64 = Buffer.from(code).toString('base64');

  console.log('Code:', codeBase64);

  const response = await fetch(`${process.env.API_URL}/deploy`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: codeBase64 }),
  });

  const { contract } = await response.json();

  console.log('Contract:', contract);

  const id = randomUUID();

  return NextResponse.json({ id, message: 'Deploy işlemi başlatıldı.', response });
}
