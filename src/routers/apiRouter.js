import express from "express";
import { topicExists } from "../controllers/topicController";
import { posterExists } from "../controllers/posterController";

const apiRouter = express.Router();

apiRouter.post("/star/add/:postername/:username");
apiRouter.post("/star/cancel/:postername/:username");
apiRouter.post("/topics/:topicname/exists", topicExists);
apiRouter.post("/posters/:postername/exists", posterExists);

export default apiRouter;
