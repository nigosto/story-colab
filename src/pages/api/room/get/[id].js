import connectDB from "@/lib/database";
import Room from "../../../../models/Room";

export default async function handler(req, res) {
    connectDB();
    const {id} = req.query;
    const room = await Room.findById(id).populate('creator');
    res.status(200).json({
        message: "Room found!",
        room
    });
}