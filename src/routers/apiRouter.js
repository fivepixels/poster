import express from "express";
import {
  topicExists,
  posterAlreadyTaken,
  getTopic,
} from "../controllers/topicController";
import { posterExists } from "../controllers/posterController";

const apiRouter = express.Router();

apiRouter.post("/star/add/:postername/:username");
apiRouter.post("/star/cancel/:postername/:username");
apiRouter.post("/topics/:topicname/exists", topicExists);
apiRouter.post(
  "/topics/:topicname/:postername/already-taken",
  posterAlreadyTaken
);
apiRouter.post("/posters/:postername/exists", posterExists);
apiRouter.post("/topics/:topicname/topic-type", getTopic);

export default apiRouter;
