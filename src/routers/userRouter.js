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

const userRotuer = express.Router();

userRotuer.route("/:username").get(watch);
userRotuer.route("/:username/:postername").get(watchPoster);
userRotuer
  .route("/:username/:postername/edit")
  .get(getEditPoster)
  .post(postEditPoster);

userRotuer.route("/edit").get(getEditProfile).post(postEditProfile);

export default userRotuer;
