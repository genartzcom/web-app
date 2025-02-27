import CollectionCard from '@/components/home/CollectionCard';

type Collection = {
  id: string;
  title: string;
  creator: string;
  imageSrc: string;
  totalMinted: number;
  floorPrice: number;
};

const fetchCollections = async (): Promise<Collection[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/collections/modularium`);
    if (!res.ok) throw new Error('Failed to fetch modularium');
    return res.json();
  } catch (error) {
    console.error('Error fetching modularium:', error);
    return [];
  }
};

const Items = async () => {
  const collections = await fetchCollections();

  return (
    <div className="grid grid-cols-3 items-stretch gap-8 max-lg:grid-cols-2 max-md:grid-cols-1">
      {collections.map((collection) => (
        <CollectionCard key={collection.id} {...collection} />
      ))}
    </div>
  );
};

export default Items;
