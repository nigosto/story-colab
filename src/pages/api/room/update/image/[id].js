import connectDB from "@/lib/database";
import Room from "../../../../../models/Room";

export default async function handler(req, res) {
    if(req.method === 'POST') {
        connectDB();
        const {id} = req.query;
        const { image } = req.body;
        const room = await Room.findById(id);

        room.image = image;

        await room.save();
        res.status(200).json({message: "Room updated successfully", room})
    }
}