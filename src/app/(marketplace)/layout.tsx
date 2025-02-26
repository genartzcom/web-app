import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={'flex min-h-screen flex-col items-center'}>
      <Navigation />
      {children}
      <Footer />
    </div>
  );
}
