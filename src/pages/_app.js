import "@/styles/globals.scss";
import { useState } from "react";
import { Menu, Layout } from "antd";
import { HomeOutlined, ScheduleOutlined } from "@ant-design/icons";
import Head from "next/head";

const { Header, Content, Footer } = Layout;

const items = [
  {
    label: "Home",
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: "Create Room",
    key: "createRoom",
    icon: <ScheduleOutlined />,
  },
];

export default function App({ Component, pageProps }) {
  const [current, setCurrent] = useState("home");
  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <>
      <Head>
        <title>Story Colab</title>
        <link rel="icon" type="image/png" href="/icon.png" />
      </Head>
      <Layout className="site layout">
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            onClick={onClick}
            selectedKeys={[current]}
            items={items}
          />
        </Header>
        <Content className="site-main">
          <Component {...pageProps} />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Story Colab ©2023 Created by Team Dangling Pointers
        </Footer>
      </Layout>
    </>
  );
}
