import connectDB from "@/lib/database";
import Room from "../../../../../models/Room";

export default async function handler(req, res) {
    if(req.method === 'POST') {
        connectDB();
        const {id} = req.query;
        const { participants } = req.body;
        const room = await Room.findById(id);

        room.participants = participants;

        await room.save();
        res.status(200).json({message: "Room updated successfully", room})
    }
}