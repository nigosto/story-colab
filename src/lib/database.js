import mongoose from "mongoose";
import User from "../models/User";
import { generateSalt, generateHashedPassword } from "../utils/encryption";

async function seedUser() {
  try {
    let users = await User.find();
    if (users.length > 0) return;
    const salt = generateSalt();
    const hashedPassword = generateHashedPassword(salt, "user");
    return User.create({
      username: "user",
      email: "user@gmail.com",
      salt,
      hashedPassword,
    });
  } catch (e) {
    console.log(e);
  }
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default function connectDB() {
  if (mongoose.connections[0].readyState) {
    return;
  }
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
  const db = mongoose.connection;
  db.once("open", (err) => {
    if (err) throw err;
    seedUser()
      .then(() => {
        console.log("Database ready");
      })
      .catch((reason) => {
        console.log("Something went wrong");
        console.log(reason);
      });
  });
  db.on("error", (reason) => {
    console.log(reason);
  });
}
