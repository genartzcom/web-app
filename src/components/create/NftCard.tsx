import Image from 'next/image';

type NftCardProps = {
  title?: string;
  id?: number;
  imageUrl?: string;
  description?: string;
  price?: string;
};

const NftCard: React.FC<NftCardProps> = ({
  title = 'Title will be here',
  id = 1234,
  imageUrl = '/media/images/placeholder.jpg',
  description = 'The collectibles that started it all. Doodles Original Collection features 10,000 characters created',
  price = '120',
}) => {
  return (
    <div className="flex w-full max-w-[440px] flex-col gap-2 rounded-[24px] border border-neutral-500 bg-neutral-700 p-4 py-4">
      <div className="flex items-center gap-1 pl-1 text-[20px] font-medium">
        <p>{title}</p>
        <p className="font-semibold text-neutral-400">#{id}</p>
      </div>
      <div className="aspect-square w-full overflow-hidden rounded-[12px] select-none">
        <Image src={imageUrl} className="h-full w-full bg-center object-cover" width={500} height={500} alt={title} />
      </div>
      <div className="mt-2 flex flex-col gap-1 pl-1">
        <p className="text-[14px] leading-[16px] text-neutral-400">{description}</p>
        <p className="text-[24px] font-semibold">{price} TIA</p>
      </div>
    </div>
  );
};

export default NftCard;
