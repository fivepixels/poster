import express from "express";
import {
  getEditPoster,
  postEditPoster,
  watchPoster,
} from "../controllers/posterController";
import { getEdit, postEdit, watch } from "../controllers/userController";

const userRotuer = express.Router();

userRotuer.route("/").get(watch);
userRotuer.route("/edit").get(getEdit).post(postEdit);
userRotuer.route("/:postername").get(watchPoster);
userRotuer.route("/:postername/edit").get(getEditPoster).post(postEditPoster);

export default userRotuer;
