import HistoryModel from "../models/history.model.js";
import MovieModel from "../models/movie.model.js";

export const addToHistory = async (req, res) => {
    try {
        const { movieId } = req.params;
        const userId = req.user.id;

        const movie = await MovieModel.findById(movieId);
        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found"
            });
        }

        const existingHistory = await HistoryModel.findOne({
            userId,
            movieId
        });

        if (existingHistory) {
            existingHistory.watchedAt = new Date();
            await existingHistory.save();

            return res.status(200).json({
                success: true,
                message: "Watch history updated",
                history: existingHistory
            });
        } else {
            const history = new HistoryModel({
                userId,
                movieId,
                watchedAt: new Date()
            });

            await history.save();

            res.status(201).json({
                success: true,
                message: "Movie added to watch history",
                history
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getUserHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const { page = 1, limit = 10 } = req.query;

        const skip = (page - 1) * limit;

        const history = await HistoryModel.find({ userId })
            .populate('movieId')
            .sort({ watchedAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const totalHistory = await HistoryModel.countDocuments({ userId });

        res.status(200).json({
            success: true,
            history,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalHistory / limit),
                totalItems: totalHistory,
                itemsPerPage: parseInt(limit)
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const removeFromHistory = async (req, res) => {
    try {
        const { movieId } = req.params;
        const userId = req.user.id;

        const history = await HistoryModel.findOneAndDelete({
            userId,
            movieId
        });

        if (!history) {
            return res.status(404).json({
                success: false,
                message: "Movie not found in watch history"
            });
        }

        res.status(200).json({
            success: true,
            message: "Movie removed from watch history",
            history
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const clearHistory = async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await HistoryModel.deleteMany({ userId });

        res.status(200).json({
            success: true,
            message: "Watch history cleared",
            deletedCount: result.deletedCount
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};