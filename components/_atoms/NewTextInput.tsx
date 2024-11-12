import {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  ReactNode,
  WheelEvent,
} from 'react';
import classNames from 'classnames';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  isRequired?: boolean;
  isNumber?: boolean;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  labelIcon?: ReactNode;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  helperClassName?: string;
  inputRef?: React.MutableRefObject<HTMLInputElement>;
  isTouched?: boolean;
  errorMessage?: string;
  maxLength?: number;
  disabled?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

export const TextInput = ({
  id,
  type,
  label,
  labelIcon,
  inputRef,
  children,
  helperText,
  leftIcon,
  rightIcon,
  className,
  labelClassName,
  inputClassName,
  helperClassName,
  errorMessage,
  isTouched,
  isRequired,
  maxLength,
  disabled,
  onChange,
  onBlur,
  ...props
}: TextInputProps) => {
  const handleScrollNumberInput = (e: WheelEvent<HTMLInputElement>) => {
    (e?.target as HTMLElement)?.blur();

    e.stopPropagation();

    setTimeout(() => {
      (e?.target as HTMLElement).focus();
    }, 0);
  };

  return (
    <div
      className={classNames(
        'w-full h-max flex flex-col gap-y-1 items-start',
        className,
      )}
    >
      {label && (
        <label
          className={classNames(
            'text-xs font-semibold leading-6 flex gap-x-1 items-center',
            labelClassName,
            disabled && 'text-grey-400',
          )}
          htmlFor={id}
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
        <input
          ref={inputRef}
          type="text"
          id={id}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (
              type === 'number' &&
              e.target.value !== '' &&
              !/^\d*$/.test(e.target.value)
            ) {
              e.preventDefault();
              return;
            }
            if (e.target.value.length > maxLength) {
              e.target.value = e.target.value.slice(0, maxLength);
            } else {
              onChange(e);
            }
          }}
          onBlur={onBlur}
          onWheel={(e: WheelEvent<HTMLInputElement>) => {
            if (type === 'number') {
              handleScrollNumberInput(e);
            }
          }}
          disabled={disabled}
          className={classNames(
            'appearance-none w-full h-10 py-2 px-4 truncate no-spinner rounded-md bg-grey-100 text-sm font-normal leading-6 text-black placeholder:text-2xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black autofill:shadow-[inset_0_0_0px_1000px_#eaeded]',
            // remove arrows on number input
            '[-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none',
            isTouched &&
              errorMessage &&
              'border-2 !border-[#F1998E] focus:!ring-0 !bg-[#FFEFED] autofill:shadow-[inset_0_0_0px_1000px_#FFEFED]',
            rightIcon && 'pr-10',
            leftIcon && 'pl-10',
            disabled && ' bg-grey-50 text-grey-400 pointer-events-none',
            inputClassName,
          )}
          {...props}
        />
        {leftIcon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2">
            {leftIcon}
          </span>
        )}
        {rightIcon && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2">
            {rightIcon}
          </span>
        )}
      </div>
      {helperText && (
        <p className="text-2xs text-grey-400 pr-2">{`* ${helperText}`}</p>
      )}
      {isTouched && errorMessage && (
        <p className="text-2xs text-red-500 pr-2">{errorMessage}</p>
      )}
    </div>
  );
};
