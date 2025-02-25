import Link from 'next/link';

interface SideNavigationProps {
  activeTab: 'code' | 'metadata';
  setActiveTab: (tab: 'code' | 'metadata') => void;
}

const SideNavigation = ({ activeTab, setActiveTab }: SideNavigationProps) => {
  return (
    <div className="flex w-64 min-w-64 flex-none flex-col border-r border-neutral-600">
      <div className="flex h-16 w-full items-center border-b border-neutral-600 px-6 text-[24px] text-neutral-400">
        <Link href={'/create/customize'}>
          <i className="ri-arrow-left-line" />
        </Link>
      </div>
      <div className="flex flex-col">
        <button
          className={`flex cursor-pointer items-center gap-1 px-6 py-3 font-medium transition ${
            activeTab === 'code' ? 'bg-neutral-600 text-neutral-200' : 'text-neutral-300/75 hover:bg-neutral-700'
          }`}
          onClick={() => setActiveTab('code')}
        >
          <i className="ri-file-code-line" />
          <p>generation-code.p5.js</p>
        </button>
        <button
          className={`flex cursor-pointer items-center gap-1 px-6 py-3 font-medium transition ${
            activeTab === 'metadata' ? 'bg-neutral-600 text-neutral-200' : 'text-neutral-300/75 hover:bg-neutral-700'
          }`}
          onClick={() => setActiveTab('metadata')}
        >
          <i className="ri-file-code-line" />
          <p>metadata.yml</p>
        </button>
        <Link
          href={'/'}
          target={'_blank'}
          className="flex cursor-pointer items-center gap-1 px-6 py-3 font-medium text-neutral-300/75 transition hover:bg-neutral-700"
        >
          <i className="ri-external-link-line" />
          <p>docs.link</p>
        </Link>
      </div>
    </div>
  );
};

export default SideNavigation;
