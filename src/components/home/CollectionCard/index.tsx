import Image from 'next/image';
import Link from 'next/link';

type NftCardProps = {
  href?: string;
  imageSrc?: string;
  title?: string;
  creator?: string;
  totalMinted?: number;
  floorPrice?: number;
};

const NftCard: React.FC<NftCardProps> = ({
  href = '/',
  imageSrc = '/media/images/placeholder.jpg',
  title = 'NftTitle',
  creator = 'ardasari.eth',
  totalMinted = 4999,
  floorPrice = 3.5,
}) => {
  return (
    <Link href={href} className={'flex h-full w-full flex-col gap-3 rounded-lg bg-neutral-600 p-4 transition duration-150 active:scale-[98%]'}>
      <Image className={'aspect-square w-full rounded-md'} src={imageSrc} width={400} height={400} alt={title} />
      <div className={'flex flex-col leading-none'}>
        <p className={'text-[24px] font-medium'}>{title}</p>
        <p className={'text-[16px]'}>{creator}</p>
      </div>
      <div className={'h-[1px] w-full rounded-full bg-neutral-500'}></div>
      <div className={'flex items-end gap-3'}>
        <div className={'flex flex-col gap-1'}>
          <p className={'text-neutral-200'}>Total Minted</p>
          <p className={'text-[32px] font-medium'}>{totalMinted}</p>
        </div>
        <div className={'ml-auto flex flex-col items-end gap-1'}>
          <p className={'text-neutral-200'}>Floor</p>
          <p className={'text-[32px] font-medium'}>{floorPrice} TIA</p>
        </div>
      </div>
    </Link>
  );
};

export default NftCard;
