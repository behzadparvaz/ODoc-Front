import classNames from 'classnames';
import React, {
  ChangeEventHandler,
  PropsWithChildren,
  ReactNode,
  SelectHTMLAttributes,
  useState,
} from 'react';
import { ChevronDown } from '../icons';
import { colorPalette } from '../theme';

type Option = {
  name: string;
  id: string | number | null;
};

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  value: string | number | null;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  options?: Option[];
  labelClassName?: string;
  label?: string;
  className?: string;
  selectClassName?: string;
  isRequired?: boolean;
  labelIcon?: ReactNode;
  leftIcon?: ReactNode;
  errorMessage?: any;
  inputRef?: React.MutableRefObject<HTMLSelectElement>;
  helperText?: string;
}

export const Select = ({
  name,
  value,
  onChange,
  options,
  labelClassName,
  label,
  isRequired,
  labelIcon,
  className,
  leftIcon,
  selectClassName,
  errorMessage,
  helperText,
  children,
}: PropsWithChildren<SelectProps>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label
          className={classNames(
            'text-sm font-semibold leading-6 flex gap-x-1 items-center',
            labelClassName,
          )}
        >
          {labelIcon && <span>{labelIcon}</span>}
          {isRequired ? (
            <span>
              <span className="text-orange-500 align-top">* </span>
              {label}
            </span>
          ) : (
            label
          )}
        </label>
      )}
      <div className="relative w-full">
        <select
          name={name}
          value={value}
          className={classNames(
            'select appearance-none w-full h-10 py-2 px-4 truncate no-spinner rounded-lg border border-grey-100 text-sm font-normal leading-6 text-grey-400 placeholder:text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-grey-50 focus:border-grey-200',
            errorMessage &&
              'border-red-500 focus:ring-red-50 focus:border-red-500',
            leftIcon && 'pl-10',
            selectClassName,
          )}
          onChange={onChange}
          onClick={() => setIsOpen(!isOpen)}
        >
          {children ??
            options?.map((item, index) => (
              <option
                value={item.id}
                key={item.id}
                selected={index === 0}
                className="appearance-none"
              >
                <span className="h-10">{item.name}</span>
              </option>
            ))}
        </select>

        <div className="pointer-events-none absolute h-full w-max left-4 top-1/2 -translate-y-1/2 flex gap-x-2 items-center py-1">
          {leftIcon && (
            <span className="border-l border-grey-100 h-full flex items-center px-2">
              {leftIcon}
            </span>
          )}

          <ChevronDown
            width={16}
            height={16}
            stroke={colorPalette.grey[1000]}
            className={isOpen ? 'rotate-180 transition-all duration-100' : ''}
          />
        </div>
      </div>
      {helperText && (
        <p className="text-xs text-grey-400 pr-2">{`* ${helperText}`}</p>
      )}
      {errorMessage && (
        <p className="text-xs text-red-500 pr-2">{errorMessage}</p>
      )}
    </div>
  );
};
