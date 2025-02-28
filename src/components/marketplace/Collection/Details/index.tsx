import Button from '@/components/ui/Button';
import P5Renderer from '@/components/marketplace/Collection/P5Renderer';

type Collection = {
  id: string;
  title: string;
  creator: string;
  description: string;
  price: string;
  totalMinted: number;
  maxSupply: number;
  code: string;
};

type CollectionDetailsProps = {
  params: {
    id: string;
  };
};

const NotFound = ({ message }: { message: string }) => (
  <div className="flex h-[60vh] min-h-[600px] w-full flex-col items-center justify-center">
    <h2 className="text-2xl font-medium text-red-500">Collection Not Found</h2>
    <p className="text-neutral-300">{message}</p>
    <Button href={'/'} className={'mt-4'}>
      Back to Home
    </Button>
  </div>
);

const CollectionDetails = async ({ params }: CollectionDetailsProps) => {
  const { id } = await params;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/collections/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return (
        <NotFound message={res.status === 404 ? 'The requested collection could not be found.' : `Error fetching collection: ${res.statusText}`} />
      );
    }

    const collection: Collection = await res.json();

    return (
      <div className="flex h-full w-full items-center gap-4">
        <div className="flex w-full max-w-[500px] flex-col gap-3">
          <p className="text-[32px] font-medium">{collection.title}</p>
          <p className="text-neutral-300">{collection.description}</p>
          <p className="text-[16px] text-neutral-400">Created by: {collection.creator}</p>
          <div className="mt-8 flex items-center gap-8">
            <div className="flex flex-col gap-2 leading-none">
              <p className="font-medium text-neutral-300">Mint Price</p>
              <p className="text-[18px] font-medium">{collection.price} TEI</p>
            </div>
            <div className="flex flex-col gap-2 leading-none">
              <p className="font-medium text-neutral-300">Total Minted</p>
              <p className="text-[18px] font-medium">
                {collection.totalMinted} / {collection.maxSupply}
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
  } catch (error) {
    return <NotFound message="An unexpected error occurred while loading the collection." />;
  }
};

export default CollectionDetails;
