import { QueryClient, QueryClientProvider } from 'react-query'
import '../styles/globals.css'
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
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
      <div dir='rtl'>
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  )
}

export default MyApp
