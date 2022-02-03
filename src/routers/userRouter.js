import express from "express";
import {
  getEditPoster,
  postEditPoster,
  watchPoster,
} from "../controllers/posterController";
import { watch } from "../controllers/userController";

const userRotuer = express.Router();

userRotuer.route("/").get(watch);
userRotuer.route("/:postername").get(watchPoster);
userRotuer.route("/:postername/edit").get(getEditPoster).post(postEditPoster);

export default userRotuer;
