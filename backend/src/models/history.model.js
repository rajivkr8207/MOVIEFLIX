import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie"
    },

    watchedAt: {
        type: Date,
        default: Date.now
    }
});

const history = mongoose.model("History", historySchema)
export default history;