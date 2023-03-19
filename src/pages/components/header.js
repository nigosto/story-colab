import { Layout, Menu, Typography } from "antd";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  HomeOutlined,
  ScheduleOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

export default function PageHeader() {
  const router = useRouter();
  const [current, setCurrent] = useState(router.pathname);
  const { data: session } = useSession();

  useEffect(() => {
    setCurrent(router.asPath);
  }, [router]);

  return (
    <Header>
      <Menu
        className="header-menu"
        theme="dark"
        mode="horizontal"
        selectedKeys={current}
      >
        <Menu.ItemGroup>
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link href="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/room/create" icon={<ScheduleOutlined />}>
            <Link href="/room/create">Create Room</Link>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup>
          {session ? (
            <>
              <Menu.Item>Welcome, {session.user.username}</Menu.Item>
              <Menu.Item key="/auth/signout" icon={<LogoutOutlined />}>
                <a onClick={() => signOut()}>Sign Out</a>
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item key="/auth/signin" icon={<LoginOutlined />}>
                <Link href="/auth/signin">Sign In</Link>
              </Menu.Item>
              <Menu.Item key="/auth/signup" icon={<UserAddOutlined />}>
                <Link href="/auth/signup">Sign Up</Link>
              </Menu.Item>
            </>
          )}
        </Menu.ItemGroup>
      </Menu>
    </Header>
  );
}
