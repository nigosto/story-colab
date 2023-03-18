import mongoose from 'mongoose';
import { Configuration, OpenAIApi } from 'openai';
import { WebSocketServer } from 'ws';

import Room from "./src/models/Room.js"

await mongoose.connect('mongodb://192.168.105.14:27017/story-colab');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});


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
  },
  "character_line": async function (ws, room, msg) {
    console.log("character line", msg);
  },
  "turn": async function (ws, room, msg) {
    console.log("turn", msg);
    let userIdForTurn = msg["turn_user"];
    let userForTurn = room.details.participants.find(prt => prt.user_id === userIdForTurn);
    if (msg.username === "simoBot" || userForTurn.isBot) {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "You: What have you been up to?\nFriend: Watching old movies.\nYou: Did you watch anything interesting?\nFriend: Yes, I watched a classic horror film from the 1950s. It was really good.\nYou: What was it about?\nFriend: It was about a group of teenagers who are terrorized by a mysterious creature in the woods. It was really suspenseful and had some great special effects for its time.\nYou: That sounds like a great movie! Do you recommend it?\nFriend: Absolutely! It's a  classic and I think anyone who loves horror films should watch it.\nYou: I will. And did you listen to an interesting song recently?\nFriend:  Yes, I recently discovered a song by a band called The National. It's called \"Fake Empire\" and it's really great. I highly recommend it!",
        temperature: 0.5,
        max_tokens: 50,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
        stop: ["You:"],
      });
    }
  }
}

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('close', (code, reason) => {
    if (!ws.participant) {
      return;
    }
    let participant = {
      room_id: ws.participant.room_id,
      user_id: ws.participant.user_id,
      username: ws.participant.username,
      idx: ws.participant.idx,
    }
    console.log('closing', code, reason, participant);
    roomPool[participant.room_id].participants.splice(roomPool[participant.room_id].participants.findIndex(prt => prt.user_id === participant.user_id), 1);
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

    // if (!MESSAGE_HANDLER[msg.type]) {
    //   console.error("Unsupoorted error", data.toString());

    //   ws.close(4210, `Message type is not supported.`);
    //   return;
    // }

    let room = roomPool[msg["room_id"]];
    if (!room) {
      room = roomPool[msg["room_id"]] = {};
    }

    try {
      if (MESSAGE_HANDLER[msg["type"]]) {
        await MESSAGE_HANDLER[msg["type"]](ws, room, msg)
      }
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