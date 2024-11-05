import { ReactChild, ReactChildren, ReactElement } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string | null;
  labelClassName?: string;
  handleChange: Function;
  children?: ReactChild | ReactChildren | ReactElement;
  value?: string | number;
  checked?: boolean;
  icon: ReactChild | ReactChildren | ReactElement;
  inputClassName?: string;
  checkedClassName?: string;
  boxClassName?: string;
  name?: string;
  inputRef?: React.MutableRefObject<any>;
}
const CheckBox = ({
  className = '',
  label,
  labelClassName = '',
  children,
  handleChange,
  value,
  checked,
  icon,
  inputClassName = '',
  checkedClassName = '',
  boxClassName = '',
  name = '',
  inputRef = null,
  ...props
}: Props) => {
  return (
    <div className={`relative ${className}`}>
      <label className={labelClassName} htmlFor={label}>
        {label}
      </label>
      <input
        ref={inputRef}
        name={name}
        checked={checked}
        value={value}
        onClick={(e: any) => {
          handleChange(e);
        }}
        onChange={(e: any) => {
          handleChange(e);
        }}
        id={label}
        type="checkbox"
        className={`absolute opacity-0 z-20 w-full h-full right-0 top-0 ${inputClassName}`}
        {...props}
      />
      <span
        className={`absolute right-0 -translate-y-1/2 top-1/2 transition-all z-10 overflow-hidden border border-grey-800 rounded-[7px] ${boxClassName} ${
          checked ? `bg-grey-800 flex justify-center items-center !mx-auto ${checkedClassName}` : ''
        }`}
      >
        {checked ? icon : null}
      </span>
      {children}
    </div>
  );
};
export default CheckBox;
