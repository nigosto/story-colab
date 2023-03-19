import connectDB from "@/lib/database";
import Comics from "../../../models/Comics";

export default async function handler(req, res) {
    connectDB();
    const comicses = await Comics.find();
    res.status(200).json({
        message: "Comicses fetched successfully!",
        comicses
    });
}