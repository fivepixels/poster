import express from "express";

import { getSearch, postSearch, home } from "../controllers/rootController";

import {
  getCreateNewPoster,
  psotCreateNewPoster,
} from "../controllers/posterController";

import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
} from "../controllers/userController";

import userRotuer from "./userRouter";

const rootRouter = express.Router();

rootRouter.route("/").get(home);
rootRouter.route("/new").get(getCreateNewPoster).post(psotCreateNewPoster);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.route("/logout").get(logout);
rootRouter.route("/search").get(getSearch).post(postSearch);
rootRouter.use(userRotuer);

export default rootRouter;
