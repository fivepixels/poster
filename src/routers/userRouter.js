import express from "express";
import { getEdit, postEdit, watch } from "../controllers/userController";

const userRotuer = express.Router();

userRotuer.route("/:username").get(watch);
userRotuer.route("/:username/edit").get(getEdit).post(postEdit);

export default userRotuer;
