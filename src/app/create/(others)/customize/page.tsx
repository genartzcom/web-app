'use client';

import NftCard from '@/components/create/NftCard';
import ImageInput from '@/components/ui/ImageInput';
import TextInput from '@/components/ui/TextInput';
import Button from '@/components/ui/Button';
import NumberInput from '@/components/ui/NumberInput';
import { useCreateStore } from '@/store/createStore';
import { useState, useEffect } from 'react';

export default function CustomizePage() {
  const { image, title, description, price, supply, contracts, setImage, setTitle, setDescription, setPrice, setSupply, setContracts } =
    useCreateStore();

  const [newContract, setNewContract] = useState<string>('');

  useEffect(() => {
    if (!Array.isArray(contracts)) {
      console.warn('Contracts is not an array, resetting to empty array');
      setContracts([]);
    }
  }, [contracts, setContracts]);

  const handleUpload = (file: File | null) => {
    if (file) {
      setImage(file);
    }
  };

  const handleAddContract = () => {
    if (newContract.trim()) {
      if (Array.isArray(contracts)) {
        setContracts([...contracts, newContract.trim()]);
      } else {
        setContracts([newContract.trim()]);
      }
      setNewContract('');
    }
  };

  const handleRemoveContract = (contractToRemove: string) => {
    if (Array.isArray(contracts)) {
      setContracts(contracts.filter((contract) => contract !== contractToRemove));
    }
  };

  const isDisabled =
    !image || !title.trim() || !description.trim() || price <= 0 || supply <= 0 || !Array.isArray(contracts) || contracts.length === 0;

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
            <div className={'flex flex-col'}>
              <div className={'flex items-end gap-2'}>
                <TextInput label={'Collection contracts'} value={newContract} onChange={(e) => setNewContract(e.target.value)} />
                <Button size={'md'} variant={'secondary'} onClick={handleAddContract}>
                  Add
                </Button>
              </div>
              {Array.isArray(contracts) && contracts.length > 0 && (
                <div className={'mt-4'}>
                  <div className={'flex flex-col gap-2 px-6'}>
                    {contracts.map((contract, index) => (
                      <div key={index} className={'flex w-full items-center justify-between'}>
                        <span>{contract}</span>
                        <button
                          className={'flex aspect-square h-6 w-6 cursor-pointer items-center justify-center rounded-md bg-neutral-500'}
                          onClick={() => handleRemoveContract(contract)}
                        >
                          <i className="ri-close-line"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className={'flex items-center gap-8'}>
              <NumberInput decimal step={0.1} label="Price" max={999} min={0} value={price} onChange={(value) => setPrice(value)} />
              <NumberInput step={10} label="Supply" max={999} min={0} value={supply} onChange={(value) => setSupply(value)} />
            </div>
            <Button href={'/create/editor'} disabled={isDisabled}>
              Next Step
            </Button>
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
