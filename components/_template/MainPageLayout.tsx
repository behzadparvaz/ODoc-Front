import NextImage from '@com/_core/NextImage';
import {
  mobileModeMaxWidthClassName,
  shouldShowMobileMode,
} from '@configs/ControlMobileView';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import {
  ArrowRightIconOutline,
  BasketIconOutline,
  SearchIconOutline,
} from '@com/icons';
import { routeList } from '@routes/routeList';
import { useRouter } from 'next/router';
import { useGetCurrentBasket } from '@api/basket/basketApis.rq';

const BottomNavigation = dynamic(() => import('@com/Layout/BottomNavigation'));
const HomePageAddressBox = dynamic(
  () => import('@com/_molecules/HomePageAddressBox'),
);
const Footer = dynamic(() => import('@com/Layout/Footer'));
const FooterContent = dynamic(() => import('@com/_molecules/FooterContent'));
interface Props {
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  hasBottomNavigation?: boolean;
  hasAddress?: boolean;
  hasFooter?: boolean;
  title?: string;
  hasSearchIcon?: boolean;
  hasBasketIcon?: boolean;
  backButtonAction?: () => void;
}

const MainPageLayout = ({
  children,
  className = '',
  headerClassName = '',
  hasBottomNavigation = true,
  hasFooter = false,
  hasAddress = false,
  title,
  hasSearchIcon = true,
  hasBasketIcon = true,
  backButtonAction,
}: Props) => {
  const { push, back } = useRouter();
  const { data: basketData } = useGetCurrentBasket({ enabled: hasBasketIcon });

  const renderBasketCount = () => {
    const rxCount = basketData?.refrenceNumber ? 1 : 0;

    if (!!basketData?.products?.length) {
      return basketData?.products?.length + rxCount;
    }

    return rxCount;
  };

  return (
    <div
      className={classNames(
        ` w-full h-screen pt-[86px] bg-white flex flex-col`,
        shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : '',
      )}
    >
      <div
        className={classNames(
          `fixed px-4 bg-white z-10 text-grey-500 text-xl inset-x-0 py-[17px] top-0 items-center flex justify-between ${headerClassName}`,
          shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : '',
        )}
      >
        {!!title ? (
          <div className="flex gap-x-2 items-center">
            <span
              className="pl-3 py-2 pr-2 flex items-center justify-center cursor-pointer"
              onClick={() => {
                if (backButtonAction) {
                  backButtonAction();
                } else {
                  back();
                }
              }}
            >
              <ArrowRightIconOutline width={20} height={20} fill={'#000'} />
            </span>
            <span className="text-base font-semibold">{title}</span>
          </div>
        ) : (
          <NextImage
            src={'/static/images/staticImages/tapsi-doctor-logo.svg'}
            height={20}
            width={110}
          />
        )}
        <div className="flex items-center gap-x-4">
          {hasSearchIcon && (
            <div
              className="w-[22px] cursor-pointer"
              onClick={() => push(routeList.mobileSearch)}
            >
              <SearchIconOutline width={22} height={22} fill={'#000'} />
            </div>
          )}

          {hasBasketIcon && (
            <div
              className="w-[52px] h-[52px] cursor-pointer relative flex justify-center items-center"
              onClick={() => push(routeList.basket)}
            >
              {(!!basketData?.products?.length ||
                basketData?.refrenceNumber) && (
                <span className="absolute right-0 top-0 !w-6 !h-6 border border-white rounded-full bg-surface-nagative text-base z-10 text-white flex justify-center items-center">
                  {renderBasketCount()}
                </span>
              )}
              <BasketIconOutline width={22} height={22} fill={'#000'} />
            </div>
          )}
        </div>
      </div>
      {hasAddress ? <HomePageAddressBox /> : null}
      <div className={classNames(`overflow-auto w-full`, className)}>
        {children}
        {hasFooter ? (
          <Footer>
            <FooterContent />
          </Footer>
        ) : null}
      </div>

      {hasBottomNavigation && (
        <div
          className={classNames(
            hasBottomNavigation && 'bg-grey-50 border-t border-grey-100',
          )}
        >
          <BottomNavigation />
        </div>
      )}
    </div>
  );
};
export default MainPageLayout;
