'use client';

import React, { useEffect, useRef, useState } from 'react';

const Renderer: React.FC<{ code: string }> = ({ code }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [srcDoc, setSrcDoc] = useState<string>('');

  useEffect(() => {
    const iframeContent = `
      <html>
        <head>
        <style>
        body, html {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        main {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        canvas {
          width: 100% !important;
          height: 100% !important;
        }
        </style>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
        </head>
        <body>
          <main>
            <script>
              ${code}
            </script>
          </main>
        </body>
      </html>
    `;
    setSrcDoc(iframeContent);
  }, [code]);

  return (
    <div className="aspect-square h-full w-full overflow-hidden rounded-lg bg-neutral-200">
      <iframe
        ref={iframeRef}
        srcDoc={srcDoc}
        title="p5.js Renderer"
        width="512"
        height="512"
        frameBorder="0"
        scrolling="no"
        className="h-full w-full"
      />
    </div>
  );
};

export default Renderer;
