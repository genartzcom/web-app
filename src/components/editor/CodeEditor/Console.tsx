'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Console = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="absolute bottom-0 w-full bg-neutral-800 text-white"
      initial={{ y: 256 }}
      animate={{ y: isOpen ? 0 : 256 }}
      transition={{ ease: 'easeInOut', duration: 0.4 }}
    >
      <div className="flex h-12 items-center gap-1 px-4 font-medium text-neutral-300">
        <i className="ri-file-code-line" />
        <p>Debug Console</p>
        <button onClick={() => setIsOpen(!isOpen)} className="ml-auto flex cursor-pointer items-center justify-center text-[24px]">
          <i className={`ri-arrow-down-s-line transition ${isOpen ? '' : 'rotate-180'}`} />
        </button>
      </div>
      <div className={'h-64 w-full bg-neutral-900'}></div>
    </motion.div>
  );
};

export default Console;
