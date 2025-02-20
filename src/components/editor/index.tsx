'use client';
import { useState } from 'react';

import Link from 'next/link';
import Console from './Console';
import TextEditor from '@/components/editor/TextEditor';

const Editor = () => {
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState<'code' | 'metadata'>('code');

  return (
    <div className="flex h-full w-full overflow-hidden">
      <div className={'flex w-64 flex-none flex-col border-r border-neutral-600'}>
        {/* Back Button */}
        <div className={'flex h-16 w-full items-center border-b border-neutral-600 px-6 text-[24px] text-neutral-400'}>
          <Link href={''}>
            <i className={'ri-arrow-left-line'} />
          </Link>
        </div>

        {/* Side Navigation */}
        <div className={'flex flex-col'}>
          <button
            className={`flex cursor-pointer items-center gap-1 px-6 py-3 font-medium transition ${activeTab === 'code' ? 'bg-neutral-600 text-neutral-200' : 'text-neutral-300/75 hover:bg-neutral-700'}`}
            onClick={() => setActiveTab('code')}
          >
            <i className="ri-file-code-line" />
            <p>generation-code.p5.js</p>
          </button>
          <button
            className={`flex cursor-pointer items-center gap-1 px-6 py-3 font-medium transition ${activeTab === 'metadata' ? 'bg-neutral-600 text-neutral-200' : 'text-neutral-300/75 hover:bg-neutral-700'}`}
            onClick={() => setActiveTab('metadata')}
          >
            <i className="ri-file-code-line" />
            <p>metadata.yml</p>
          </button>
          <Link
            href={'/'}
            target={'_blank'}
            className={'flex cursor-pointer items-center gap-1 px-6 py-3 font-medium text-neutral-300/75 transition hover:bg-neutral-700'}
          >
            <i className="ri-file-code-line" />
            <p>docs.link</p>
          </Link>
        </div>
      </div>

      {/* Editor Section */}
      <div className={'relative flex w-full flex-col bg-neutral-700'}>
        {/* Editor Header */}
        <div className={'flex h-16 w-full flex-none items-center gap-4 border-b border-neutral-600 bg-neutral-800 px-6'}>
          <div className={'flex items-center gap-1 font-medium text-neutral-300'}>
            <i className="ri-file-code-line" />
            <p>{activeTab === 'code' ? 'generation-code.p5.js' : 'metadata.yml'}</p>
          </div>
        </div>
        <div className={'h-full w-full px-4 pt-8'}>
          {activeTab === 'code' ? (
            <TextEditor content={content} setContent={setContent} />
          ) : (
            <div className="text-neutral-300">Metadata content will be here.</div>
          )}
        </div>
        <Console />
      </div>
    </div>
  );
};

export default Editor;
