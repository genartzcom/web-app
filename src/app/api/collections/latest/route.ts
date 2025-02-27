import { NextResponse } from 'next/server';

const latestCollections = [
  {
    id: '1',
    title: 'Cyber Apes',
    creator: 'ape_master.eth',
    imageSrc: '/media/images/dummy-nfts/1.png',
    totalMinted: 500,
    supply: 1000,
    price: 2.1,
  },
  {
    id: '2',
    title: 'Pixel Warriors',
    creator: 'pixel_knight.eth',
    imageSrc: '/media/images/dummy-nfts/2.png',
    totalMinted: 500,
    supply: 1000,
    price: 2.1,
  },
  {
    id: '3',
    title: 'Meta Dragons',
    creator: 'dragon_king.eth',
    imageSrc: '/media/images/dummy-nfts/3.png',
    totalMinted: 500,
    supply: 1000,
    price: 2.1,
  },
  {
    id: '4',
    title: 'Cyber Apes',
    creator: 'ape_master.eth',
    imageSrc: '/media/images/dummy-nfts/5.png',
    totalMinted: 500,
    supply: 1000,
    price: 2.1,
  },
  {
    id: '5',
    title: 'Pixel Warriors',
    creator: 'pixel_knight.eth',
    imageSrc: '/media/images/dummy-nfts/4.png',
    totalMinted: 500,
    supply: 1000,
    price: 2.1,
  },
  {
    id: '6',
    title: 'Meta Dragons',
    creator: 'dragon_king.eth',
    imageSrc: '/media/images/dummy-nfts/6.png',
    totalMinted: 500,
    supply: 1000,
    price: 2.1,
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET() {
  await delay(3000);
  return NextResponse.json(latestCollections);
}
