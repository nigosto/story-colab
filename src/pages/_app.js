import "@/styles/globals.scss";
import { Layout } from "antd";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import PageHeader from "./components/header";

const { Content, Footer } = Layout;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  return (
    <SessionProvider session={session}>
      <Head>
        <title>Story Colab</title>
        <link rel="icon" type="image/png" href="/icon.png" />
      </Head>
      <Layout className="site layout">
        <PageHeader />
        <Content className="site-main">
          <Component {...pageProps} />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Story Colab ©2023 Created by Team Dangling Pointers
        </Footer>
      </Layout>
    </SessionProvider>
  );
}
