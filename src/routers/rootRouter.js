import express from "express";

import { home, search } from "../controllers/rootController";

import {
  getCreateNewPoster,
  postCreateNewPoster
} from "../controllers/posterController";

import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout
} from "../controllers/userController";

import userRotuer from "./userRouter";

const rootRouter = express.Router();

rootRouter.route("/").get(home);
rootRouter.route("/new").get(getCreateNewPoster).post(postCreateNewPoster);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.route("/logout").get(logout);
rootRouter.route("/search").get(search);
rootRouter.use(userRotuer);

export default rootRouter;
