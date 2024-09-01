import classNames from 'classnames';
import { IconButton } from '@com/_atoms/InputButton';
import { MouseEvent, ReactNode } from 'react';

type Headerprops = {
  title?: string;
  handleClickLeftIcon?: (event: MouseEvent<HTMLButtonElement>) => void;
  rightIcon?: ReactNode;
  handleClickRightIcon?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

const Header = ({
  title,
  rightIcon,
  className,
  handleClickRightIcon,
}: Headerprops) => {
  return (
    <div
      className={classNames(
        'relative flex items-center border-b border-grey-200',
        className,
      )}
    >
      {rightIcon && (
        <div className="w-[60px] flex justify-center items-center">
          <IconButton
            className="h-8 w-8"
            size="large"
            buttonType="outlined"
            handleClick={handleClickRightIcon}
          >
            {rightIcon}
          </IconButton>
        </div>
      )}

      <span className="text-base font-medium leading-7">{title}</span>
    </div>
  );
};
export default Header;
