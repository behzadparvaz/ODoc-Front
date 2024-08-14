import { MouseEvent, PropsWithChildren, ReactNode } from 'react';
import classNames from 'classnames';

import { images } from '@repo/assets';

import Header from './Header';
import BottomNavigation from './BottomNavigation';

type MainLayoutProps = {
  hasHeader?: boolean;
  hasBottomGap?: boolean;
  hasBottomNavigation?: boolean;
  title?: string;
  headerClassName?: string;
  footerClassName?: string;
  mainClassName?: string;
  leftIcon?: ReactNode;
  handleClickLeftIcon?: (event: MouseEvent<HTMLButtonElement>) => void;
  rightIcon?: ReactNode;
  handleClickRightIcon?: (event: MouseEvent<HTMLButtonElement>) => void;
  fixBottomChildren?:ReactNode;
  pathname?:string;
};

const MainLayout = ({
  hasHeader,
  hasBottomGap,
  hasBottomNavigation,
  title,
  headerClassName,
  footerClassName,
  mainClassName,
  rightIcon,
  leftIcon,
  handleClickLeftIcon,
  handleClickRightIcon,
  pathname,
  children,
  fixBottomChildren
}: PropsWithChildren<MainLayoutProps>) => {
  const renderGridTemplate = () => {
    switch (hasHeader) {
      case true:
        if (hasBottomNavigation || hasBottomGap) {
          return 'grid-rows-[35px_35px_1fr_60px]';
        }
        return 'grid-rows-[35px_35px_1fr]';
      default:
        if (hasBottomNavigation || hasBottomGap) {
          return 'grid-rows-[35px_1fr_60px]';
        }
        return 'grid-rows-[35px_1fr]';
    }
  };

  return (
    <div className="w-full h-full flex justify-center">
      <div
        className={classNames(
          'bg-white grid grid-cols-1 gap-0 w-full sm:w-[412px] h-svh sm:rounded-3xl overflow-hidden ',
          renderGridTemplate(),
        )}
      >
        <div className="col-span-full row-start-1 row-end-2 bg-grey-950 flex justify-start">
          <img src={images.logo} alt="tapsi-daroo-logo" />
        </div>
        {hasHeader && (
          <Header
            title={title}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            className={classNames(
              'col-span-full row-start-2 row-end-3',
              headerClassName,
            )}
            handleClickLeftIcon={handleClickLeftIcon}
            handleClickRightIcon={handleClickRightIcon}
          />
        )}
        <div
          className={classNames(
            'col-span-full',
            hasHeader ? 'row-start-3 row-end-4' : 'row-start-2 row-end-3',
            mainClassName,
          )}
        >
          {children}
        </div>
        {(hasBottomGap || hasBottomNavigation) && (
          <div
            className={classNames(
              'col-span-full border-t border-grey-100',
              hasHeader ? 'row-start-4 row-end-5' : 'row-start-3 row-end-4',
              footerClassName,
            )}
          >
            {hasBottomNavigation ? <BottomNavigation pathname={pathname}/> : fixBottomChildren}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainLayout;
