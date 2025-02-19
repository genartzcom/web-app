import Link from 'next/link';
import Console from './Console';

const Editor = () => {
  return (
    <div className="flex h-full w-full overflow-hidden">
      <div className={'flex w-64 flex-none flex-col border-r border-neutral-600'}>
        <div className={'flex h-16 w-full items-center border-b border-neutral-600 px-6 text-[24px] text-neutral-400'}>
          <Link href={''}>
            <i className={'ri-arrow-left-line'} />
          </Link>
        </div>
        <div className={'flex flex-col'}>
          <button className={'flex cursor-pointer items-center gap-1 bg-neutral-600 px-6 py-3 font-medium text-neutral-200'}>
            <i className="ri-file-code-line" />
            <p>generation-code.p5.js</p>
          </button>
          <button className={'flex cursor-pointer items-center gap-1 px-6 py-3 font-medium text-neutral-300/75 transition hover:bg-neutral-700'}>
            <i className="ri-file-code-line" />
            <p>metadata.yml</p>
          </button>
          <button className={'flex cursor-pointer items-center gap-1 px-6 py-3 font-medium text-neutral-300/75 transition hover:bg-neutral-700'}>
            <i className="ri-file-code-line" />
            <p>docs.link</p>
          </button>
        </div>
      </div>
      <div className={'relative flex w-full flex-col bg-neutral-700'}>
        <div className={'flex h-16 w-full flex-none items-center gap-4 border-b border-neutral-600 bg-neutral-800 px-6'}>
          <div className={'flex items-center gap-1 font-medium text-neutral-300'}>
            <i className="ri-file-code-line" />
            <p>generation-code.p5.js</p>
          </div>
        </div>
        <div className={'h-full w-full px-4 pt-8'}>Code</div>
        <Console />
      </div>
    </div>
  );
};

export default Editor;
