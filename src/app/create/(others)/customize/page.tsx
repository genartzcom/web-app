'use client';

import NftCard from '@/components/NftCard';
import ImageInput from '@/components/ui/ImageInput';
import TextInput from '@/components/ui/TextInput';
import Button from '@/components/ui/Button';
import NumberInput from '@/components/ui/NumberInput';
import { useCreateStore } from '@/store/createStore';

export default function CustomizePage() {
  const { image, title, description, price, supply, setImage, setTitle, setDescription, setPrice, setSupply } = useCreateStore();

  const handleUpload = (file: File | null) => {
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className={'flex h-full w-full flex-col gap-8'}>
      <div>
        <p className={'text-[36px] leading-[44px] font-semibold'}>Customize Collection</p>
        <p className={'font-medium text-neutral-300'}>Once your collection is minted you will not be able to change any of its information.</p>
      </div>
      <div className={'flex h-full w-full items-center gap-8'}>
        <div className={'flex w-full items-center justify-center p-6'}>
          <div className={'flex max-w-[520px] flex-col gap-8'}>
            <ImageInput onUpload={handleUpload} />
            <TextInput label="Title" type="text" placeholder="Enter title here" value={title} onChange={(e) => setTitle(e.target.value)} />
            <TextInput
              label="Description"
              placeholder="Tell us all about your collection!"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className={'flex items-center gap-8'}>
              <NumberInput step={1} label="Price" max={999} min={0} value={price} onChange={(value) => setPrice(value)} />
              <NumberInput step={10} label="Supply" max={999} min={0} value={supply} onChange={(value) => setSupply(value)} />
            </div>
            <Button href={'/create/editor'}>Next Step</Button>
          </div>
        </div>
        <div className={'flex w-full items-center justify-center'}>
          <NftCard />
        </div>
      </div>
    </div>
  );
}
