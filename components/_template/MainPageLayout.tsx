import NextImage from '@com/_core/NextImage';
import {
  mobileModeMaxWidthClassName,
  shouldShowMobileMode,
} from '@configs/ControlMobileView';
import classNames from 'classnames';
import tapsiLogo from '@static/images/staticImages/tapsi-daroo-logo.png';
import dynamic from 'next/dynamic';
import { BasketIconOutline } from '@com/icons';
import { routeList } from '@routes/routeList';
import { useRouter } from 'next/router';

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
}

const MainPageLayout = ({
  children,
  className = '',
  headerClassName = '',
  hasBottomNavigation = true,
  hasFooter = true,
  hasAddress = true,
}: Props) => {
  const { push } = useRouter();
  return (
    <div
      className={classNames(
        hasBottomNavigation && hasAddress && 'pb-[54px]',
        `w-full h-screen pt-[54px] bg-white flex flex-col`,
        shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : '',
      )}
    >
      <div
        className={classNames(
          `fixed px-4 bg-white z-10 text-grey-500 text-xl inset-x-0 py-[17px] top-0 items-center flex justify-between ${headerClassName}`,
          shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : '',
        )}
      >
        <NextImage src={tapsiLogo} height={20} width={110} />
        <div className="w-[22px]" onClick={() => push(routeList.basket)}>
          <BasketIconOutline width={22} height={22} fill={'#000'} />
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
      {hasBottomNavigation && <BottomNavigation />}
    </div>
  );
};
export default MainPageLayout;
