import NextImage from '@com/_core/NextImage';
import BottomNavigation from '@com/_molecules/BottomNavigation';
import {
  mobileModeMaxWidthClassName,
  shouldShowMobileMode,
} from '@configs/ControlMobileView';
import classNames from 'classnames';
import tapsiLogo from '@static/images/staticImages/tapsi-daroo-logo.png';

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
        hasBottomNavigation && 'pb-[57px]',
        `w-full h-screen pt-[68px] bg-white flex flex-col`,
        shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : '',
      )}
    >
        <div
          className={classNames(
            `fixed px-4 bg-white z-10 text-grey-500 text-xl inset-x-0 py-6 top-0 border-b border-grey-100 flex justify-between items-center ${headerClassName}`,
            shouldShowMobileMode
              ? mobileModeMaxWidthClassName + ' mx-auto'
              : '',
          )}
        >
          <NextImage src={tapsiLogo} height={20} width={85} />
        </div>
      <div
        className={classNames(
          `overflow-auto min-h-[calc(100vh - 222px)]`,
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
