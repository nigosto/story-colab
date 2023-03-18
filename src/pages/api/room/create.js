import connectDB from "@/lib/database";
import Room from "../../../models/Room";

export default async function handler(req, res) {
    if(req.method === 'POST') {   
        connectDB();
        const { name, description, participantsCount, creator, roles } = req.body;

        const room = await Room.create({name, description, participantsCount, creator, participants: [], roles});

        res.status(200).json({
            message: "Room created successfully!",
            room
        });
    }
    else {
        res.status(404).json({message: "Page not found!"});
    }
}