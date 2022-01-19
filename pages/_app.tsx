import axios from "axios";
import { SWRConfig } from "swr";
import type { AppProps } from "next/app";
import "@fontsource/inter";
import { Layout } from "components";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  return (
    <SWRConfig
      value={{ fetcher, refreshInterval: 60000, revalidateOnFocus: false }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}

export default MyApp;
