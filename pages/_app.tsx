import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/globals.css';
import { createRef, useEffect, useMemo, useState } from 'react';
import { wrapper } from '../redux/store';
import dynamic from 'next/dynamic';
import NotificationWrapper from '@com/_atoms/NotificationWrapper';
import CheckRedirectLoginOrNotLogin from '@com/_atoms/CheckRedirectLoginStatus';
import Head from 'next/head';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
      }),
  );

  return (
    <>
      <Head>
        <title>تپسی دکتر - داروهای مورد نیاز را به سرعت دریافت کنید</title>
        <link rel="manifest" href="/manifast.json" />
        <link rel="robots" href="/robots.txt" />
        <meta name="application-name" content="تپسی دکتر" />
        <meta
          name="description"
          content="تپسی دکتر؛ داروخانه آنلاین با تحویل سریع دارو در کمتر از دو ساعت. خرید دارو از داروخانه‌های معتبر به صورت آنلاین، بدون نیاز به مراجعه حضوری. تجربه‌ای نوین از خدمات دارویی راحت و امن. سفارش آنلاین دارو با سریع‌ترین زمان تحویل"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#e5f8f8" />
        <meta name="msapplication-TileColor" content="#e5f8f8" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tapsi.doctor/" />
        <meta
          property="og:title"
          content="تپسی دکتر - داروهای مورد نیاز را به سرعت دریافت کنید"
        />
        <meta
          property="og:description"
          content="دو ساعت. خرید دارو از داروخانه‌های معتبر به صورت آنلاین، بدون نیاز به مراجعه حضوری. تجربه‌ای نوین از خدمات دارویی راحت و امن. سفارش آنلاین دارو با سریع‌ترین زمان تحویل."
        />
        <meta
          property="og:image"
          content="/static/images/brandIcons/apple-touch-icon-180x180.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://tapsi.doctor/" />
        <meta
          property="twitter:title"
          content="تپسی دکتر - داروهای مورد نیاز را به سرعت دریافت کنید"
        />
        <meta
          property="twitter:description"
          content="دو ساعت. خرید دارو از داروخانه‌های معتبر به صورت آنلاین، بدون نیاز به مراجعه حضوری. تجربه‌ای نوین از خدمات دارویی راحت و امن. سفارش آنلاین دارو با سریع‌ترین زمان تحویل."
        />
        <meta
          property="twitter:image"
          content="/static/images/brandIcons/apple-touch-icon-120x120.png"
        />

        <link
          rel="shortcut icon"
          href="/static/images/brandIcons/favicon.ico"
          type="image/x-icon"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          href="/static/images/brandIcons/favicon-48x48.png"
        />

        <link
          rel="apple-touch-icon"
          href="/static/images/brandIcons/apple-touch-icon.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/static/images/brandIcons/apple-touch-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/static/images/brandIcons/apple-touch-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/static/images/brandIcons/apple-touch-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/static/images/brandIcons/apple-touch-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/static/images/brandIcons/apple-touch-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/static/images/brandIcons/apple-touch-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/static/images/brandIcons/apple-touch-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/static/images/brandIcons/apple-touch-icon-180x180.png"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <NotificationWrapper />

        <ModalCreator ref={modalNode} />
        <CheckRedirectLoginOrNotLogin />

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
