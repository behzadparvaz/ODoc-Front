import { MouseEvent, PropsWithChildren, ReactNode } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import Header from './Header';
import BottomNavigation from './BottomNavigation';
import { ArrowRightIconOutline } from '@com/icons';
import { useRouter } from 'next/router';
import { colors } from '@configs/Theme';

export interface MainLayoutProps {
  hasHeader?: boolean;
  hasBottomGap?: boolean;
  hasBottomNavigation?: boolean;
  hasBackButton?: boolean;
  title?: string;
  headerClassName?: string;
  footerClassName?: string;
  mainClassName?: string;
  leftIcon?: ReactNode;
  handleClickLeftIcon?: (event: MouseEvent<HTMLButtonElement>) => void;
  rightIcon?: ReactNode;
  handleClickRightIcon?: (event: MouseEvent<HTMLButtonElement>) => void;
  fixBottomChildren?: ReactNode;
  pathname?: string;
}

export const MainLayout = ({
  hasHeader,
  hasBottomGap,
  hasBottomNavigation,
  hasBackButton,
  title,
  headerClassName,
  footerClassName,
  mainClassName,
  rightIcon,
  handleClickRightIcon,
  pathname,
  children,
  fixBottomChildren,
}: PropsWithChildren<MainLayoutProps>) => {
  const { back } = useRouter();
  const renderGridTemplate = () => {
    switch (hasHeader) {
      case true:
        if (hasBottomNavigation || hasBottomGap) {
          return 'grid-rows-[56px_1fr_60px]';
        }
        return 'grid-rows-[56px_1fr]';
      default:
        if (hasBottomNavigation || hasBottomGap) {
          return 'grid-rows-[52px_1fr_60px]';
        }
        return 'grid-rows-[52px_1fr]';
    }
  };

  return (
    <div className="w-full h-svh flex justify-center bg-grey-50">
      <div
        className={classNames(
          'bg-white grid grid-cols-1 gap-0 w-full sm:w-[412px] h-svh sm:rounded-3xl overflow-hidden ',
          renderGridTemplate(),
        )}
      >
        {!hasHeader && (
          <div className="w-full col-span-full row-start-1 row-end-2 flex items-center justify-start p-5">
            <Image
              src={'/static/images/staticImages/daroo-logo.svg'}
              width={111}
              height={20}
              alt="tapsi-daroo-logo"
            />
          </div>
        )}
        {hasHeader && (
          <Header
            title={title}
            rightIcon={
              hasBackButton ? (
                <ArrowRightIconOutline
                  width={24}
                  height={24}
                  fill={colors?.black}
                />
              ) : (
                rightIcon
              )
            }
            className={classNames(
              'col-span-full row-start-1 row-end-2',
              headerClassName,
            )}
            handleClickRightIcon={
              hasBackButton ? () => back() : handleClickRightIcon
            }
          />
        )}
        <div
          className={classNames(
            'col-span-full scroll-smooth overflow-y-scroll row-start-2 row-end-3',
            mainClassName,
          )}
        >
          {children}
        </div>
        {(hasBottomGap || hasBottomNavigation) && (
          <div
            className={classNames(
              'col-span-full border-t border-grey-100 row-start-3 row-end-4',
              footerClassName,
            )}
          >
            {hasBottomNavigation ? (
              <BottomNavigation pathname={pathname} />
            ) : (
              fixBottomChildren
            )}
          </div>
        )}
      </div>
    </div>
  );
};
