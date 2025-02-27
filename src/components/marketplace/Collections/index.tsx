import { Suspense } from 'react';
import Loading from '@/components/marketplace/Collections/Loading';
import Items from '@/components/marketplace/Collections/Items';

const Index = () => {
  return (
    <div id="latest" className="w-full max-w-[1400px]">
      <div className="flex w-full flex-col gap-4 border-x border-neutral-600 p-8 py-32">
        <p className="text-[32px] font-medium">Modularium Collections</p>
        <Suspense fallback={<Loading />}>
          <Items />
        </Suspense>
      </div>
    </div>
  );
};

export default Index;
