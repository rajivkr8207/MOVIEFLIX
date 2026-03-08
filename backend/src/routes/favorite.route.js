import express from "express";
import { IdentifyUser } from "../middleware/auth.middleware.js";
import {
    addToFavorites,
    removeFromFavorites,
    getUserFavorites
} from "../controllers/favoritie.controller.js";

const FavoriteRouter = express.Router();

FavoriteRouter.use(IdentifyUser);

FavoriteRouter.post("/:movieId", addToFavorites);

FavoriteRouter.delete("/:movieId", removeFromFavorites);

FavoriteRouter.get("/", getUserFavorites);

export default FavoriteRouter;