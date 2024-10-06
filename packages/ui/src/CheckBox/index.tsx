import { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import { NewTickIcon } from '../icons';
import { colors } from '../theme';

export interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string | null;
  labelClassName?: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  checked: boolean;
  icon?: ReactNode;
  inputClassName?: string;
  boxClassName?: string;
  name?: string;
  inputRef?: React.MutableRefObject<HTMLInputElement>;
}
export const CheckBox = ({
  id,
  label,
  value,
  name,
  checked,
  icon,
  className,
  labelClassName,
  inputClassName,
  boxClassName,
  inputRef = null,
  handleChange,
  ...rest
}: CheckBoxProps) => {
  return (
    <div
      className={classNames(
        'relative w-4 flex h-4 items-center justify-start overflow-hidden',
        label && 'gap-x-3 w-full h-6',
        className,
      )}
    >
      {label && (
        <label
          className={classNames(
            'text-sm font-semibold order-2',
            labelClassName,
          )}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        id={id ? id : name}
        type="checkbox"
        name={name}
        value={value}
        ref={inputRef}
        checked={checked}
        onClick={() => {
          return;
        }}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          handleChange(event);
        }}
        className={classNames(
          'appearance-none w-4 h-4 rounded border border-grey-100',
          inputClassName,
        )}
        {...rest}
      />
      {checked && (
        <span
          className={classNames(
            'pointer-events-none absolute right-0 -translate-y-1/2 top-1/2 flex justify-center items-center z-10 h-4 w-4 rounded transition-all z-10',
            boxClassName,
          )}
        >
          {icon ? (
            icon
          ) : (
            <NewTickIcon width={12} height={9} stroke={colors.grey[1000]} />
          )}
        </span>
      )}
    </div>
  );
};
