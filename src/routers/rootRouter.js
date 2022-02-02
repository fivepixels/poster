import express from "express";
import {
  getJoin,
  getLogin,
  getSearch,
  home,
  logout,
  postJoin,
  postLogin,
  postSearch,
} from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.route("/").get(home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.route("/logout").get(logout);
rootRouter.route("/search").get(getSearch).post(postSearch);

export default rootRouter;
