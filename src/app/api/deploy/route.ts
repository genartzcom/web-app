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
  console.log('Deploy Başlatıldı:', body);

  const id = randomUUID();

  return NextResponse.json({ id, message: 'Deploy işlemi başlatıldı.' });
}
