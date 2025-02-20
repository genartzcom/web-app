const Renderer = () => {
  return (
    <div className={'aspect-square w-full max-w-[600px] rounded-[24px] border border-neutral-500 bg-neutral-600 p-3'}>
      <div className={'flex h-full w-full items-center justify-center rounded-[12px] bg-neutral-700'}>
        <p>Your generation will be shown here when you compile</p>
      </div>
    </div>
  );
};

export default Renderer;
