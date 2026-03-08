import express from "express";
import { blockUser, getAllUsers, unblockUser, deleteUser } from "../controllers/admin.controller.js";

const Adminrouter = express.Router();

Adminrouter.get("/users", getAllUsers);

Adminrouter.patch("/block/:id", blockUser);

Adminrouter.patch("/unblock/:id", unblockUser);

Adminrouter.delete("/users/:id", deleteUser);

export default Adminrouter;