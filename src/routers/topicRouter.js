import express from "express";

const topicRouter = express.Router();

topicRouter.route("/new");
topicRouter.route("/:topicname");
topicRouter.route("/:topicname/edit");

export default topicRouter;
