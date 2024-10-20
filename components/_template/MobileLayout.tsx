import {
  mobileModeMaxWidthClassName,
  shouldShowMobileMode
} from '@configs/ControlMobileView';
import classNames from 'classnames';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const MobileLayout = ({ children, className = '' }: Props) => {
  return (
    <div className={classNames(
      `w-full h-screen overflow-auto bg-white`,
      shouldShowMobileMode && mobileModeMaxWidthClassName + ' mx-auto'
    )}>
      <div className={classNames(className, 'min-h-screen')}>
        {children}
      </div>
    </div>
  );
};
export default MobileLayout;
