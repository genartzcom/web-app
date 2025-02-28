import { NextRequest, NextResponse } from 'next/server';

const collections = [
  {
    id: '1',
    title: 'Collection One',
    creator: 'Creator One',
    description: 'This is a description for collection one.',
    price: '10',
    totalMinted: 5000,
    maxSupply: 1000,
    code:
      'function setup() {\n' +
      '  createCanvas(400, 400);\n' +
      '  background(220);\n' +
      '}\n' +
      '\n' +
      'function draw() {\n' +
      '  fill(255, 0, 0);\n' +
      '  ellipse(mouseX, mouseY, 50, 50); // Mouse ile tıklanarak hareket eden kırmızı daire\n' +
      '}\n',
  },
  {
    id: '2',
    title: 'Collection Two',
    creator: 'Creator Two',
    description: 'This is a description for collection two.',
    price: '15',
    totalMinted: 200,
    maxSupply: 1000,
    code: 'code-for-collection-two',
  },
];

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const { id } = params;

    const collection = collections.find((col) => col.id === id);

    if (!collection) {
      return NextResponse.json({ message: `Collection with ID ${id} not found` }, { status: 404 });
    }

    return NextResponse.json(collection);
  } catch (error) {
    console.error('Error fetching collection:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
