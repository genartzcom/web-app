import { create } from 'zustand';

interface CreateState {
  image: File | null;
  title: string;
  description: string;
  price: number;
  supply: number;
  code: string;
  isCompiled: boolean;
  isConsoleOpen: boolean;
  error: string | null;
  contracts: string[];

  setImage: (file: File | null) => void;
  setTitle: (title: string) => void;
  setDescription: (desc: string) => void;
  setPrice: (price: number) => void;
  setSupply: (supply: number) => void;
  setCode: (code: string) => void;
  setIsCompiled: (status: boolean) => void;
  setIsConsoleOpen: (status: boolean) => void;
  setError: (error: string | null) => void;
  setContracts: (updater: string[] | ((prev: string[]) => string[])) => void;
}

export const useCreateStore = create<CreateState>((set) => ({
  image: null,
  title: '',
  description: '',
  price: 0,
  supply: 1,
  code: '',
  isCompiled: false,
  isConsoleOpen: false,
  error: null,
  contracts: [],

  setImage: (file) => set({ image: file }),
  setTitle: (title) => set({ title }),
  setDescription: (desc) => set({ description: desc }),
  setPrice: (price) => set({ price }),
  setSupply: (supply) => set({ supply }),
  setCode: (code) => set({ code }),
  setIsCompiled: (status) => set({ isCompiled: status }),
  setIsConsoleOpen: (status) => set({ isConsoleOpen: status }),
  setError: (error) => set({ error }),
  setContracts: (updater) =>
    set((state) => ({
      contracts: typeof updater === 'function' ? updater(state.contracts) : updater,
    })),
}));
