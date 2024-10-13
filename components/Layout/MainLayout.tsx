import { MouseEvent, PropsWithChildren, ReactNode } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import Header from './Header';
import BottomNavigation from './BottomNavigation';
import { ArrowRightIconOutline, BasketIconOutline } from '@com/icons';
import { useRouter } from 'next/router';
import { colors } from '@configs/Theme';
import Footer from './Footer';
import { useGetCurrentBasket } from '@api/basket/basketApis.rq';
import { routeList } from '@routes/routeList';

export interface MainLayoutProps {
  hasHeader?: boolean;
  hasSerachSection?: boolean;
  hasBottomGap?: boolean;
  hasBottomNavigation?: boolean;
  hasBackButton?: boolean;
  hasBasketIcon?: boolean;
  title?: string | string[];
  headerClassName?: string;
  footerClassName?: string;
  mainClassName?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  handleClickRightIcon?: (event: MouseEvent<HTMLButtonElement>) => void;
  footer?: ReactNode;
  searchSection?: ReactNode;
}

export const MainLayout = ({
  hasHeader,
  hasSerachSection,
  hasBottomGap,
  hasBottomNavigation,
  hasBackButton,
  hasBasketIcon,
  title,
  headerClassName,
  leftIcon,
  footerClassName,
  mainClassName,
  rightIcon,
  handleClickRightIcon,
  children,
  footer,
  searchSection,
}: PropsWithChildren<MainLayoutProps>) => {
  const { back, push, pathname } = useRouter();
  const { data: basketDatat } = useGetCurrentBasket();

  const renderBasketCount = () => {
    const rxCount = basketDatat?.refrenceNumber ? 1 : 0;

    if (!!basketDatat?.products?.length) {
      return basketDatat?.products?.length + rxCount;
    }

    return rxCount;
  };

  const renderGridTemplate = () => {
    switch (hasHeader) {
      case true:
        if (hasBottomNavigation || hasBottomGap) {
          if (hasSerachSection) {
            return `grid-rows-[68px_1fr_85px]`;
          }
          return `grid-rows-[56px_1fr_85px]`;
        }
        if (hasSerachSection) {
          return `grid-rows-[68px_1fr]`;
        }

        return `grid-rows-[56px_1fr]`;
      default:
        if (hasBottomNavigation || hasBottomGap) {
          return 'grid-rows-[52px_1fr_85px]';
        }
        return 'grid-rows-[52px_1fr]';
    }
  };

  return (
    <div className="w-full h-svh flex justify-center bg-grey-100">
      <div
        className={classNames(
          'relative bg-white grid grid-cols-1 gap-0 w-full sm:w-[600px] h-svh  overflow-hidden ',
          renderGridTemplate(),
        )}
      >
        {!hasHeader && pathname !== '/app/auth' && (
          <div className="w-full col-span-full row-start-1 row-end-2 flex items-center justify-start p-5">
            <Image
              src={'/static/images/staticImages/tapsi-doctor-logo.svg'}
              width={111}
              height={20}
              alt="tapsi-daroo-logo"
            />
            {leftIcon ? leftIcon : null}
          </div>
        )}
        {(hasHeader || hasSerachSection) && (
          <div
            className={classNames(
              'flex w-full justify-between items-center',
              title && 'border-b border-grey-200',
            )}
          >
            <Header
              title={!hasSerachSection && title}
              searchSection={hasSerachSection && searchSection}
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
                'col-span-full row-start-1 row-end-2 flex-1',
                headerClassName,
              )}
              handleClickRightIcon={
                hasBackButton && !handleClickRightIcon
                  ? () => back()
                  : handleClickRightIcon
              }
            />
            {leftIcon ? (
              leftIcon
            ) : (
              <>
                {hasBasketIcon ? (
                  <div
                    className="w-[52px] h-[52px] cursor-pointer relative flex justify-center items-center"
                    onClick={() => push(routeList.basket)}
                  >
                    {(!!basketDatat?.products?.length ||
                      basketDatat?.refrenceNumber) && (
                      <span className="absolute right-0 top-0 !w-6 !h-6 border border-white rounded-full bg-surface-nagative text-base z-10 text-white flex justify-center items-center">
                        {renderBasketCount()}
                      </span>
                    )}
                    <BasketIconOutline width={22} height={22} fill={'#000'} />
                  </div>
                ) : null}
              </>
            )}
          </div>
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
              'col-span-full row-start-3 row-end-4',
              hasBottomNavigation && 'bg-grey-50 border-t border-grey-100',
              footerClassName,
            )}
          >
            {hasBottomNavigation ? (
              <BottomNavigation />
            ) : (
              <Footer>{footer}</Footer>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
