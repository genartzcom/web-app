'use client';

import { useEffect, useState } from 'react';
import { useAppKitAccount } from '@reown/appkit/react';
import P5Renderer from '@/components/marketplace/Collection/P5Renderer';

const Profile = () => {
  const { address } = useAppKitAccount();
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const delayedEffect = setTimeout(() => {
      const fetchNFTs = async () => {
        try {
          const response = await fetch(`/api/profile/?wallet=${address}`);
          if (!response.ok) throw new Error('Failed to fetch NFTs');
          const data = await response.json();
          setNfts(data);
        } catch (error) {
          console.error('Error fetching NFTs:', error);
        }
      };

      fetchNFTs();
    });
  }, [address]);

  return (
    <div className={'flex flex-col gap-16'}>
      <div className={'flex items-center gap-2 text-[32px]'}>
        <p className={'font-semibold'}>Profile:</p>
        <p className={'text-neutral-200'}>{address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Loading...'}</p>
      </div>
      <div className={'flex flex-col gap-3'}>
        <p className={'text-[20px] font-medium'}>My Arts</p>
        <div className={'grid grid-cols-3 items-stretch gap-8 max-lg:grid-cols-2 max-md:grid-cols-1'}>
          {nfts.length > 0 ? (
            nfts.map((nft, index) => (
              <div key={index} className={'flex w-full flex-col gap-2 rounded-2xl bg-neutral-700 p-4'}>
                <P5Renderer code={nft.code} />
                <div>
                  <p className={'text-[24px] font-medium'}>{nft.title}</p>
                  <p>{nft.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className={'text-neutral-400'}>No NFTs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
