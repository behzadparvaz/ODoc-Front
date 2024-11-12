import React, { ChangeEventHandler } from 'react';

type Option = {
  name: string;
  id: string | number | null;
};

type SelectProps = {
  name: string;
  value: string | number | null;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  options?: Option[];
  labelClassName?: string;
  label?: string;
  className?: string;
  selectClassName?: string;
  required?: boolean;
  errorMessage?: any;
};

const Select: React.FC<SelectProps> = ({
  name,
  value,
  onChange,
  options,
  labelClassName,
  label,
  className,
  selectClassName,
  required,
  errorMessage,
  children,
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className={`text-[11px] text-grey-800 mb-2 ${labelClassName}`}>
          {label}
          {required && <span className="text-red-600">*</span>}
        </label>
      )}
      <select
        name={name}
        value={value}
        className={`w-full h-10 rounded-md outline-none placeholder-grey-300 border border-grey-300 text-grey-600 text-xs ${selectClassName} ${errorMessage ? 'border border-red-800' : ''}`}
        onChange={onChange}
      >
        {children ??
          options?.map((item, index) => (
            <option value={item.id} key={item.id} selected={index === 0}>
              {item.name}
            </option>
          ))}
      </select>
      {errorMessage && (
        <p className="text-2xs font-normal text-red-800 mx-1 mt-2">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Select;
