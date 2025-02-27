'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useCreateStore } from '@/store/createStore';

const Renderer: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { code, setError, error, setIsConsoleOpen } = useCreateStore();
  const [srcDoc, setSrcDoc] = useState<string>('');

  useEffect(() => {
    const iframeContent = `
      <html>
        <head>
        <style>
        body,html{
          width:100vw;
          height:100vh;
          overflow:hidden !important;
          margin: 0;
          padding: 0;
        }
        main{
          width:512px;
          height: 512px;
        }
        canvas{
          width: 100% !important;
          height: 100% !important;
          overflow: hidden !important;
        }
        </style>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
        </head>
        <body>
          <script>
            

            const originalConsoleLog = console.log;
            const originalConsoleError = console.error;

            console.log = function (...args) {
              window.parent.postMessage({ type: 'consoleLog', message: args.join(' ') }, '*');
              originalConsoleLog.apply(console, args);
            };

            console.error = function (...args) {
              window.parent.postMessage({ type: 'consoleError', message: args.join(' ') }, '*');
              originalConsoleError.apply(console, args);
            };

            try {
              ${code}
            } catch (e) {
              window.parent.postMessage({ type: 'error', message: e.message }, '*');
            }
          </script>
        </body>
      </html>
    `;

    setSrcDoc(iframeContent);

    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'error') {
        setError(event.data.message);
        setIsConsoleOpen(true);
      }
      if (event.data.type === 'consoleLog') {
        setError(event.data.message);
        setIsConsoleOpen(true);
      }
      if (event.data.type === 'consoleError') {
        setError(event.data.message);
        setIsConsoleOpen(true);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [code, setError]);

  return (
    <div className={'aspect-square rounded-[24px] border border-neutral-500 bg-neutral-600 p-3'}>
      <div className={'relative h-[512px] w-[512px] overflow-hidden rounded-[12px] border border-neutral-500 bg-neutral-700'}>
        <iframe ref={iframeRef} srcDoc={srcDoc} title="p5.js Renderer" width="512" height="512" frameBorder="0" scrolling="no" />
        {code.length < 2 && (
          <div className={'absolute top-0 left-0 flex h-full w-full items-center justify-center bg-neutral-700'}>
            Press run button to render the p5 code
          </div>
        )}
        {error && (
          <div className={'absolute top-0 left-0 flex h-full w-full items-center justify-center bg-neutral-700'}>
            Render failed. Check console for details
          </div>
        )}
      </div>
    </div>
  );
};

export default Renderer;
