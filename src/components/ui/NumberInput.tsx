import React, { useState, useEffect } from 'react';

interface NumberInputProps {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  decimal?: boolean;
  className?: string;
  disabled?: boolean;
  value?: number;
  onChange?: (newValue: number) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  min = 0,
  max = 100,
  step = 1,
  decimal = false,
  className = '',
  disabled = false,
  value = min,
  onChange = () => {},
}) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    if (internalValue < min) {
      setInternalValue(min);
      if (onChange) onChange(min);
    } else if (internalValue > max) {
      setInternalValue(max);
      if (onChange) onChange(max);
    }
  }, [min, max, internalValue, onChange]);

  const formatValue = (num: number) => (decimal ? parseFloat(num.toFixed(10)) : Math.round(num));

  const increase = () => {
    if (!disabled && internalValue + step <= max) {
      const newValue = formatValue(internalValue + step);
      setInternalValue(newValue);
      if (onChange) onChange(newValue);
    }
  };

  const decrease = () => {
    if (!disabled && internalValue - step >= min) {
      const newValue = formatValue(internalValue - step);
      setInternalValue(newValue);
      if (onChange) onChange(newValue);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = decimal ? parseFloat(e.target.value) : parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      newValue = formatValue(newValue);
      setInternalValue(newValue);
      if (onChange) onChange(newValue);
    }
  };

  return (
    <div className="flex w-full flex-col gap-1">
      {label && <label className="ml-2 text-[16px] leading-[19px]">{label}</label>}
      <div className="flex w-full items-center overflow-hidden rounded-[8px] border border-neutral-600 bg-neutral-700">
        <button
          onClick={decrease}
          disabled={disabled}
          className="cursor-pointer bg-neutral-600 px-3 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          -
        </button>
        <input
          type="number"
          step={step}
          value={internalValue}
          onChange={handleChange}
          disabled={disabled}
          className={`w-full overflow-hidden px-4 text-center outline-none ${className}`}
        />
        <button
          onClick={increase}
          disabled={disabled}
          className="cursor-pointer bg-neutral-600 px-3 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
