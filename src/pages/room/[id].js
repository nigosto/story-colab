import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Select, Typography, List, Button, Form, Input } from "antd";
import styles from "../../styles/room.module.scss";
import { useRouter } from "next/router";
import { MessageBox, MessageList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";

let globalWs,
  globalSession,
  globalMessages = [];

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
  const [turn, setTurn] = useState(false);
  const [messages, setMessages] = useState([]);
  const router = useRouter();

  const handleMessage = async (msg) => {
    const res = JSON.parse(msg.data);
    if (res.type === "end_game") {
      if (globalSession.user._id === room.creator._id) {
        router.replace(`/scene/${room._id}`);
      } else {
        router.replace("/");
      }
    }
    if (res.type === "added_bot") {
      setBots(res.bots);
      return;
    }
    if (res.type === "game_started") {
      setStart(true);
      return;
    }
    if (res.type === "turn_event") {
      if (globalSession.user.username === res.username) {
        setTurn(true);
      }
      return;
    }
    if (res.type === "character_line") {
      globalMessages.push({
        position: "left",
        type: "text",
        title: res.role,
        text: res.text,
      });
      setMessages([
        ...messages,
        {
          position: "left",
          type: "text",
          title: res.role,
          text: res.text,
        },
      ]);
      console.log(globalMessages);
      console.log(messages);
      return;
    }
    setUsers(res.participants);
  };

  const socketInitialize = () => {
    globalWs = new WebSocket("ws://localhost:5000");
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
        globalSession = s;
        setSession(s);
        if (!globalWs) {
          socketInitialize();
        }
      }
    });
  }, []);

  const handleFinish = async () => {
    await fetch(
      `http://localhost:3000/api/room/update/participants/${room._id}`,
      {
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
      }
    );

    ws.send(
      JSON.stringify({
        type: "game_started",
        room_id: room._id,
        user_id: session.user._id,
        description: room.description,
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

  const handleCharacterLine = (values) => {
    ws.send(
      JSON.stringify({
        type: "character_line",
        room_id: room._id,
        user_id: session.user._id,
        text: values.text,
        role: roles[globalSession.user._id],
      })
    );
    setTurn(false);
  };

  const handleEndGame = () => {
    ws.send(
      JSON.stringify({
        type: "end_game",
        room_id: room._id,
        user_id: session.user._id,
      })
    );
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
                      placeholder="Select role"
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
                        placeholder="Select role"
                        className={styles.selectRoles}
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
      <section className={styles.roomSection}>
        <Typography.Title className={styles.pageTitle}>
          Chat Room for {room.name}
        </Typography.Title>
        <div className={styles.participantsStart}>
          <Typography.Title level={2}>Participants</Typography.Title>
          <List
            dataSource={users}
            renderItem={(item) => (
              <List.Item>
                <span>
                  {item.username} - {roles[item.user_id]}
                </span>
                {session?.user._id === room.creator._id ? (
                  <Button
                    onClick={() => {
                      ws.send(
                        JSON.stringify({
                          type: "turn_event",
                          room_id: room._id,
                          user_id: session.user._id,
                          turn_user_id: item.user_id,
                          username: item.username,
                          role: roles[item.user_id],
                        })
                      );
                    }}
                    type="primary"
                  >
                    Give Turn
                  </Button>
                ) : null}
              </List.Item>
            )}
          />
        </div>
        <div className={styles.botsStart}>
          <Typography.Title level={2}>Bots</Typography.Title>
          {bots.length == 0 ? null : (
            <List
              dataSource={bots}
              renderItem={(b) => (
                <List.Item>
                  <span>
                    {b} - {roles[b]}
                  </span>
                  {session?.user._id === room.creator._id ? (
                    <Button
                      onClick={() => {
                        ws.send(
                          JSON.stringify({
                            type: "turn_event",
                            room_id: room._id,
                            user_id: session.user._id,
                            turn_user_id: null,
                            username: b,
                            role: roles[b],
                          })
                        );
                      }}
                      type="primary"
                    >
                      Give Turn
                    </Button>
                  ) : null}
                </List.Item>
              )}
            />
          )}
        </div>
        <div className={styles.chat}>
          <MessageList
            className="message-list"
            lockable={true}
            toBottomHeight={"100%"}
            dataSource={globalMessages}
          />
        </div>
        <Form onFinish={handleCharacterLine} className={styles.sendMessage}>
          <Form.Item name="text" label="Message: ">
            <Input placeholder="Enter your line" />
          </Form.Item>
          <Button disabled={!turn} htmlType="submit" type="primary">
            Send
          </Button>
        </Form>
        {session?.user._id === room.creator._id ? (
          <Form onFinish={handleEndGame}>
            <Button htmlType="submit" type="primary">
              End Story
            </Button>
          </Form>
        ) : null}
      </section>
    );
  }
}
