import { useAppKitAccount, useAppKit } from '@reown/appkit/react';
import Button from '@/components/ui/Button';

export default function ConnectWallet() {
  const { address, isConnected } = useAppKitAccount();
  const { open } = useAppKit();

  return <Button onClick={() => open()}>{isConnected ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect Wallet'}</Button>;
}
