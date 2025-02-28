'use client';

import { GodRays } from '@paper-design/shaders-react';
import Button from '@/components/ui/Button';

const Hero = () => {
  return (
    <div className="relative flex h-screen min-h-[800px] w-full items-center justify-center">
      <div className={'pointer-events-none h-full w-full'}>
        <div className={'h-full w-full overflow-hidden'}>
          <GodRays
            colorBack="#0d0d0d"
            color1="#6669ff"
            color2="#66ffb3"
            color3="#66ccff"
            speed={1}
            spotty={1}
            offsetX={0}
            offsetY={2}
            density={0}
            midSize={0}
            frequency={12}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div className={'absolute top-0 left-0 z-10 h-full w-full bg-gradient-to-t from-transparent to-neutral-800 opacity-50'}></div>
        <div className={'absolute bottom-0 left-0 z-[11] h-1/2 w-full bg-gradient-to-b from-transparent to-neutral-800 opacity-50'}></div>
      </div>
      <div className={'absolute z-[100] flex flex-col items-center justify-center gap-8'}>
        <div className={'flex flex-col items-center gap-2 leading-none'}>
          <p className={'max-w-[800px] text-center text-[52px] font-semibold capitalize'}>The One-Stop Shop for Generative Art Collections</p>
        </div>
        <div className={'flex items-center gap-2'}>
          <Button href={'#latest'} variant={'secondary'}>
            Explore GenArtz
          </Button>
          <Button external href={'/create'}>
            Create Your Own
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
