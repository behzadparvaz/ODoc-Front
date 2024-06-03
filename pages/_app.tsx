import { QueryClient, QueryClientProvider } from 'react-query'
import '../styles/globals.css'
import { createRef, useMemo, useState } from 'react';
import { wrapper } from '../redux/store';
import dynamic from 'next/dynamic';
import NotificationWrapper from '@com/_atoms/NotificationWrapper';

function MyApp({ Component, pageProps }) {
  const ModalCreator = useMemo(() => dynamic(() => import('@com/modal')), []);
  const modalNode = createRef<HTMLDivElement>();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // cacheTime: 1000 * 60 * 10,
            // refetchOnWindowFocus: false,
            staleTime: Infinity,
            retry: 3,
          },
        },
      })
  );
  return (

    <QueryClientProvider client={queryClient}>
      <NotificationWrapper />

      <ModalCreator ref={modalNode} />
      <div dir='rtl'>
        <Component {...pageProps} />
        <div id="modal-root"></div>
      </div>
    </QueryClientProvider>
  )
}

export default wrapper.withRedux(MyApp);