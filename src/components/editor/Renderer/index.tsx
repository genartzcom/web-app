'use client';

import React, { useState, useEffect, useRef } from 'react';
import p5 from 'p5';

import { useCreateStore } from '@/store/createStore';

const Renderer: React.FC = () => {
  const sketchRef = useRef<p5 | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { code, setError, error } = useCreateStore();

  useEffect(() => {
    setError(null);

    if (sketchRef.current) {
      sketchRef.current.remove();
      sketchRef.current = null;
    }

    if (containerRef.current) {
      try {
        const customP5 = (p: any) => {
          const originalCreateCanvas = p.createCanvas;

          p.createCanvas = function () {
            return originalCreateCanvas.call(p, 512, 512);
          };

          p.setup = () => {
            p.createCanvas(512, 512);
            p.background(24);
          };

          try {
            const userCode = new Function('p', code);
            userCode(p);
          } catch (err: any) {
            setError(err.message);
          }
        };
        sketchRef.current = new p5(customP5, containerRef.current);
      } catch (err: any) {
        setError(err.message);
      }
    }

    return () => {
      if (sketchRef.current) {
        sketchRef.current.remove();
        sketchRef.current = null;
      }
    };
  }, [code, setError]);

  return (
    <div className={'aspect-square rounded-[24px] border border-neutral-500 bg-neutral-600 p-3'}>
      <div className={'relative h-[512px] w-[512px] overflow-hidden rounded-[12px] border border-neutral-500 bg-neutral-700'}>
        <div ref={containerRef} />
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
