import { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import { NewTickIcon } from '@com/icons';
import { colors } from '@configs/Theme';

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
  inputRef,
  handleChange,
  ...rest
}: RadioProps) => {
  return (
    <div
      className={classNames(
        'relative w-full flex h-6 items-start justify-start overflow-hidden',
        (label || subLable) && 'gap-x-[21px] h-max',
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
              'text-sm font-semibold text-grey-1000  cursor-pointer',
              labelClassName,
            )}
            htmlFor={id}
          >
            {label}
          </label>

          {subLable && (
            <p className={classNames('text-xs font-light', subLabelClassName)}>
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
          'appearance-none w-[22px] h-[22px] rounded-full border border-surface-inverse-primary cursor-pointer',
          inputClassName,
        )}
        {...rest}
      />
      {checked && (
        <span
          className={classNames(
            'pointer-events-none absolute right-0 top-0 transition-all flex justify-center items-center z-10 h-[22px] w-[22px] rounded-full bg-black',
            boxClassName,
          )}
        >
          {icon ? (
            icon
          ) : (
            <NewTickIcon width={12} height={9} stroke={colors.white} />
          )}
        </span>
      )}
    </div>
  );
};
