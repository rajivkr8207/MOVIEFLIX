import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            default: "Description not available"
        },

        poster: {
            type: String
        },
        movieurl:{
            type: String
        },
        releaseDate: {
            type: String
        },

        trailer: {
            type: String
        },

        genre: [
            {
                type: String
            }
        ],

        category: {
            type: String,
            enum: ["movie", "tv"]
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

const MovieModel = mongoose.model("Movie", movieSchema);

export default MovieModel;