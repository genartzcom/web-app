const Renderer = () => {
  return (
    <div className={'aspect-square rounded-[24px] border border-neutral-500 bg-neutral-600 p-3'}>
      <div className={'h-full w-full overflow-hidden rounded-[12px] border border-neutral-500 bg-neutral-700'}>
        <div className={'h-64 w-64'}></div>
      </div>
    </div>
  );
};

export default Renderer;
