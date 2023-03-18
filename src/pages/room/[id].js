import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Select, Typography, List, Button, Form } from "antd";
import styles from "../../styles/room.module.scss";
import { useRouter } from "next/router";

let globalWs;

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`http://localhost:3000/api/room/get/${id}`);
  const data = await res.json();

  return {
    props: {
      room: data.room,
    },
  };
}

export default function Room({ room }) {
  const [ws, setWS] = useState(null);
  const [users, setUsers] = useState([]);
  const [session, setSession] = useState();
  const [bots, setBots] = useState([]);
  const [roles, setRoles] = useState({});
  const [botsCount, setBotsCount] = useState(0);
  const [start, setStart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const handleMessage = async (msg) => {
    const res = JSON.parse(msg.data);
    if (res.type === "added_bot") {
      setBots(res.bots);
      return;
    }
    setUsers(res.participants);
  };

  const socketInitialize = () => {
    globalWs = new WebSocket("ws://192.168.105.131:5000");
    setWS(globalWs);
    globalWs.onerror = (err) => console.error(err);
    globalWs.onopen = async () => {
      const s = await getSession();
      globalWs.send(
        JSON.stringify({
          type: "connection_event",
          room_id: room._id,
          user_id: s.user._id,
          username: s.user.username,
          waiting_room: true,
        })
      );
    };
    globalWs.onmessage = handleMessage;
  };

  useEffect(() => {
    getSession().then((s) => {
      if (!s) {
        router.replace("/auth/signin");
      } else {
        setIsLoading(false);
        setSession(s);
        if (!globalWs) {
          socketInitialize();
        }
      }
    });
  }, []);

  const handleFinish = async () => {
    await fetch(`http://localhost:3000/api/room/update/${room._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        participants: users
          .map((u) => {
            return {
              name: u.username,
              isBot: false,
              image: "none",
              storyteller: u.user_id === room.creator._id,
              role: roles[u.user_id],
            };
          })
          .concat(
            bots.map((b) => {
              return {
                name: b,
                isBot: true,
                image: "none",
                storyteller: false,
                role: roles[b],
              };
            })
          ),
      }),
    });

    ws.send(
      JSON.stringify({
        type: "game_started",
        room_id: room._id,
        user_id: session.user._id,
      })
    );

    setStart(true);
  };

  const handleAddBot = () => {
    ws.send(
      JSON.stringify({
        type: "added_bot",
        room_id: room._id,
        user_id: session.user._id,
        bots: [...bots, "Bot " + (botsCount + 1)],
      })
    );
    setBotsCount(botsCount + 1);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!start) {
    return (
      <section className={styles.waitingRoomSection}>
        <Typography.Title className={styles.pageTitle}>
          Waiting room for {room.name}
        </Typography.Title>
        <Form className={styles.waitingRoomForm} onFinish={handleFinish}>
          <div className={styles.participants}>
            <Typography.Title level={3}>Participants</Typography.Title>
            <List
              className={styles.participantsList}
              dataSource={users}
              renderItem={(item) => (
                <List.Item>
                  <span>{item.username}</span>
                  {session?.user._id === room.creator._id ? (
                    <Select
                      className={styles.selectRoles}
                      onChange={(value) => {
                        setRoles({ ...roles, [item.user_id]: value });
                      }}
                      options={room.roles.map((r) => {
                        return { label: r, value: r };
                      })}
                    />
                  ) : null}
                </List.Item>
              )}
            />
          </div>
          <div className={styles.bots}>
            <Typography.Title level={3}>Bots</Typography.Title>
            {bots.length == 0 ? null : (
              <List
                dataSource={bots}
                renderItem={(b) => (
                  <List.Item>
                    <span>{b}</span>
                    {session?.user._id === room.creator._id ? (
                      <Select
                        onChange={(value) => {
                          setRoles({ ...roles, [b]: value });
                        }}
                        options={room.roles.map((r) => {
                          return { label: r, value: r };
                        })}
                      />
                    ) : null}
                  </List.Item>
                )}
              />
            )}
            {session?.user._id === room.creator._id ? (
              <Button
                onClick={handleAddBot}
                className={styles.addBotButton}
                type="primary"
              >
                Add Bot
              </Button>
            ) : null}
          </div>
          {session?.user._id === room.creator._id ? (
            <Button
              htmlType="submit"
              className={styles.startButton}
              type="primary"
            >
              Start Story
            </Button>
          ) : null}
        </Form>
      </section>
    );
  } else {
    return (
      <Button type="primary" onClick={() => setStart(false)}>
        Click
      </Button>
    );
  }
}
