import express from "express";
import { getProfile, get_me, login, logout, register } from "../controllers/auth.controller.js";
import { IdentifyUser } from "../middleware/auth.middleware.js";
import { LoginValidator, RegisterValidator } from "../validation/auth.validator.js";

const authrouter = express.Router();

authrouter.post("/register", RegisterValidator, register);
authrouter.post("/login", LoginValidator, login);
authrouter.get("/profile", IdentifyUser, getProfile);
authrouter.get("/   ", IdentifyUser, get_me);

authrouter.get("/logout", IdentifyUser, logout);


export default authrouter;