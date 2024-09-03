import NextImage from '@com/_core/NextImage';
import {
  mobileModeMaxWidthClassName,
  shouldShowMobileMode,
} from '@configs/ControlMobileView';
import classNames from 'classnames';
import tapsiLogo from '@static/images/staticImages/tapsi-daroo-logo.png';
import dynamic from 'next/dynamic';
const HomePageAddressBox = dynamic(
  () => import('@com/_molecules/HomePageAddressBox'),
);
const BottomNavigation = dynamic(
  () => import('@com/_molecules/BottomNavigation'),
);

interface Props {
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  hasBottomNavigation?: boolean;
}

const MainPageLayout = ({
  children,
  className = '',
  headerClassName = '',
  hasBottomNavigation = true,
}: Props) => {
  return (
    <div
      className={classNames(
        hasBottomNavigation && 'pb-[54px]',
        `w-full h-screen pt-[54px] bg-white flex flex-col`,
        shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : '',
      )}
    >
      <div
        className={classNames(
          `fixed px-4 bg-white z-10 text-grey-500 text-xl inset-x-0 py-[17px] top-0 flex items-center ${headerClassName}`,
          shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : '',
        )}
      >
        <NextImage src={tapsiLogo} height={20} width={110} />
      </div>
      <HomePageAddressBox />
      <div
        className={classNames(
          `overflow-auto min-h-[calc(100vh-222px)]`,
          className,
        )}
      >
        {children}
      </div>
      {hasBottomNavigation && <BottomNavigation />}
    </div>
  );
};
export default MainPageLayout;