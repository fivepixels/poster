import express from "express";
import { getSearch, home, postSearch } from "../controllers/rootController";
import {
  getJoin,
  getLogin,
  logout,
  postJoin,
  postLogin,
} from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.route("/").get(home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.route("/logout").get(logout);
rootRouter.route("/search").get(getSearch).post(postSearch);

export default rootRouter;
