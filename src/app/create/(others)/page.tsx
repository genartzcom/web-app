import Image from 'next/image';
import Link from 'next/link';

export default function CreatePage() {
  return (
    <div className={'flex h-full w-full flex-col items-center justify-center gap-8'}>
      <div className={'flex flex-col items-center'}>
        <p className={'text-[36px] leading-[44px] font-semibold'}>Start Reflecting Your Art</p>
        <p className={'font-medium text-neutral-300'}>Unleash Your Creativity and Inspire the World</p>
      </div>
      <div className={'flex h-60 w-full max-w-[732px] items-center gap-4'}>
        <div className={'group h-full w-full'}>
          <Link
            href={'/create/customize'}
            className={
              'group relative flex h-full w-full flex-col items-center justify-center gap-1 overflow-hidden rounded-[16px] border border-neutral-100/4 bg-neutral-100/4 px-5'
            }
          >
            <Image
              className={'absolute z-[-1] h-full w-full object-cover opacity-0 transition duration-300 ease-in-out group-hover:opacity-[6%]'}
              src={'/media/images/create/from-scratch.png'}
              width={442}
              height={248}
              alt={'clone'}
              draggable={false}
            />
            <div className={'flex items-center gap-1 text-[24px]'}>
              <i className="ri-code-s-slash-line" />
              <p>From Scratch</p>
            </div>
            <p className={'text-center text-sm text-pretty text-neutral-400 mix-blend-plus-lighter'}>
              Write your own p5.js code and create unique collections
            </p>
          </Link>
          <Image
            className={
              'absolute top-0 left-0 z-[-10] h-full w-full scale-200 object-cover opacity-0 blur-[32px] transition duration-300 ease-in-out group-hover:opacity-5'
            }
            src={'/media/images/create/from-scratch.png'}
            width={442}
            height={248}
            alt={'from scratch'}
            draggable={false}
          />
        </div>
        <div className={'group h-full w-full'}>
          <Link
            href={'/create/customize'}
            className={
              'group relative flex h-full w-full flex-col items-center justify-center gap-1 overflow-hidden rounded-[16px] border border-neutral-100/4 bg-neutral-100/4 px-5'
            }
          >
            <Image
              className={'absolute z-[-1] h-full w-full object-cover opacity-0 transition duration-300 ease-in-out group-hover:opacity-[6%]'}
              src={'/media/images/create/clone.png'}
              width={442}
              height={248}
              alt={'from scratch'}
              draggable={false}
            />
            <div className={'flex items-center gap-1 text-[24px]'}>
              <i className="ri-file-copy-line" />
              <p>Fork Collection</p>
            </div>
            <p className={'text-center text-sm text-pretty text-neutral-400 mix-blend-plus-lighter'}>
              Recreate an existing collection with your own style
            </p>
          </Link>
          <Image
            className={
              'absolute top-0 left-0 z-[-10] h-full w-full scale-200 object-cover opacity-0 blur-[32px] transition duration-300 ease-in-out group-hover:opacity-5'
            }
            src={'/media/images/create/clone.png'}
            width={442}
            height={248}
            alt={'from scratch'}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
