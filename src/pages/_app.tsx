import { type AppType } from "next/app";

import { api } from "@/utils/api";
import AppWithProviders from "@/components/AppWithProviders";
import Metatags from "@/components/Metatags";
import Layout from "@/components/Layout";

import "@/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AppWithProviders>
      <Metatags />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppWithProviders>
  );
};

export default api.withTRPC(MyApp);
