import BottomNavigation from '@com/_molecules/BottomNavigation';
import Footer from '@com/_molecules/Footer';
import {
  mobileModeMaxWidthClassName,
  shouldShowMobileMode,
} from '@configs/ControlMobileView';

interface Props {
  children: React.ReactNode;
  headerChildren?: React.ReactNode;
  className?: string;
  title?: string;
}

const MainLayout = ({ children, className = '', title, headerChildren }: Props) => {
  return (
    <div
      className={`w-full h-screen ${title ? 'pt-[78px]' : ''} overflow-auto pb-[95px] bg-white ${shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''}`}
    >
      {(title || headerChildren) && (
        <div
          className={`fixed px-4 bg-white z-10 text-grey-500 text-xl inset-x-0 py-6 top-0 border-b border-grey-100 flex justify-between items-center ${shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''}`}
        >
          {title &&
            <h1>{title}</h1>
          }
          {headerChildren}
        </div>
      )}
      <div className={className} style={{ minHeight: 'calc(100vh - 222px)' }}>
        {children}
      </div>
      <BottomNavigation />
    </div>
  );
};
export default MainLayout;
