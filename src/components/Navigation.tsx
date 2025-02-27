'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import ConnectWallet from '@/components/ConnectWallet';
import { useAccount } from 'wagmi';
import Link from 'next/link';

const Navigation = () => {
  const { isConnected } = useAccount();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 z-[9999] flex w-full justify-center transition-all duration-300 ${scrolled ? 'bg-neutral-800/50 drop-shadow-2xl backdrop-blur-[32px]' : 'bg-transparent'}`}
    >
      <div className="flex w-full max-w-[1400px] items-center justify-between px-4 py-6">
        <Link href={'/'} className="flex items-center gap-4">
          <Image src="/media/logo.svg" alt="logo" height={40} width={40} />
          <p className="text-[28px] font-semibold">GenArtz</p>
        </Link>
        <div className="flex items-center gap-3">
          <ConnectWallet />
          {isConnected && (
            <Button external variant="secondary" href="/create">
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
