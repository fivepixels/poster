import express from "express";
import {
  getCreateNewTopic,
  psotCreateNewTopic,
  watch,
} from "../controllers/topicController";
import { getEdit, postEdit } from "../controllers/userController";

const topicRouter = express.Router();

topicRouter.route("/new").get(getCreateNewTopic).post(psotCreateNewTopic);
topicRouter.route("/:topicname").get(watch);
topicRouter.route("/:topicname/edit").get(getEdit).post(postEdit);

export default topicRouter;
