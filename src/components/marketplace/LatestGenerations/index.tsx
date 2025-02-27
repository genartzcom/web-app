import Items from './Items';
import Loading from './Loading';
import { Suspense } from 'react';

const Index = async () => {
  return (
    <div id="latest" className="w-full max-w-[1400px]">
      <div className="flex w-full flex-col gap-4 border-x border-neutral-600 p-8 py-32">
        <p className="text-[32px] font-medium">Latest Generations</p>
        <Suspense fallback={<Loading />}>
          <Items />
        </Suspense>
      </div>
    </div>
  );
};

export default Index;
