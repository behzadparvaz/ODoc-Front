import NotificationWrapper from '@com/_atoms/NotificationWrapper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { createRef, useEffect, useMemo, useRef } from 'react';
import { wrapper } from '../redux/store';
import '../styles/globals.css';
const LoginWithSSO = dynamic(() => import('@com/_atoms/loginWithSSO'));
import packageJson from 'package.json';
import { GoogleTagManager } from '@next/third-parties/google';
import useModal from '@hooks/useModal';
import SelectAddress from '@com/_organisms/SelectAddress';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: 3,
    },
  },
});

function MyApp({ Component, pageProps }) {
  const ModalCreator = useMemo(() => dynamic(() => import('@com/modal')), []);
  const modalNode = createRef<HTMLDivElement>();
  const refUpdateTimeOut = useRef(null);
  const { addModal } = useModal();

  const updateApplication = () => {
    refUpdateTimeOut.current = setTimeout(() => {
      hotReload();
    }, 4000);
    window.localStorage?.setItem('application_version', packageJson?.version);
  };

  // useEffect(() => {
  //   new Promise((resolve, reject) => {
  //     if (!navigator.geolocation) {
  //       return reject(new Error('Geolocation not supported'));
  //     }
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         resolve({
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         });
  //       },
  //       (error) => {
  //         openLocationsModal();
  //         reject(error);
  //       },
  //       {
  //         enableHighAccuracy: true,
  //         timeout: 15000,
  //         maximumAge: 0,
  //       },
  //     );
  //   });
  // }, []);
  useEffect(() => {
    if (process.env.REACT_APP_ENV !== 'demo') {
      document.addEventListener('update-new-content', function (event: any) {
        if (event?.detail?.hasUpdate) {
          updateApplication();
        }
      });
      if (
        localStorage?.getItem('application_version') !== packageJson?.version
      ) {
        updateApplication();
      }
    }
    return () => {
      if (refUpdateTimeOut?.current) clearTimeout(refUpdateTimeOut?.current);
    };
  }, []);

  const hotReload = () => {
    navigator?.serviceWorker?.ready?.then(() => {
      navigator?.serviceWorker.getRegistrations().then((registrations) => {
        registrations?.forEach((registration) => {
          registration?.unregister();
        });
      });
      caches
        .keys()
        .then((keyList) => {
          return Promise?.all(
            keyList?.map((key) => {
              return caches?.delete(key);
            }),
          );
        })
        .then(() => {
          window?.location?.reload();
        });
    });
  };
  return (
    <>
      <Head>
        <title>تپسی دکتر - سلامتی هر لحظه هرجا</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <meta
          name="google-site-verification"
          content="3NCSkWm67rju_OABL3Otkq53bI_SzF-x3mMRKR9hgLw"
        />
      </Head>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID as string} />
      <QueryClientProvider client={queryClient}>
        <NotificationWrapper />
        <ModalCreator ref={modalNode} />
        <div dir="rtl">
          <Component {...pageProps} />
          <div id="modal-root"></div>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
