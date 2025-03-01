'use client';

import { Suspense, useEffect } from 'react';
import Profile from '@/components/marketplace/profile';
import { useAppKitAccount } from '@reown/appkit/react';
import router from 'next/navigation';

export default function ProfilePage() {
  const { isConnected } = useAppKitAccount();

  useEffect(() => {
    if (!isConnected) {
      router.redirect('/');
    }
  }, [isConnected, router]);

  return (
    <div className={'flex w-full flex-col items-center py-52'}>
      <div className={'w-full max-w-[1400px]'}>
        <Suspense fallback={<p>loading...</p>}>
          <Profile />
        </Suspense>
      </div>
    </div>
  );
}
