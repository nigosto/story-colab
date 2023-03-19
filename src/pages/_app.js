import "@/styles/globals.scss";
import { Layout, Spin } from "antd";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import PageHeader from "./components/header";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const { Content, Footer } = Layout;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const start = () => {
      console.log("start");
      setIsLoading(true);
    };
    const end = () => {
      console.log("finished");
      setIsLoading(false);
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <SessionProvider session={session}>
      <Head>
        <title>Story Colab</title>
        <link rel="icon" type="image/png" href="/icon.png" />
      </Head>
      <Layout className="site layout">
        <PageHeader />
        <Content className="site-main">
          {isLoading ? (
            <Spin tip="Loading">
              <div className="loading" />
            </Spin>
          ) : (
            <Component {...pageProps} />
          )}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Story Colab ©2023 Created by Team Dangling Pointers
        </Footer>
      </Layout>
    </SessionProvider>
  );
}
