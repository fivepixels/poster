import express from "express";
import { editProfile, editTopic } from "../controllers/apiController";

const apiRouter = express.Router();

apiRouter.route("/users/edit").post(editProfile);
apiRouter.route("/topic/edit").post(editTopic);

export default apiRouter;
