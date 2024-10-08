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
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
}

export const TextInput = ({
  id,
  type,
  label,
  labelIcon,
  inputRef,
  disabled,
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
            'text-sm font-semibold leading-6 flex gap-x-1 items-center',
            labelClassName,
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
          type={type}
          id={id}
          onChange={onChange}
          onBlur={onBlur}
          onWheel={(e: WheelEvent<HTMLInputElement>) => {
            if (type === 'number') {
              handleScrollNumberInput(e);
            }
          }}
          className={classNames(
            'appearance-none w-full h-10 py-2 px-4 truncate no-spinner rounded-lg border border-grey-100 text-sm font-normal leading-6 text-grey-400 placeholder:text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-grey-50 focus:border-grey-200 autofill:shadow-[inset_0_0_0px_1000px_white]',
            // remove arrows on number input
            '[-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none',
            isTouched &&
              errorMessage &&
              'border-red-500 focus:ring-red-50 focus:border-red-500',
            rightIcon && 'pr-10',
            leftIcon && 'pl-10',
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
        <p className="text-xs text-grey-400 pr-2">{`* ${helperText}`}</p>
      )}
      {isTouched && errorMessage && (
        <p className="text-xs text-red-500 pr-2">{errorMessage}</p>
      )}
    </div>
  );
};
