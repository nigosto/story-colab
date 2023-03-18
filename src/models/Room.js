import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    description: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    participantsCount: {
        type: mongoose.Schema.Types.Number,
        required: true,
        max: 6,
        min: 2
    },
    participants: [{
        name: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        image: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        isBot: {
            type: mongoose.Schema.Types.Boolean,
            required: true,
            default: false
        },
        storyteller: {
            type: mongoose.Schema.Types.Boolean,
            required: true,
            default: false
        },
        role: {
            type: mongoose.Schema.Types.String
        }
    }],
    scene: {
        type: mongoose.Schema.Types.String,
        default: "",
    },
    messages: [{
        type: mongoose.Schema.Types.String,
        default: [],
        required: true
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    roles: [{
        type: mongoose.Schema.Types.String,
        default: []
    }]
})

export default mongoose.models.Room || mongoose.model("Room", RoomSchema)