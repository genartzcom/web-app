import Details from '@/components/marketplace/Collection/Details';
import DetailsLoading from '@/components/marketplace/Collection/Details/Loading';
import { Suspense } from 'react';

export default async function CollectionPage({ params }: { params: { id: string } }) {
  return (
    <div className={'flex w-full flex-col items-center py-52'}>
      <div className={'w-full max-w-[1400px]'}>
        <Suspense fallback={<DetailsLoading />}>
          <Details id={params.id} />
        </Suspense>
      </div>
    </div>
  );
}
