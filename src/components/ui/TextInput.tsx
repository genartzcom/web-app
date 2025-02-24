import React from 'react';

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  isTextarea?: boolean;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  placeholder = '',
  className = '',
  isTextarea = false,
  required = false,
  disabled = false,
  maxLength,
  value,
  onChange,
  ...props
}) => {
  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label className="ml-2 text-[16px] leading-[19px]">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {isTextarea ? (
        <textarea
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          className={`h-[100px] resize-none rounded-[8px] border border-neutral-600 bg-neutral-700 px-4 py-2 outline-none focus:border-neutral-400 ${disabled ? 'cursor-not-allowed opacity-70' : ''} ${className}`}
          value={value}
          onChange={onChange}
          {...props}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          className={`h-[42px] rounded-[8px] border border-neutral-600 bg-neutral-700 px-4 outline-none focus:border-neutral-400 ${disabled ? 'cursor-not-allowed opacity-70' : ''} ${className}`}
          value={value}
          onChange={onChange}
          {...props}
        />
      )}
    </div>
  );
};

export default Input;
