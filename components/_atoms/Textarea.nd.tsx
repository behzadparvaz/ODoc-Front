import React, { forwardRef } from 'react';
import classNames from 'classnames';

type TextareaConditionProp =
  | {
      isTouched: boolean;
      errorMessage: any;
    }
  | {
      isTouched?: never;
      errorMessage?: never;
    };

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  className?: string;
  labelClassName?: string;
  textareaClassName?: string;
  required?: boolean;
  errorMessage?: any;
}

export type Props = TextareaProps & TextareaConditionProp;

const Textarea = forwardRef(
  (
    {
      label,
      className = '',
      labelClassName = '',
      textareaClassName = '',
      isTouched = false,
      required = false,
      errorMessage = '',
      ...props
    }: Props,
    ref: React.RefObject<any>,
  ) => {
    return (
      <div className={classNames('flex flex-col', className)}>
        {label && (
          <label
            className={classNames(
              'text-grey-800 font-medium mb-2',
              labelClassName,
            )}
          >
            {label}
            {required && <span className="text-red-600">*</span>}
          </label>
        )}
        <textarea
          className={classNames(
            'h-10 w-full rounded-md outline-none',
            textareaClassName,
            isTouched ? 'border border-red-800' : '',
          )}
          {...props}
          ref={ref}
        />
        {isTouched && (
          <p className="text-2xs font-normal text-red-800 mx-1 mt-2">
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

export default Textarea;
