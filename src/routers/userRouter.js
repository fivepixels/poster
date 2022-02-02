import express from "express";
import { getEdit, getWatch, postEdit } from "../controllers/userController";

const userRotuer = express.Router();

userRotuer.route("/:username").get(getWatch);
userRotuer.route("/:username/edit").get(getEdit).post(postEdit);

export default userRotuer;
