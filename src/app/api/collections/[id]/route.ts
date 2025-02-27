import { NextResponse } from 'next/server';

const collections = [
  {
    id: '1',
    title: 'Collection One',
    creator: 'Creator One',
    description: 'This is a description for collection one.',
    price: '10',
    totalMinted: 500,
    maxSupply: 1000,
    code: 'code-for-collection-one',
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

export async function GET(req, { params }) {
  const { id } = params;

  const collection = collections.find((col) => col.id === id);

  if (!collection) {
    return NextResponse.json({ message: 'Collection not found' }, { status: 404 });
  }

  return NextResponse.json(collection);
}
