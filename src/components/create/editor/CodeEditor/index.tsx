'use client';
import { useState, useRef, useEffect } from 'react';

import Console from './Console';
import Sidebar from './SideNavigation';
import TextEditor from '@/components/create/editor/CodeEditor/TextEditor';
import Button from '@/components/ui/Button';
import Metadata from '@/components/create/editor/CodeEditor/Metadata';

import { useCreateStore } from '@/store/createStore';

const Editor = () => {
  const { code, setCode, setError } = useCreateStore();

  const [content, setContent] = useState(code);
  const [activeTab, setActiveTab] = useState<'code' | 'metadata'>('code');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setContent(e.target?.result as string);
      };
      reader.readAsText(file);
    }
    event.target.value = '';
  };

  const handleRunClick = async  () => {
    setError(null);

    const response = await fetch(`/api/editor/p5compile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: content }),
    });

    if(!response.ok) {
      setError('Failed to compile code');
      return;
    }

    const { code } = await response.json();

    const fromBase64 = Buffer.from(code, 'base64').toString('utf-8');

    setCode(fromBase64);

    try {
      eval(`${fromBase64}`);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      setError(event.message);
      return true;
    };

    window.addEventListener('error', handleGlobalError);

    const originalConsoleError = console.error;
    console.error = (...args: any[]) => {
      setError(args.join(' '));
      originalConsoleError(...args);
    };

    return () => {
      window.removeEventListener('error', handleGlobalError);
      console.error = originalConsoleError;
    };
  }, [setError]);

  return (
    <div className="flex h-full w-full max-w-[50vw] min-w-[720px]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="relative flex h-full w-full flex-col overflow-hidden bg-neutral-700">
        <div className="flex h-16 w-full flex-none items-center gap-4 border-b border-neutral-600 bg-neutral-800 px-6">
          <div className="flex items-center gap-1 font-medium text-neutral-300">
            <i className="ri-file-code-line" />
            <p>{activeTab === 'code' ? 'generation-code.p5.js' : 'metadata.yml'}</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <input type="file" accept=".js" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
            <Button size={'sm'} variant={'secondary'} onClick={handleImportClick}>
              Import
              <i className="ri-import-fill font-normal" />
            </Button>
            <Button size={'sm'} variant={'primary'} onClick={handleRunClick}>
              Run
              <i className="ri-play-fill font-normal" />
            </Button>
          </div>
        </div>
        <div className="h-full w-full max-w-[100%]">
          {activeTab === 'code' ? <TextEditor content={content} setContent={setContent} /> : <Metadata />}
        </div>
        <Console />
      </div>
    </div>
  );
};

export default Editor;
