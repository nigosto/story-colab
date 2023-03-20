import connectDB from "@/lib/database";
import Comics from "../../../models/Comics"

export default async function handler(req, res) {
    connectDB();
    const {id} = req.query;
    const comics = await Comics.findById(id).populate('room');
    res.status(200).json({
        message: "Comics found!",
        comics
    });
}