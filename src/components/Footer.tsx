import Link from 'next/link';
import Image from 'next/image';
import Divider from '@/components/Divider';

const footerLinks = [
  {
    category: 'Products',
    links: [
      { href: '/', label: 'Enterprise' },
      { href: '/', label: 'Observability' },
      { href: '/', label: 'previews' },
      { href: '/', label: 'security' },
      { href: '/', label: 'TurboRepo' },
      { href: '/', label: 'Rendering' },
    ],
  },
  {
    category: 'Resources',
    links: [
      { href: '/', label: 'Community' },
      { href: '/', label: 'Docs' },
      { href: '/', label: 'Guides' },
      { href: '/', label: 'Pricing' },
      { href: '/', label: 'Server status' },
    ],
  },
  {
    category: 'Company',
    links: [
      { href: '/', label: 'About' },
      { href: '/', label: 'Blog' },
      { href: '/', label: 'Careers' },
      { href: '/', label: 'Changelog' },
      { href: '/', label: 'Contact Us' },
      { href: '/', label: 'Partners' },
      { href: '/', label: 'Legal' },
    ],
  },
  {
    category: 'Contact',
    links: [
      { href: '/', label: 'help@unknown.com' },
      { href: '/', label: 'Twitter' },
      { href: '/', label: 'Telegram' },
      { href: '/', label: 'Discord' },
    ],
  },
];

export default function Footer() {
  return (
    <div className={'mt-auto flex w-full flex-col items-center'}>
      <Divider />
      <div className={'w-full max-w-[1400px]'}>
        <div className={'flex flex-col border-x border-neutral-600'}>
          <div className={'w-full p-8'}>
            <div className={'flex flex-wrap items-start gap-6'}>
              {footerLinks.map((section, index) => (
                <div key={index} className={'flex w-40 flex-col gap-2'}>
                  <p className={'mb-1 text-[20px] font-medium'}>{section.category}</p>
                  {section.links.map((link, linkIndex) => (
                    <Link className={'w-fit text-neutral-300 capitalize transition hover:text-neutral-200'} key={linkIndex} href={link.href}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
            <div className={'mt-32 flex items-center justify-between'}>
              <div className={'flex items-center gap-3'}>
                <Image src={'/media/logo.svg'} alt={'logo'} width={32} height={32} />
                <p className={'text-[24px] font-medium'}>GenArtz</p>
              </div>
              <div className={'flex items-center gap-2 text-xl text-neutral-200'}>
                <Link href={'/'} target={'_blank'} className={'transition hover:text-neutral-100'}>
                  <i className="ri-twitter-x-fill" />
                </Link>
                <Link href={'/'} target={'_blank'} className={'transition hover:text-neutral-100'}>
                  <i className="ri-github-fill" />
                </Link>
                <Link href={'/'} target={'_blank'} className={'transition hover:text-neutral-100'}>
                  <i className="ri-telegram-2-fill" />
                </Link>
              </div>
            </div>
          </div>
          <div className={'h-[1px] w-full bg-neutral-600'} />
          <div className={'flex w-full items-center justify-between px-8 py-4 max-md:flex-col'}>
            <p className={'text-neutral-300'}>GenArtz © 2025 All rights reserved</p>
            <div className={'flex items-center gap-3 text-neutral-300'}>
              <Link href={'/'} className={'transition hover:text-neutral-200'}>
                Terms & Conditions
              </Link>{' '}
              <Link href={'/'} className={'transition hover:text-neutral-200'}>
                Privacy Policy
              </Link>{' '}
              <Link href={'/'} className={'transition hover:text-neutral-200'}>
                Security
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
