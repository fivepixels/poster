import express from "express";
import { randomPoster } from "../controllers/posterController";
import { randomTopic } from "../controllers/topicController";

const randomRouter = express.Router();

randomRouter.route("/poster").get(randomPoster);
randomRouter.route("/topic").get(randomTopic);

export default randomRouter;
