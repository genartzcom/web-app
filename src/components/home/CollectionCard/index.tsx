import Image from 'next/image';
import Link from 'next/link';

const Index = () => {
  return (
    <Link href={'/'} className={'flex h-full w-full flex-col gap-3 rounded-lg bg-neutral-600 p-4 transition duration-150 active:scale-[98%]'}>
      <Image className={'aspect-square w-full rounded-md'} src={'/media/images/placeholder.jpg'} width={400} height={400} alt={'image'} />
      <div className={'flex flex-col leading-none'}>
        <p className={'text-[24px] font-medium'}>NftTitle</p>
        <p className={'text-[16px]'}>ardasari.eth</p>
      </div>
      <div className={'h-[1px] w-full rounded-full bg-neutral-500'}></div>
      <div className={'flex items-end gap-3'}>
        <div className={'flex flex-col gap-1'}>
          <p className={'text-neutral-200'}>Total Minted</p>
          <p className={'text-[32px] font-medium'}>4999</p>
        </div>
        <div className={'ml-auto flex flex-col items-end gap-1'}>
          <p className={'text-neutral-200'}>Floor</p>
          <p className={'text-[32px] font-medium'}>3.5 TIA</p>
        </div>
      </div>
    </Link>
  );
};

export default Index;
