import Button from '@/components/ui/Button';
import P5Renderer from '@/components/marketplace/Collection/P5Renderer';

type Collection = {
  title: string;
  creator: string;
  price: number;
  supply: number;
  totalMinted: number;
  code: string;
};

const CollectionDetails = async () => {
  const collection: Collection = {
    title: 'Title Will Be Here',
    creator: 'Creator Name',
    price: 0.8,
    totalMinted: 123,
    supply: 456,
    code: 'p5js_code_here',
  };

  return (
    <div className="flex h-full w-full items-center gap-4">
      <div className="flex w-full max-w-[500px] flex-col gap-3">
        <p className="text-[32px] font-medium">{collection.title}</p>
        <p className="text-neutral-300">
          Over the past few months, I have been exploring programming with the guidance of AI models like Claude and ChatGPT. This journey has been
          both educational and transformative, pushing the boundaries of my creative process.
        </p>
        <div className="mt-8 flex items-center gap-8">
          <div className="flex flex-col gap-2 leading-none">
            <p className="font-medium text-neutral-300">Mint Price</p>
            <p className="text-[18px] font-medium">{collection.price} TEI</p>
          </div>
          <div className="flex flex-col gap-2 leading-none">
            <p className="font-medium text-neutral-300">Total Minted</p>
            <p className="text-[18px] font-medium">
              {collection.totalMinted} / {collection.supply}
            </p>
          </div>
        </div>
        <Button className="mt-8">Mint Now - {collection.price} TEI</Button>
      </div>
      <div className="ml-auto flex-none">
        <div className="aspect-square w-[512px] rounded-2xl bg-neutral-600 p-4">
          <P5Renderer code={collection.code} />
        </div>
      </div>
    </div>
  );
};

export default CollectionDetails;
