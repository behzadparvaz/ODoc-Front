import { PropsWithChildren, ReactNode, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

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

  // New prop for scrolling to top
  scrollToTop?: boolean;
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
  scrollToTop, // Destructure new prop
  children,
}: PropsWithChildren<MainLayoutProps>) => {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to top on route change if scrollToTop is true
  useEffect(() => {
    if (scrollToTop) {
      scrollRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [router.asPath, scrollToTop]); // Dependency on router.asPath

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
            // hasLogo={!loginWithTapsiSSO}
            hasLogo={false}
            hasAddress={hasAddress}
            backIconHandler={backIconHandler}
          />
        )}

        <div
          ref={scrollRef}
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
