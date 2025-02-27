import Divider from '@/components/Divider';
import Hero from '@/components/home/Hero';
import LatestGenerations from '@/components/home/LatestGenerations';
import Collections from '@/components/home/Collections';
import CreateSection from '@/components/home/CreateSection';

export default function Home() {
  return (
    <div className={'flex w-full flex-col items-center'}>
      <Hero />
      <Divider />
      <LatestGenerations />
      <Divider />
      <CreateSection />
      <Divider />
      <Collections />
    </div>
  );
}
