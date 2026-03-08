import express from "express";
import { blockUser, getAllUsers, unblockUser } from "../controllers/admin.controller.js";

const Adminrouter = express.Router();

Adminrouter.get("/users", getAllUsers);

Adminrouter.patch("/block/:id", blockUser);

Adminrouter.patch("/unblock/:id", unblockUser);

export default Adminrouter;