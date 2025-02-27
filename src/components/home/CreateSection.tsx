import Image from 'next/image';
import Button from '@/components/ui/Button';

const CreateSection = () => {
  return (
    <div className={'w-full max-w-[1400px]'}>
      <div className={'flex w-full flex-col border-x border-neutral-600'}>
        <div
          className={
            'relative flex h-[400px] w-full flex-col items-start justify-center overflow-hidden px-32 leading-none max-lg:h-[300px] max-lg:px-16'
          }
        >
          <Image
            src={'/media/images/create/clone.png'}
            className={'pointer-events-none absolute z-[-1] h-full w-full scale-150 object-cover opacity-20 blur-lg select-none'}
            alt={'background'}
            width={429}
            height={240}
          />
          <div
            className={
              'pointer-events-none absolute top-0 right-0 z-10 flex h-full w-1/3 rotate-[25deg] items-center justify-center gap-4 transition select-none max-lg:right-[-100px] max-md:opacity-0'
            }
          >
            <div className={'flex flex-col gap-4'}>
              <Image className={'rounded-md'} src={'/media/images/dummy-nfts/1.png'} width={240} alt={'nft'} height={240} />
              <Image className={'rounded-md'} src={'/media/images/dummy-nfts/2.png'} width={240} alt={'nft'} height={240} />
              <Image className={'rounded-md'} src={'/media/images/dummy-nfts/3.png'} width={240} alt={'nft'} height={240} />
            </div>
            <div className={'flex flex-col gap-4'}>
              <Image className={'rounded-md'} src={'/media/images/dummy-nfts/4.png'} width={240} alt={'nft'} height={240} />
              <Image className={'rounded-md'} src={'/media/images/dummy-nfts/5.png'} width={240} alt={'nft'} height={240} />
              <Image className={'rounded-md'} src={'/media/images/dummy-nfts/6.png'} width={240} alt={'nft'} height={240} />
            </div>
          </div>
          <p className={'text-[32px] font-semibold tracking-wide italic'}>Show Your Creativity!</p>
          <p className={'mt-2 text-[18px] font-medium text-neutral-200'}>Create your own collection and do something with them idk</p>
          <Button external href={'/create'} className={'mt-4'} size={'lg'}>
            Create Your Own
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateSection;
