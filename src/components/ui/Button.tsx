import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'plain';
  className?: string;
  external?: boolean;
}

const Button = ({ children, href, onClick, size = 'md', variant = 'primary', className = '', external = false, ...props }: ButtonProps) => {
  const baseStyles =
    'flex items-center justify-center gap-1 rounded-full capitalize transition duration-200 ease-in-out active:scale-[0.98] select-none tracking-none font-semibold min-w-[52px] cursor-pointer';

  const sizeStyles = {
    sm: 'px-4 py-2 text-[16px] leading-[18px]',
    md: 'px-6 py-3 text-[16px] leading-[20px]',
    lg: 'px-8 py-3.5 text-[18px] leading-[22px]',
  };

  const variantStyles = {
    primary: 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200',
    secondary: 'bg-neutral-500 text-neutral-100 hover:bg-neutral-400',
    plain: 'bg-transparent text-neutral-300 hover:bg-transparent active:scale-100',
  };
  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} target={external ? '_blank' : undefined} className={combinedStyles} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedStyles} {...props}>
      {children}
    </button>
  );
};

export default Button;
