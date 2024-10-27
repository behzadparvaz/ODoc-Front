import {
  ChangeEvent,
  FocusEvent,
  ReactNode,
  TextareaHTMLAttributes,
  WheelEvent,
} from 'react';
import classNames from 'classnames';

export interface TextAreaInputProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
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
  inputRef?: React.MutableRefObject<HTMLTextAreaElement>;
  isTouched?: boolean;
  errorMessage?: string;
  maxLength?: number;
  disabled?: boolean;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
}

export const TextAreaInput = ({
  id,
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
}: TextAreaInputProps) => {
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
            'text-base font-bold leading-6 flex gap-x-1 items-center',
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
        <textarea
          ref={inputRef}
          id={id}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            if (e.target.value.length > maxLength) {
              e.target.value = e.target.value.slice(0, maxLength);
            } else {
              onChange(e);
            }
          }}
          onBlur={onBlur}
          rows={props.rows ? props.rows : 3}
          className={classNames(
            'appearance-none w-full py-2 px-4 truncate no-spinner rounded-lg  bg-grey-100 text-base font-normal leading-6 text-black placeholder:text-base placeholder-gray-400 focus:outline-none autofill:shadow-[inset_0_0_0px_1000px_white] resize-none',
            // remove arrows on number input
            '[-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none',
            isTouched &&
              errorMessage &&
              'border-2 !border-[#F1998E] focus:!ring-0 !bg-[#FFEFED]',
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
        <p className="text-xs text-grey-400 pr-2">{`* ${helperText}`}</p>
      )}
      {isTouched && errorMessage && (
        <p className="text-xs text-red-500 pr-2">{errorMessage}</p>
      )}
    </div>
  );
};
