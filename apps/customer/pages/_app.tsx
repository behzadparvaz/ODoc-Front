import { QueryClient, QueryClientProvider } from 'react-query'
import '../styles/globals.css'
import { createRef, useMemo, useState } from 'react';
import { wrapper } from '../redux/store';
import dynamic from 'next/dynamic';
import NotificationWrapper from '@com/_atoms/NotificationWrapper';
import ToggleRedirectLoginOrNotLogin from '@com/_atoms/ToggleRedirectLoginStatus';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  const ModalCreator = useMemo(() => dynamic(() => import('@com/modal')), []);
  const modalNode = createRef<HTMLDivElement>();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            retry: 3,
          },
        },
      })
  );
  return (
    <>

      <Head>
        <meta name="application-name" content="tapsiDoctor" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#e5f8f8" />
        <meta name="apple-mobile-web-app-title" content="tapsiDoctor" />
        <meta
          name="description"
          content="سامانه ثبت آنلاین نسخه"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="none" />
        <meta name="theme-color" content="#e5f8f8" />
        <meta name="msapplication-TileColor" content="#e5f8f8" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta
          content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no, viewport-fit=cover"
          name="viewport"
        />

        <link rel="apple-touch-icon" sizes="180x180" href="/static/images/staticImages/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/images/staticImages/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/images/staticImages/favicon-16x16.png" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <NotificationWrapper />

        <ModalCreator ref={modalNode} />
        <ToggleRedirectLoginOrNotLogin />
        <div dir='rtl'>
          <Component {...pageProps} />
          <div id="modal-root"></div>
        </div>
      </QueryClientProvider>
    </>
  )
}

export default wrapper.withRedux(MyApp);