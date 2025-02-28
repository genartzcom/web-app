import Divider from '@/components/Divider';
import Hero from '@/components/marketplace/Hero';
import Latest from '../../components/marketplace/LatestGenerations';
import Collections from '../../components/marketplace/Collections';
import CreateSection from '@/components/marketplace/CreateSection';

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
