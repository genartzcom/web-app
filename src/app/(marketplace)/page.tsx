import Divider from '@/components/Divider';
import Hero from '@/components/home/Hero';
import Latest from '@/components/home/LatestGenerations';
import Collections from '@/components/home/Collections';
import CreateSection from '@/components/home/CreateSection';

import { Suspense } from 'react';

export default function Home() {
  return (
    <div className={'flex w-full flex-col items-center'}>
      <Hero />
      <Divider />
      <Latest />
      <Divider />
      <CreateSection />
      <Divider />
      <Collections />
    </div>
  );
}
