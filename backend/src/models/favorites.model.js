import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie"
    },
});

const FavoriteModel = mongoose.model("Favorite", favoriteSchema)
export default FavoriteModel;