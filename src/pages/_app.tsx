import "../styles/global.css";
import { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactNode, useState } from "react";
import { FileContext } from "@/contexts/FileContext";
import { Provider } from 'react-redux';

import { store } from '@/store/store';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout };

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [files, setFiles] = useState<File[] | null>(null);

  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <Provider store={store}>
      <FileContext.Provider value={[files, setFiles]}>
        <Component {...pageProps} />
      </FileContext.Provider>
    </Provider>
  );
}
