import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

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

export default function WaitingRoom({ room }) {
  const [data, setData] = useState(null);
  const [ws, setWS] = useState(null);
  const [users, setUsers] = useState([]);

  const handleMessage = async (msg) => {
    //TODO: execute different function based on msg.data.type
    const res = JSON.parse(msg.data);
    if (res.type === "connection_event") {
      setData(res);
      setUsers((prevUsers) => [...prevUsers.filter(u => u !== res.user_id), res.user_id]);
    }
  };

  const socketInitialize = () => {
    const newWs = new WebSocket("ws://192.168.105.131:5000");
    newWs.onerror = (err) => console.error(err);
    newWs.onopen = async () => {
      const session = await getSession();
      newWs.send(
        JSON.stringify({
          type: "connection_event",
          room_id: room._id,
          user_id: session.user._id,
          waiting_room: true,
        })
      );
      setWS(newWs);
    };
    newWs.onmessage = handleMessage;
  };

  useEffect(() => {
    socketInitialize();
  }, []);

  const sendMesage = async () => {
    const session = await getSession();
    ws.send(JSON.stringify({
      type: "connection_event",
      room_id: room._id,
      user_id: session.user._id,
      waiting_room: true,
      test: "test"
    }))
  };

  return (
    <div>
      {users}

      <button onClick={sendMesage}>Click me</button>
    </div>
  );
}
