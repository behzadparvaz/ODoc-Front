import classNames from 'classnames';
import { IconButton } from '@com/_atoms/InputButton';
import { MouseEvent, ReactNode } from 'react';

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
    <div
      className={classNames(
        'relative flex items-center',
        title && 'border-b border-grey-200',
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

      {searchSection ? (
        <div className="w-full pl-4">{searchSection}</div>
      ) : (
        <span className="text-base font-medium leading-7">{title}</span>
      )}
    </div>
  );
};
export default Header;
