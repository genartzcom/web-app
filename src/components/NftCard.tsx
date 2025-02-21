import Image from 'next/image';

const NftCard = () => {
  return (
    <div className="flex w-full max-w-[440px] flex-col gap-2 rounded-[24px] border border-neutral-500 bg-neutral-700 p-4 py-4">
      <div className={'flex items-center gap-1 pl-1 text-[20px] font-medium'}>
        <p>Title will be here</p>
        <p className={'font-semibold text-neutral-400'}>#1234</p>
      </div>
      <div className={'aspect-square w-full overflow-hidden rounded-[12px] select-none'}>
        <Image src={'/media/images/placeholder.jpg'} className={'h-full w-full bg-center object-cover'} width={500} height={500} alt={'nft image'} />
      </div>
      <div className={'mt-2 flex flex-col gap-1 pl-1'}>
        <p className={'text-[14px] leading-[16px] text-neutral-400'}>
          The collectibles that started it all. Doodles Original Collection features 10,000 characters created
        </p>
        <p className={'text-[24px] font-semibold'}>120 ETH</p>
      </div>
    </div>
  );
};

export default NftCard;
