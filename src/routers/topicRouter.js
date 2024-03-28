import express from "express";
import {
  getCreateNewTopic,
  psotCreateNewTopic,
  watchTopic
} from "../controllers/topicController";

const topicRouter = express.Router();

topicRouter.route("/new").get(getCreateNewTopic).post(psotCreateNewTopic);
topicRouter.route("/:topicname").get(watchTopic);

export default topicRouter;
