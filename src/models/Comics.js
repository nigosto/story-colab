import mongoose from "mongoose";

const ComicsSchema = new mongoose.Schema({
    images: [{
        type: mongoose.Schema.Types.String,
        default: []
    }],
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true
    }
})

export default mongoose.models.Comics || mongoose.model("Comics", ComicsSchema)