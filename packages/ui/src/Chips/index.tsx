import { MouseEvent, ReactNode } from 'react';
import classNames from 'classnames';

import { CloseIconOutline } from '../icons';
import { colors } from '../theme';

export interface ChipsProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  type?: 'contained' | 'outlined';
  label: string;
  clickable?: boolean;
  className?: string;
  clearable?: boolean;
  size?: 'small' | 'medium' | 'large' | 'xLarge';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
}

export const Chips = ({
  label,
  clickable = false,
  className,
  clearable = false,
  size = 'medium',
  icon,
  iconPosition = 'right',
  type = 'contained',
  variant = 'primary',
  onClick,
}: ChipsProps) => {
  const sizeClassNames = () => {
    switch (size) {
      case 'xLarge':
        return 'h-10 min-w-36 text-lg  px-6';
      case 'large':
        return 'h-8 min-w-28 text-base px-4';
      case 'medium':
        return 'h-6 min-w-20 text-sm  px-3';
      case 'small':
        return 'h-4 min-w-14 text-xs px-2';
    }
  };

  const closeIconClassNames = () => {
    switch (size) {
      case 'xLarge':
        return 'h-6 w-6';
      case 'large':
        return 'h-4 w-4';
      case 'medium':
        return 'h-3 w-3';
      case 'small':
        return 'h-2 w-2';
    }
  };

  const colorClassNames = () => {
    switch (type) {
      case 'contained':
        if (variant === 'secondary') {
          return 'text-white bg-grey-950';
        }
        if (variant === 'tertiary') {
          return 'text-orange-500 bg-white';
        }
        return 'text-white bg-orange-500';
      case 'outlined':
        if (variant === 'secondary') {
          return 'text-grey-950 bg-transparent border border-grey-950';
        }
        if (variant === 'tertiary') {
          return 'text-white bg-transparent border border-white';
        }
        return 'text-orange-500 bg-transparent border border-orange-500';
      default:
        return;
    }
  };

  const closeIconSizeProps = () => {
    switch (size) {
      case 'xLarge':
        return { width: 20, height: 20 };
      case 'large':
        return { width: 16, height: 16 };
      default:
        return;
    }
  };

  const closeIconColorProps = () => {
    switch (type) {
      case 'contained':
        if (variant === 'secondary') {
          return colors.white;
        }
        if (variant === 'tertiary') {
          return colors.orange[500];
        }
        return colors.white;
      case 'outlined':
        if (variant === 'secondary') {
          return colors.grey[1000];
        }
        if (variant === 'tertiary') {
          return colors.white;
        }
        return colors.orange[500];
      default:
        return;
    }
  };
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    onClick();
  };

  const hancleClear = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // clear
  };

  return (
    <div
      className={classNames(
        'flex items-center justify-center overflow-hidden rounded-full gap-x-2',
        sizeClassNames(),
        colorClassNames(),
        clickable && 'cursor-pointer',
        clearable && 'justify-between',
        className,
      )}
      onClick={handleClick}
    >
      <span className="flex items-center justify-center">
        <span className={iconPosition === 'left' && 'order-2'}>{icon}</span>
        {label}
      </span>
      {clearable && size !== 'small' && size !== 'medium' && (
        <span
          className={classNames(
            'flex items-center justify-center cursor-pointer',
            closeIconClassNames(),
          )}
          onClick={hancleClear}
        >
          <CloseIconOutline
            {...closeIconSizeProps()}
            stroke={closeIconColorProps()}
          />
        </span>
      )}
    </div>
  );
};
