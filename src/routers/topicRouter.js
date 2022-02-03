import express from "express";
import {
  getCreateNewTopic,
  psotCreateNewTopic,
  getEditTopic,
  postEditTopic,
  watchTopic,
} from "../controllers/topicController";

const topicRouter = express.Router();

topicRouter.route("/new").get(getCreateNewTopic).post(psotCreateNewTopic);
topicRouter.route("/:topicname").get(watchTopic);
topicRouter.route("/:topicname/edit").get(getEditTopic).post(postEditTopic);

export default topicRouter;
