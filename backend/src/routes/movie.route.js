import express from 'express'
import { isAdmin } from '../middleware/admin.middleware.js';
import { IdentifyUser } from '../middleware/auth.middleware.js';
import { createMovie, deleteMovie, getAllMovies, getRandomMovies, getSingleMovie, updateMovie } from '../controllers/movie.controller.js';
import { MovieValidator } from '../validation/movie.validator.js';

const MovieRouter = express.Router()

MovieRouter.post("/",MovieValidator, IdentifyUser, isAdmin, createMovie);

MovieRouter.get("/all", getAllMovies);

MovieRouter.get("/movies/random", getRandomMovies);

MovieRouter.get("/:id", getSingleMovie);

MovieRouter.put("/:id",MovieValidator, IdentifyUser, isAdmin, updateMovie);

MovieRouter.delete("/:id", IdentifyUser, isAdmin, deleteMovie);

export default MovieRouter