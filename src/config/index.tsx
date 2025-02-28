import { cookieStorage, createStorage, http } from '@wagmi/core';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { mainnet, forma } from '@reown/appkit/networks';

export const projectId = '3ad21a3a6e095870b5fe01c95c63a6c7';

if (!projectId) {
  throw new Error('Project ID is not defined');
}

export const networks = [mainnet, forma];

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
