import { MouseEvent, ReactNode } from 'react';
import classNames from 'classnames';

import { IconButton } from '@com/_atoms/InputButton';

type Headerprops = {
  title?: string | string[];
  handleClickLeftIcon?: (event: MouseEvent<HTMLButtonElement>) => void;
  rightIcon?: ReactNode;
  handleClickRightIcon?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  searchSection?: ReactNode;
};

const Header = ({
  title,
  rightIcon,
  className,
  searchSection,
  handleClickRightIcon,
}: Headerprops) => {
  return (
    <div className={classNames('relative w-full flex items-center', className)}>
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

      {searchSection ? (
        <div className="w-full">{searchSection}</div>
      ) : (
        <span className="text-base font-medium leading-7">{title}</span>
      )}
    </div>
  );
};
export default Header;
