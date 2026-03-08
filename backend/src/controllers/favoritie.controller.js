import FavoriteModel from "../models/favorites.model.js";
import MovieModel from "../models/movie.model.js";

export const addToFavorites = async (req, res) => {
    try {
        const { movieId } = req.params;
        const userId = req.user.id;

        // Check if movie exists
        const movie = await MovieModel.findById(movieId);
        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found"
            });
        }

        // Check if already in favorites
        const existingFavorite = await FavoriteModel.findOne({
            userId,
            movie: movieId
        });

        if (existingFavorite) {
            return res.status(400).json({
                success: false,
                message: "Movie already in favorites"
            });
        }

        // Add to favorites
        const favorite = new FavoriteModel({
            userId,
            movie: movieId
        });

        await favorite.save();

        res.status(201).json({
            success: true,
            message: "Movie added to favorites",
            favorite
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const removeFromFavorites = async (req, res) => {
    try {
        const { movieId } = req.params;
        const userId = req.user.id;

        const favorite = await FavoriteModel.findOneAndDelete({
            userId,
            movie: movieId
        });

        if (!favorite) {
            return res.status(404).json({
                success: false,
                message: "Movie not found in favorites"
            });
        }

        res.status(200).json({
            success: true,
            message: "Movie removed from favorites",
            favorite
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getUserFavorites = async (req, res) => {
    try {
        const userId = req.user.id;

        const favorites = await FavoriteModel.find({ userId })
            .populate('movie')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            favorites
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};