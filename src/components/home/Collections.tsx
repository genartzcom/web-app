import CollectionCard from '@/components/home/CollectionCard';

const Collections = () => {
  return (
    <div id={'latest'} className={'w-full max-w-[1400px]'}>
      <div className={'flex w-full flex-col gap-4 border-x border-neutral-600 p-8 py-32'}>
        <p className={'text-[32px] font-medium'}>Modularium Collections</p>
        <div className={'grid grid-cols-3 items-stretch gap-8 max-lg:grid-cols-2 max-md:grid-cols-1'}>
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
        </div>
      </div>
    </div>
  );
};

export default Collections;
