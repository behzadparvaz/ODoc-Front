import { CSSProperties, ReactNode, ReactElement } from 'react';

type IconConditionProp =
  | {
    icon: ReactNode | ReactElement;
    iconDirection: 'left' | 'right';
  }
  | {
    icon?: never;
    iconDirection?: never;
  };
interface ButtonProps {
  children?: ReactNode | ReactElement;
  buttonType?: 'contained' | 'text' | 'outlined';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger-light';
  disabled?: boolean;
  handleClick?: (e) => void;
  className?: string;
  weight?: 100 | 200 | 300;
  size?: 'xSmall' | 'small' | 'medium' | 'large';
  style?: CSSProperties;
  backgroundColor?: string;
  color?: string;
  ref?: React.MutableRefObject<any>;
  isLoading?: boolean;
  loadingColor?: string;
  type?: "submit" | "reset" | "button"
}
type Props = ButtonProps & IconConditionProp;
const Button = ({
  children = null,
  type = 'button',
  buttonType = 'contained',
  variant,
  handleClick,
  disabled = false,
  className = '',
  weight = 100,
  size = 'medium',
  iconDirection = 'left',
  icon,
  style = {},
  backgroundColor = null,
  color = null,
  ref = null,
  isLoading = false,
  loadingColor = '#fff',
}: Props) => {
  const primaryClassName =
    variant === 'primary'
      ? `${buttonType === 'contained'
        ? `${weight === 100 ? 'bg-black' : weight === 200 ? 'bg-black' : weight === 300 ? 'bg-black' : ''
        } text-teal-50`
        : `${weight === 100
          ? 'border border-black text-black bg-white'
          : weight === 200
            ? 'border border-black text-black bg-white'
            : weight === 300
              ? 'border border-black text-black bg-white'
              : ''
        }`
      }`
      : '';

  const dangerLightClassName =
    variant === 'danger-light'
      ? `${buttonType === 'contained'
        ? `bg-red-50 text-red-500`
        : 'border border-red-500 text-red-500 bg-white'
      }`
      : '';

  const secondaryClassName =
    variant === 'secondary'
      ? `${buttonType === 'contained'
        ? `${weight === 100 ? 'bg-teal-50' : weight === 200 ? 'bg-teal-100' : ''} text-teal-600`
        : `${weight === 100
          ? 'border border-teal-100 text-teal-100'
          : weight === 200
            ? 'border border-teal-500 text-teal-500'
            : ''
        }`
      }`
      : '';
  const tertiaryClassName =
    variant === 'tertiary'
      ? `border ${weight === 100 ? 'border-grey-300' : weight === 200 ? 'border-grey-800' : ''} text-grey-800`
      : '';
  const linkClassName = buttonType === 'text' ? 'text-grey-800' : '';
  const sizeClassName =
    size === 'large'
      ? `h-[52px] ${!children ? 'w-10' : ''} typo-subtitle-3`
      : size === 'medium'
        ? `h-8 ${!children ? 'w-8' : ''} typo-subtitle-3`
        : size === 'small'
          ? `h-6 ${!children ? 'w-6' : ''} typo-body-6`
          : '';

  const sidesDistance =
    size === 'xSmall'
    ? ''
    : size === 'small'
      ? icon && iconDirection === 'left'
        ? 'pr-4 pl-2'
        : icon && iconDirection === 'right'
          ? 'pl-4 pr-2'
          : 'px-4'
      : icon && iconDirection === 'left'
        ? 'pr-6 pl-4'
        : icon && iconDirection === 'right'
          ? 'pl-6 pr-4'
          : 'px-4';

  const varientClassName = primaryClassName + secondaryClassName + tertiaryClassName + dangerLightClassName + linkClassName;
  const roundedClassName = children
    ? 'rounded-full'
    : `${size === 'large' ? 'rounded-full' : size === 'medium' ? 'rounded-full' : 'rounded-full'}`;
  const disabledClassName = `${variant === 'primary'
    ? 'bg-grey-200 text-white [&_*]:fill-white'
    : variant === 'secondary'
      ? 'bg-grey-100 text-grey-300 [&_*]:fill-grey-300'
      : variant === 'tertiary'
        ? 'border border-grey-200 text-grey-200 [&_*]:fill-grey-200'
        : 'text-grey-300'
    }`;

  const classNames = `${disabled ? disabledClassName : varientClassName}  ${sizeClassName} ${children && buttonType !== 'text' ? sidesDistance : ''
    } ${roundedClassName}`;
  const backgroundColorStyle = backgroundColor && !disabled ? { backgroundColor: backgroundColor } : null;
  const colorStyle = color && !disabled ? { color: color } : null;

  return (
    <button
      type={type}
      className={`${isLoading ? '!bg-grey-50' : ''} flex items-center justify-center ${classNames} font-semibold ${className}`}
      disabled={isLoading ? true : disabled}
      onClick={type === 'submit' ? null : (e) => handleClick(e)}
      style={{ ...style, ...backgroundColorStyle, ...colorStyle }}
      ref={ref}
    >

      <>
        {children && (
          <span className={icon ? (iconDirection === 'left' ? 'order-1' : 'order-2') : ''}>{children}</span>
        )}
        {icon && (
          <span
            className={
              icon
                ? iconDirection === 'left'
                  ? `order-2 ${children ? 'pr-1' : ''}`
                  : `order-1 ${children ? 'pl-1' : ''}`
                : ''
            }
          >
            {icon}
          </span>
        )}
      </>
    </button>
  );
};
export default Button;
