import {
  ChangeEvent,
  FocusEvent,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react';
import classNames from 'classnames';

export interface TextAreaInputProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label?: string;
  isRequired?: boolean;
  helperText?: string;
  leftIcon?: ReactNode;
  className?: string;
  labelClassName?: string;
  textareaClassName?: string;
  leftIconClassName?: string;
  inputRef?: React.MutableRefObject<HTMLTextAreaElement>;
  isTouched?: boolean;
  errorMessage?: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (event: FocusEvent<HTMLTextAreaElement>) => void;
}

export const TextAreaInput = ({
  id,
  label,
  inputRef,
  disabled,
  children,
  helperText,
  leftIcon,
  className,
  labelClassName,
  textareaClassName,
  leftIconClassName,
  errorMessage,
  isTouched,
  isRequired,
  onChange,
  onBlur,
  ...rest
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
            'text-sm font-semibold leading-6',
            labelClassName,
          )}
          htmlFor={id}
        >
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
          onChange={onChange}
          onBlur={onBlur}
          className={classNames(
            'appearance-none w-full  py-2 px-4 no-spinner ltr rounded-lg border border-grey-100 text-sm font-normal leading-6 text-grey-400 placeholder:text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-grey-50 focus:border-grey-200 autofill:shadow-[inset_0_0_0px_1000px_white] resize-none',
            isTouched &&
              errorMessage &&
              'border-red-500 focus:ring-red-50 focus:border-red-500',
            textareaClassName,
          )}
          rows={rest.rows ? rest.rows : 3}
          {...rest}
        />
        {leftIcon && (
          <span
            className={classNames(
              'absolute w-6 h-6 flex justify-center items-center left-2 bottom-2 -translate-y-1/2 bg-grey-100 rounded-full',
              leftIconClassName,
            )}
          >
            {leftIcon}
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
