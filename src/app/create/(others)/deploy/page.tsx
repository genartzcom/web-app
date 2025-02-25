'use client';

import { useCreateStore } from '@/store/createStore';
import NftCard from '@/components/NftCard';
import Button from '@/components/ui/Button';

export default function DeployPage() {
  const { image, title, description, price, supply, code, error, isCompiled } = useCreateStore();

  return (
    <div className={'flex h-full w-full flex-col gap-8'}>
      <div>
        <p className={'text-[36px] leading-[44px] font-semibold'}>Deploy Collection</p>
        <p className={'font-medium text-neutral-300'}>Once your collection is minted you will not be able to change any of its information.</p>
      </div>
      <div className={'flex h-full w-full items-center gap-6'}>
        <div className={'flex w-full flex-col justify-center gap-5'}>
          <p className={'text-[24px] font-medium'}>Collection Details</p>
          <div className={'flex w-full min-w-fit items-center justify-center'}>
            <div className={'flex h-fit w-full flex-col gap-4 rounded-lg bg-neutral-700 p-6 text-[18px]'}>
              <div className={'flex items-center gap-2'}>
                <p className={'w-28 text-neutral-300'}>Title :</p>
                <p className={'text-neutral-100'}>{title || 'N/A'}</p>
              </div>
              <div className={'flex items-start gap-2'}>
                <p className={'w-28 flex-none text-neutral-300'}>Description :</p>
                <p className={'text-neutral-100'}>{description || 'N/A'}</p>
              </div>
              <div className={'flex items-center gap-2'}>
                <p className={'w-28 text-neutral-300'}>Price :</p>
                <p className={'text-neutral-100'}>{price || 'N/A'}</p>
              </div>
              <div className={'flex items-center gap-2'}>
                <p className={'w-28 text-neutral-300'}>Supply :</p>
                <p className={'text-neutral-100'}>{supply || 'N/A'}</p>
              </div>
            </div>
          </div>
          <div className={'flex items-center gap-2'}>
            <Button href={'/create/editor'} variant={'secondary'} size={'md'}>
              Back to Edit
            </Button>
            <Button size={'md'}>Deploy</Button>
          </div>
        </div>
        <div className={'flex w-full items-center justify-center'}>
          <NftCard
            title={title}
            imageUrl={image ? URL.createObjectURL(image) : '/media/images/placeholder.jpg'}
            description={description}
            id={supply}
            price={price.toString()}
          />
        </div>
      </div>
    </div>
  );
}
