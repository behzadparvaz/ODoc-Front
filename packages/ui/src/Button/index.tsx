import {
  MutableRefObject,
  ReactNode,
  MouseEvent,
  ButtonHTMLAttributes,
} from 'react';
import classNames from 'classnames';

import { ChevronLeft } from '../icons';
import { colorPalette, getColors } from '../theme';
import { Spinner } from '../Spinner';

type Variant = 'primary' | 'secondary';
type ButtonType = 'contained' | 'outlined' | 'text';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string | ReactNode;
  isLoading?: boolean;
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
  ref?: MutableRefObject<HTMLButtonElement>;
  variant?: Variant;
  buttonType?: ButtonType;
  size?: 'small' | 'medium' | 'large' | 'xLarge';
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
  buttonType = 'contained',
  size = 'xLarge',
  isLoading,
  disabled,
  ref,
  icon,
  iconPosition = 'left',
  handleClick,
  ...rest
}: ButtonProps) => {
  const sizeClassNames = () => {
    switch (size) {
      case 'xLarge':
        return 'h-10 py-3 px-4';
      case 'large':
        return 'h-9 py-2 px-3';
      case 'medium':
        return 'h-8 py-1 px-2';
      case 'small':
        return 'h-7';
    }
  };

  const renderIcon = () => {
    if (!icon)
      return (
        <ChevronLeft
          width={24}
          height={24}
          stroke={
            buttonType === 'contained'
              ? colorPalette.white
              : colorPalette.grey[1000]
          }
          className={iconPosition === 'right' && 'rotate-180'}
        />
      );

    return icon;
  };

  const variantClassNames = () => {
    switch (buttonType) {
      case 'contained':
        return 'bg-black hover:bg-grey-300 text text-white transition-colors duration-300';
      case 'outlined':
        return 'border border-black';
      case 'text':
        return '';
    }
  };

  return (
    <button
      type={type}
      className={classNames(
        'box-border w-full flex items-center justify-center rounded-md',
        sizeClassNames(),
        variantClassNames(),
        className,
      )}
      disabled={isLoading || disabled}
      onClick={handleClick}
      ref={ref}
      {...rest}
    >
      {isLoading ? (
        <Spinner
          className="h-full"
          width="w-2.5"
          height="h-2.5"
          color={
            buttonType === 'contained'
              ? getColors('bg').white
              : getColors('bg').secondary_1000
          }
        />
      ) : (
        <>
          {children ? (
            <>
              <span className={iconPosition === 'left' && 'order-2'}>
                {renderIcon()}
              </span>

              {typeof children === 'string' ? (
                <p>{children}</p>
              ) : (
                children
              )}
            </>
          ) : (
            renderIcon()
          )}
        </>
      )}
    </button>
  );
};
