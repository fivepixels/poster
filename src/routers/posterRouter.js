import express from "express";
import {
  getCreateNewPoster,
  getEdit,
  postEdit,
  psotCreateNewPoster,
  watch,
} from "../controllers/posterController";

const posterRouter = express.Router();

posterRouter.route("/new").get(getCreateNewPoster).post(psotCreateNewPoster);
posterRouter.route("/:postername").get(watch);
posterRouter.route("/:postername/edit").get(getEdit).post(postEdit);

export default posterRouter;
