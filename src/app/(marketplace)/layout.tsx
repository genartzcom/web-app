import Navigation from '@/components/Navigation';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={'flex h-screen flex-col items-center'}>
      <Navigation />
    </div>
  );
}
