const Loading = () => {
  return (
    <div className="flex h-full w-full items-center gap-4">
      <div className="flex w-full max-w-[500px] flex-col gap-6">
        <div className={'flex flex-col gap-2 leading-none'}>
          <div className="h-8 w-[200px] animate-pulse rounded bg-neutral-700"></div>
          <div className="mt-2 h-4 w-full animate-pulse rounded bg-neutral-700"></div>
        </div>
        <div className="mt-8 flex items-center gap-8">
          <div className="flex flex-col gap-2 leading-none">
            <div className="h-6 w-[100px] animate-pulse rounded bg-neutral-700"></div>
          </div>
          <div className="flex flex-col gap-2 leading-none">
            <div className="h-6 w-[100px] animate-pulse rounded bg-neutral-700"></div>
          </div>
        </div>
        <div className="mt-8 h-12 w-[150px] animate-pulse rounded bg-neutral-700"></div>
      </div>
      <div className="ml-auto flex-none">
        <div className="aspect-square w-[512px] rounded-2xl bg-neutral-600 p-4">
          <div className="h-full w-full animate-pulse bg-neutral-700"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
