import React, { forwardRef } from 'react';

type InputConditionProp =
  | {
      isTouched: boolean;
      errorMessage: any;
    }
  | {
      isTouched?: never;
      errorMessage?: never;
    };
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  required?: boolean;
  errorMessage?: any;
}

export type Props = InputProps & InputConditionProp;

const Input = forwardRef(({
  label,
  className = '',
  labelClassName = '',
  inputClassName = '',
  isTouched = false,
  required = false,
  errorMessage = '',
  ...props
}: Props, ref: React.RefObject<any>) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label className={`text-[11px] text-grey-800 mb-2 ${labelClassName}`}>{label}
      {required && <span className='text-red-600'>*</span>}
      </label>}
      <input
        className={`h-10 w-full rounded-md outline-none ${inputClassName} ${isTouched ? 'border border-red-800' : ''}`}
        {...props}
        ref={ref}
      />
      {isTouched && <p className="text-xs font-normal text-red-800 mx-1 mt-2">{errorMessage}</p>}
    </div>
  );
})

export default Input
