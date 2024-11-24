import type { AppProps } from 'next/app';
import { initMSW } from '~/mocks/init-msw';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

initMSW();
const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
