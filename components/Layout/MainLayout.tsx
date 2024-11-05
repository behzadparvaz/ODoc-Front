import { PropsWithChildren, ReactNode } from 'react';

import Header from './Header';
import BottomNavigation from './BottomNavigation';

export interface MainLayoutProps {
  // header.props
  hasHeader?: boolean;
  headerType?: 'WithLogo' | 'withoutLogo';
  leftSection?: ReactNode;
  hasBackButton?: boolean;
  hasBasketIcon?: boolean;
  title?: string | string[];
  rightIcon?: ReactNode;
  searchSection?: ReactNode;
  hasAddress?: boolean;
  backIconHandler?: () => void;
  headerClassName?: string;
  // bottom.props
  hasBottomNavigation?: boolean;

  mainClassName?: string;
  loginWithTapsiSSO?: boolean;
}

export const MainLayout = ({
  hasHeader,
  headerType,
  leftSection,
  hasBackButton,
  hasBasketIcon,
  title,
  rightIcon,
  searchSection,
  hasAddress,
  backIconHandler,
  headerClassName,

  hasBottomNavigation,

  mainClassName,
  loginWithTapsiSSO,
  children,
}: PropsWithChildren<MainLayoutProps>) => {
  return (
    <div className="w-full h-svh flex justify-center bg-grey-100">
      <div
        className={`relative bg-white flex flex-col gap-0 w-full sm:w-[460px] h-svh overflow-hidden`}
      >
        {hasHeader && (
          <Header
            type={headerType}
            classname={headerClassName}
            title={title}
            searchSection={searchSection}
            rightIcon={rightIcon}
            leftSection={leftSection}
            hasBackButton={hasBackButton}
            hasBasketIcon={hasBasketIcon}
            hasLogo={!loginWithTapsiSSO}
            hasAddress={hasAddress}
            backIconHandler={backIconHandler}
          />
        )}

        <div
          className={`h-full scroll-xsooth overflow-y-scroll ${mainClassName}`}
        >
          {children}
        </div>

        {hasBottomNavigation && (
          <div className="h-[64px]">
            <BottomNavigation />
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ req }) => {
  const cookies = req.headers.cookie;
  const loginWithTapsiSSO = cookies?.loginWithTapsiSSO;
  return {
    props: {
      loginWithTapsiSSO,
    },
  };
};
