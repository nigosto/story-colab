import mongoose from 'mongoose';
import { WebSocketServer } from 'ws';

import Room from "./src/models/Room.js"

await mongoose.connect('mongodb://192.168.105.14:27017/story-colab');

const wss = new WebSocketServer({ port: process.env.WS_PORT });

// key: roomId
// value: { participants: [{ws, user_id}] }
let roomPool = {};

const MESSAGE_HANDLER = {
  "connection_event": async function (ws, room, msg) {
    let participants = room.participants = room.participants ?? [];

    if (participants.filter(p => p.user_id === msg.user_id).length === 0) {
      let participant = {
        user_id: msg.user_id,
        room_id: msg.room_id,
        username: msg.username,
        wsConn: ws
      };
      ws.participant = participant;

      participants.push(participant);
    }
  },
  "game_started": async function (ws, room, msg) {
    room.details = await Room.find({ _id: msg["room_id"] });
    console.log(room.details);
  },
  "disconnect": async function (ws, room, msg) {
    console.log("disconnected", msg);
  }
}

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('close', (code, reason) => {
    let participant = {
      room_id: ws.participant.room_id,
      user_id: ws.participant.user_id,
      username: ws.participant.username,
      idx: ws.participant.idx,
    }
    console.log('closing', code, reason, participant);
    roomPool[participant.room_id].participants.splice(roomPool[participant.room_id].participants.findIndex(prt=>prt.user_id === participant.user_id), 1);
    ws.emit("message", JSON.stringify({
      ...participant,
      "type": "disconnect"
    }))
  })

  ws.on('message', async function message(data) {

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
      room = roomPool[msg["room_id"]] = {};
    }

    try {
      await MESSAGE_HANDLER[msg["type"]](ws, room, msg)
    } catch (e) {
      console.error(e, msg);
      ws.close(1013, "Unexpected error");
    }

    msg.participants = room.participants.map(participant => {
      let { wsConn: _, ...prt } = participant;
      return prt;
    });
    let msgString = JSON.stringify(msg);
    for (let participant of room.participants) {
      console.log("Sending", msgString, "to", participant.username);
      participant.wsConn.send(msgString);
      // participant.ws.send(JSON.stringify(msg));
    }
    console.log("Room", room);
  });
});

console.log("WebSocket Server Started");