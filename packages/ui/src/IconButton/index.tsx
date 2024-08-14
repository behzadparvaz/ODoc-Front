import {
  MutableRefObject,
  ReactNode,
  MouseEvent,
  ButtonHTMLAttributes,
} from 'react';
import classNames from 'classnames';

type Variant = 'primary' | 'secondary';
type ButtonType = 'contained' | 'outlined' | 'text';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
  ref?: MutableRefObject<HTMLButtonElement>;
  variant?: Variant;
  buttonType?: ButtonType;
  size?: 'small' | 'medium' | 'large' | 'xLarge';
  backgroundColor?: string;
}
export const IconButton = ({
  children,
  type,
  className,
  variant = 'primary',
  buttonType = 'contained',
  size = 'medium',
  ref,
  handleClick,
  ...rest
}: IconButtonProps) => {
  const sizeClassNames = () => {
    switch (size) {
      case 'xLarge':
        return 'h-10 w-10 rounded-full';
      case 'large':
        return 'h-8 w-8 rounded-full';
      case 'medium':
        return 'h-6 w-6 rounded-full';
      case 'small':
        return 'h-4 w-4 rounded-full';
    }
  };

  const variantClassNames = () => {
    switch (buttonType) {
      case 'contained':
        return 'bg-black hover:bg-grey-300 text text-white transition-colors duration-300';
      case 'outlined':
        return 'hover:bg-grey-50';
      case 'text':
        return '';
    }
  };

  return (
    <button
      type={type}
      className={classNames(
        'flex items-center justify-center  cursor-pointer',
        sizeClassNames(),
        variantClassNames(),
        className,
      )}
      onClick={handleClick}
      ref={ref}
      {...rest}
    >
      {children}
    </button>
  );
};
