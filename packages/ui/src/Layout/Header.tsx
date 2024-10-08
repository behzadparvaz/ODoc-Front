import classNames from 'classnames';
import { IconButton } from '../IconButton';
import { MouseEvent, ReactNode } from 'react';

type Headerprops = {
  title?: string;
  leftIcon?: ReactNode;
  handleClickLeftIcon?: (event: MouseEvent<HTMLButtonElement>) => void;
  rightIcon?: ReactNode;
  handleClickRightIcon?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

const Header = ({
  title,
  leftIcon,
  rightIcon,
  className,
  handleClickLeftIcon,
  handleClickRightIcon,
}: Headerprops) => {
  return (
    <div className={classNames('relative', className)}>
      {rightIcon && (
        <IconButton
          className="absolute right-4 top-1/2 -translate-y-1/2"
          size="large"
          buttonType="outlined"
          handleClick={handleClickRightIcon}
        >
          {rightIcon}
        </IconButton>
      )}

      <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-grey-400">
        {title}
      </p>

      {leftIcon && (
        <IconButton
          className="absolute left-4 top-1/2 -translate-y-1/2"
          size="large"
          buttonType="outlined"
          handleClick={handleClickLeftIcon}
        >
          {leftIcon}
        </IconButton>
      )}
    </div>
  );
};
export default Header;
