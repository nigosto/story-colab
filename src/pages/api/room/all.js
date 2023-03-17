import connectDB from "@/lib/database";
import Room from "../../../models/Room";

export default async function handler(req, res) {
    connectDB();
    const rooms = await Room.find();
    res.status(200).json({
        message: "Rooms fetched successfully!",
        rooms
    });
}