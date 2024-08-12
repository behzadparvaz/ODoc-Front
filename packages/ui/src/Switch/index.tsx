import classNames from 'classnames';
import { ChangeEvent, InputHTMLAttributes } from 'react';

interface SwtichProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  subLabel?: string;
  className?: string;
  labelClassName?: string;
  subLabelClassName?: string;
  inputClassName?: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  checked: boolean;
  name?: string;
  inputRef?: React.MutableRefObject<HTMLInputElement>;
}

export const Switch = ({
  label,
  subLabel,
  id,
  name,
  value,
  checked,
  className,
  labelClassName,
  subLabelClassName,
  inputClassName,
  inputRef,
  handleChange,
}: SwtichProps) => {
  return (
    <div
      className={classNames('relative w-full h-max flex gap-x-4', className)}
    >
      <label
        className={classNames('order-2', subLabel && 'flex flex-col gap-y-2')}
        htmlFor={id}
      >
        <span
          className={classNames(
            'text-sm font-semibold text-grey-1000',
            labelClassName,
          )}
        >
          {label}
        </span>
        {subLabel && (
          <span
            className={classNames(
              'text-xs font-light text-grey-1000',
              subLabelClassName,
            )}
          >
            {subLabel}
          </span>
        )}
      </label>
      <input
        type="checkbox"
        name={name}
        value={value}
        id={id}
        ref={inputRef}
        checked={checked}
        onChange={handleChange}
        className={classNames(
          'peer appearance-none w-16 h-9 bg-white border border-grey-100 rounded-full',
          inputClassName,
        )}
      />
      <div
        className={
          'pointer-events-none absolute top-0 right-0 w-16 h-9 p-1 flex items-center transition-all duration-500 justify-start rounded-full peer-checked:justify-end peer-checked:[&>*]:bg-orange-500'
        }
      >
        <span className="w-7 h-7 rounded-full bg-grey-400 transition-all duration-500" />
      </div>
    </div>
  );
};
