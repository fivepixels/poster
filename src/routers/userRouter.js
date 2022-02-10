import express from "express";

import {
  getEditPoster,
  postEditPoster,
  watchPoster,
} from "../controllers/posterController";

import {
  getEditProfile,
  postEditProfile,
  watch,
} from "../controllers/userController";
import { uploadFiles } from "../middlewares";

const userRotuer = express.Router();

userRotuer
  .route("/edit")
  .get(getEditProfile)
  .post(uploadFiles.single("avatar"), postEditProfile);
userRotuer.route("/:username").get(watch);
userRotuer.route("/:username/:postername").get(watchPoster);
userRotuer
  .route("/:username/:postername/edit")
  .get(getEditPoster)
  .post(postEditPoster);

export default userRotuer;
