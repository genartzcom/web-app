'use client';

import NftCard from '@/components/NftCard';
import ImageInput from '@/components/ui/ImageInput';

export default function CustomizePage() {
  const handleUpload = (file: File | null) => {
    if (file) {
      console.log('Yüklenen dosya:', file);
    }
  };
  return (
    <div className={'flex h-full w-full flex-col gap-8'}>
      <div>
        <p className={'text-[36px] leading-[44px] font-semibold'}>Customize Collection</p>
        <p className={'font-medium text-neutral-300'}>Once your collection is minted you will not be able to change any of its information.</p>
      </div>
      <div className={'flex h-full w-full items-center gap-8'}>
        <div className={'w-full'}>
          <ImageInput onUpload={handleUpload} />
        </div>
        <div className={'flex w-full items-center justify-center'}>
          <NftCard />
        </div>
      </div>
    </div>
  );
}
