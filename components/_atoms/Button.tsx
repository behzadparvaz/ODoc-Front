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
  variant?: 'primary' | 'secondary' | 'tertiary';
  disabled?: boolean;
  handleClick?: (e) => void;
  className?: string;
  weight?: 100 | 200 | 300;
  size?: 'small' | 'medium' | 'large';
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
        ? `${weight === 100 ? 'bg-teal-600' : weight === 200 ? 'bg-teal-700' : weight === 300 ? 'bg-teal-800' : ''
        } text-teal-50`
        : `${weight === 100
          ? 'border border-teal-600 text-teal-600'
          : weight === 200
            ? 'border border-teal-700 text-teal-700'
            : weight === 300
              ? 'border border-teal-800 text-teal-800'
              : ''
        }`
      }`
      : '';

  const secondaryClassName =
    variant === 'secondary'
      ? `${buttonType === 'contained'
        ? `${weight === 100 ? 'bg-teal-100' : weight === 200 ? 'bg-teal-200' : ''} text-teal-500`
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
      ? `h-10 ${!children ? 'w-10' : ''} typo-subtitle-3`
      : size === 'medium'
        ? `h-8 ${!children ? 'w-8' : ''} typo-subtitle-3`
        : size === 'small'
          ? `h-6 ${!children ? 'w-6' : ''} typo-body-6`
          : '';

  const sidesDistance =
    size === 'small'
      ? icon && iconDirection === 'left'
        ? 'pr-4 pl-2'
        : icon && iconDirection === 'right'
          ? 'pl-4 pr-2'
          : 'px-4'
      : icon && iconDirection === 'left'
        ? 'pr-6 pl-4'
        : icon && iconDirection === 'right'
          ? 'pl-6 pr-4'
          : 'px-6';

  const varientClassName = primaryClassName + secondaryClassName + tertiaryClassName + linkClassName;
  const roundedClassName = children
    ? 'rounded-lg'
    : `${size === 'large' ? 'rounded-2xl' : size === 'medium' ? 'rounded-xl' : 'rounded-lg'}`;
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
      className={`flex items-center justify-center ${classNames} font-semibold ${className}`}
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
