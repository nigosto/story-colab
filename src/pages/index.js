// import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
import styles from "../styles/home.module.scss";
import { Button, List, Typography } from "antd";
// import Link from "next/link";

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/room/all");
  const data = await res.json();

  return {
    props: {
      rooms: data.rooms,
    },
  };
}

export default function Home({ rooms }) {
  // const [session, setSession] = useState();
  const router = useRouter();

  // useEffect(() => {
  //   getSession().then((s) => {
  //     if (s) {
  //       setSession(s);
  //     } else {
  //       setSession(undefined);
  //     }
  //   });
  // }, [router]);

  return (
    <section className={styles.homeSection}>
      <Typography.Title level={2}>Available Rooms</Typography.Title>
      <List
        className={styles.roomList}
        itemLayout="vertical"
        size="large"
        dataSource={rooms}
        renderItem={(room) => (
          <List.Item className={styles.room} key={room._id}>
            <List.Item.Meta
              title={
                <a href={`http://localhost:3000/room/${room._id}`}>
                  {room.name}
                </a>
              }
              description={room.description}
            />
            <Button
              onClick={() =>
                (window.location = `http://localhost:3000/room/${room._id}`)
              }
              type="primary"
            >
              Join Room
            </Button>
          </List.Item>
        )}
      />
    </section>
  );
}
