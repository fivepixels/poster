import express from "express";

const rootRouter = express.Router();

rootRouter.route("/");
rootRouter.route("/join");
rootRouter.route("/login");
rootRouter.route("/logout");
rootRouter.route("/search");

export default rootRouter;
