import type { AppProps } from 'next/app';
import { GlobalStyle } from '@daengle/design-system';
import { initMSW } from '~/mocks/init-msw';
import QueryProvider from '~/providers/query-provider';

initMSW();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryProvider>
      <GlobalStyle>
        <Component {...pageProps} />
      </GlobalStyle>
    </QueryProvider>
  );
}
