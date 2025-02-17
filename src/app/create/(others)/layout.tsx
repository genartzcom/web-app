import Divider from '@/components/Divider';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={'flex h-screen flex-col items-center'}>
      <div className={'h-18 w-[calc(100%-192px)] max-w-[1400px] border-x border-x-neutral-600'}></div>
      <Divider />
      <div className={'relative h-full w-[calc(100%-192px)] max-w-[1400px] overflow-hidden border-x border-x-neutral-600 p-8'}>{children}</div>
      <Divider />
      <div className={'h-18 w-[calc(100%-192px)] max-w-[1400px] border-x border-x-neutral-600'}></div>
    </div>
  );
}
