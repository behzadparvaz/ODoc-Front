import { ReactNode } from 'react';
import { useRouter } from 'next/router';

import { routeList } from '@routes/routeList';
import { useGetCurrentBasket } from '@api/basket/basketApis.rq';
import { ArrowRightIconOutline, BasketIconOutline } from '@com/icons';
import NextImage from '@com/_core/NextImage';
import { colors } from '@configs/Theme';
import HomePageAddressBox from '@com/_molecules/HomePageAddressBox';
import classNames from 'classnames';

enum HeaderType {
  WITHLOGO = 'WithLogo',
  WITHOUTLOGO = 'withoutLogo',
}

type Headerprops = {
  type: 'WithLogo' | 'withoutLogo';
  leftSection?: ReactNode;
  hasBackButton?: boolean;
  hasBasketIcon?: boolean;
  title?: string | string[];
  rightIcon?: ReactNode;
  searchSection?: ReactNode;
  hasLogo?: boolean;
  hasAddress?: boolean;
  backIconHandler?: () => void;
  classname?: string;
};

const Header = ({
  type,
  leftSection,
  title,
  rightIcon,
  hasBackButton,
  hasBasketIcon,
  searchSection,
  hasLogo,
  hasAddress,
  classname,
  backIconHandler,
}: Headerprops) => {
  const { push, back } = useRouter();
  const { data: basketData } = useGetCurrentBasket();
  const renderBasketCount = () => {
    const rxCount = basketData?.refrenceNumber ? 1 : 0;

    if (!!basketData?.products?.length) {
      return basketData?.products?.length + rxCount;
    }

    return rxCount;
  };

  const renderBasket = () => {
    return (
      <div
        className="w-[52px] h-[52px] cursor-pointer relative flex justify-center items-center"
        onClick={() => push(routeList.basket)}
      >
        {(!!basketData?.products?.length || basketData?.refrenceNumber) && (
          <span className="absolute left-0 top-0 !w-[20px] !h-[20px] rounded-full bg-surface-negative text-xs z-10 text-white flex justify-center items-center">
            {renderBasketCount()}
          </span>
        )}
        <BasketIconOutline width={22} height={22} fill={'#000'} />
      </div>
    );
  };

  const renderHeaderContent = () => {
    switch (type) {
      case HeaderType.WITHLOGO:
        return (
          <div
            className={`w-full h-[${hasLogo ? 138 : 70}px] grid grid-rows-[${hasLogo ? '52px_1fr' : '70px'}] grid-cols-4 px-4 py-2 overflow-hidden`}
          >
            {hasLogo && (
              <div className="col-start-1 col-end-4 overflow-hidden flex items-center">
                <NextImage
                  src={'/static/images/staticImages/tapsi-doctor-logo.svg'}
                  height={20}
                  width={110}
                  alt="tapsi-logo"
                />
              </div>
            )}

            {hasAddress && (
              <div
                className={`col-start-1 ${hasLogo ? 'col-end-5' : 'col-end-4'} ${hasLogo ? 'row-start-2' : 'row-start-1'}`}
              >
                <HomePageAddressBox />
              </div>
            )}

            <div className="w-full flex justify-end gap-x-4">
              {leftSection && <span>{leftSection}</span>}
              {renderBasket()}
            </div>
          </div>
        );

      case HeaderType.WITHOUTLOGO:
        return (
          <div
            className={`h-[${!!searchSection ? 64 : 56}px] flex items-center justify-between`}
          >
            {(hasBackButton || rightIcon) && (
              <div className="w-[60px] flex justify-center items-center">
                {rightIcon ? (
                  rightIcon
                ) : (
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      backIconHandler ? backIconHandler() : back();
                    }}
                  >
                    <ArrowRightIconOutline
                      width={24}
                      height={24}
                      fill={colors?.black}
                    />
                  </span>
                )}
              </div>
            )}

            <div
              className={classNames(
                'w-full flex items-center  pl-4',
                title ? 'justify-between' : 'justify-end',
              )}
            >
              {searchSection ? (
                searchSection
              ) : (
                <>
                  {title && (
                    <span className="flex-1 text-base text-content-primary font-medium leading-7 flex items-center">
                      {title}
                    </span>
                  )}

                  <div className="flex items-center justify-end gap-x-4">
                    {leftSection}
                    {hasBasketIcon && renderBasket()}
                  </div>
                </>
              )}
            </div>
          </div>
        );
    }
  };

  return <header className={classname}>{renderHeaderContent()}</header>;
};
export default Header;
