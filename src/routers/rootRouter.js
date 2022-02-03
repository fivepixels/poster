import express from "express";
import {
  getCreateNewPoster,
  psotCreateNewPoster,
} from "../controllers/posterController";
import { home, getSearch, postSearch } from "../controllers/rootController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
} from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.route("/").get(home);
rootRouter.route("/new").get(getCreateNewPoster).post(psotCreateNewPoster);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.route("/logout").get(logout);
rootRouter.route("/search").get(getSearch).post(postSearch);

export default rootRouter;
