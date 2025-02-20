'use client';
import { useState } from 'react';

import Console from './Console';
import Sidebar from './SideNavigation';
import TextEditor from '@/components/editor/CodeEditor/TextEditor';
import Button from '@/components/ui/Button';

const Editor = () => {
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState<'code' | 'metadata'>('code');

  return (
    <div className="flex h-full w-full max-w-[50vw] min-w-[720px]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="relative flex h-full w-full flex-col overflow-hidden bg-neutral-700">
        <div className="flex h-16 w-full flex-none items-center gap-4 border-b border-neutral-600 bg-neutral-800 px-6">
          <div className="flex items-center gap-1 font-medium text-neutral-300">
            <i className="ri-file-code-line" />
            <p>{activeTab === 'code' ? 'generation-code.p5.js' : 'metadata.yml'}</p>
          </div>
          <div className={'ml-auto flex items-center gap-2'}>
            <Button size={'sm'} variant={'secondary'}>
              Import
              <i className="ri-import-fill font-normal" />
            </Button>
            <Button size={'sm'} variant={'primary'}>
              Run
              <i className="ri-play-fill font-normal" />
            </Button>
          </div>
        </div>
        <div className="h-full w-full max-w-[100%]">
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
