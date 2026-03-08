import express from "express";
import { IdentifyUser } from "../middleware/auth.middleware.js";
import {
    addToHistory,
    getUserHistory,
    removeFromHistory,
    clearHistory
} from "../controllers/history.controller.js";

const HistoryRouter = express.Router();
HistoryRouter.use(IdentifyUser);
HistoryRouter.post("/:movieId", addToHistory);
HistoryRouter.get("/", getUserHistory);
HistoryRouter.delete("/:movieId", removeFromHistory);
HistoryRouter.delete("/", clearHistory);

export default HistoryRouter;