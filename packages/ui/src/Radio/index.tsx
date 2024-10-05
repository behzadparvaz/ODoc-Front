import { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  subLable?: string;
  labelClassName?: string;
  subLabelClassName?: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  checked: boolean;
  icon?: ReactNode;
  inputClassName?: string;
  checkedClassName?: string;
  boxClassName?: string;
  name?: string;
  inputRef?: React.MutableRefObject<HTMLInputElement>;
}

export const Radio = ({
  id,
  name,
  label,
  subLable,
  value,
  checked,
  icon,
  className,
  labelClassName,
  subLabelClassName,
  inputClassName,
  boxClassName,
  checkedClassName,
  inputRef,
  handleChange,
  ...rest
}: RadioProps) => {
  return (
    <div
      className={classNames(
        'relative w-full flex h-6 items-start justify-start overflow-hidden',
        (label || subLable) && 'gap-x-5 h-max',
        className,
      )}
    >
      {label && (
        <div
          className={classNames(
            'flex flex-col justify-center order-2',
            subLable && 'gap-y-2',
          )}
        >
          <label
            className={classNames(
              'text-sm font-semibold text-grey-1000',
              labelClassName,
            )}
            htmlFor={id}
          >
            {label}
          </label>

          {subLable && (
            <p
              className={classNames(
                'text-xs font-light text-grey-1000',
                subLabelClassName,
              )}
            >
              {subLable}
            </p>
          )}
        </div>
      )}
      <input
        id={id ? id : name}
        type="radio"
        name={name}
        value={value}
        ref={inputRef}
        checked={checked}
        onClick={() => {
          return;
        }}
        onChange={(event: any) => {
          handleChange(event);
        }}
        className={classNames(
          'appearance-none w-6 h-6 rounded-full border border-grey-100',
          inputClassName,
        )}
        {...rest}
      />
      {checked && (
        <span
          className={classNames(
            'pointer-events-none absolute right-0 top-0 transition-all flex justify-center items-center z-10 h-6 w-6 rounded-full',
            boxClassName,
          )}
        >
          <span
            className={classNames(
              'pointer-events-none h-4 w-4 bg-orange-500 rounded-full',
              checkedClassName,
            )}
          >
            {icon}
          </span>
        </span>
      )}
    </div>
  );
};
