import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: process.env.WS_PORT });

// key: roomId
// value: { participants: [{ws, user_id}] }
let roomPool = {};

const MESSAGE_HANDLER = {
  "connection_event": function (ws, room, msg) {


  },
}

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {

    console.log("Recieved", data.toString());

    let msg;
    try {
      msg = JSON.parse(data, toString());
      console.log("Parsed", msg);
    } catch (e) {
      console.error("Parse error", data.toString());
      ws.close(4100, "Message must be in a JSON format.");
      return;
    }

    if (!msg["type"]) {
      console.error("Format error", data.toString());

      ws.close(4200, `Message missing "type".`);
      return;
    }

    if (!msg["room_id"]) {
      console.error("Format error", data.toString());

      ws.close(4200, `Message missing "room_id".`);
      return;
    }

    if (!msg["user_id"]) {
      console.error("Format error", data.toString());

      ws.close(4200, `Message missing "user_id".`);
      return;
    }

    if (!MESSAGE_HANDLER[msg.type]) {
      console.error("Unsupoorted error", data.toString());

      ws.close(4210, `Message type is not supported.`);
      return;
    }

    let room = roomPool[msg["room_id"]];

    if (!room) {
      room = { participants: [{ ws, user_id: msg["user_id"] }] };
    }

    for (let participant of room.participants) {
      console.log("Sending", data.toString());
      participant.ws.send(data.toString());
      // participant.ws.send(JSON.stringify(msg));
    }
  });
});

console.log("WebSocket Server Started");