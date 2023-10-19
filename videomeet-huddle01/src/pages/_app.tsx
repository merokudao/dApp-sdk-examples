import HuddleProvider from '../components/ClientComponents/HuddleProvider';
import '../styles/globals.css';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <HuddleProvider>
      <Component {...pageProps} />
    </HuddleProvider>
  );
}

export default MyApp;
