'use client';

import Image from 'next/image';
import Button from '@/components/ui/Button';
import ConnectWallet from '@/components/ConnectWallet';
import { useAccount } from 'wagmi';

const Navigation = () => {
  const { isConnected, address } = useAccount();

  return (
    <div className="fixed top-0 flex w-full justify-center">
      <div className={'flex w-full max-w-[1400px] items-center justify-between px-4 py-6'}>
        <div className={'flex items-center gap-4'}>
          <Image src={'/media/logo.svg'} alt={'logo'} height={40} width={40} />
          <p className={'text-[28px] font-semibold'}>GenArtz</p>
        </div>
        <div className={'flex items-center gap-3'}>
          <ConnectWallet />
          {isConnected && (
            <Button variant={'secondary'} href={'/create'}>
              <i className="ri-add-line" />
              Create
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
