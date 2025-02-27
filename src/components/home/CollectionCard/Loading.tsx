const Loading = () => {
  return (
    <div className={'flex h-full w-full flex-col gap-3 rounded-lg bg-neutral-600 p-4 transition duration-150 active:scale-[98%]'}>
      <div className={'aspect-square w-full animate-pulse rounded-md bg-neutral-500'} />
      <div className={'flex flex-col gap-3 leading-none'}>
        <p className={'h-6 w-3/4 animate-pulse rounded bg-neutral-500 text-[24px] font-medium'}></p>
        <p className={'h-5 w-1/2 animate-pulse rounded bg-neutral-500 text-[16px]'}></p>
      </div>
      <div className={'h-[1px] w-full rounded-full bg-neutral-500'}></div>
      <div className={'flex items-end gap-3'}>
        <div className={'flex flex-col gap-1'}>
          <p className={'h-4 w-2/3 animate-pulse rounded bg-neutral-500 text-neutral-200'}></p>
          <p className={'h-8 w-12 animate-pulse rounded bg-neutral-500 text-[32px] font-medium'}></p>
        </div>
        <div className={'ml-auto flex flex-col items-end gap-1'}>
          <p className={'h-4 w-2/3 animate-pulse rounded bg-neutral-500 text-neutral-200'}></p>
          <p className={'h-8 w-12 animate-pulse rounded bg-neutral-500 text-[32px] font-medium'}></p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
