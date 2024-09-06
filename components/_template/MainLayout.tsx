import BottomNavigation from '@com/_molecules/BottomNavigation';
import Footer from '@com/_molecules/Footer';
import {
  mobileModeMaxWidthClassName,
  shouldShowMobileMode,
} from '@configs/ControlMobileView';
import classNames from 'classnames';

interface Props {
  children: React.ReactNode;
  headerChildren?: React.ReactNode;
  className?: string;
  title?: string;
  hasBottomNavigation?: boolean;
}

const MainLayout = ({
  children,
  className = '',
  title,
  headerChildren,
  hasBottomNavigation = true
}: Props) => {
  return (
    <div
      className={classNames(
        title ? 'pt-[78px]' : '',
        hasBottomNavigation && 'pb-[57px]',
        `w-full h-screen bg-white flex flex-col`,
        shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''
      )}
    >
      {(title || headerChildren) && (
        <div
          className={classNames(
            `fixed px-4 bg-white z-10 text-grey-500 text-xl inset-x-0 py-6 top-0 flex justify-between items-center`,
            shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''
          )}
        >
          {title && <h1>{title}</h1>}
          {headerChildren}
        </div>
      )}
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
export default MainLayout;
