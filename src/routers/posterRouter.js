import express from "express";

const posterRouter = express.Router();

posterRouter.route("/new");
posterRouter.route("/:postername");
posterRouter.route("/:postername/edit");

export default posterRouter;
