import connectDB from "@/lib/database";
import Comics from "../../../models/Comics";

export default async function handler(req, res) {
    if(req.method === 'POST') {   
        connectDB();
        const { images, room } = req.body;

        const comics = await Comics.create({
            images,
            room
        });

        res.status(200).json({
            message: "Comics created successfully!",
            comics
        });
    }
    else {
        res.status(404).json({message: "Page not found!"});
    }
}