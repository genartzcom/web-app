import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import 'remixicon/fonts/remixicon.css';

const interFont = localFont({
  src: './InterVariable.woff2',
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'GenArtz | Show your style',
  description: 'Unleash Your Creativity and Inspire the World',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interFont.className} antialiased`}>{children}</body>
    </html>
  );
}
