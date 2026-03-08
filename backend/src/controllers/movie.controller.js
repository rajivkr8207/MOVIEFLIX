import FavoriteModel from "../models/favorites.model.js";
import MovieModel from "../models/movie.model.js";


export const createMovie = async (req, res) => {
    try {
        const {
            title,
            description,
            poster,
            releaseDate,
            trailer,
            genre,
            category,
            movieurl
        } = req.body;

        const movie = await MovieModel.create({
            title,
            description,
            poster,
            releaseDate,
            trailer,
            genre,
            category,
            movieurl,
            createdBy: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Movie created successfully",
            movie
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
export const getAllMovies = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";
    const genre = req.query.genre;

    const skip = (page - 1) * limit;

    let query = {};

    if (search) {
      query.title = { $regex: new RegExp(search, "i") };
    }

    if (genre) {
      query.genre = genre;
    }

    const totalMovies = await MovieModel.countDocuments(query);

    const movies = await MovieModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      page,
      limit,
      totalMovies,
      totalPages: Math.ceil(totalMovies / limit),
      movies
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const getRandomMovies = async (req, res) => {

    try {

        const limit = parseInt(req.query.limit) || 10;

        const movies = await MovieModel.aggregate([
            { $sample: { size: limit } }
        ]);

        res.status(200).json({
            success: true,
            count: movies.length,
            movies
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


export const getSingleMovie = async (req, res) => {

    try {

        const movieId = req.params.id;
        const userId = req.user?.id; // auth middleware से आएगा

        const movie = await MovieModel.findById(movieId);

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found"
            });
        }

        // check favorite
        let isFavorite = false;
        let favorite = await FavoriteModel.findOne({
            userId: userId,
            movie: movieId
        });

        isFavorite = !!favorite;

        res.status(200).json({
            success: true,
            movie,
            isFavorite,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


export const updateMovie = async (req, res) => {
    try {
        const movie = await MovieModel.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found"
            });
        }

        const updatedMovie = await MovieModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Movie updated successfully",
            movie: updatedMovie
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



export const deleteMovie = async (req, res) => {

    try {

        const movie = await MovieModel.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found"
            });
        }

        await movie.deleteOne();

        res.status(200).json({
            success: true,
            message: "Movie deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
