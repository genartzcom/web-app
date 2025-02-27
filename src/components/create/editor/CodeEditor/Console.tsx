'use client';
import { motion } from 'framer-motion';
import { useCreateStore } from '@/store/createStore';

const Console = () => {
  const { error, isConsoleOpen, setIsConsoleOpen } = useCreateStore();

  return (
    <motion.div
      className="absolute bottom-0 w-full bg-neutral-800 text-white"
      initial={{ y: 256 }}
      animate={{ y: isConsoleOpen ? 0 : 256 }}
      transition={{ ease: 'easeInOut', duration: 0.4 }}
    >
      <div className="flex h-12 items-center gap-1 px-4 font-medium text-neutral-300">
        <i className="ri-file-code-line" />
        <p>Debug Console</p>
        <button onClick={() => setIsConsoleOpen(!isConsoleOpen)} className="ml-auto flex cursor-pointer items-center justify-center text-[24px]">
          <i className={`ri-arrow-down-s-line transition ${isConsoleOpen ? '' : 'rotate-180'}`} />
        </button>
      </div>
      <div className={'h-64 w-full bg-neutral-900 px-4 py-4 text-neutral-200'}>
        <p className={'w-full text-wrap'}>{error}</p>
      </div>
    </motion.div>
  );
};

export default Console;
