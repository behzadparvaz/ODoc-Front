import {
  MutableRefObject,
  ReactNode,
  MouseEvent,
  ButtonHTMLAttributes,
  FormEvent,
} from 'react';
import classNames from 'classnames';

import LoadingSpinner from '@com/_atoms/LoadingSpinner';
import { ChevronLeftIconOutline } from '@com/icons';
import { colors } from '@configs/Theme';

type Variant = 'primary' | 'secondary' | 'danger' | 'brand' | 'ghost' | 'text';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string | ReactNode;
  isLoading?: boolean;
  onClick?: (
    event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>,
  ) => void;
  ref?: MutableRefObject<HTMLButtonElement>;
  variant?: Variant;
  size?: 'small' | 'medium' | 'large';
  backgroundColor?: string;
  textColor?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}
export const Button = ({
  children,
  type,
  className,
  variant = 'primary',
  size = 'large',
  isLoading,
  disabled,
  ref,
  icon,
  iconPosition = 'left',
  onClick,
  ...rest
}: ButtonProps) => {
  const sizeClassNames = () => {
    switch (size) {
      case 'large':
        return 'h-[52px] py-2.5 px-6 text-lg leading-8 font-medium';
      case 'medium':
        return 'h-[40px] py-2 px-4 text-sm leading-6 font-medium';
      case 'small':
        return 'h-[32px] py-1 px-3 text-sm leading-6 font-medium';
    }
  };

  const renderIcon = () => {
    if (!icon)
      return (
        <ChevronLeftIconOutline
          width={24}
          height={24}
          stroke={colors.black}
          className={iconPosition === 'right' && 'rotate-180'}
        />
      );

    return icon;
  };

  const renderLoadingColor = () => {
    switch (variant) {
      case 'primary':
      case 'brand':
        return 'white';
      case 'secondary':
      case 'ghost':
      case 'text':
        return 'black';
      case 'danger':
        return 'danger';
    }
  };

  const variantClassNames = () => {
    switch (variant) {
      case 'primary':
        return 'bg-black text-white';
      case 'secondary':
        return 'bg-grey-100 text-black';
      case 'ghost':
        return 'bg-white shadow-md text-black';
      case 'danger':
        return 'bg-[#FFEFED] text-[#E11900]';
      case 'brand':
        return 'bg-gradient-to-r from-[#FF7733] via-[#FF5722] to-[#E54917] text-white';
      case 'text':
        return 'text-black';
    }
  };

  const renderDisabledClassNames = () => {
    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'ghost':
      case 'danger':
      case 'brand':
        return 'bg-[#F6F6F6] text-[#AFAFAF] hover:bg-[#F6F6F6]';
      case 'text':
        return 'text-[#AFAFAF]';
    }
  };

  return (
    <button
      type={type}
      className={classNames(
        'box-border flex items-center justify-center rounded-full  cursor-pointer',
        sizeClassNames(),
        variantClassNames(),
        disabled && renderDisabledClassNames(),
        className,
      )}
      disabled={isLoading || disabled}
      onClick={onClick}
      ref={ref}
      {...rest}
    >
      {isLoading ? (
        <LoadingSpinner color={renderLoadingColor()} />
      ) : (
        <>
          {children && (
            <>
              {icon && (
                <span className={iconPosition === 'left' && 'order-2'}>
                  {renderIcon()}
                </span>
              )}

              {typeof children === 'string' ? <p>{children}</p> : children}
            </>
          )}
        </>
      )}
    </button>
  );
};
