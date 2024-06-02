import { shouldShowMobileMode } from '@configs/ControlMobileView';
import { useMediaPredicate } from 'react-media-hook';

export function useMediaQuery() {
  const mobileSize = useMediaPredicate('(max-width: 411px)');
  const tabletSize = shouldShowMobileMode
    ? useMediaPredicate('(min-width:412px) and (max-width:99999px)')
    : useMediaPredicate('(min-width:412px) and (max-width:959px)');
  const desktopSize = shouldShowMobileMode
    ? useMediaPredicate('(min-width:100000px)')
    : useMediaPredicate('(min-width:960px)');

  const notDesktopSize = mobileSize || tabletSize;
  const notMobileSize = desktopSize || tabletSize;
  const notTabletSize = mobileSize || desktopSize;
  const sizeDetected = mobileSize || tabletSize || desktopSize;

  return { mobileSize, tabletSize, desktopSize, notDesktopSize, notMobileSize, notTabletSize, sizeDetected };
}
