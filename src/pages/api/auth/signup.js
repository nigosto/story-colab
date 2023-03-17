import connectDB from "@/lib/database";
import User from "../../../models/User";
import {
  generateHashedPassword,
  generateSalt,
} from "../../../utils/encryption";

export default async function handler(req, res) {
  connectDB();
  const { email, username, password } = req.body;
  const salt = generateSalt();
  const hashedPassword = generateHashedPassword(salt, password);
  const user = await User.create({
    email,
    username,
    salt,
    hashedPassword
  });

  res.status(200).json({
    message: "Successfully created user",
    user
  })
}
