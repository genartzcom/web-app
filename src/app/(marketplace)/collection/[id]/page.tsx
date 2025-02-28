import Details from '@/components/marketplace/Collection/Details';
import DetailsLoading from '@/components/marketplace/Collection/Details/Loading';
import { Suspense } from 'react';

export default async function CollectionPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return (
    <div className={'flex w-full flex-col items-center py-52'}>
      <div className={'w-full max-w-[1400px]'}>
        <Suspense fallback={<DetailsLoading />}>
          <Details params={params} />
        </Suspense>
      </div>
    </div>
  );
}
